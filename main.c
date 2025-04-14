#include <quickjs.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINHA 1024

// console.log básico
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

// adiciona console.log ao contexto
void adicionar_console(JSContext *ctx) {
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue console = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, console, "log",
        JS_NewCFunction(ctx, js_console_log, "log", 1));
    JS_SetPropertyStr(ctx, global, "console", console);
    JS_FreeValue(ctx, global);
}

// lê conteúdo de arquivo JS
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

    char *codigo = ler_arquivo(argv[1]);
    if (!codigo) {
        fprintf(stderr, "Erro ao abrir: %s\n", argv[1]);
        return 1;
    }

    JSRuntime *rt = JS_NewRuntime();
    JSContext *ctx = JS_NewContext(rt);
    adicionar_console(ctx);

    char *linha = strtok(codigo, "\n");
    int num_linha = 1;

    while (linha) {
        if (strlen(linha) > 0) {
            JSValue val = JS_Eval(ctx, linha, strlen(linha), "<linha>", JS_EVAL_TYPE_GLOBAL);

            if (JS_IsException(val)) {
                JSValue exc = JS_GetException(ctx);
                const char *err = JS_ToCString(ctx, exc);
                fprintf(stderr, "[linha %d] Erro: %s\n", num_linha, err);
                JS_FreeCString(ctx, err);
                JS_FreeValue(ctx, exc);
            } else {
                JSValue tipo = JS_Typeof(ctx, val);
                const char *tipo_str = JS_ToCString(ctx, tipo);
                if (strcmp(tipo_str, "undefined") != 0) {
                    const char *saida = JS_ToCString(ctx, val);
                    printf("[linha %d] => %s\n", num_linha, saida);
                    JS_FreeCString(ctx, saida);
                }
                JS_FreeCString(ctx, tipo_str);
            }

            JS_FreeValue(ctx, val);
        }

        linha = strtok(NULL, "\n");
        num_linha++;
    }

    free(codigo);
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    return 0;
}
