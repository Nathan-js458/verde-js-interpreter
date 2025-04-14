#include <quickjs.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINHA 1024

// Função nativa para console.log
static JSValue js_console_log(JSContext *ctx, JSValueConst this_val,
                              int argc, JSValueConst *argv) {
    for (int i = 0; i < argc; i++) {
        const char *str = JS_ToCString(ctx, argv[i]);
        if (str) {
            printf("%s", str);
            JS_FreeCString(ctx, str);
        }
        if (i < argc - 1) {
            printf(" ");
        }
    }
    printf("\n");
    return JS_UNDEFINED;
}

// Adiciona console.log ao contexto
void adicionar_console(JSContext *ctx) {
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue console = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, console, "log",
        JS_NewCFunction(ctx, js_console_log, "log", 1));
    JS_SetPropertyStr(ctx, global, "console", console);
    JS_FreeValue(ctx, global);
}

// Função para ler o conteúdo de um arquivo JS
char *ler_arquivo(const char *caminho) {
    FILE *f = fopen(caminho, "rb");
    if (!f) return NULL;
    fseek(f, 0, SEEK_END);
    long tam = ftell(f);
    rewind(f);
    char *conteudo = malloc(tam + 1);
    fread(conteudo, 1, tam, f);
    conteudo[tam] = '\0';
    fclose(f);
    return conteudo;
}

int main(int argc, char **argv) {
    if (argc < 2) {
        fprintf(stderr, "Uso: %s arquivo.js\n", argv[0]);
        return 1;
    }

    // Lê o código JavaScript do arquivo
    char *codigo = ler_arquivo(argv[1]);
    if (!codigo) {
        fprintf(stderr, "Erro ao abrir o arquivo: %s\n", argv[1]);
        return 1;
    }

    // Cria o runtime e contexto do QuickJS
    JSRuntime *rt = JS_NewRuntime();
    JSContext *ctx = JS_NewContext(rt);
    adicionar_console(ctx); // Adiciona console.log ao contexto

    // Processa linha por linha do código
    char *linha = strtok(codigo, "\n");
    int num_linha = 1;

    while (linha) {
        if (strlen(linha) > 0) {
            // Avalia cada linha de código JS
            JSValue val = JS_Eval(ctx, linha, strlen(linha), "<linha>", JS_EVAL_TYPE_GLOBAL);

            if (JS_IsException(val)) {
                // Em caso de erro, imprime a exceção
                JSValue exc = JS_GetException(ctx);
                const char *err = JS_ToCString(ctx, exc);
                fprintf(stderr, "[linha %d] Erro: %s\n", num_linha, err);
                JS_FreeCString(ctx, err);
                JS_FreeValue(ctx, exc);
            } else {
                // Obtém o tipo do valor usando JS_VALUE_GET_TAG
                int tipo = JS_VALUE_GET_TAG(val);

                if (tipo != JS_TAG_UNDEFINED) {
                    const char *saida = JS_ToCString(ctx, val);
                    if (saida) {
                        // Imprime o valor da expressão
                        printf("%s\n", saida);
                        JS_FreeCString(ctx, saida);
                    }
                }
            }

            JS_FreeValue(ctx, val); // Libera a memória
        }

        linha = strtok(NULL, "\n"); // Passa para a próxima linha
        num_linha++;
    }

    free(codigo); // Libera o conteúdo do arquivo
    JS_FreeContext(ctx); // Libera o contexto
    JS_FreeRuntime(rt); // Libera o runtime

    return 0;
}

