// main.c
#include <quickjs.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

// JS console.log
static JSValue js_console_log(JSContext *ctx, JSValueConst this_val,
                               int argc, JSValueConst *argv) {
    for (int i = 0; i < argc; i++) {
        const char *str = JS_ToCString(ctx, argv[i]);
        if (!str)
            return JS_EXCEPTION;
        printf("%s%s", str, i == argc - 1 ? "\n" : " ");
        JS_FreeCString(ctx, str);
    }
    return JS_UNDEFINED;
}

static const JSCFunctionListEntry console_funcs[] = {
    JS_CFUNC_DEF("log", 1, js_console_log),
};

static void adicionar_console(JSContext *ctx) {
    JSValue global_obj = JS_GetGlobalObject(ctx);
    JSValue console = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, console, console_funcs,
                               sizeof(console_funcs) / sizeof(JSCFunctionListEntry));
    JS_SetPropertyStr(ctx, global_obj, "console", console);
    JS_FreeValue(ctx, global_obj);
}

// verdemod("foo") CommonJS loader
static JSValue js_verdemod(JSContext *ctx, JSValueConst this_val,
                           int argc, JSValueConst *argv) {
    if (argc < 1)
        return JS_EXCEPTION;
    const char *modname = JS_ToCString(ctx, argv[0]);
    if (!modname)
        return JS_EXCEPTION;

    char filename[256];
    snprintf(filename, sizeof(filename), "%s.js", modname);

    FILE *f = fopen(filename, "rb");
    if (!f) {
        JS_FreeCString(ctx, modname);
        return JS_ThrowReferenceError(ctx, "Módulo '%s' não encontrado", modname);
    }
    fseek(f, 0, SEEK_END);
    size_t size = ftell(f);
    fseek(f, 0, SEEK_SET);
    char *buf = malloc(size + 1);
    fread(buf, 1, size, f);
    buf[size] = '\0';
    fclose(f);

    JSValue ret = JS_Eval(ctx, buf, size, filename, JS_EVAL_TYPE_GLOBAL);
    free(buf);
    JS_FreeCString(ctx, modname);
    return ret;
}

// JSX transpile helper (sucraseTransform deve estar definido no bundle sucrase.bundle.js)
static JSValue transpile_jsx(JSContext *ctx, const char *code, const char *filename) {
    const char *js_transpile =
        "(function(code) { return sucraseTransform(code); })";

    JSValue transpiler_fn = JS_Eval(ctx, js_transpile, strlen(js_transpile), "[jsx-wrapper]", 0);
    if (JS_IsException(transpiler_fn)) return transpiler_fn;

    JSValue code_val = JS_NewString(ctx, code);
    JSValue result = JS_Call(ctx, transpiler_fn, JS_UNDEFINED, 1, &code_val);

    JS_FreeValue(ctx, transpiler_fn);
    JS_FreeValue(ctx, code_val);
    return result;
}

// Load arquivo.js ou arquivo.jsx
static JSValue carregar_arquivo(JSContext *ctx, const char *filename) {
    FILE *f = fopen(filename, "rb");
    if (!f) {
        perror("Erro abrindo arquivo");
        return JS_EXCEPTION;
    }
    fseek(f, 0, SEEK_END);
    size_t len = ftell(f);
    fseek(f, 0, SEEK_SET);
    char *buf = malloc(len + 1);
    fread(buf, 1, len, f);
    buf[len] = '\0';
    fclose(f);

    JSValue result;
    if (strstr(filename, ".jsx")) {
        JSValue transpiled = transpile_jsx(ctx, buf, filename);
        if (JS_IsException(transpiled)) {
            free(buf);
            return transpiled;
        }
        const char *js_code = JS_ToCString(ctx, transpiled);
        result = JS_Eval(ctx, js_code, strlen(js_code), filename, JS_EVAL_TYPE_GLOBAL);
        JS_FreeCString(ctx, js_code);
        JS_FreeValue(ctx, transpiled);
    } else {
        result = JS_Eval(ctx, buf, len, filename, JS_EVAL_TYPE_GLOBAL);
    }
    free(buf);
    return result;
}

int main(int argc, char **argv) {
    JSRuntime *rt = JS_NewRuntime();
    JSContext *ctx = JS_NewContext(rt);

    adicionar_console(ctx);

    // Adiciona verdemod
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue verdemod_fn = JS_NewCFunction(ctx, js_verdemod, "verdemod", 1);
    JS_SetPropertyStr(ctx, global, "verdemod", verdemod_fn);
    JS_FreeValue(ctx, global);

    // Carrega o sucrase.bundle.js
    carregar_arquivo(ctx, "sucrase.bundle.js");

    if (argc > 1) {
        JSValue val = carregar_arquivo(ctx, argv[1]);
        if (JS_IsException(val)) {
            JSValue exc = JS_GetException(ctx);
            const char *err = JS_ToCString(ctx, exc);
            fprintf(stderr, "Erro: %s\n", err);
            JS_FreeCString(ctx, err);
            JS_FreeValue(ctx, exc);
        }
        JS_FreeValue(ctx, val);
    } else {
        // REPL
        char buffer[1024];
        while (1) {
            printf("> ");
            if (!fgets(buffer, sizeof(buffer), stdin)) break;
            JSValue val = JS_Eval(ctx, buffer, strlen(buffer), "<stdin>", 0);
            if (JS_IsException(val)) {
                JSValue exc = JS_GetException(ctx);
                const char *err = JS_ToCString(ctx, exc);
                fprintf(stderr, "Erro: %s\n", err);
                JS_FreeCString(ctx, err);
                JS_FreeValue(ctx, exc);
            }
            JS_FreeValue(ctx, val);
        }
    }

    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    return 0;
}
