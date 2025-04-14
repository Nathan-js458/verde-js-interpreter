#include <quickjs.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>  // Para true/false

// === console.log ===
static JSValue js_console_log(JSContext *ctx, JSValueConst this_val,
                              int argc, JSValueConst *argv) {
    for (int i = 0; i < argc; i++) {
        const char *str = JS_ToCString(ctx, argv[i]);
        if (str) {
            printf("%s", str);
            JS_FreeCString(ctx, str);
        }
        if (i < argc - 1) printf(" ");
    }
    printf("\n");
    return JS_UNDEFINED;
}

// === console.error ===
static JSValue js_console_error(JSContext *ctx, JSValueConst this_val,
                                int argc, JSValueConst *argv) {
    for (int i = 0; i < argc; i++) {
        const char *str = JS_ToCString(ctx, argv[i]);
        if (str) {
            fprintf(stderr, "%s", str);
            JS_FreeCString(ctx, str);
        }
        if (i < argc - 1) fprintf(stderr, " ");
    }
    fprintf(stderr, "\n");
    return JS_UNDEFINED;
}

// === Adiciona o objeto console ===
void adicionar_console(JSContext *ctx) {
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue console = JS_NewObject(ctx);

    JS_SetPropertyStr(ctx, console, "log",
        JS_NewCFunction(ctx, js_console_log, "log", 1));
    JS_SetPropertyStr(ctx, console, "error",
        JS_NewCFunction(ctx, js_console_error, "error", 1));

    JS_SetPropertyStr(ctx, global, "console", console);
    JS_FreeValue(ctx, global);
}

// === Leitura do arquivo .js ===
char *ler_arquivo(const char *caminho) {
    FILE *f = fopen(caminho, "rb");
    if (!f) return NULL;
    fseek(f, 0, SEEK_END);
    long tam = ftell(f);
    rewind(f);
    char *codigo = malloc(tam + 1);
    fread(codigo, 1, tam, f);
    codigo[tam] = '\0';
    fclose(f);
    return codigo;
}

// === Suporte a CommonJS (verdemod) ===
static JSValue js_verdemod(JSContext *ctx, JSValueConst this_val,
                           int argc, JSValueConst *argv) {
    if (argc < 1)
        return JS_ThrowTypeError(ctx, "verdemod espera um caminho");

    const char *mod_path = JS_ToCString(ctx, argv[0]);
    if (!mod_path)
        return JS_ThrowTypeError(ctx, "Argumento inválido");

    char *source = ler_arquivo(mod_path);
    if (!source) {
        JS_FreeCString(ctx, mod_path);
        return JS_ThrowReferenceError(ctx, "Não foi possível abrir %s", mod_path);
    }

    JSValue exports = JS_NewObject(ctx);
    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "exports", JS_DupValue(ctx, exports));
    JS_FreeValue(ctx, global);

    JSValue result = JS_Eval(ctx, source, strlen(source), mod_path, JS_EVAL_TYPE_GLOBAL);
    free(source);
    JS_FreeCString(ctx, mod_path);

    if (JS_IsException(result)) {
        JS_FreeValue(ctx, exports);
        return result;
    }

    JS_FreeValue(ctx, result);
    return exports;
}

// === Função principal ===
int main(int argc, char **argv) {
    if (argc < 2) {
        fprintf(stderr, "Uso: %s arquivo.js\n", argv[0]);
        return 1;
    }

    char *codigo = ler_arquivo(argv[1]);
    if (!codigo) {
        fprintf(stderr, "Erro ao abrir o arquivo: %s\n", argv[1]);
        return 1;
    }

    JSRuntime *rt = JS_NewRuntime();
    JSContext *ctx = JS_NewContext(rt);
    adicionar_console(ctx);

    // Registra a função `verdemod`
    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "verdemod",
        JS_NewCFunction(ctx, js_verdemod, "verdemod", 1));
    JS_FreeValue(ctx, global);

    // Avalia o arquivo principal
    JSValue mod = JS_Eval(ctx, codigo, strlen(codigo), argv[1],
                          JS_EVAL_TYPE_MODULE | JS_EVAL_FLAG_COMPILE_ONLY);

    if (JS_IsException(mod)) {
        JSValue exc = JS_GetException(ctx);
        const char *err = JS_ToCString(ctx, exc);
        fprintf(stderr, "Erro ao compilar o arquivo principal: %s\n", err);
        JS_FreeCString(ctx, err);
        JS_FreeValue(ctx, exc);
    } else {
        JSValue result = JS_EvalFunction(ctx, mod);
        if (JS_IsException(result)) {
            JSValue exc = JS_GetException(ctx);
            const char *err = JS_ToCString(ctx, exc);
            fprintf(stderr, "Erro ao executar o arquivo principal: %s\n", err);
            JS_FreeCString(ctx, err);
            JS_FreeValue(ctx, exc);
        }
    }

    free(codigo);
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    return 0;
}
