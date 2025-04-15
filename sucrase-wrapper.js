import * as sucrase from "sucrase";

globalThis.sucraseTransform = function (code) {
  return sucrase.transform(code, {
    transforms: ["jsx"],
    jsxRuntime: "classic",
    production: true,
  }).code;
};
