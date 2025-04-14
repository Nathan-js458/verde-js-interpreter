#include <quickjs.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Função para ler todo o conteúdo de um arquivo
char* ler_arquivo(const char* caminho) {
    FILE* arquivo = fopen(caminho, "rb");
    if (!arquivo) return NULL;

    fseek(arquivo, 0, SEEK_END);
    long tamanho = ftell(arquivo);
    rewind(arquivo);

    char* conteudo = (char*)malloc(tamanho + 1);
    if (!conteudo) return NULL;

    fread(conteudo, 1, tamanho, arquivo);
    conteudo[tamanho] = '\0';

    fclose(arquivo);
    return conteudo;
}

int main(int argc, char** argv) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s file.js\n", argv[0]);
        return 1;
    }

    const char* caminho_arquivo = argv[1];
    char* codigo = ler_arquivo(caminho_arquivo);

    if (!codigo) {
        fprintf(stderr, "Error while opening file: %s\n", caminho_arquivo);
        return 1;
    }

    // Inicializa QuickJS
    JSRuntime* rt = JS_NewRuntime();
    JSContext* ctx = JS_NewContext(rt);

    if (!rt || !ctx) {
        fprintf(stderr, "Error while creating runtime/context QuickJS\n");
        free(codigo);
        return 1;
    }

    // Executa o código JS
    JSValue result = JS_Eval(ctx, codigo, strlen(codigo), caminho_arquivo, JS_EVAL_TYPE_GLOBAL);

    if (JS_IsException(result)) {
        JSValue exception = JS_GetException(ctx);
        const char* error = JS_ToCString(ctx, exception);
        fprintf(stderr, "JS Error: %s\n", error);
        JS_FreeCString(ctx, error);
        JS_FreeValue(ctx, exception);
    } else {
        const char* output = JS_ToCString(ctx, result);
        if (output) {
            printf("%s\n", output);
            JS_FreeCString(ctx, output);
        }
    }

    // Libera recursos
    JS_FreeValue(ctx, result);
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    free(codigo);

    return 0;
}
