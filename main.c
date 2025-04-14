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

// === Loader de módulos ES6 ===
static JSModuleDef *js_module_loader(JSContext *ctx,
                                     const char *module_name, void *opaque) {
    FILE *f = fopen(module_name, "rb");
    if (!f) {
        fprintf(stderr, "Erro ao carregar módulo: %s\n", module_name);
        return NULL;
    }

    fseek(f, 0, SEEK_END);
    long len = ftell(f);
    rewind(f);

    char *buf = malloc(len + 1);
    fread(buf, 1, len, f);
    buf[len] = '\0';
    fclose(f);

    JSValue val = JS_Eval(ctx, buf, len, module_name,
                          JS_EVAL_TYPE_MODULE | JS_EVAL_FLAG_COMPILE_ONLY);
    free(buf);

    if (JS_IsException(val)) {
        JSValue exc = JS_GetException(ctx);
        const char *err = JS_ToCString(ctx, exc);
        fprintf(stderr, "Erro ao compilar módulo: %s\n", err);
        JS_FreeCString(ctx, err);
        JS_FreeValue(ctx, exc);
        return NULL;
    }

    JSModuleDef *m = (JSModuleDef *)JS_VALUE_GET_PTR(val);
    //JS_SetModuleImportMeta(ctx, val, true, false);
    JS_EvalFunction(ctx, val);  // Executa o módulo

    return m;
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
    JS_SetModuleLoaderFunc(rt, NULL, js_module_loader, NULL);
    adicionar_console(ctx);

    JSValue mod = JS_Eval(ctx, codigo, strlen(codigo), argv[1],
                          JS_EVAL_TYPE_MODULE | JS_EVAL_FLAG_COMPILE_ONLY);

    if (JS_IsException(mod)) {
        JSValue exc = JS_GetException(ctx);
        const char *err = JS_ToCString(ctx, exc);
        fprintf(stderr, "Erro ao compilar o arquivo principal: %s\n", err);
        JS_FreeCString(ctx, err);
        JS_FreeValue(ctx, exc);
    } else {
        //JS_SetModuleImportMeta(ctx, mod, true, false);
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
