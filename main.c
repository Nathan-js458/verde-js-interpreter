#include <quickjs.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TRUE 1
#define FALSE 0

// console.log
static JSValue js_console_log(JSContext *ctx, JSValueConst this_val,
                              int argc, JSValueConst *argv) {
    for (int i = 0; i < argc; i++) {
        const char *str = JS_ToCString(ctx, argv[i]);
        if (str) {
            printf("%s", str);
            JS_FreeCString(ctx, str);
        }
        if (i != argc - 1)
            printf(" ");
    }
    printf("\n");
    return JS_UNDEFINED;
}

void adicionar_console(JSContext *ctx) {
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue console = JS_NewObject(ctx);

    JS_SetPropertyStr(ctx, console, "log",
        JS_NewCFunction(ctx, js_console_log, "log", 1));

    JS_SetPropertyStr(ctx, global, "console", console);
    JS_FreeValue(ctx, global);
}

// verdemod("arquivo.js") - CommonJS
static JSValue js_verdemod(JSContext *ctx, JSValueConst this_val,
                           int argc, JSValueConst *argv) {
    if (argc < 1)
        return JS_ThrowTypeError(ctx, "verdemod requer o caminho do módulo");

    const char *path = JS_ToCString(ctx, argv[0]);
    if (!path)
        return JS_EXCEPTION;

    FILE *f = fopen(path, "rb");
    if (!f) {
        JS_FreeCString(ctx, path);
        return JS_ThrowReferenceError(ctx, "Arquivo não encontrado: %s", path);
    }

    fseek(f, 0, SEEK_END);
    long len = ftell(f);
    fseek(f, 0, SEEK_SET);

    char *buf = malloc(len + 1);
    fread(buf, 1, len, f);
    buf[len] = '\0';
    fclose(f);

    char wrapped[10240];
    snprintf(wrapped, sizeof(wrapped),
        "(function(exports, module) { %s\n})", buf);
    free(buf);

    JSValue func_val = JS_Eval(ctx, wrapped, strlen(wrapped), path, JS_EVAL_TYPE_GLOBAL);
    JS_FreeCString(ctx, path);

    if (JS_IsException(func_val))
        return func_val;

    JSValue exports = JS_NewObject(ctx);
    JSValue module = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, module, "exports", JS_DupValue(ctx, exports));

    JSValue args[] = { exports, module };
    JS_Call(ctx, func_val, JS_UNDEFINED, 2, args);

    JS_FreeValue(ctx, func_val);
    JS_FreeValue(ctx, exports);

    return JS_GetPropertyStr(ctx, module, "exports");
}

char *ler_arquivo(const char *caminho) {
    FILE *f = fopen(caminho, "rb");
    if (!f) return NULL;

    fseek(f, 0, SEEK_END);
    long len = ftell(f);
    fseek(f, 0, SEEK_SET);

    char *buf = malloc(len + 1);
    fread(buf, 1, len, f);
    buf[len] = '\0';
    fclose(f);

    return buf;
}

// REPL com fgets
void iniciar_repl(JSContext *ctx) {
    char linha[4096];
    printf("VerdeJS REPL\nDigite 'exit' para sair\n");

    while (1) {
        printf("verde> ");
        if (!fgets(linha, sizeof(linha), stdin)) break;

        if (strncmp(linha, "exit", 4) == 0)
            break;

        JSValue resultado = JS_Eval(ctx, linha, strlen(linha), "<input>", JS_EVAL_TYPE_GLOBAL);

        if (JS_IsException(resultado)) {
            JSValue exc = JS_GetException(ctx);
            const char *err = JS_ToCString(ctx, exc);
            fprintf(stderr, "Erro: %s\n", err);
            JS_FreeCString(ctx, err);
            JS_FreeValue(ctx, exc);
        } else if (!JS_IsUndefined(resultado)) {
            const char *res_str = JS_ToCString(ctx, resultado);
            if (res_str) {
                printf("%s\n", res_str);
                JS_FreeCString(ctx, res_str);
            }
        }

        JS_FreeValue(ctx, resultado);
    }

    printf("Encerrando REPL.\n");
}

int main(int argc, char **argv) {
    JSRuntime *rt = JS_NewRuntime();
    JSContext *ctx = JS_NewContext(rt);

    adicionar_console(ctx);

    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "verdemod",
        JS_NewCFunction(ctx, js_verdemod, "verdemod", 1));
    JS_FreeValue(ctx, global);

    if (argc >= 2) {
        char *codigo = ler_arquivo(argv[1]);
        if (!codigo) {
            fprintf(stderr, "Erro ao abrir o arquivo: %s\n", argv[1]);
            return 1;
        }

        JSValue mod = JS_Eval(ctx, codigo, strlen(codigo), argv[1],
                              JS_EVAL_TYPE_MODULE | JS_EVAL_FLAG_COMPILE_ONLY);
        free(codigo);

        if (JS_IsException(mod)) {
            JSValue exc = JS_GetException(ctx);
            const char *err = JS_ToCString(ctx, exc);
            fprintf(stderr, "Erro ao compilar: %s\n", err);
            JS_FreeCString(ctx, err);
            JS_FreeValue(ctx, exc);
        } else {
            JSValue res = JS_EvalFunction(ctx, mod);
            if (JS_IsException(res)) {
                JSValue exc = JS_GetException(ctx);
                const char *err = JS_ToCString(ctx, exc);
                fprintf(stderr, "Erro ao executar: %s\n", err);
                JS_FreeCString(ctx, err);
                JS_FreeValue(ctx, exc);
            }
            JS_FreeValue(ctx, res);
        }
    } else {
        iniciar_repl(ctx);
    }

    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    return 0;
}
