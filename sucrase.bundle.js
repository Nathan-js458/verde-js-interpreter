(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@jridgewell/set-array/dist/set-array.umd.js
  var require_set_array_umd = __commonJS({
    "node_modules/@jridgewell/set-array/dist/set-array.umd.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.setArray = {}));
      })(exports, function(exports2) {
        "use strict";
        class SetArray {
          constructor() {
            this._indexes = { __proto__: null };
            this.array = [];
          }
        }
        function cast(set) {
          return set;
        }
        function get(setarr, key) {
          return cast(setarr)._indexes[key];
        }
        function put(setarr, key) {
          const index = get(setarr, key);
          if (index !== void 0)
            return index;
          const { array: array2, _indexes: indexes } = cast(setarr);
          const length = array2.push(key);
          return indexes[key] = length - 1;
        }
        function pop(setarr) {
          const { array: array2, _indexes: indexes } = cast(setarr);
          if (array2.length === 0)
            return;
          const last = array2.pop();
          indexes[last] = void 0;
        }
        function remove(setarr, key) {
          const index = get(setarr, key);
          if (index === void 0)
            return;
          const { array: array2, _indexes: indexes } = cast(setarr);
          for (let i = index + 1; i < array2.length; i++) {
            const k = array2[i];
            array2[i - 1] = k;
            indexes[k]--;
          }
          indexes[key] = void 0;
          array2.pop();
        }
        exports2.SetArray = SetArray;
        exports2.get = get;
        exports2.pop = pop;
        exports2.put = put;
        exports2.remove = remove;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js
  var require_sourcemap_codec_umd = __commonJS({
    "node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.sourcemapCodec = {}));
      })(exports, function(exports2) {
        "use strict";
        const comma = ",".charCodeAt(0);
        const semicolon2 = ";".charCodeAt(0);
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        const intToChar = new Uint8Array(64);
        const charToInt = new Uint8Array(128);
        for (let i = 0; i < chars.length; i++) {
          const c = chars.charCodeAt(i);
          intToChar[i] = c;
          charToInt[c] = i;
        }
        function decodeInteger(reader, relative) {
          let value = 0;
          let shift = 0;
          let integer = 0;
          do {
            const c = reader.next();
            integer = charToInt[c];
            value |= (integer & 31) << shift;
            shift += 5;
          } while (integer & 32);
          const shouldNegate = value & 1;
          value >>>= 1;
          if (shouldNegate) {
            value = -2147483648 | -value;
          }
          return relative + value;
        }
        function encodeInteger(builder, num, relative) {
          let delta = num - relative;
          delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
          do {
            let clamped = delta & 31;
            delta >>>= 5;
            if (delta > 0)
              clamped |= 32;
            builder.write(intToChar[clamped]);
          } while (delta > 0);
          return num;
        }
        function hasMoreVlq(reader, max) {
          if (reader.pos >= max)
            return false;
          return reader.peek() !== comma;
        }
        const bufLength = 1024 * 16;
        const td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
          decode(buf) {
            const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
            return out.toString();
          }
        } : {
          decode(buf) {
            let out = "";
            for (let i = 0; i < buf.length; i++) {
              out += String.fromCharCode(buf[i]);
            }
            return out;
          }
        };
        class StringWriter {
          constructor() {
            this.pos = 0;
            this.out = "";
            this.buffer = new Uint8Array(bufLength);
          }
          write(v) {
            const { buffer } = this;
            buffer[this.pos++] = v;
            if (this.pos === bufLength) {
              this.out += td.decode(buffer);
              this.pos = 0;
            }
          }
          flush() {
            const { buffer, out, pos } = this;
            return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
          }
        }
        class StringReader {
          constructor(buffer) {
            this.pos = 0;
            this.buffer = buffer;
          }
          next() {
            return this.buffer.charCodeAt(this.pos++);
          }
          peek() {
            return this.buffer.charCodeAt(this.pos);
          }
          indexOf(char) {
            const { buffer, pos } = this;
            const idx = buffer.indexOf(char, pos);
            return idx === -1 ? buffer.length : idx;
          }
        }
        const EMPTY = [];
        function decodeOriginalScopes(input2) {
          const { length } = input2;
          const reader = new StringReader(input2);
          const scopes = [];
          const stack = [];
          let line = 0;
          for (; reader.pos < length; reader.pos++) {
            line = decodeInteger(reader, line);
            const column = decodeInteger(reader, 0);
            if (!hasMoreVlq(reader, length)) {
              const last = stack.pop();
              last[2] = line;
              last[3] = column;
              continue;
            }
            const kind = decodeInteger(reader, 0);
            const fields = decodeInteger(reader, 0);
            const hasName = fields & 1;
            const scope = hasName ? [line, column, 0, 0, kind, decodeInteger(reader, 0)] : [line, column, 0, 0, kind];
            let vars = EMPTY;
            if (hasMoreVlq(reader, length)) {
              vars = [];
              do {
                const varsIndex = decodeInteger(reader, 0);
                vars.push(varsIndex);
              } while (hasMoreVlq(reader, length));
            }
            scope.vars = vars;
            scopes.push(scope);
            stack.push(scope);
          }
          return scopes;
        }
        function encodeOriginalScopes(scopes) {
          const writer = new StringWriter();
          for (let i = 0; i < scopes.length; ) {
            i = _encodeOriginalScopes(scopes, i, writer, [0]);
          }
          return writer.flush();
        }
        function _encodeOriginalScopes(scopes, index, writer, state2) {
          const scope = scopes[index];
          const { 0: startLine, 1: startColumn, 2: endLine, 3: endColumn, 4: kind, vars } = scope;
          if (index > 0)
            writer.write(comma);
          state2[0] = encodeInteger(writer, startLine, state2[0]);
          encodeInteger(writer, startColumn, 0);
          encodeInteger(writer, kind, 0);
          const fields = scope.length === 6 ? 1 : 0;
          encodeInteger(writer, fields, 0);
          if (scope.length === 6)
            encodeInteger(writer, scope[5], 0);
          for (const v of vars) {
            encodeInteger(writer, v, 0);
          }
          for (index++; index < scopes.length; ) {
            const next2 = scopes[index];
            const { 0: l, 1: c } = next2;
            if (l > endLine || l === endLine && c >= endColumn) {
              break;
            }
            index = _encodeOriginalScopes(scopes, index, writer, state2);
          }
          writer.write(comma);
          state2[0] = encodeInteger(writer, endLine, state2[0]);
          encodeInteger(writer, endColumn, 0);
          return index;
        }
        function decodeGeneratedRanges(input2) {
          const { length } = input2;
          const reader = new StringReader(input2);
          const ranges = [];
          const stack = [];
          let genLine = 0;
          let definitionSourcesIndex = 0;
          let definitionScopeIndex = 0;
          let callsiteSourcesIndex = 0;
          let callsiteLine = 0;
          let callsiteColumn = 0;
          let bindingLine = 0;
          let bindingColumn = 0;
          do {
            const semi = reader.indexOf(";");
            let genColumn = 0;
            for (; reader.pos < semi; reader.pos++) {
              genColumn = decodeInteger(reader, genColumn);
              if (!hasMoreVlq(reader, semi)) {
                const last = stack.pop();
                last[2] = genLine;
                last[3] = genColumn;
                continue;
              }
              const fields = decodeInteger(reader, 0);
              const hasDefinition = fields & 1;
              const hasCallsite = fields & 2;
              const hasScope = fields & 4;
              let callsite = null;
              let bindings = EMPTY;
              let range;
              if (hasDefinition) {
                const defSourcesIndex = decodeInteger(reader, definitionSourcesIndex);
                definitionScopeIndex = decodeInteger(reader, definitionSourcesIndex === defSourcesIndex ? definitionScopeIndex : 0);
                definitionSourcesIndex = defSourcesIndex;
                range = [genLine, genColumn, 0, 0, defSourcesIndex, definitionScopeIndex];
              } else {
                range = [genLine, genColumn, 0, 0];
              }
              range.isScope = !!hasScope;
              if (hasCallsite) {
                const prevCsi = callsiteSourcesIndex;
                const prevLine = callsiteLine;
                callsiteSourcesIndex = decodeInteger(reader, callsiteSourcesIndex);
                const sameSource = prevCsi === callsiteSourcesIndex;
                callsiteLine = decodeInteger(reader, sameSource ? callsiteLine : 0);
                callsiteColumn = decodeInteger(reader, sameSource && prevLine === callsiteLine ? callsiteColumn : 0);
                callsite = [callsiteSourcesIndex, callsiteLine, callsiteColumn];
              }
              range.callsite = callsite;
              if (hasMoreVlq(reader, semi)) {
                bindings = [];
                do {
                  bindingLine = genLine;
                  bindingColumn = genColumn;
                  const expressionsCount = decodeInteger(reader, 0);
                  let expressionRanges;
                  if (expressionsCount < -1) {
                    expressionRanges = [[decodeInteger(reader, 0)]];
                    for (let i = -1; i > expressionsCount; i--) {
                      const prevBl = bindingLine;
                      bindingLine = decodeInteger(reader, bindingLine);
                      bindingColumn = decodeInteger(reader, bindingLine === prevBl ? bindingColumn : 0);
                      const expression = decodeInteger(reader, 0);
                      expressionRanges.push([expression, bindingLine, bindingColumn]);
                    }
                  } else {
                    expressionRanges = [[expressionsCount]];
                  }
                  bindings.push(expressionRanges);
                } while (hasMoreVlq(reader, semi));
              }
              range.bindings = bindings;
              ranges.push(range);
              stack.push(range);
            }
            genLine++;
            reader.pos = semi + 1;
          } while (reader.pos < length);
          return ranges;
        }
        function encodeGeneratedRanges(ranges) {
          if (ranges.length === 0)
            return "";
          const writer = new StringWriter();
          for (let i = 0; i < ranges.length; ) {
            i = _encodeGeneratedRanges(ranges, i, writer, [0, 0, 0, 0, 0, 0, 0]);
          }
          return writer.flush();
        }
        function _encodeGeneratedRanges(ranges, index, writer, state2) {
          const range = ranges[index];
          const { 0: startLine, 1: startColumn, 2: endLine, 3: endColumn, isScope, callsite, bindings } = range;
          if (state2[0] < startLine) {
            catchupLine(writer, state2[0], startLine);
            state2[0] = startLine;
            state2[1] = 0;
          } else if (index > 0) {
            writer.write(comma);
          }
          state2[1] = encodeInteger(writer, range[1], state2[1]);
          const fields = (range.length === 6 ? 1 : 0) | (callsite ? 2 : 0) | (isScope ? 4 : 0);
          encodeInteger(writer, fields, 0);
          if (range.length === 6) {
            const { 4: sourcesIndex, 5: scopesIndex } = range;
            if (sourcesIndex !== state2[2]) {
              state2[3] = 0;
            }
            state2[2] = encodeInteger(writer, sourcesIndex, state2[2]);
            state2[3] = encodeInteger(writer, scopesIndex, state2[3]);
          }
          if (callsite) {
            const { 0: sourcesIndex, 1: callLine, 2: callColumn } = range.callsite;
            if (sourcesIndex !== state2[4]) {
              state2[5] = 0;
              state2[6] = 0;
            } else if (callLine !== state2[5]) {
              state2[6] = 0;
            }
            state2[4] = encodeInteger(writer, sourcesIndex, state2[4]);
            state2[5] = encodeInteger(writer, callLine, state2[5]);
            state2[6] = encodeInteger(writer, callColumn, state2[6]);
          }
          if (bindings) {
            for (const binding of bindings) {
              if (binding.length > 1)
                encodeInteger(writer, -binding.length, 0);
              const expression = binding[0][0];
              encodeInteger(writer, expression, 0);
              let bindingStartLine = startLine;
              let bindingStartColumn = startColumn;
              for (let i = 1; i < binding.length; i++) {
                const expRange = binding[i];
                bindingStartLine = encodeInteger(writer, expRange[1], bindingStartLine);
                bindingStartColumn = encodeInteger(writer, expRange[2], bindingStartColumn);
                encodeInteger(writer, expRange[0], 0);
              }
            }
          }
          for (index++; index < ranges.length; ) {
            const next2 = ranges[index];
            const { 0: l, 1: c } = next2;
            if (l > endLine || l === endLine && c >= endColumn) {
              break;
            }
            index = _encodeGeneratedRanges(ranges, index, writer, state2);
          }
          if (state2[0] < endLine) {
            catchupLine(writer, state2[0], endLine);
            state2[0] = endLine;
            state2[1] = 0;
          } else {
            writer.write(comma);
          }
          state2[1] = encodeInteger(writer, endColumn, state2[1]);
          return index;
        }
        function catchupLine(writer, lastLine, line) {
          do {
            writer.write(semicolon2);
          } while (++lastLine < line);
        }
        function decode(mappings) {
          const { length } = mappings;
          const reader = new StringReader(mappings);
          const decoded = [];
          let genColumn = 0;
          let sourcesIndex = 0;
          let sourceLine = 0;
          let sourceColumn = 0;
          let namesIndex = 0;
          do {
            const semi = reader.indexOf(";");
            const line = [];
            let sorted = true;
            let lastCol = 0;
            genColumn = 0;
            while (reader.pos < semi) {
              let seg;
              genColumn = decodeInteger(reader, genColumn);
              if (genColumn < lastCol)
                sorted = false;
              lastCol = genColumn;
              if (hasMoreVlq(reader, semi)) {
                sourcesIndex = decodeInteger(reader, sourcesIndex);
                sourceLine = decodeInteger(reader, sourceLine);
                sourceColumn = decodeInteger(reader, sourceColumn);
                if (hasMoreVlq(reader, semi)) {
                  namesIndex = decodeInteger(reader, namesIndex);
                  seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex];
                } else {
                  seg = [genColumn, sourcesIndex, sourceLine, sourceColumn];
                }
              } else {
                seg = [genColumn];
              }
              line.push(seg);
              reader.pos++;
            }
            if (!sorted)
              sort(line);
            decoded.push(line);
            reader.pos = semi + 1;
          } while (reader.pos <= length);
          return decoded;
        }
        function sort(line) {
          line.sort(sortComparator);
        }
        function sortComparator(a, b) {
          return a[0] - b[0];
        }
        function encode(decoded) {
          const writer = new StringWriter();
          let sourcesIndex = 0;
          let sourceLine = 0;
          let sourceColumn = 0;
          let namesIndex = 0;
          for (let i = 0; i < decoded.length; i++) {
            const line = decoded[i];
            if (i > 0)
              writer.write(semicolon2);
            if (line.length === 0)
              continue;
            let genColumn = 0;
            for (let j = 0; j < line.length; j++) {
              const segment = line[j];
              if (j > 0)
                writer.write(comma);
              genColumn = encodeInteger(writer, segment[0], genColumn);
              if (segment.length === 1)
                continue;
              sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
              sourceLine = encodeInteger(writer, segment[2], sourceLine);
              sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
              if (segment.length === 4)
                continue;
              namesIndex = encodeInteger(writer, segment[4], namesIndex);
            }
          }
          return writer.flush();
        }
        exports2.decode = decode;
        exports2.decodeGeneratedRanges = decodeGeneratedRanges;
        exports2.decodeOriginalScopes = decodeOriginalScopes;
        exports2.encode = encode;
        exports2.encodeGeneratedRanges = encodeGeneratedRanges;
        exports2.encodeOriginalScopes = encodeOriginalScopes;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js
  var require_resolve_uri_umd = __commonJS({
    "node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.resolveURI = factory());
      })(exports, function() {
        "use strict";
        const schemeRegex = /^[\w+.-]+:\/\//;
        const urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
        const fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
        function isAbsoluteUrl(input2) {
          return schemeRegex.test(input2);
        }
        function isSchemeRelativeUrl(input2) {
          return input2.startsWith("//");
        }
        function isAbsolutePath(input2) {
          return input2.startsWith("/");
        }
        function isFileUrl(input2) {
          return input2.startsWith("file:");
        }
        function isRelative(input2) {
          return /^[.?#]/.test(input2);
        }
        function parseAbsoluteUrl(input2) {
          const match2 = urlRegex.exec(input2);
          return makeUrl(match2[1], match2[2] || "", match2[3], match2[4] || "", match2[5] || "/", match2[6] || "", match2[7] || "");
        }
        function parseFileUrl(input2) {
          const match2 = fileRegex.exec(input2);
          const path = match2[2];
          return makeUrl("file:", "", match2[1] || "", "", isAbsolutePath(path) ? path : "/" + path, match2[3] || "", match2[4] || "");
        }
        function makeUrl(scheme, user, host, port, path, query, hash) {
          return {
            scheme,
            user,
            host,
            port,
            path,
            query,
            hash,
            type: 7
          };
        }
        function parseUrl(input2) {
          if (isSchemeRelativeUrl(input2)) {
            const url2 = parseAbsoluteUrl("http:" + input2);
            url2.scheme = "";
            url2.type = 6;
            return url2;
          }
          if (isAbsolutePath(input2)) {
            const url2 = parseAbsoluteUrl("http://foo.com" + input2);
            url2.scheme = "";
            url2.host = "";
            url2.type = 5;
            return url2;
          }
          if (isFileUrl(input2))
            return parseFileUrl(input2);
          if (isAbsoluteUrl(input2))
            return parseAbsoluteUrl(input2);
          const url = parseAbsoluteUrl("http://foo.com/" + input2);
          url.scheme = "";
          url.host = "";
          url.type = input2 ? input2.startsWith("?") ? 3 : input2.startsWith("#") ? 2 : 4 : 1;
          return url;
        }
        function stripPathFilename(path) {
          if (path.endsWith("/.."))
            return path;
          const index = path.lastIndexOf("/");
          return path.slice(0, index + 1);
        }
        function mergePaths(url, base) {
          normalizePath(base, base.type);
          if (url.path === "/") {
            url.path = base.path;
          } else {
            url.path = stripPathFilename(base.path) + url.path;
          }
        }
        function normalizePath(url, type) {
          const rel = type <= 4;
          const pieces = url.path.split("/");
          let pointer = 1;
          let positive = 0;
          let addTrailingSlash = false;
          for (let i = 1; i < pieces.length; i++) {
            const piece = pieces[i];
            if (!piece) {
              addTrailingSlash = true;
              continue;
            }
            addTrailingSlash = false;
            if (piece === ".")
              continue;
            if (piece === "..") {
              if (positive) {
                addTrailingSlash = true;
                positive--;
                pointer--;
              } else if (rel) {
                pieces[pointer++] = piece;
              }
              continue;
            }
            pieces[pointer++] = piece;
            positive++;
          }
          let path = "";
          for (let i = 1; i < pointer; i++) {
            path += "/" + pieces[i];
          }
          if (!path || addTrailingSlash && !path.endsWith("/..")) {
            path += "/";
          }
          url.path = path;
        }
        function resolve(input2, base) {
          if (!input2 && !base)
            return "";
          const url = parseUrl(input2);
          let inputType = url.type;
          if (base && inputType !== 7) {
            const baseUrl = parseUrl(base);
            const baseType = baseUrl.type;
            switch (inputType) {
              case 1:
                url.hash = baseUrl.hash;
              // fall through
              case 2:
                url.query = baseUrl.query;
              // fall through
              case 3:
              case 4:
                mergePaths(url, baseUrl);
              // fall through
              case 5:
                url.user = baseUrl.user;
                url.host = baseUrl.host;
                url.port = baseUrl.port;
              // fall through
              case 6:
                url.scheme = baseUrl.scheme;
            }
            if (baseType > inputType)
              inputType = baseType;
          }
          normalizePath(url, inputType);
          const queryHash = url.query + url.hash;
          switch (inputType) {
            // This is impossible, because of the empty checks at the start of the function.
            // case UrlType.Empty:
            case 2:
            case 3:
              return queryHash;
            case 4: {
              const path = url.path.slice(1);
              if (!path)
                return queryHash || ".";
              if (isRelative(base || input2) && !isRelative(path)) {
                return "./" + path + queryHash;
              }
              return path + queryHash;
            }
            case 5:
              return url.path + queryHash;
            default:
              return url.scheme + "//" + url.user + url.host + url.port + url.path + queryHash;
          }
        }
        return resolve;
      });
    }
  });

  // node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js
  var require_trace_mapping_umd = __commonJS({
    "node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_sourcemap_codec_umd(), require_resolve_uri_umd()) : typeof define === "function" && define.amd ? define(["exports", "@jridgewell/sourcemap-codec", "@jridgewell/resolve-uri"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.traceMapping = {}, global.sourcemapCodec, global.resolveURI));
      })(exports, function(exports2, sourcemapCodec, resolveUri) {
        "use strict";
        function resolve(input2, base) {
          if (base && !base.endsWith("/"))
            base += "/";
          return resolveUri(input2, base);
        }
        function stripFilename(path) {
          if (!path)
            return "";
          const index = path.lastIndexOf("/");
          return path.slice(0, index + 1);
        }
        const COLUMN = 0;
        const SOURCES_INDEX = 1;
        const SOURCE_LINE = 2;
        const SOURCE_COLUMN = 3;
        const NAMES_INDEX = 4;
        const REV_GENERATED_LINE = 1;
        const REV_GENERATED_COLUMN = 2;
        function maybeSort(mappings, owned) {
          const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
          if (unsortedIndex === mappings.length)
            return mappings;
          if (!owned)
            mappings = mappings.slice();
          for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
            mappings[i] = sortSegments(mappings[i], owned);
          }
          return mappings;
        }
        function nextUnsortedSegmentLine(mappings, start) {
          for (let i = start; i < mappings.length; i++) {
            if (!isSorted(mappings[i]))
              return i;
          }
          return mappings.length;
        }
        function isSorted(line) {
          for (let j = 1; j < line.length; j++) {
            if (line[j][COLUMN] < line[j - 1][COLUMN]) {
              return false;
            }
          }
          return true;
        }
        function sortSegments(line, owned) {
          if (!owned)
            line = line.slice();
          return line.sort(sortComparator);
        }
        function sortComparator(a, b) {
          return a[COLUMN] - b[COLUMN];
        }
        let found = false;
        function binarySearch(haystack, needle, low, high) {
          while (low <= high) {
            const mid = low + (high - low >> 1);
            const cmp = haystack[mid][COLUMN] - needle;
            if (cmp === 0) {
              found = true;
              return mid;
            }
            if (cmp < 0) {
              low = mid + 1;
            } else {
              high = mid - 1;
            }
          }
          found = false;
          return low - 1;
        }
        function upperBound(haystack, needle, index) {
          for (let i = index + 1; i < haystack.length; index = i++) {
            if (haystack[i][COLUMN] !== needle)
              break;
          }
          return index;
        }
        function lowerBound(haystack, needle, index) {
          for (let i = index - 1; i >= 0; index = i--) {
            if (haystack[i][COLUMN] !== needle)
              break;
          }
          return index;
        }
        function memoizedState() {
          return {
            lastKey: -1,
            lastNeedle: -1,
            lastIndex: -1
          };
        }
        function memoizedBinarySearch(haystack, needle, state2, key) {
          const { lastKey, lastNeedle, lastIndex } = state2;
          let low = 0;
          let high = haystack.length - 1;
          if (key === lastKey) {
            if (needle === lastNeedle) {
              found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
              return lastIndex;
            }
            if (needle >= lastNeedle) {
              low = lastIndex === -1 ? 0 : lastIndex;
            } else {
              high = lastIndex;
            }
          }
          state2.lastKey = key;
          state2.lastNeedle = needle;
          return state2.lastIndex = binarySearch(haystack, needle, low, high);
        }
        function buildBySources(decoded, memos) {
          const sources = memos.map(buildNullArray);
          for (let i = 0; i < decoded.length; i++) {
            const line = decoded[i];
            for (let j = 0; j < line.length; j++) {
              const seg = line[j];
              if (seg.length === 1)
                continue;
              const sourceIndex2 = seg[SOURCES_INDEX];
              const sourceLine = seg[SOURCE_LINE];
              const sourceColumn = seg[SOURCE_COLUMN];
              const originalSource = sources[sourceIndex2];
              const originalLine = originalSource[sourceLine] || (originalSource[sourceLine] = []);
              const memo = memos[sourceIndex2];
              let index = upperBound(originalLine, sourceColumn, memoizedBinarySearch(originalLine, sourceColumn, memo, sourceLine));
              memo.lastIndex = ++index;
              insert(originalLine, index, [sourceColumn, i, seg[COLUMN]]);
            }
          }
          return sources;
        }
        function insert(array2, index, value) {
          for (let i = array2.length; i > index; i--) {
            array2[i] = array2[i - 1];
          }
          array2[index] = value;
        }
        function buildNullArray() {
          return { __proto__: null };
        }
        const AnyMap = function(map, mapUrl) {
          const parsed = parse2(map);
          if (!("sections" in parsed)) {
            return new TraceMap(parsed, mapUrl);
          }
          const mappings = [];
          const sources = [];
          const sourcesContent = [];
          const names = [];
          const ignoreList = [];
          recurse(parsed, mapUrl, mappings, sources, sourcesContent, names, ignoreList, 0, 0, Infinity, Infinity);
          const joined = {
            version: 3,
            file: parsed.file,
            names,
            sources,
            sourcesContent,
            mappings,
            ignoreList
          };
          return presortedDecodedMap(joined);
        };
        function parse2(map) {
          return typeof map === "string" ? JSON.parse(map) : map;
        }
        function recurse(input2, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset, columnOffset, stopLine, stopColumn) {
          const { sections } = input2;
          for (let i = 0; i < sections.length; i++) {
            const { map, offset } = sections[i];
            let sl = stopLine;
            let sc = stopColumn;
            if (i + 1 < sections.length) {
              const nextOffset = sections[i + 1].offset;
              sl = Math.min(stopLine, lineOffset + nextOffset.line);
              if (sl === stopLine) {
                sc = Math.min(stopColumn, columnOffset + nextOffset.column);
              } else if (sl < stopLine) {
                sc = columnOffset + nextOffset.column;
              }
            }
            addSection(map, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset + offset.line, columnOffset + offset.column, sl, sc);
          }
        }
        function addSection(input2, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset, columnOffset, stopLine, stopColumn) {
          const parsed = parse2(input2);
          if ("sections" in parsed)
            return recurse(...arguments);
          const map = new TraceMap(parsed, mapUrl);
          const sourcesOffset = sources.length;
          const namesOffset = names.length;
          const decoded = decodedMappings(map);
          const { resolvedSources, sourcesContent: contents, ignoreList: ignores } = map;
          append(sources, resolvedSources);
          append(names, map.names);
          if (contents)
            append(sourcesContent, contents);
          else
            for (let i = 0; i < resolvedSources.length; i++)
              sourcesContent.push(null);
          if (ignores)
            for (let i = 0; i < ignores.length; i++)
              ignoreList.push(ignores[i] + sourcesOffset);
          for (let i = 0; i < decoded.length; i++) {
            const lineI = lineOffset + i;
            if (lineI > stopLine)
              return;
            const out = getLine(mappings, lineI);
            const cOffset = i === 0 ? columnOffset : 0;
            const line = decoded[i];
            for (let j = 0; j < line.length; j++) {
              const seg = line[j];
              const column = cOffset + seg[COLUMN];
              if (lineI === stopLine && column >= stopColumn)
                return;
              if (seg.length === 1) {
                out.push([column]);
                continue;
              }
              const sourcesIndex = sourcesOffset + seg[SOURCES_INDEX];
              const sourceLine = seg[SOURCE_LINE];
              const sourceColumn = seg[SOURCE_COLUMN];
              out.push(seg.length === 4 ? [column, sourcesIndex, sourceLine, sourceColumn] : [column, sourcesIndex, sourceLine, sourceColumn, namesOffset + seg[NAMES_INDEX]]);
            }
          }
        }
        function append(arr, other) {
          for (let i = 0; i < other.length; i++)
            arr.push(other[i]);
        }
        function getLine(arr, index) {
          for (let i = arr.length; i <= index; i++)
            arr[i] = [];
          return arr[index];
        }
        const LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
        const COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
        const LEAST_UPPER_BOUND = -1;
        const GREATEST_LOWER_BOUND = 1;
        class TraceMap {
          constructor(map, mapUrl) {
            const isString = typeof map === "string";
            if (!isString && map._decodedMemo)
              return map;
            const parsed = isString ? JSON.parse(map) : map;
            const { version, file, names, sourceRoot, sources, sourcesContent } = parsed;
            this.version = version;
            this.file = file;
            this.names = names || [];
            this.sourceRoot = sourceRoot;
            this.sources = sources;
            this.sourcesContent = sourcesContent;
            this.ignoreList = parsed.ignoreList || parsed.x_google_ignoreList || void 0;
            const from = resolve(sourceRoot || "", stripFilename(mapUrl));
            this.resolvedSources = sources.map((s) => resolve(s || "", from));
            const { mappings } = parsed;
            if (typeof mappings === "string") {
              this._encoded = mappings;
              this._decoded = void 0;
            } else {
              this._encoded = void 0;
              this._decoded = maybeSort(mappings, isString);
            }
            this._decodedMemo = memoizedState();
            this._bySources = void 0;
            this._bySourceMemos = void 0;
          }
        }
        function cast(map) {
          return map;
        }
        function encodedMappings(map) {
          var _a;
          var _b;
          return (_a = (_b = cast(map))._encoded) !== null && _a !== void 0 ? _a : _b._encoded = sourcemapCodec.encode(cast(map)._decoded);
        }
        function decodedMappings(map) {
          var _a;
          return (_a = cast(map))._decoded || (_a._decoded = sourcemapCodec.decode(cast(map)._encoded));
        }
        function traceSegment(map, line, column) {
          const decoded = decodedMappings(map);
          if (line >= decoded.length)
            return null;
          const segments = decoded[line];
          const index = traceSegmentInternal(segments, cast(map)._decodedMemo, line, column, GREATEST_LOWER_BOUND);
          return index === -1 ? null : segments[index];
        }
        function originalPositionFor(map, needle) {
          let { line, column, bias } = needle;
          line--;
          if (line < 0)
            throw new Error(LINE_GTR_ZERO);
          if (column < 0)
            throw new Error(COL_GTR_EQ_ZERO);
          const decoded = decodedMappings(map);
          if (line >= decoded.length)
            return OMapping(null, null, null, null);
          const segments = decoded[line];
          const index = traceSegmentInternal(segments, cast(map)._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
          if (index === -1)
            return OMapping(null, null, null, null);
          const segment = segments[index];
          if (segment.length === 1)
            return OMapping(null, null, null, null);
          const { names, resolvedSources } = map;
          return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], segment.length === 5 ? names[segment[NAMES_INDEX]] : null);
        }
        function generatedPositionFor(map, needle) {
          const { source, line, column, bias } = needle;
          return generatedPosition(map, source, line, column, bias || GREATEST_LOWER_BOUND, false);
        }
        function allGeneratedPositionsFor(map, needle) {
          const { source, line, column, bias } = needle;
          return generatedPosition(map, source, line, column, bias || LEAST_UPPER_BOUND, true);
        }
        function eachMapping(map, cb) {
          const decoded = decodedMappings(map);
          const { names, resolvedSources } = map;
          for (let i = 0; i < decoded.length; i++) {
            const line = decoded[i];
            for (let j = 0; j < line.length; j++) {
              const seg = line[j];
              const generatedLine = i + 1;
              const generatedColumn = seg[0];
              let source = null;
              let originalLine = null;
              let originalColumn = null;
              let name = null;
              if (seg.length !== 1) {
                source = resolvedSources[seg[1]];
                originalLine = seg[2] + 1;
                originalColumn = seg[3];
              }
              if (seg.length === 5)
                name = names[seg[4]];
              cb({
                generatedLine,
                generatedColumn,
                source,
                originalLine,
                originalColumn,
                name
              });
            }
          }
        }
        function sourceIndex(map, source) {
          const { sources, resolvedSources } = map;
          let index = sources.indexOf(source);
          if (index === -1)
            index = resolvedSources.indexOf(source);
          return index;
        }
        function sourceContentFor(map, source) {
          const { sourcesContent } = map;
          if (sourcesContent == null)
            return null;
          const index = sourceIndex(map, source);
          return index === -1 ? null : sourcesContent[index];
        }
        function isIgnored(map, source) {
          const { ignoreList } = map;
          if (ignoreList == null)
            return false;
          const index = sourceIndex(map, source);
          return index === -1 ? false : ignoreList.includes(index);
        }
        function presortedDecodedMap(map, mapUrl) {
          const tracer = new TraceMap(clone(map, []), mapUrl);
          cast(tracer)._decoded = map.mappings;
          return tracer;
        }
        function decodedMap(map) {
          return clone(map, decodedMappings(map));
        }
        function encodedMap(map) {
          return clone(map, encodedMappings(map));
        }
        function clone(map, mappings) {
          return {
            version: map.version,
            file: map.file,
            names: map.names,
            sourceRoot: map.sourceRoot,
            sources: map.sources,
            sourcesContent: map.sourcesContent,
            mappings,
            ignoreList: map.ignoreList || map.x_google_ignoreList
          };
        }
        function OMapping(source, line, column, name) {
          return { source, line, column, name };
        }
        function GMapping(line, column) {
          return { line, column };
        }
        function traceSegmentInternal(segments, memo, line, column, bias) {
          let index = memoizedBinarySearch(segments, column, memo, line);
          if (found) {
            index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
          } else if (bias === LEAST_UPPER_BOUND)
            index++;
          if (index === -1 || index === segments.length)
            return -1;
          return index;
        }
        function sliceGeneratedPositions(segments, memo, line, column, bias) {
          let min = traceSegmentInternal(segments, memo, line, column, GREATEST_LOWER_BOUND);
          if (!found && bias === LEAST_UPPER_BOUND)
            min++;
          if (min === -1 || min === segments.length)
            return [];
          const matchedColumn = found ? column : segments[min][COLUMN];
          if (!found)
            min = lowerBound(segments, matchedColumn, min);
          const max = upperBound(segments, matchedColumn, min);
          const result = [];
          for (; min <= max; min++) {
            const segment = segments[min];
            result.push(GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]));
          }
          return result;
        }
        function generatedPosition(map, source, line, column, bias, all) {
          var _a;
          line--;
          if (line < 0)
            throw new Error(LINE_GTR_ZERO);
          if (column < 0)
            throw new Error(COL_GTR_EQ_ZERO);
          const { sources, resolvedSources } = map;
          let sourceIndex2 = sources.indexOf(source);
          if (sourceIndex2 === -1)
            sourceIndex2 = resolvedSources.indexOf(source);
          if (sourceIndex2 === -1)
            return all ? [] : GMapping(null, null);
          const generated = (_a = cast(map))._bySources || (_a._bySources = buildBySources(decodedMappings(map), cast(map)._bySourceMemos = sources.map(memoizedState)));
          const segments = generated[sourceIndex2][line];
          if (segments == null)
            return all ? [] : GMapping(null, null);
          const memo = cast(map)._bySourceMemos[sourceIndex2];
          if (all)
            return sliceGeneratedPositions(segments, memo, line, column, bias);
          const index = traceSegmentInternal(segments, memo, line, column, bias);
          if (index === -1)
            return GMapping(null, null);
          const segment = segments[index];
          return GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]);
        }
        exports2.AnyMap = AnyMap;
        exports2.GREATEST_LOWER_BOUND = GREATEST_LOWER_BOUND;
        exports2.LEAST_UPPER_BOUND = LEAST_UPPER_BOUND;
        exports2.TraceMap = TraceMap;
        exports2.allGeneratedPositionsFor = allGeneratedPositionsFor;
        exports2.decodedMap = decodedMap;
        exports2.decodedMappings = decodedMappings;
        exports2.eachMapping = eachMapping;
        exports2.encodedMap = encodedMap;
        exports2.encodedMappings = encodedMappings;
        exports2.generatedPositionFor = generatedPositionFor;
        exports2.isIgnored = isIgnored;
        exports2.originalPositionFor = originalPositionFor;
        exports2.presortedDecodedMap = presortedDecodedMap;
        exports2.sourceContentFor = sourceContentFor;
        exports2.traceSegment = traceSegment;
      });
    }
  });

  // node_modules/@jridgewell/gen-mapping/dist/gen-mapping.umd.js
  var require_gen_mapping_umd = __commonJS({
    "node_modules/@jridgewell/gen-mapping/dist/gen-mapping.umd.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_set_array_umd(), require_sourcemap_codec_umd(), require_trace_mapping_umd()) : typeof define === "function" && define.amd ? define(["exports", "@jridgewell/set-array", "@jridgewell/sourcemap-codec", "@jridgewell/trace-mapping"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.genMapping = {}, global.setArray, global.sourcemapCodec, global.traceMapping));
      })(exports, function(exports2, setArray, sourcemapCodec, traceMapping) {
        "use strict";
        const COLUMN = 0;
        const SOURCES_INDEX = 1;
        const SOURCE_LINE = 2;
        const SOURCE_COLUMN = 3;
        const NAMES_INDEX = 4;
        const NO_NAME = -1;
        class GenMapping2 {
          constructor({ file, sourceRoot } = {}) {
            this._names = new setArray.SetArray();
            this._sources = new setArray.SetArray();
            this._sourcesContent = [];
            this._mappings = [];
            this.file = file;
            this.sourceRoot = sourceRoot;
            this._ignoreList = new setArray.SetArray();
          }
        }
        function cast(map) {
          return map;
        }
        function addSegment(map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) {
          return addSegmentInternal(false, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content);
        }
        function addMapping(map, mapping) {
          return addMappingInternal(false, map, mapping);
        }
        const maybeAddSegment2 = (map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
          return addSegmentInternal(true, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content);
        };
        const maybeAddMapping = (map, mapping) => {
          return addMappingInternal(true, map, mapping);
        };
        function setSourceContent(map, source, content) {
          const { _sources: sources, _sourcesContent: sourcesContent } = cast(map);
          const index = setArray.put(sources, source);
          sourcesContent[index] = content;
        }
        function setIgnore(map, source, ignore = true) {
          const { _sources: sources, _sourcesContent: sourcesContent, _ignoreList: ignoreList } = cast(map);
          const index = setArray.put(sources, source);
          if (index === sourcesContent.length)
            sourcesContent[index] = null;
          if (ignore)
            setArray.put(ignoreList, index);
          else
            setArray.remove(ignoreList, index);
        }
        function toDecodedMap(map) {
          const { _mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names, _ignoreList: ignoreList } = cast(map);
          removeEmptyFinalLines(mappings);
          return {
            version: 3,
            file: map.file || void 0,
            names: names.array,
            sourceRoot: map.sourceRoot || void 0,
            sources: sources.array,
            sourcesContent,
            mappings,
            ignoreList: ignoreList.array
          };
        }
        function toEncodedMap2(map) {
          const decoded = toDecodedMap(map);
          return Object.assign(Object.assign({}, decoded), { mappings: sourcemapCodec.encode(decoded.mappings) });
        }
        function fromMap(input2) {
          const map = new traceMapping.TraceMap(input2);
          const gen = new GenMapping2({ file: map.file, sourceRoot: map.sourceRoot });
          putAll(cast(gen)._names, map.names);
          putAll(cast(gen)._sources, map.sources);
          cast(gen)._sourcesContent = map.sourcesContent || map.sources.map(() => null);
          cast(gen)._mappings = traceMapping.decodedMappings(map);
          if (map.ignoreList)
            putAll(cast(gen)._ignoreList, map.ignoreList);
          return gen;
        }
        function allMappings(map) {
          const out = [];
          const { _mappings: mappings, _sources: sources, _names: names } = cast(map);
          for (let i = 0; i < mappings.length; i++) {
            const line = mappings[i];
            for (let j = 0; j < line.length; j++) {
              const seg = line[j];
              const generated = { line: i + 1, column: seg[COLUMN] };
              let source = void 0;
              let original = void 0;
              let name = void 0;
              if (seg.length !== 1) {
                source = sources.array[seg[SOURCES_INDEX]];
                original = { line: seg[SOURCE_LINE] + 1, column: seg[SOURCE_COLUMN] };
                if (seg.length === 5)
                  name = names.array[seg[NAMES_INDEX]];
              }
              out.push({ generated, source, original, name });
            }
          }
          return out;
        }
        function addSegmentInternal(skipable, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) {
          const { _mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names } = cast(map);
          const line = getLine(mappings, genLine);
          const index = getColumnIndex(line, genColumn);
          if (!source) {
            if (skipable && skipSourceless(line, index))
              return;
            return insert(line, index, [genColumn]);
          }
          const sourcesIndex = setArray.put(sources, source);
          const namesIndex = name ? setArray.put(names, name) : NO_NAME;
          if (sourcesIndex === sourcesContent.length)
            sourcesContent[sourcesIndex] = content !== null && content !== void 0 ? content : null;
          if (skipable && skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex)) {
            return;
          }
          return insert(line, index, name ? [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex] : [genColumn, sourcesIndex, sourceLine, sourceColumn]);
        }
        function getLine(mappings, index) {
          for (let i = mappings.length; i <= index; i++) {
            mappings[i] = [];
          }
          return mappings[index];
        }
        function getColumnIndex(line, genColumn) {
          let index = line.length;
          for (let i = index - 1; i >= 0; index = i--) {
            const current = line[i];
            if (genColumn >= current[COLUMN])
              break;
          }
          return index;
        }
        function insert(array2, index, value) {
          for (let i = array2.length; i > index; i--) {
            array2[i] = array2[i - 1];
          }
          array2[index] = value;
        }
        function removeEmptyFinalLines(mappings) {
          const { length } = mappings;
          let len = length;
          for (let i = len - 1; i >= 0; len = i, i--) {
            if (mappings[i].length > 0)
              break;
          }
          if (len < length)
            mappings.length = len;
        }
        function putAll(setarr, array2) {
          for (let i = 0; i < array2.length; i++)
            setArray.put(setarr, array2[i]);
        }
        function skipSourceless(line, index) {
          if (index === 0)
            return true;
          const prev = line[index - 1];
          return prev.length === 1;
        }
        function skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex) {
          if (index === 0)
            return false;
          const prev = line[index - 1];
          if (prev.length === 1)
            return false;
          return sourcesIndex === prev[SOURCES_INDEX] && sourceLine === prev[SOURCE_LINE] && sourceColumn === prev[SOURCE_COLUMN] && namesIndex === (prev.length === 5 ? prev[NAMES_INDEX] : NO_NAME);
        }
        function addMappingInternal(skipable, map, mapping) {
          const { generated, source, original, name, content } = mapping;
          if (!source) {
            return addSegmentInternal(skipable, map, generated.line - 1, generated.column, null, null, null, null, null);
          }
          return addSegmentInternal(skipable, map, generated.line - 1, generated.column, source, original.line - 1, original.column, name, content);
        }
        exports2.GenMapping = GenMapping2;
        exports2.addMapping = addMapping;
        exports2.addSegment = addSegment;
        exports2.allMappings = allMappings;
        exports2.fromMap = fromMap;
        exports2.maybeAddMapping = maybeAddMapping;
        exports2.maybeAddSegment = maybeAddSegment2;
        exports2.setIgnore = setIgnore;
        exports2.setSourceContent = setSourceContent;
        exports2.toDecodedMap = toDecodedMap;
        exports2.toEncodedMap = toEncodedMap2;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // node_modules/ts-interface-checker/dist/util.js
  var require_util = __commonJS({
    "node_modules/ts-interface-checker/dist/util.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DetailContext = exports.NoopContext = exports.VError = void 0;
      var VError = (
        /** @class */
        function(_super) {
          __extends(VError2, _super);
          function VError2(path, message) {
            var _this = _super.call(this, message) || this;
            _this.path = path;
            Object.setPrototypeOf(_this, VError2.prototype);
            return _this;
          }
          return VError2;
        }(Error)
      );
      exports.VError = VError;
      var NoopContext = (
        /** @class */
        function() {
          function NoopContext2() {
          }
          NoopContext2.prototype.fail = function(relPath, message, score) {
            return false;
          };
          NoopContext2.prototype.unionResolver = function() {
            return this;
          };
          NoopContext2.prototype.createContext = function() {
            return this;
          };
          NoopContext2.prototype.resolveUnion = function(ur) {
          };
          return NoopContext2;
        }()
      );
      exports.NoopContext = NoopContext;
      var DetailContext = (
        /** @class */
        function() {
          function DetailContext2() {
            this._propNames = [""];
            this._messages = [null];
            this._score = 0;
          }
          DetailContext2.prototype.fail = function(relPath, message, score) {
            this._propNames.push(relPath);
            this._messages.push(message);
            this._score += score;
            return false;
          };
          DetailContext2.prototype.unionResolver = function() {
            return new DetailUnionResolver();
          };
          DetailContext2.prototype.resolveUnion = function(unionResolver) {
            var _a, _b;
            var u = unionResolver;
            var best = null;
            for (var _i = 0, _c = u.contexts; _i < _c.length; _i++) {
              var ctx = _c[_i];
              if (!best || ctx._score >= best._score) {
                best = ctx;
              }
            }
            if (best && best._score > 0) {
              (_a = this._propNames).push.apply(_a, best._propNames);
              (_b = this._messages).push.apply(_b, best._messages);
            }
          };
          DetailContext2.prototype.getError = function(path) {
            var msgParts = [];
            for (var i = this._propNames.length - 1; i >= 0; i--) {
              var p = this._propNames[i];
              path += typeof p === "number" ? "[" + p + "]" : p ? "." + p : "";
              var m = this._messages[i];
              if (m) {
                msgParts.push(path + " " + m);
              }
            }
            return new VError(path, msgParts.join("; "));
          };
          DetailContext2.prototype.getErrorDetail = function(path) {
            var details = [];
            for (var i = this._propNames.length - 1; i >= 0; i--) {
              var p = this._propNames[i];
              path += typeof p === "number" ? "[" + p + "]" : p ? "." + p : "";
              var message = this._messages[i];
              if (message) {
                details.push({ path, message });
              }
            }
            var detail = null;
            for (var i = details.length - 1; i >= 0; i--) {
              if (detail) {
                details[i].nested = [detail];
              }
              detail = details[i];
            }
            return detail;
          };
          return DetailContext2;
        }()
      );
      exports.DetailContext = DetailContext;
      var DetailUnionResolver = (
        /** @class */
        function() {
          function DetailUnionResolver2() {
            this.contexts = [];
          }
          DetailUnionResolver2.prototype.createContext = function() {
            var ctx = new DetailContext();
            this.contexts.push(ctx);
            return ctx;
          };
          return DetailUnionResolver2;
        }()
      );
    }
  });

  // node_modules/ts-interface-checker/dist/types.js
  var require_types = __commonJS({
    "node_modules/ts-interface-checker/dist/types.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.basicTypes = exports.BasicType = exports.TParamList = exports.TParam = exports.param = exports.TFunc = exports.func = exports.TProp = exports.TOptional = exports.opt = exports.TIface = exports.iface = exports.TEnumLiteral = exports.enumlit = exports.TEnumType = exports.enumtype = exports.TIntersection = exports.intersection = exports.TUnion = exports.union = exports.TTuple = exports.tuple = exports.TArray = exports.array = exports.TLiteral = exports.lit = exports.TName = exports.name = exports.TType = void 0;
      var util_1 = require_util();
      var TType = (
        /** @class */
        /* @__PURE__ */ function() {
          function TType2() {
          }
          return TType2;
        }()
      );
      exports.TType = TType;
      function parseSpec(typeSpec) {
        return typeof typeSpec === "string" ? name(typeSpec) : typeSpec;
      }
      function getNamedType(suite, name2) {
        var ttype = suite[name2];
        if (!ttype) {
          throw new Error("Unknown type " + name2);
        }
        return ttype;
      }
      function name(value) {
        return new TName(value);
      }
      exports.name = name;
      var TName = (
        /** @class */
        function(_super) {
          __extends(TName2, _super);
          function TName2(name2) {
            var _this = _super.call(this) || this;
            _this.name = name2;
            _this._failMsg = "is not a " + name2;
            return _this;
          }
          TName2.prototype.getChecker = function(suite, strict, allowedProps) {
            var _this = this;
            var ttype = getNamedType(suite, this.name);
            var checker = ttype.getChecker(suite, strict, allowedProps);
            if (ttype instanceof BasicType || ttype instanceof TName2) {
              return checker;
            }
            return function(value, ctx) {
              return checker(value, ctx) ? true : ctx.fail(null, _this._failMsg, 0);
            };
          };
          return TName2;
        }(TType)
      );
      exports.TName = TName;
      function lit2(value) {
        return new TLiteral(value);
      }
      exports.lit = lit2;
      var TLiteral = (
        /** @class */
        function(_super) {
          __extends(TLiteral2, _super);
          function TLiteral2(value) {
            var _this = _super.call(this) || this;
            _this.value = value;
            _this.name = JSON.stringify(value);
            _this._failMsg = "is not " + _this.name;
            return _this;
          }
          TLiteral2.prototype.getChecker = function(suite, strict) {
            var _this = this;
            return function(value, ctx) {
              return value === _this.value ? true : ctx.fail(null, _this._failMsg, -1);
            };
          };
          return TLiteral2;
        }(TType)
      );
      exports.TLiteral = TLiteral;
      function array2(typeSpec) {
        return new TArray(parseSpec(typeSpec));
      }
      exports.array = array2;
      var TArray = (
        /** @class */
        function(_super) {
          __extends(TArray2, _super);
          function TArray2(ttype) {
            var _this = _super.call(this) || this;
            _this.ttype = ttype;
            return _this;
          }
          TArray2.prototype.getChecker = function(suite, strict) {
            var itemChecker = this.ttype.getChecker(suite, strict);
            return function(value, ctx) {
              if (!Array.isArray(value)) {
                return ctx.fail(null, "is not an array", 0);
              }
              for (var i = 0; i < value.length; i++) {
                var ok = itemChecker(value[i], ctx);
                if (!ok) {
                  return ctx.fail(i, null, 1);
                }
              }
              return true;
            };
          };
          return TArray2;
        }(TType)
      );
      exports.TArray = TArray;
      function tuple() {
        var typeSpec = [];
        for (var _i2 = 0; _i2 < arguments.length; _i2++) {
          typeSpec[_i2] = arguments[_i2];
        }
        return new TTuple(typeSpec.map(function(t2) {
          return parseSpec(t2);
        }));
      }
      exports.tuple = tuple;
      var TTuple = (
        /** @class */
        function(_super) {
          __extends(TTuple2, _super);
          function TTuple2(ttypes) {
            var _this = _super.call(this) || this;
            _this.ttypes = ttypes;
            return _this;
          }
          TTuple2.prototype.getChecker = function(suite, strict) {
            var itemCheckers = this.ttypes.map(function(t2) {
              return t2.getChecker(suite, strict);
            });
            var checker = function(value, ctx) {
              if (!Array.isArray(value)) {
                return ctx.fail(null, "is not an array", 0);
              }
              for (var i = 0; i < itemCheckers.length; i++) {
                var ok = itemCheckers[i](value[i], ctx);
                if (!ok) {
                  return ctx.fail(i, null, 1);
                }
              }
              return true;
            };
            if (!strict) {
              return checker;
            }
            return function(value, ctx) {
              if (!checker(value, ctx)) {
                return false;
              }
              return value.length <= itemCheckers.length ? true : ctx.fail(itemCheckers.length, "is extraneous", 2);
            };
          };
          return TTuple2;
        }(TType)
      );
      exports.TTuple = TTuple;
      function union2() {
        var typeSpec = [];
        for (var _i2 = 0; _i2 < arguments.length; _i2++) {
          typeSpec[_i2] = arguments[_i2];
        }
        return new TUnion(typeSpec.map(function(t2) {
          return parseSpec(t2);
        }));
      }
      exports.union = union2;
      var TUnion = (
        /** @class */
        function(_super) {
          __extends(TUnion2, _super);
          function TUnion2(ttypes) {
            var _this = _super.call(this) || this;
            _this.ttypes = ttypes;
            var names = ttypes.map(function(t2) {
              return t2 instanceof TName || t2 instanceof TLiteral ? t2.name : null;
            }).filter(function(n) {
              return n;
            });
            var otherTypes = ttypes.length - names.length;
            if (names.length) {
              if (otherTypes > 0) {
                names.push(otherTypes + " more");
              }
              _this._failMsg = "is none of " + names.join(", ");
            } else {
              _this._failMsg = "is none of " + otherTypes + " types";
            }
            return _this;
          }
          TUnion2.prototype.getChecker = function(suite, strict) {
            var _this = this;
            var itemCheckers = this.ttypes.map(function(t2) {
              return t2.getChecker(suite, strict);
            });
            return function(value, ctx) {
              var ur = ctx.unionResolver();
              for (var i = 0; i < itemCheckers.length; i++) {
                var ok = itemCheckers[i](value, ur.createContext());
                if (ok) {
                  return true;
                }
              }
              ctx.resolveUnion(ur);
              return ctx.fail(null, _this._failMsg, 0);
            };
          };
          return TUnion2;
        }(TType)
      );
      exports.TUnion = TUnion;
      function intersection() {
        var typeSpec = [];
        for (var _i2 = 0; _i2 < arguments.length; _i2++) {
          typeSpec[_i2] = arguments[_i2];
        }
        return new TIntersection(typeSpec.map(function(t2) {
          return parseSpec(t2);
        }));
      }
      exports.intersection = intersection;
      var TIntersection = (
        /** @class */
        function(_super) {
          __extends(TIntersection2, _super);
          function TIntersection2(ttypes) {
            var _this = _super.call(this) || this;
            _this.ttypes = ttypes;
            return _this;
          }
          TIntersection2.prototype.getChecker = function(suite, strict) {
            var allowedProps = /* @__PURE__ */ new Set();
            var itemCheckers = this.ttypes.map(function(t2) {
              return t2.getChecker(suite, strict, allowedProps);
            });
            return function(value, ctx) {
              var ok = itemCheckers.every(function(checker) {
                return checker(value, ctx);
              });
              if (ok) {
                return true;
              }
              return ctx.fail(null, null, 0);
            };
          };
          return TIntersection2;
        }(TType)
      );
      exports.TIntersection = TIntersection;
      function enumtype(values) {
        return new TEnumType(values);
      }
      exports.enumtype = enumtype;
      var TEnumType = (
        /** @class */
        function(_super) {
          __extends(TEnumType2, _super);
          function TEnumType2(members) {
            var _this = _super.call(this) || this;
            _this.members = members;
            _this.validValues = /* @__PURE__ */ new Set();
            _this._failMsg = "is not a valid enum value";
            _this.validValues = new Set(Object.keys(members).map(function(name2) {
              return members[name2];
            }));
            return _this;
          }
          TEnumType2.prototype.getChecker = function(suite, strict) {
            var _this = this;
            return function(value, ctx) {
              return _this.validValues.has(value) ? true : ctx.fail(null, _this._failMsg, 0);
            };
          };
          return TEnumType2;
        }(TType)
      );
      exports.TEnumType = TEnumType;
      function enumlit(name2, prop) {
        return new TEnumLiteral(name2, prop);
      }
      exports.enumlit = enumlit;
      var TEnumLiteral = (
        /** @class */
        function(_super) {
          __extends(TEnumLiteral2, _super);
          function TEnumLiteral2(enumName, prop) {
            var _this = _super.call(this) || this;
            _this.enumName = enumName;
            _this.prop = prop;
            _this._failMsg = "is not " + enumName + "." + prop;
            return _this;
          }
          TEnumLiteral2.prototype.getChecker = function(suite, strict) {
            var _this = this;
            var ttype = getNamedType(suite, this.enumName);
            if (!(ttype instanceof TEnumType)) {
              throw new Error("Type " + this.enumName + " used in enumlit is not an enum type");
            }
            var val = ttype.members[this.prop];
            if (!ttype.members.hasOwnProperty(this.prop)) {
              throw new Error("Unknown value " + this.enumName + "." + this.prop + " used in enumlit");
            }
            return function(value, ctx) {
              return value === val ? true : ctx.fail(null, _this._failMsg, -1);
            };
          };
          return TEnumLiteral2;
        }(TType)
      );
      exports.TEnumLiteral = TEnumLiteral;
      function makeIfaceProps(props) {
        return Object.keys(props).map(function(name2) {
          return makeIfaceProp(name2, props[name2]);
        });
      }
      function makeIfaceProp(name2, prop) {
        return prop instanceof TOptional ? new TProp(name2, prop.ttype, true) : new TProp(name2, parseSpec(prop), false);
      }
      function iface2(bases, props) {
        return new TIface(bases, makeIfaceProps(props));
      }
      exports.iface = iface2;
      var TIface = (
        /** @class */
        function(_super) {
          __extends(TIface2, _super);
          function TIface2(bases, props) {
            var _this = _super.call(this) || this;
            _this.bases = bases;
            _this.props = props;
            _this.propSet = new Set(props.map(function(p) {
              return p.name;
            }));
            return _this;
          }
          TIface2.prototype.getChecker = function(suite, strict, allowedProps) {
            var _this = this;
            var baseCheckers = this.bases.map(function(b) {
              return getNamedType(suite, b).getChecker(suite, strict);
            });
            var propCheckers = this.props.map(function(prop) {
              return prop.ttype.getChecker(suite, strict);
            });
            var testCtx = new util_1.NoopContext();
            var isPropRequired = this.props.map(function(prop, i) {
              return !prop.isOpt && !propCheckers[i](void 0, testCtx);
            });
            var checker = function(value, ctx) {
              if (typeof value !== "object" || value === null) {
                return ctx.fail(null, "is not an object", 0);
              }
              for (var i = 0; i < baseCheckers.length; i++) {
                if (!baseCheckers[i](value, ctx)) {
                  return false;
                }
              }
              for (var i = 0; i < propCheckers.length; i++) {
                var name_1 = _this.props[i].name;
                var v = value[name_1];
                if (v === void 0) {
                  if (isPropRequired[i]) {
                    return ctx.fail(name_1, "is missing", 1);
                  }
                } else {
                  var ok = propCheckers[i](v, ctx);
                  if (!ok) {
                    return ctx.fail(name_1, null, 1);
                  }
                }
              }
              return true;
            };
            if (!strict) {
              return checker;
            }
            var propSet = this.propSet;
            if (allowedProps) {
              this.propSet.forEach(function(prop) {
                return allowedProps.add(prop);
              });
              propSet = allowedProps;
            }
            return function(value, ctx) {
              if (!checker(value, ctx)) {
                return false;
              }
              for (var prop in value) {
                if (!propSet.has(prop)) {
                  return ctx.fail(prop, "is extraneous", 2);
                }
              }
              return true;
            };
          };
          return TIface2;
        }(TType)
      );
      exports.TIface = TIface;
      function opt2(typeSpec) {
        return new TOptional(parseSpec(typeSpec));
      }
      exports.opt = opt2;
      var TOptional = (
        /** @class */
        function(_super) {
          __extends(TOptional2, _super);
          function TOptional2(ttype) {
            var _this = _super.call(this) || this;
            _this.ttype = ttype;
            return _this;
          }
          TOptional2.prototype.getChecker = function(suite, strict) {
            var itemChecker = this.ttype.getChecker(suite, strict);
            return function(value, ctx) {
              return value === void 0 || itemChecker(value, ctx);
            };
          };
          return TOptional2;
        }(TType)
      );
      exports.TOptional = TOptional;
      var TProp = (
        /** @class */
        /* @__PURE__ */ function() {
          function TProp2(name2, ttype, isOpt) {
            this.name = name2;
            this.ttype = ttype;
            this.isOpt = isOpt;
          }
          return TProp2;
        }()
      );
      exports.TProp = TProp;
      function func(resultSpec) {
        var params = [];
        for (var _i2 = 1; _i2 < arguments.length; _i2++) {
          params[_i2 - 1] = arguments[_i2];
        }
        return new TFunc(new TParamList(params), parseSpec(resultSpec));
      }
      exports.func = func;
      var TFunc = (
        /** @class */
        function(_super) {
          __extends(TFunc2, _super);
          function TFunc2(paramList, result) {
            var _this = _super.call(this) || this;
            _this.paramList = paramList;
            _this.result = result;
            return _this;
          }
          TFunc2.prototype.getChecker = function(suite, strict) {
            return function(value, ctx) {
              return typeof value === "function" ? true : ctx.fail(null, "is not a function", 0);
            };
          };
          return TFunc2;
        }(TType)
      );
      exports.TFunc = TFunc;
      function param(name2, typeSpec, isOpt) {
        return new TParam(name2, parseSpec(typeSpec), Boolean(isOpt));
      }
      exports.param = param;
      var TParam = (
        /** @class */
        /* @__PURE__ */ function() {
          function TParam2(name2, ttype, isOpt) {
            this.name = name2;
            this.ttype = ttype;
            this.isOpt = isOpt;
          }
          return TParam2;
        }()
      );
      exports.TParam = TParam;
      var TParamList = (
        /** @class */
        function(_super) {
          __extends(TParamList2, _super);
          function TParamList2(params) {
            var _this = _super.call(this) || this;
            _this.params = params;
            return _this;
          }
          TParamList2.prototype.getChecker = function(suite, strict) {
            var _this = this;
            var itemCheckers = this.params.map(function(t2) {
              return t2.ttype.getChecker(suite, strict);
            });
            var testCtx = new util_1.NoopContext();
            var isParamRequired = this.params.map(function(param2, i) {
              return !param2.isOpt && !itemCheckers[i](void 0, testCtx);
            });
            var checker = function(value, ctx) {
              if (!Array.isArray(value)) {
                return ctx.fail(null, "is not an array", 0);
              }
              for (var i = 0; i < itemCheckers.length; i++) {
                var p = _this.params[i];
                if (value[i] === void 0) {
                  if (isParamRequired[i]) {
                    return ctx.fail(p.name, "is missing", 1);
                  }
                } else {
                  var ok = itemCheckers[i](value[i], ctx);
                  if (!ok) {
                    return ctx.fail(p.name, null, 1);
                  }
                }
              }
              return true;
            };
            if (!strict) {
              return checker;
            }
            return function(value, ctx) {
              if (!checker(value, ctx)) {
                return false;
              }
              return value.length <= itemCheckers.length ? true : ctx.fail(itemCheckers.length, "is extraneous", 2);
            };
          };
          return TParamList2;
        }(TType)
      );
      exports.TParamList = TParamList;
      var BasicType = (
        /** @class */
        function(_super) {
          __extends(BasicType2, _super);
          function BasicType2(validator, message) {
            var _this = _super.call(this) || this;
            _this.validator = validator;
            _this.message = message;
            return _this;
          }
          BasicType2.prototype.getChecker = function(suite, strict) {
            var _this = this;
            return function(value, ctx) {
              return _this.validator(value) ? true : ctx.fail(null, _this.message, 0);
            };
          };
          return BasicType2;
        }(TType)
      );
      exports.BasicType = BasicType;
      exports.basicTypes = {
        any: new BasicType(function(v) {
          return true;
        }, "is invalid"),
        number: new BasicType(function(v) {
          return typeof v === "number";
        }, "is not a number"),
        object: new BasicType(function(v) {
          return typeof v === "object" && v;
        }, "is not an object"),
        boolean: new BasicType(function(v) {
          return typeof v === "boolean";
        }, "is not a boolean"),
        string: new BasicType(function(v) {
          return typeof v === "string";
        }, "is not a string"),
        symbol: new BasicType(function(v) {
          return typeof v === "symbol";
        }, "is not a symbol"),
        void: new BasicType(function(v) {
          return v == null;
        }, "is not void"),
        undefined: new BasicType(function(v) {
          return v === void 0;
        }, "is not undefined"),
        null: new BasicType(function(v) {
          return v === null;
        }, "is not null"),
        never: new BasicType(function(v) {
          return false;
        }, "is unexpected"),
        Date: new BasicType(getIsNativeChecker("[object Date]"), "is not a Date"),
        RegExp: new BasicType(getIsNativeChecker("[object RegExp]"), "is not a RegExp")
      };
      var nativeToString = Object.prototype.toString;
      function getIsNativeChecker(tag) {
        return function(v) {
          return typeof v === "object" && v && nativeToString.call(v) === tag;
        };
      }
      if (typeof Buffer !== "undefined") {
        exports.basicTypes.Buffer = new BasicType(function(v) {
          return Buffer.isBuffer(v);
        }, "is not a Buffer");
      }
      var _loop_1 = function(array_12) {
        exports.basicTypes[array_12.name] = new BasicType(function(v) {
          return v instanceof array_12;
        }, "is not a " + array_12.name);
      };
      for (_i = 0, _a = [
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        ArrayBuffer
      ]; _i < _a.length; _i++) {
        array_1 = _a[_i];
        _loop_1(array_1);
      }
      var array_1;
      var _i;
      var _a;
    }
  });

  // node_modules/ts-interface-checker/dist/index.js
  var require_dist = __commonJS({
    "node_modules/ts-interface-checker/dist/index.js"(exports) {
      "use strict";
      var __spreadArrays = exports && exports.__spreadArrays || function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Checker = exports.createCheckers = void 0;
      var types_1 = require_types();
      var util_1 = require_util();
      var types_2 = require_types();
      Object.defineProperty(exports, "TArray", { enumerable: true, get: function() {
        return types_2.TArray;
      } });
      Object.defineProperty(exports, "TEnumType", { enumerable: true, get: function() {
        return types_2.TEnumType;
      } });
      Object.defineProperty(exports, "TEnumLiteral", { enumerable: true, get: function() {
        return types_2.TEnumLiteral;
      } });
      Object.defineProperty(exports, "TFunc", { enumerable: true, get: function() {
        return types_2.TFunc;
      } });
      Object.defineProperty(exports, "TIface", { enumerable: true, get: function() {
        return types_2.TIface;
      } });
      Object.defineProperty(exports, "TLiteral", { enumerable: true, get: function() {
        return types_2.TLiteral;
      } });
      Object.defineProperty(exports, "TName", { enumerable: true, get: function() {
        return types_2.TName;
      } });
      Object.defineProperty(exports, "TOptional", { enumerable: true, get: function() {
        return types_2.TOptional;
      } });
      Object.defineProperty(exports, "TParam", { enumerable: true, get: function() {
        return types_2.TParam;
      } });
      Object.defineProperty(exports, "TParamList", { enumerable: true, get: function() {
        return types_2.TParamList;
      } });
      Object.defineProperty(exports, "TProp", { enumerable: true, get: function() {
        return types_2.TProp;
      } });
      Object.defineProperty(exports, "TTuple", { enumerable: true, get: function() {
        return types_2.TTuple;
      } });
      Object.defineProperty(exports, "TType", { enumerable: true, get: function() {
        return types_2.TType;
      } });
      Object.defineProperty(exports, "TUnion", { enumerable: true, get: function() {
        return types_2.TUnion;
      } });
      Object.defineProperty(exports, "TIntersection", { enumerable: true, get: function() {
        return types_2.TIntersection;
      } });
      Object.defineProperty(exports, "array", { enumerable: true, get: function() {
        return types_2.array;
      } });
      Object.defineProperty(exports, "enumlit", { enumerable: true, get: function() {
        return types_2.enumlit;
      } });
      Object.defineProperty(exports, "enumtype", { enumerable: true, get: function() {
        return types_2.enumtype;
      } });
      Object.defineProperty(exports, "func", { enumerable: true, get: function() {
        return types_2.func;
      } });
      Object.defineProperty(exports, "iface", { enumerable: true, get: function() {
        return types_2.iface;
      } });
      Object.defineProperty(exports, "lit", { enumerable: true, get: function() {
        return types_2.lit;
      } });
      Object.defineProperty(exports, "name", { enumerable: true, get: function() {
        return types_2.name;
      } });
      Object.defineProperty(exports, "opt", { enumerable: true, get: function() {
        return types_2.opt;
      } });
      Object.defineProperty(exports, "param", { enumerable: true, get: function() {
        return types_2.param;
      } });
      Object.defineProperty(exports, "tuple", { enumerable: true, get: function() {
        return types_2.tuple;
      } });
      Object.defineProperty(exports, "union", { enumerable: true, get: function() {
        return types_2.union;
      } });
      Object.defineProperty(exports, "intersection", { enumerable: true, get: function() {
        return types_2.intersection;
      } });
      Object.defineProperty(exports, "BasicType", { enumerable: true, get: function() {
        return types_2.BasicType;
      } });
      var util_2 = require_util();
      Object.defineProperty(exports, "VError", { enumerable: true, get: function() {
        return util_2.VError;
      } });
      function createCheckers2() {
        var typeSuite = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          typeSuite[_i] = arguments[_i];
        }
        var fullSuite = Object.assign.apply(Object, __spreadArrays([{}, types_1.basicTypes], typeSuite));
        var checkers = {};
        for (var _a = 0, typeSuite_1 = typeSuite; _a < typeSuite_1.length; _a++) {
          var suite_1 = typeSuite_1[_a];
          for (var _b = 0, _c = Object.keys(suite_1); _b < _c.length; _b++) {
            var name = _c[_b];
            checkers[name] = new Checker(fullSuite, suite_1[name]);
          }
        }
        return checkers;
      }
      exports.createCheckers = createCheckers2;
      var Checker = (
        /** @class */
        function() {
          function Checker2(suite, ttype, _path) {
            if (_path === void 0) {
              _path = "value";
            }
            this.suite = suite;
            this.ttype = ttype;
            this._path = _path;
            this.props = /* @__PURE__ */ new Map();
            if (ttype instanceof types_1.TIface) {
              for (var _i = 0, _a = ttype.props; _i < _a.length; _i++) {
                var p = _a[_i];
                this.props.set(p.name, p.ttype);
              }
            }
            this.checkerPlain = this.ttype.getChecker(suite, false);
            this.checkerStrict = this.ttype.getChecker(suite, true);
          }
          Checker2.prototype.setReportedPath = function(path) {
            this._path = path;
          };
          Checker2.prototype.check = function(value) {
            return this._doCheck(this.checkerPlain, value);
          };
          Checker2.prototype.test = function(value) {
            return this.checkerPlain(value, new util_1.NoopContext());
          };
          Checker2.prototype.validate = function(value) {
            return this._doValidate(this.checkerPlain, value);
          };
          Checker2.prototype.strictCheck = function(value) {
            return this._doCheck(this.checkerStrict, value);
          };
          Checker2.prototype.strictTest = function(value) {
            return this.checkerStrict(value, new util_1.NoopContext());
          };
          Checker2.prototype.strictValidate = function(value) {
            return this._doValidate(this.checkerStrict, value);
          };
          Checker2.prototype.getProp = function(prop) {
            var ttype = this.props.get(prop);
            if (!ttype) {
              throw new Error("Type has no property " + prop);
            }
            return new Checker2(this.suite, ttype, this._path + "." + prop);
          };
          Checker2.prototype.methodArgs = function(methodName) {
            var tfunc = this._getMethod(methodName);
            return new Checker2(this.suite, tfunc.paramList);
          };
          Checker2.prototype.methodResult = function(methodName) {
            var tfunc = this._getMethod(methodName);
            return new Checker2(this.suite, tfunc.result);
          };
          Checker2.prototype.getArgs = function() {
            if (!(this.ttype instanceof types_1.TFunc)) {
              throw new Error("getArgs() applied to non-function");
            }
            return new Checker2(this.suite, this.ttype.paramList);
          };
          Checker2.prototype.getResult = function() {
            if (!(this.ttype instanceof types_1.TFunc)) {
              throw new Error("getResult() applied to non-function");
            }
            return new Checker2(this.suite, this.ttype.result);
          };
          Checker2.prototype.getType = function() {
            return this.ttype;
          };
          Checker2.prototype._doCheck = function(checkerFunc, value) {
            var noopCtx = new util_1.NoopContext();
            if (!checkerFunc(value, noopCtx)) {
              var detailCtx = new util_1.DetailContext();
              checkerFunc(value, detailCtx);
              throw detailCtx.getError(this._path);
            }
          };
          Checker2.prototype._doValidate = function(checkerFunc, value) {
            var noopCtx = new util_1.NoopContext();
            if (checkerFunc(value, noopCtx)) {
              return null;
            }
            var detailCtx = new util_1.DetailContext();
            checkerFunc(value, detailCtx);
            return detailCtx.getErrorDetail(this._path);
          };
          Checker2.prototype._getMethod = function(methodName) {
            var ttype = this.props.get(methodName);
            if (!ttype) {
              throw new Error("Type has no property " + methodName);
            }
            if (!(ttype instanceof types_1.TFunc)) {
              throw new Error("Property " + methodName + " is not a method");
            }
            return ttype;
          };
          return Checker2;
        }()
      );
      exports.Checker = Checker;
    }
  });

  // node_modules/lines-and-columns/build/index.js
  var require_build = __commonJS({
    "node_modules/lines-and-columns/build/index.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.LinesAndColumns = void 0;
      var LF = "\n";
      var CR = "\r";
      var LinesAndColumns2 = (
        /** @class */
        function() {
          function LinesAndColumns3(string) {
            this.string = string;
            var offsets = [0];
            for (var offset = 0; offset < string.length; ) {
              switch (string[offset]) {
                case LF:
                  offset += LF.length;
                  offsets.push(offset);
                  break;
                case CR:
                  offset += CR.length;
                  if (string[offset] === LF) {
                    offset += LF.length;
                  }
                  offsets.push(offset);
                  break;
                default:
                  offset++;
                  break;
              }
            }
            this.offsets = offsets;
          }
          LinesAndColumns3.prototype.locationForIndex = function(index) {
            if (index < 0 || index > this.string.length) {
              return null;
            }
            var line = 0;
            var offsets = this.offsets;
            while (offsets[line + 1] <= index) {
              line++;
            }
            var column = index - offsets[line];
            return { line, column };
          };
          LinesAndColumns3.prototype.indexForLocation = function(location) {
            var line = location.line, column = location.column;
            if (line < 0 || line >= this.offsets.length) {
              return null;
            }
            if (column < 0 || column > this.lengthOfLine(line)) {
              return null;
            }
            return this.offsets[line] + column;
          };
          LinesAndColumns3.prototype.lengthOfLine = function(line) {
            var offset = this.offsets[line];
            var nextOffset = line === this.offsets.length - 1 ? this.string.length : this.offsets[line + 1];
            return nextOffset - offset;
          };
          return LinesAndColumns3;
        }()
      );
      exports.LinesAndColumns = LinesAndColumns2;
      exports["default"] = LinesAndColumns2;
    }
  });

  // node_modules/sucrase/dist/esm/parser/tokenizer/keywords.js
  var ContextualKeyword;
  (function(ContextualKeyword2) {
    const NONE = 0;
    ContextualKeyword2[ContextualKeyword2["NONE"] = NONE] = "NONE";
    const _abstract = NONE + 1;
    ContextualKeyword2[ContextualKeyword2["_abstract"] = _abstract] = "_abstract";
    const _accessor = _abstract + 1;
    ContextualKeyword2[ContextualKeyword2["_accessor"] = _accessor] = "_accessor";
    const _as = _accessor + 1;
    ContextualKeyword2[ContextualKeyword2["_as"] = _as] = "_as";
    const _assert = _as + 1;
    ContextualKeyword2[ContextualKeyword2["_assert"] = _assert] = "_assert";
    const _asserts = _assert + 1;
    ContextualKeyword2[ContextualKeyword2["_asserts"] = _asserts] = "_asserts";
    const _async = _asserts + 1;
    ContextualKeyword2[ContextualKeyword2["_async"] = _async] = "_async";
    const _await = _async + 1;
    ContextualKeyword2[ContextualKeyword2["_await"] = _await] = "_await";
    const _checks = _await + 1;
    ContextualKeyword2[ContextualKeyword2["_checks"] = _checks] = "_checks";
    const _constructor = _checks + 1;
    ContextualKeyword2[ContextualKeyword2["_constructor"] = _constructor] = "_constructor";
    const _declare = _constructor + 1;
    ContextualKeyword2[ContextualKeyword2["_declare"] = _declare] = "_declare";
    const _enum = _declare + 1;
    ContextualKeyword2[ContextualKeyword2["_enum"] = _enum] = "_enum";
    const _exports = _enum + 1;
    ContextualKeyword2[ContextualKeyword2["_exports"] = _exports] = "_exports";
    const _from = _exports + 1;
    ContextualKeyword2[ContextualKeyword2["_from"] = _from] = "_from";
    const _get = _from + 1;
    ContextualKeyword2[ContextualKeyword2["_get"] = _get] = "_get";
    const _global = _get + 1;
    ContextualKeyword2[ContextualKeyword2["_global"] = _global] = "_global";
    const _implements = _global + 1;
    ContextualKeyword2[ContextualKeyword2["_implements"] = _implements] = "_implements";
    const _infer = _implements + 1;
    ContextualKeyword2[ContextualKeyword2["_infer"] = _infer] = "_infer";
    const _interface = _infer + 1;
    ContextualKeyword2[ContextualKeyword2["_interface"] = _interface] = "_interface";
    const _is = _interface + 1;
    ContextualKeyword2[ContextualKeyword2["_is"] = _is] = "_is";
    const _keyof = _is + 1;
    ContextualKeyword2[ContextualKeyword2["_keyof"] = _keyof] = "_keyof";
    const _mixins = _keyof + 1;
    ContextualKeyword2[ContextualKeyword2["_mixins"] = _mixins] = "_mixins";
    const _module = _mixins + 1;
    ContextualKeyword2[ContextualKeyword2["_module"] = _module] = "_module";
    const _namespace = _module + 1;
    ContextualKeyword2[ContextualKeyword2["_namespace"] = _namespace] = "_namespace";
    const _of = _namespace + 1;
    ContextualKeyword2[ContextualKeyword2["_of"] = _of] = "_of";
    const _opaque = _of + 1;
    ContextualKeyword2[ContextualKeyword2["_opaque"] = _opaque] = "_opaque";
    const _out = _opaque + 1;
    ContextualKeyword2[ContextualKeyword2["_out"] = _out] = "_out";
    const _override = _out + 1;
    ContextualKeyword2[ContextualKeyword2["_override"] = _override] = "_override";
    const _private = _override + 1;
    ContextualKeyword2[ContextualKeyword2["_private"] = _private] = "_private";
    const _protected = _private + 1;
    ContextualKeyword2[ContextualKeyword2["_protected"] = _protected] = "_protected";
    const _proto = _protected + 1;
    ContextualKeyword2[ContextualKeyword2["_proto"] = _proto] = "_proto";
    const _public = _proto + 1;
    ContextualKeyword2[ContextualKeyword2["_public"] = _public] = "_public";
    const _readonly = _public + 1;
    ContextualKeyword2[ContextualKeyword2["_readonly"] = _readonly] = "_readonly";
    const _require = _readonly + 1;
    ContextualKeyword2[ContextualKeyword2["_require"] = _require] = "_require";
    const _satisfies = _require + 1;
    ContextualKeyword2[ContextualKeyword2["_satisfies"] = _satisfies] = "_satisfies";
    const _set = _satisfies + 1;
    ContextualKeyword2[ContextualKeyword2["_set"] = _set] = "_set";
    const _static = _set + 1;
    ContextualKeyword2[ContextualKeyword2["_static"] = _static] = "_static";
    const _symbol = _static + 1;
    ContextualKeyword2[ContextualKeyword2["_symbol"] = _symbol] = "_symbol";
    const _type = _symbol + 1;
    ContextualKeyword2[ContextualKeyword2["_type"] = _type] = "_type";
    const _unique = _type + 1;
    ContextualKeyword2[ContextualKeyword2["_unique"] = _unique] = "_unique";
    const _using = _unique + 1;
    ContextualKeyword2[ContextualKeyword2["_using"] = _using] = "_using";
  })(ContextualKeyword || (ContextualKeyword = {}));

  // node_modules/sucrase/dist/esm/parser/tokenizer/types.js
  var TokenType;
  (function(TokenType2) {
    const PRECEDENCE_MASK = 15;
    TokenType2[TokenType2["PRECEDENCE_MASK"] = PRECEDENCE_MASK] = "PRECEDENCE_MASK";
    const IS_KEYWORD = 1 << 4;
    TokenType2[TokenType2["IS_KEYWORD"] = IS_KEYWORD] = "IS_KEYWORD";
    const IS_ASSIGN = 1 << 5;
    TokenType2[TokenType2["IS_ASSIGN"] = IS_ASSIGN] = "IS_ASSIGN";
    const IS_RIGHT_ASSOCIATIVE = 1 << 6;
    TokenType2[TokenType2["IS_RIGHT_ASSOCIATIVE"] = IS_RIGHT_ASSOCIATIVE] = "IS_RIGHT_ASSOCIATIVE";
    const IS_PREFIX = 1 << 7;
    TokenType2[TokenType2["IS_PREFIX"] = IS_PREFIX] = "IS_PREFIX";
    const IS_POSTFIX = 1 << 8;
    TokenType2[TokenType2["IS_POSTFIX"] = IS_POSTFIX] = "IS_POSTFIX";
    const IS_EXPRESSION_START = 1 << 9;
    TokenType2[TokenType2["IS_EXPRESSION_START"] = IS_EXPRESSION_START] = "IS_EXPRESSION_START";
    const num = 512;
    TokenType2[TokenType2["num"] = num] = "num";
    const bigint = 1536;
    TokenType2[TokenType2["bigint"] = bigint] = "bigint";
    const decimal = 2560;
    TokenType2[TokenType2["decimal"] = decimal] = "decimal";
    const regexp = 3584;
    TokenType2[TokenType2["regexp"] = regexp] = "regexp";
    const string = 4608;
    TokenType2[TokenType2["string"] = string] = "string";
    const name = 5632;
    TokenType2[TokenType2["name"] = name] = "name";
    const eof = 6144;
    TokenType2[TokenType2["eof"] = eof] = "eof";
    const bracketL = 7680;
    TokenType2[TokenType2["bracketL"] = bracketL] = "bracketL";
    const bracketR = 8192;
    TokenType2[TokenType2["bracketR"] = bracketR] = "bracketR";
    const braceL = 9728;
    TokenType2[TokenType2["braceL"] = braceL] = "braceL";
    const braceBarL = 10752;
    TokenType2[TokenType2["braceBarL"] = braceBarL] = "braceBarL";
    const braceR = 11264;
    TokenType2[TokenType2["braceR"] = braceR] = "braceR";
    const braceBarR = 12288;
    TokenType2[TokenType2["braceBarR"] = braceBarR] = "braceBarR";
    const parenL = 13824;
    TokenType2[TokenType2["parenL"] = parenL] = "parenL";
    const parenR = 14336;
    TokenType2[TokenType2["parenR"] = parenR] = "parenR";
    const comma = 15360;
    TokenType2[TokenType2["comma"] = comma] = "comma";
    const semi = 16384;
    TokenType2[TokenType2["semi"] = semi] = "semi";
    const colon = 17408;
    TokenType2[TokenType2["colon"] = colon] = "colon";
    const doubleColon = 18432;
    TokenType2[TokenType2["doubleColon"] = doubleColon] = "doubleColon";
    const dot = 19456;
    TokenType2[TokenType2["dot"] = dot] = "dot";
    const question = 20480;
    TokenType2[TokenType2["question"] = question] = "question";
    const questionDot = 21504;
    TokenType2[TokenType2["questionDot"] = questionDot] = "questionDot";
    const arrow = 22528;
    TokenType2[TokenType2["arrow"] = arrow] = "arrow";
    const template = 23552;
    TokenType2[TokenType2["template"] = template] = "template";
    const ellipsis = 24576;
    TokenType2[TokenType2["ellipsis"] = ellipsis] = "ellipsis";
    const backQuote = 25600;
    TokenType2[TokenType2["backQuote"] = backQuote] = "backQuote";
    const dollarBraceL = 27136;
    TokenType2[TokenType2["dollarBraceL"] = dollarBraceL] = "dollarBraceL";
    const at = 27648;
    TokenType2[TokenType2["at"] = at] = "at";
    const hash = 29184;
    TokenType2[TokenType2["hash"] = hash] = "hash";
    const eq = 29728;
    TokenType2[TokenType2["eq"] = eq] = "eq";
    const assign = 30752;
    TokenType2[TokenType2["assign"] = assign] = "assign";
    const preIncDec = 32640;
    TokenType2[TokenType2["preIncDec"] = preIncDec] = "preIncDec";
    const postIncDec = 33664;
    TokenType2[TokenType2["postIncDec"] = postIncDec] = "postIncDec";
    const bang = 34432;
    TokenType2[TokenType2["bang"] = bang] = "bang";
    const tilde = 35456;
    TokenType2[TokenType2["tilde"] = tilde] = "tilde";
    const pipeline = 35841;
    TokenType2[TokenType2["pipeline"] = pipeline] = "pipeline";
    const nullishCoalescing = 36866;
    TokenType2[TokenType2["nullishCoalescing"] = nullishCoalescing] = "nullishCoalescing";
    const logicalOR = 37890;
    TokenType2[TokenType2["logicalOR"] = logicalOR] = "logicalOR";
    const logicalAND = 38915;
    TokenType2[TokenType2["logicalAND"] = logicalAND] = "logicalAND";
    const bitwiseOR = 39940;
    TokenType2[TokenType2["bitwiseOR"] = bitwiseOR] = "bitwiseOR";
    const bitwiseXOR = 40965;
    TokenType2[TokenType2["bitwiseXOR"] = bitwiseXOR] = "bitwiseXOR";
    const bitwiseAND = 41990;
    TokenType2[TokenType2["bitwiseAND"] = bitwiseAND] = "bitwiseAND";
    const equality = 43015;
    TokenType2[TokenType2["equality"] = equality] = "equality";
    const lessThan = 44040;
    TokenType2[TokenType2["lessThan"] = lessThan] = "lessThan";
    const greaterThan = 45064;
    TokenType2[TokenType2["greaterThan"] = greaterThan] = "greaterThan";
    const relationalOrEqual = 46088;
    TokenType2[TokenType2["relationalOrEqual"] = relationalOrEqual] = "relationalOrEqual";
    const bitShiftL = 47113;
    TokenType2[TokenType2["bitShiftL"] = bitShiftL] = "bitShiftL";
    const bitShiftR = 48137;
    TokenType2[TokenType2["bitShiftR"] = bitShiftR] = "bitShiftR";
    const plus = 49802;
    TokenType2[TokenType2["plus"] = plus] = "plus";
    const minus = 50826;
    TokenType2[TokenType2["minus"] = minus] = "minus";
    const modulo = 51723;
    TokenType2[TokenType2["modulo"] = modulo] = "modulo";
    const star = 52235;
    TokenType2[TokenType2["star"] = star] = "star";
    const slash = 53259;
    TokenType2[TokenType2["slash"] = slash] = "slash";
    const exponent = 54348;
    TokenType2[TokenType2["exponent"] = exponent] = "exponent";
    const jsxName = 55296;
    TokenType2[TokenType2["jsxName"] = jsxName] = "jsxName";
    const jsxText = 56320;
    TokenType2[TokenType2["jsxText"] = jsxText] = "jsxText";
    const jsxEmptyText = 57344;
    TokenType2[TokenType2["jsxEmptyText"] = jsxEmptyText] = "jsxEmptyText";
    const jsxTagStart = 58880;
    TokenType2[TokenType2["jsxTagStart"] = jsxTagStart] = "jsxTagStart";
    const jsxTagEnd = 59392;
    TokenType2[TokenType2["jsxTagEnd"] = jsxTagEnd] = "jsxTagEnd";
    const typeParameterStart = 60928;
    TokenType2[TokenType2["typeParameterStart"] = typeParameterStart] = "typeParameterStart";
    const nonNullAssertion = 61440;
    TokenType2[TokenType2["nonNullAssertion"] = nonNullAssertion] = "nonNullAssertion";
    const _break = 62480;
    TokenType2[TokenType2["_break"] = _break] = "_break";
    const _case = 63504;
    TokenType2[TokenType2["_case"] = _case] = "_case";
    const _catch = 64528;
    TokenType2[TokenType2["_catch"] = _catch] = "_catch";
    const _continue = 65552;
    TokenType2[TokenType2["_continue"] = _continue] = "_continue";
    const _debugger = 66576;
    TokenType2[TokenType2["_debugger"] = _debugger] = "_debugger";
    const _default = 67600;
    TokenType2[TokenType2["_default"] = _default] = "_default";
    const _do = 68624;
    TokenType2[TokenType2["_do"] = _do] = "_do";
    const _else = 69648;
    TokenType2[TokenType2["_else"] = _else] = "_else";
    const _finally = 70672;
    TokenType2[TokenType2["_finally"] = _finally] = "_finally";
    const _for = 71696;
    TokenType2[TokenType2["_for"] = _for] = "_for";
    const _function = 73232;
    TokenType2[TokenType2["_function"] = _function] = "_function";
    const _if = 73744;
    TokenType2[TokenType2["_if"] = _if] = "_if";
    const _return = 74768;
    TokenType2[TokenType2["_return"] = _return] = "_return";
    const _switch = 75792;
    TokenType2[TokenType2["_switch"] = _switch] = "_switch";
    const _throw = 77456;
    TokenType2[TokenType2["_throw"] = _throw] = "_throw";
    const _try = 77840;
    TokenType2[TokenType2["_try"] = _try] = "_try";
    const _var = 78864;
    TokenType2[TokenType2["_var"] = _var] = "_var";
    const _let = 79888;
    TokenType2[TokenType2["_let"] = _let] = "_let";
    const _const = 80912;
    TokenType2[TokenType2["_const"] = _const] = "_const";
    const _while = 81936;
    TokenType2[TokenType2["_while"] = _while] = "_while";
    const _with = 82960;
    TokenType2[TokenType2["_with"] = _with] = "_with";
    const _new = 84496;
    TokenType2[TokenType2["_new"] = _new] = "_new";
    const _this = 85520;
    TokenType2[TokenType2["_this"] = _this] = "_this";
    const _super = 86544;
    TokenType2[TokenType2["_super"] = _super] = "_super";
    const _class = 87568;
    TokenType2[TokenType2["_class"] = _class] = "_class";
    const _extends = 88080;
    TokenType2[TokenType2["_extends"] = _extends] = "_extends";
    const _export = 89104;
    TokenType2[TokenType2["_export"] = _export] = "_export";
    const _import = 90640;
    TokenType2[TokenType2["_import"] = _import] = "_import";
    const _yield = 91664;
    TokenType2[TokenType2["_yield"] = _yield] = "_yield";
    const _null = 92688;
    TokenType2[TokenType2["_null"] = _null] = "_null";
    const _true = 93712;
    TokenType2[TokenType2["_true"] = _true] = "_true";
    const _false = 94736;
    TokenType2[TokenType2["_false"] = _false] = "_false";
    const _in = 95256;
    TokenType2[TokenType2["_in"] = _in] = "_in";
    const _instanceof = 96280;
    TokenType2[TokenType2["_instanceof"] = _instanceof] = "_instanceof";
    const _typeof = 97936;
    TokenType2[TokenType2["_typeof"] = _typeof] = "_typeof";
    const _void = 98960;
    TokenType2[TokenType2["_void"] = _void] = "_void";
    const _delete = 99984;
    TokenType2[TokenType2["_delete"] = _delete] = "_delete";
    const _async = 100880;
    TokenType2[TokenType2["_async"] = _async] = "_async";
    const _get = 101904;
    TokenType2[TokenType2["_get"] = _get] = "_get";
    const _set = 102928;
    TokenType2[TokenType2["_set"] = _set] = "_set";
    const _declare = 103952;
    TokenType2[TokenType2["_declare"] = _declare] = "_declare";
    const _readonly = 104976;
    TokenType2[TokenType2["_readonly"] = _readonly] = "_readonly";
    const _abstract = 106e3;
    TokenType2[TokenType2["_abstract"] = _abstract] = "_abstract";
    const _static = 107024;
    TokenType2[TokenType2["_static"] = _static] = "_static";
    const _public = 107536;
    TokenType2[TokenType2["_public"] = _public] = "_public";
    const _private = 108560;
    TokenType2[TokenType2["_private"] = _private] = "_private";
    const _protected = 109584;
    TokenType2[TokenType2["_protected"] = _protected] = "_protected";
    const _override = 110608;
    TokenType2[TokenType2["_override"] = _override] = "_override";
    const _as = 112144;
    TokenType2[TokenType2["_as"] = _as] = "_as";
    const _enum = 113168;
    TokenType2[TokenType2["_enum"] = _enum] = "_enum";
    const _type = 114192;
    TokenType2[TokenType2["_type"] = _type] = "_type";
    const _implements = 115216;
    TokenType2[TokenType2["_implements"] = _implements] = "_implements";
  })(TokenType || (TokenType = {}));
  function formatTokenType(tokenType) {
    switch (tokenType) {
      case TokenType.num:
        return "num";
      case TokenType.bigint:
        return "bigint";
      case TokenType.decimal:
        return "decimal";
      case TokenType.regexp:
        return "regexp";
      case TokenType.string:
        return "string";
      case TokenType.name:
        return "name";
      case TokenType.eof:
        return "eof";
      case TokenType.bracketL:
        return "[";
      case TokenType.bracketR:
        return "]";
      case TokenType.braceL:
        return "{";
      case TokenType.braceBarL:
        return "{|";
      case TokenType.braceR:
        return "}";
      case TokenType.braceBarR:
        return "|}";
      case TokenType.parenL:
        return "(";
      case TokenType.parenR:
        return ")";
      case TokenType.comma:
        return ",";
      case TokenType.semi:
        return ";";
      case TokenType.colon:
        return ":";
      case TokenType.doubleColon:
        return "::";
      case TokenType.dot:
        return ".";
      case TokenType.question:
        return "?";
      case TokenType.questionDot:
        return "?.";
      case TokenType.arrow:
        return "=>";
      case TokenType.template:
        return "template";
      case TokenType.ellipsis:
        return "...";
      case TokenType.backQuote:
        return "`";
      case TokenType.dollarBraceL:
        return "${";
      case TokenType.at:
        return "@";
      case TokenType.hash:
        return "#";
      case TokenType.eq:
        return "=";
      case TokenType.assign:
        return "_=";
      case TokenType.preIncDec:
        return "++/--";
      case TokenType.postIncDec:
        return "++/--";
      case TokenType.bang:
        return "!";
      case TokenType.tilde:
        return "~";
      case TokenType.pipeline:
        return "|>";
      case TokenType.nullishCoalescing:
        return "??";
      case TokenType.logicalOR:
        return "||";
      case TokenType.logicalAND:
        return "&&";
      case TokenType.bitwiseOR:
        return "|";
      case TokenType.bitwiseXOR:
        return "^";
      case TokenType.bitwiseAND:
        return "&";
      case TokenType.equality:
        return "==/!=";
      case TokenType.lessThan:
        return "<";
      case TokenType.greaterThan:
        return ">";
      case TokenType.relationalOrEqual:
        return "<=/>=";
      case TokenType.bitShiftL:
        return "<<";
      case TokenType.bitShiftR:
        return ">>/>>>";
      case TokenType.plus:
        return "+";
      case TokenType.minus:
        return "-";
      case TokenType.modulo:
        return "%";
      case TokenType.star:
        return "*";
      case TokenType.slash:
        return "/";
      case TokenType.exponent:
        return "**";
      case TokenType.jsxName:
        return "jsxName";
      case TokenType.jsxText:
        return "jsxText";
      case TokenType.jsxEmptyText:
        return "jsxEmptyText";
      case TokenType.jsxTagStart:
        return "jsxTagStart";
      case TokenType.jsxTagEnd:
        return "jsxTagEnd";
      case TokenType.typeParameterStart:
        return "typeParameterStart";
      case TokenType.nonNullAssertion:
        return "nonNullAssertion";
      case TokenType._break:
        return "break";
      case TokenType._case:
        return "case";
      case TokenType._catch:
        return "catch";
      case TokenType._continue:
        return "continue";
      case TokenType._debugger:
        return "debugger";
      case TokenType._default:
        return "default";
      case TokenType._do:
        return "do";
      case TokenType._else:
        return "else";
      case TokenType._finally:
        return "finally";
      case TokenType._for:
        return "for";
      case TokenType._function:
        return "function";
      case TokenType._if:
        return "if";
      case TokenType._return:
        return "return";
      case TokenType._switch:
        return "switch";
      case TokenType._throw:
        return "throw";
      case TokenType._try:
        return "try";
      case TokenType._var:
        return "var";
      case TokenType._let:
        return "let";
      case TokenType._const:
        return "const";
      case TokenType._while:
        return "while";
      case TokenType._with:
        return "with";
      case TokenType._new:
        return "new";
      case TokenType._this:
        return "this";
      case TokenType._super:
        return "super";
      case TokenType._class:
        return "class";
      case TokenType._extends:
        return "extends";
      case TokenType._export:
        return "export";
      case TokenType._import:
        return "import";
      case TokenType._yield:
        return "yield";
      case TokenType._null:
        return "null";
      case TokenType._true:
        return "true";
      case TokenType._false:
        return "false";
      case TokenType._in:
        return "in";
      case TokenType._instanceof:
        return "instanceof";
      case TokenType._typeof:
        return "typeof";
      case TokenType._void:
        return "void";
      case TokenType._delete:
        return "delete";
      case TokenType._async:
        return "async";
      case TokenType._get:
        return "get";
      case TokenType._set:
        return "set";
      case TokenType._declare:
        return "declare";
      case TokenType._readonly:
        return "readonly";
      case TokenType._abstract:
        return "abstract";
      case TokenType._static:
        return "static";
      case TokenType._public:
        return "public";
      case TokenType._private:
        return "private";
      case TokenType._protected:
        return "protected";
      case TokenType._override:
        return "override";
      case TokenType._as:
        return "as";
      case TokenType._enum:
        return "enum";
      case TokenType._type:
        return "type";
      case TokenType._implements:
        return "implements";
      default:
        return "";
    }
  }

  // node_modules/sucrase/dist/esm/parser/tokenizer/state.js
  var Scope = class {
    constructor(startTokenIndex, endTokenIndex, isFunctionScope) {
      this.startTokenIndex = startTokenIndex;
      this.endTokenIndex = endTokenIndex;
      this.isFunctionScope = isFunctionScope;
    }
  };
  var StateSnapshot = class {
    constructor(potentialArrowAt, noAnonFunctionType, inDisallowConditionalTypesContext, tokensLength, scopesLength, pos, type, contextualKeyword, start, end, isType, scopeDepth, error) {
      ;
      this.potentialArrowAt = potentialArrowAt;
      this.noAnonFunctionType = noAnonFunctionType;
      this.inDisallowConditionalTypesContext = inDisallowConditionalTypesContext;
      this.tokensLength = tokensLength;
      this.scopesLength = scopesLength;
      this.pos = pos;
      this.type = type;
      this.contextualKeyword = contextualKeyword;
      this.start = start;
      this.end = end;
      this.isType = isType;
      this.scopeDepth = scopeDepth;
      this.error = error;
    }
  };
  var State = class _State {
    constructor() {
      _State.prototype.__init.call(this);
      _State.prototype.__init2.call(this);
      _State.prototype.__init3.call(this);
      _State.prototype.__init4.call(this);
      _State.prototype.__init5.call(this);
      _State.prototype.__init6.call(this);
      _State.prototype.__init7.call(this);
      _State.prototype.__init8.call(this);
      _State.prototype.__init9.call(this);
      _State.prototype.__init10.call(this);
      _State.prototype.__init11.call(this);
      _State.prototype.__init12.call(this);
      _State.prototype.__init13.call(this);
    }
    // Used to signify the start of a potential arrow function
    __init() {
      this.potentialArrowAt = -1;
    }
    // Used by Flow to handle an edge case involving function type parsing.
    __init2() {
      this.noAnonFunctionType = false;
    }
    // Used by TypeScript to handle ambiguities when parsing conditional types.
    __init3() {
      this.inDisallowConditionalTypesContext = false;
    }
    // Token store.
    __init4() {
      this.tokens = [];
    }
    // Array of all observed scopes, ordered by their ending position.
    __init5() {
      this.scopes = [];
    }
    // The current position of the tokenizer in the input.
    __init6() {
      this.pos = 0;
    }
    // Information about the current token.
    __init7() {
      this.type = TokenType.eof;
    }
    __init8() {
      this.contextualKeyword = ContextualKeyword.NONE;
    }
    __init9() {
      this.start = 0;
    }
    __init10() {
      this.end = 0;
    }
    __init11() {
      this.isType = false;
    }
    __init12() {
      this.scopeDepth = 0;
    }
    /**
     * If the parser is in an error state, then the token is always tt.eof and all functions can
     * keep executing but should be written so they don't get into an infinite loop in this situation.
     *
     * This approach, combined with the ability to snapshot and restore state, allows us to implement
     * backtracking without exceptions and without needing to explicitly propagate error states
     * everywhere.
     */
    __init13() {
      this.error = null;
    }
    snapshot() {
      return new StateSnapshot(
        this.potentialArrowAt,
        this.noAnonFunctionType,
        this.inDisallowConditionalTypesContext,
        this.tokens.length,
        this.scopes.length,
        this.pos,
        this.type,
        this.contextualKeyword,
        this.start,
        this.end,
        this.isType,
        this.scopeDepth,
        this.error
      );
    }
    restoreFromSnapshot(snapshot) {
      this.potentialArrowAt = snapshot.potentialArrowAt;
      this.noAnonFunctionType = snapshot.noAnonFunctionType;
      this.inDisallowConditionalTypesContext = snapshot.inDisallowConditionalTypesContext;
      this.tokens.length = snapshot.tokensLength;
      this.scopes.length = snapshot.scopesLength;
      this.pos = snapshot.pos;
      this.type = snapshot.type;
      this.contextualKeyword = snapshot.contextualKeyword;
      this.start = snapshot.start;
      this.end = snapshot.end;
      this.isType = snapshot.isType;
      this.scopeDepth = snapshot.scopeDepth;
      this.error = snapshot.error;
    }
  };

  // node_modules/sucrase/dist/esm/parser/util/charcodes.js
  var charCodes;
  (function(charCodes2) {
    const backSpace = 8;
    charCodes2[charCodes2["backSpace"] = backSpace] = "backSpace";
    const lineFeed = 10;
    charCodes2[charCodes2["lineFeed"] = lineFeed] = "lineFeed";
    const tab = 9;
    charCodes2[charCodes2["tab"] = tab] = "tab";
    const carriageReturn = 13;
    charCodes2[charCodes2["carriageReturn"] = carriageReturn] = "carriageReturn";
    const shiftOut = 14;
    charCodes2[charCodes2["shiftOut"] = shiftOut] = "shiftOut";
    const space = 32;
    charCodes2[charCodes2["space"] = space] = "space";
    const exclamationMark = 33;
    charCodes2[charCodes2["exclamationMark"] = exclamationMark] = "exclamationMark";
    const quotationMark = 34;
    charCodes2[charCodes2["quotationMark"] = quotationMark] = "quotationMark";
    const numberSign = 35;
    charCodes2[charCodes2["numberSign"] = numberSign] = "numberSign";
    const dollarSign = 36;
    charCodes2[charCodes2["dollarSign"] = dollarSign] = "dollarSign";
    const percentSign = 37;
    charCodes2[charCodes2["percentSign"] = percentSign] = "percentSign";
    const ampersand = 38;
    charCodes2[charCodes2["ampersand"] = ampersand] = "ampersand";
    const apostrophe = 39;
    charCodes2[charCodes2["apostrophe"] = apostrophe] = "apostrophe";
    const leftParenthesis = 40;
    charCodes2[charCodes2["leftParenthesis"] = leftParenthesis] = "leftParenthesis";
    const rightParenthesis = 41;
    charCodes2[charCodes2["rightParenthesis"] = rightParenthesis] = "rightParenthesis";
    const asterisk = 42;
    charCodes2[charCodes2["asterisk"] = asterisk] = "asterisk";
    const plusSign = 43;
    charCodes2[charCodes2["plusSign"] = plusSign] = "plusSign";
    const comma = 44;
    charCodes2[charCodes2["comma"] = comma] = "comma";
    const dash = 45;
    charCodes2[charCodes2["dash"] = dash] = "dash";
    const dot = 46;
    charCodes2[charCodes2["dot"] = dot] = "dot";
    const slash = 47;
    charCodes2[charCodes2["slash"] = slash] = "slash";
    const digit0 = 48;
    charCodes2[charCodes2["digit0"] = digit0] = "digit0";
    const digit1 = 49;
    charCodes2[charCodes2["digit1"] = digit1] = "digit1";
    const digit2 = 50;
    charCodes2[charCodes2["digit2"] = digit2] = "digit2";
    const digit3 = 51;
    charCodes2[charCodes2["digit3"] = digit3] = "digit3";
    const digit4 = 52;
    charCodes2[charCodes2["digit4"] = digit4] = "digit4";
    const digit5 = 53;
    charCodes2[charCodes2["digit5"] = digit5] = "digit5";
    const digit6 = 54;
    charCodes2[charCodes2["digit6"] = digit6] = "digit6";
    const digit7 = 55;
    charCodes2[charCodes2["digit7"] = digit7] = "digit7";
    const digit8 = 56;
    charCodes2[charCodes2["digit8"] = digit8] = "digit8";
    const digit9 = 57;
    charCodes2[charCodes2["digit9"] = digit9] = "digit9";
    const colon = 58;
    charCodes2[charCodes2["colon"] = colon] = "colon";
    const semicolon2 = 59;
    charCodes2[charCodes2["semicolon"] = semicolon2] = "semicolon";
    const lessThan = 60;
    charCodes2[charCodes2["lessThan"] = lessThan] = "lessThan";
    const equalsTo = 61;
    charCodes2[charCodes2["equalsTo"] = equalsTo] = "equalsTo";
    const greaterThan = 62;
    charCodes2[charCodes2["greaterThan"] = greaterThan] = "greaterThan";
    const questionMark = 63;
    charCodes2[charCodes2["questionMark"] = questionMark] = "questionMark";
    const atSign = 64;
    charCodes2[charCodes2["atSign"] = atSign] = "atSign";
    const uppercaseA = 65;
    charCodes2[charCodes2["uppercaseA"] = uppercaseA] = "uppercaseA";
    const uppercaseB = 66;
    charCodes2[charCodes2["uppercaseB"] = uppercaseB] = "uppercaseB";
    const uppercaseC = 67;
    charCodes2[charCodes2["uppercaseC"] = uppercaseC] = "uppercaseC";
    const uppercaseD = 68;
    charCodes2[charCodes2["uppercaseD"] = uppercaseD] = "uppercaseD";
    const uppercaseE = 69;
    charCodes2[charCodes2["uppercaseE"] = uppercaseE] = "uppercaseE";
    const uppercaseF = 70;
    charCodes2[charCodes2["uppercaseF"] = uppercaseF] = "uppercaseF";
    const uppercaseG = 71;
    charCodes2[charCodes2["uppercaseG"] = uppercaseG] = "uppercaseG";
    const uppercaseH = 72;
    charCodes2[charCodes2["uppercaseH"] = uppercaseH] = "uppercaseH";
    const uppercaseI = 73;
    charCodes2[charCodes2["uppercaseI"] = uppercaseI] = "uppercaseI";
    const uppercaseJ = 74;
    charCodes2[charCodes2["uppercaseJ"] = uppercaseJ] = "uppercaseJ";
    const uppercaseK = 75;
    charCodes2[charCodes2["uppercaseK"] = uppercaseK] = "uppercaseK";
    const uppercaseL = 76;
    charCodes2[charCodes2["uppercaseL"] = uppercaseL] = "uppercaseL";
    const uppercaseM = 77;
    charCodes2[charCodes2["uppercaseM"] = uppercaseM] = "uppercaseM";
    const uppercaseN = 78;
    charCodes2[charCodes2["uppercaseN"] = uppercaseN] = "uppercaseN";
    const uppercaseO = 79;
    charCodes2[charCodes2["uppercaseO"] = uppercaseO] = "uppercaseO";
    const uppercaseP = 80;
    charCodes2[charCodes2["uppercaseP"] = uppercaseP] = "uppercaseP";
    const uppercaseQ = 81;
    charCodes2[charCodes2["uppercaseQ"] = uppercaseQ] = "uppercaseQ";
    const uppercaseR = 82;
    charCodes2[charCodes2["uppercaseR"] = uppercaseR] = "uppercaseR";
    const uppercaseS = 83;
    charCodes2[charCodes2["uppercaseS"] = uppercaseS] = "uppercaseS";
    const uppercaseT = 84;
    charCodes2[charCodes2["uppercaseT"] = uppercaseT] = "uppercaseT";
    const uppercaseU = 85;
    charCodes2[charCodes2["uppercaseU"] = uppercaseU] = "uppercaseU";
    const uppercaseV = 86;
    charCodes2[charCodes2["uppercaseV"] = uppercaseV] = "uppercaseV";
    const uppercaseW = 87;
    charCodes2[charCodes2["uppercaseW"] = uppercaseW] = "uppercaseW";
    const uppercaseX = 88;
    charCodes2[charCodes2["uppercaseX"] = uppercaseX] = "uppercaseX";
    const uppercaseY = 89;
    charCodes2[charCodes2["uppercaseY"] = uppercaseY] = "uppercaseY";
    const uppercaseZ = 90;
    charCodes2[charCodes2["uppercaseZ"] = uppercaseZ] = "uppercaseZ";
    const leftSquareBracket = 91;
    charCodes2[charCodes2["leftSquareBracket"] = leftSquareBracket] = "leftSquareBracket";
    const backslash = 92;
    charCodes2[charCodes2["backslash"] = backslash] = "backslash";
    const rightSquareBracket = 93;
    charCodes2[charCodes2["rightSquareBracket"] = rightSquareBracket] = "rightSquareBracket";
    const caret = 94;
    charCodes2[charCodes2["caret"] = caret] = "caret";
    const underscore = 95;
    charCodes2[charCodes2["underscore"] = underscore] = "underscore";
    const graveAccent = 96;
    charCodes2[charCodes2["graveAccent"] = graveAccent] = "graveAccent";
    const lowercaseA = 97;
    charCodes2[charCodes2["lowercaseA"] = lowercaseA] = "lowercaseA";
    const lowercaseB = 98;
    charCodes2[charCodes2["lowercaseB"] = lowercaseB] = "lowercaseB";
    const lowercaseC = 99;
    charCodes2[charCodes2["lowercaseC"] = lowercaseC] = "lowercaseC";
    const lowercaseD = 100;
    charCodes2[charCodes2["lowercaseD"] = lowercaseD] = "lowercaseD";
    const lowercaseE = 101;
    charCodes2[charCodes2["lowercaseE"] = lowercaseE] = "lowercaseE";
    const lowercaseF = 102;
    charCodes2[charCodes2["lowercaseF"] = lowercaseF] = "lowercaseF";
    const lowercaseG = 103;
    charCodes2[charCodes2["lowercaseG"] = lowercaseG] = "lowercaseG";
    const lowercaseH = 104;
    charCodes2[charCodes2["lowercaseH"] = lowercaseH] = "lowercaseH";
    const lowercaseI = 105;
    charCodes2[charCodes2["lowercaseI"] = lowercaseI] = "lowercaseI";
    const lowercaseJ = 106;
    charCodes2[charCodes2["lowercaseJ"] = lowercaseJ] = "lowercaseJ";
    const lowercaseK = 107;
    charCodes2[charCodes2["lowercaseK"] = lowercaseK] = "lowercaseK";
    const lowercaseL = 108;
    charCodes2[charCodes2["lowercaseL"] = lowercaseL] = "lowercaseL";
    const lowercaseM = 109;
    charCodes2[charCodes2["lowercaseM"] = lowercaseM] = "lowercaseM";
    const lowercaseN = 110;
    charCodes2[charCodes2["lowercaseN"] = lowercaseN] = "lowercaseN";
    const lowercaseO = 111;
    charCodes2[charCodes2["lowercaseO"] = lowercaseO] = "lowercaseO";
    const lowercaseP = 112;
    charCodes2[charCodes2["lowercaseP"] = lowercaseP] = "lowercaseP";
    const lowercaseQ = 113;
    charCodes2[charCodes2["lowercaseQ"] = lowercaseQ] = "lowercaseQ";
    const lowercaseR = 114;
    charCodes2[charCodes2["lowercaseR"] = lowercaseR] = "lowercaseR";
    const lowercaseS = 115;
    charCodes2[charCodes2["lowercaseS"] = lowercaseS] = "lowercaseS";
    const lowercaseT = 116;
    charCodes2[charCodes2["lowercaseT"] = lowercaseT] = "lowercaseT";
    const lowercaseU = 117;
    charCodes2[charCodes2["lowercaseU"] = lowercaseU] = "lowercaseU";
    const lowercaseV = 118;
    charCodes2[charCodes2["lowercaseV"] = lowercaseV] = "lowercaseV";
    const lowercaseW = 119;
    charCodes2[charCodes2["lowercaseW"] = lowercaseW] = "lowercaseW";
    const lowercaseX = 120;
    charCodes2[charCodes2["lowercaseX"] = lowercaseX] = "lowercaseX";
    const lowercaseY = 121;
    charCodes2[charCodes2["lowercaseY"] = lowercaseY] = "lowercaseY";
    const lowercaseZ = 122;
    charCodes2[charCodes2["lowercaseZ"] = lowercaseZ] = "lowercaseZ";
    const leftCurlyBrace = 123;
    charCodes2[charCodes2["leftCurlyBrace"] = leftCurlyBrace] = "leftCurlyBrace";
    const verticalBar = 124;
    charCodes2[charCodes2["verticalBar"] = verticalBar] = "verticalBar";
    const rightCurlyBrace = 125;
    charCodes2[charCodes2["rightCurlyBrace"] = rightCurlyBrace] = "rightCurlyBrace";
    const tilde = 126;
    charCodes2[charCodes2["tilde"] = tilde] = "tilde";
    const nonBreakingSpace = 160;
    charCodes2[charCodes2["nonBreakingSpace"] = nonBreakingSpace] = "nonBreakingSpace";
    const oghamSpaceMark = 5760;
    charCodes2[charCodes2["oghamSpaceMark"] = oghamSpaceMark] = "oghamSpaceMark";
    const lineSeparator = 8232;
    charCodes2[charCodes2["lineSeparator"] = lineSeparator] = "lineSeparator";
    const paragraphSeparator = 8233;
    charCodes2[charCodes2["paragraphSeparator"] = paragraphSeparator] = "paragraphSeparator";
  })(charCodes || (charCodes = {}));

  // node_modules/sucrase/dist/esm/parser/traverser/base.js
  var isJSXEnabled;
  var isTypeScriptEnabled;
  var isFlowEnabled;
  var state;
  var input;
  var nextContextId;
  function getNextContextId() {
    return nextContextId++;
  }
  function augmentError(error) {
    if ("pos" in error) {
      const loc = locationForIndex(error.pos);
      error.message += ` (${loc.line}:${loc.column})`;
      error.loc = loc;
    }
    return error;
  }
  var Loc = class {
    constructor(line, column) {
      this.line = line;
      this.column = column;
    }
  };
  function locationForIndex(pos) {
    let line = 1;
    let column = 1;
    for (let i = 0; i < pos; i++) {
      if (input.charCodeAt(i) === charCodes.lineFeed) {
        line++;
        column = 1;
      } else {
        column++;
      }
    }
    return new Loc(line, column);
  }
  function initParser(inputCode, isJSXEnabledArg, isTypeScriptEnabledArg, isFlowEnabledArg) {
    input = inputCode;
    state = new State();
    nextContextId = 1;
    isJSXEnabled = isJSXEnabledArg;
    isTypeScriptEnabled = isTypeScriptEnabledArg;
    isFlowEnabled = isFlowEnabledArg;
  }

  // node_modules/sucrase/dist/esm/parser/traverser/util.js
  function isContextual(contextualKeyword) {
    return state.contextualKeyword === contextualKeyword;
  }
  function isLookaheadContextual(contextualKeyword) {
    const l = lookaheadTypeAndKeyword();
    return l.type === TokenType.name && l.contextualKeyword === contextualKeyword;
  }
  function eatContextual(contextualKeyword) {
    return state.contextualKeyword === contextualKeyword && eat(TokenType.name);
  }
  function expectContextual(contextualKeyword) {
    if (!eatContextual(contextualKeyword)) {
      unexpected();
    }
  }
  function canInsertSemicolon() {
    return match(TokenType.eof) || match(TokenType.braceR) || hasPrecedingLineBreak();
  }
  function hasPrecedingLineBreak() {
    const prevToken = state.tokens[state.tokens.length - 1];
    const lastTokEnd = prevToken ? prevToken.end : 0;
    for (let i = lastTokEnd; i < state.start; i++) {
      const code = input.charCodeAt(i);
      if (code === charCodes.lineFeed || code === charCodes.carriageReturn || code === 8232 || code === 8233) {
        return true;
      }
    }
    return false;
  }
  function hasFollowingLineBreak() {
    const nextStart = nextTokenStart();
    for (let i = state.end; i < nextStart; i++) {
      const code = input.charCodeAt(i);
      if (code === charCodes.lineFeed || code === charCodes.carriageReturn || code === 8232 || code === 8233) {
        return true;
      }
    }
    return false;
  }
  function isLineTerminator() {
    return eat(TokenType.semi) || canInsertSemicolon();
  }
  function semicolon() {
    if (!isLineTerminator()) {
      unexpected('Unexpected token, expected ";"');
    }
  }
  function expect(type) {
    const matched = eat(type);
    if (!matched) {
      unexpected(`Unexpected token, expected "${formatTokenType(type)}"`);
    }
  }
  function unexpected(message = "Unexpected token", pos = state.start) {
    if (state.error) {
      return;
    }
    const err = new SyntaxError(message);
    err.pos = pos;
    state.error = err;
    state.pos = input.length;
    finishToken(TokenType.eof);
  }

  // node_modules/sucrase/dist/esm/parser/util/whitespace.js
  var WHITESPACE_CHARS = [
    9,
    11,
    12,
    charCodes.space,
    charCodes.nonBreakingSpace,
    charCodes.oghamSpaceMark,
    8192,
    // EN QUAD
    8193,
    // EM QUAD
    8194,
    // EN SPACE
    8195,
    // EM SPACE
    8196,
    // THREE-PER-EM SPACE
    8197,
    // FOUR-PER-EM SPACE
    8198,
    // SIX-PER-EM SPACE
    8199,
    // FIGURE SPACE
    8200,
    // PUNCTUATION SPACE
    8201,
    // THIN SPACE
    8202,
    // HAIR SPACE
    8239,
    // NARROW NO-BREAK SPACE
    8287,
    // MEDIUM MATHEMATICAL SPACE
    12288,
    // IDEOGRAPHIC SPACE
    65279
    // ZERO WIDTH NO-BREAK SPACE
  ];
  var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
  var IS_WHITESPACE = new Uint8Array(65536);
  for (const char of WHITESPACE_CHARS) {
    IS_WHITESPACE[char] = 1;
  }

  // node_modules/sucrase/dist/esm/parser/util/identifier.js
  function computeIsIdentifierChar(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    if (code < 128) return false;
    throw new Error("Should not be called with non-ASCII char code.");
  }
  var IS_IDENTIFIER_CHAR = new Uint8Array(65536);
  for (let i = 0; i < 128; i++) {
    IS_IDENTIFIER_CHAR[i] = computeIsIdentifierChar(i) ? 1 : 0;
  }
  for (let i = 128; i < 65536; i++) {
    IS_IDENTIFIER_CHAR[i] = 1;
  }
  for (const whitespaceChar of WHITESPACE_CHARS) {
    IS_IDENTIFIER_CHAR[whitespaceChar] = 0;
  }
  IS_IDENTIFIER_CHAR[8232] = 0;
  IS_IDENTIFIER_CHAR[8233] = 0;
  var IS_IDENTIFIER_START = IS_IDENTIFIER_CHAR.slice();
  for (let numChar = charCodes.digit0; numChar <= charCodes.digit9; numChar++) {
    IS_IDENTIFIER_START[numChar] = 0;
  }

  // node_modules/sucrase/dist/esm/parser/tokenizer/readWordTree.js
  var READ_WORD_TREE = new Int32Array([
    // ""
    -1,
    27,
    783,
    918,
    1755,
    2376,
    2862,
    3483,
    -1,
    3699,
    -1,
    4617,
    4752,
    4833,
    5130,
    5508,
    5940,
    -1,
    6480,
    6939,
    7749,
    8181,
    8451,
    8613,
    -1,
    8829,
    -1,
    // "a"
    -1,
    -1,
    54,
    243,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    432,
    -1,
    -1,
    -1,
    675,
    -1,
    -1,
    -1,
    // "ab"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    81,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "abs"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    108,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "abst"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    135,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "abstr"
    -1,
    162,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "abstra"
    -1,
    -1,
    -1,
    189,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "abstrac"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    216,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "abstract"
    ContextualKeyword._abstract << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ac"
    -1,
    -1,
    -1,
    270,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "acc"
    -1,
    -1,
    -1,
    -1,
    -1,
    297,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "acce"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    324,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "acces"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    351,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "access"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    378,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "accesso"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    405,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "accessor"
    ContextualKeyword._accessor << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "as"
    ContextualKeyword._as << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    459,
    -1,
    -1,
    -1,
    -1,
    -1,
    594,
    -1,
    // "ass"
    -1,
    -1,
    -1,
    -1,
    -1,
    486,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "asse"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    513,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "asser"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    540,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "assert"
    ContextualKeyword._assert << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    567,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "asserts"
    ContextualKeyword._asserts << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "asy"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    621,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "asyn"
    -1,
    -1,
    -1,
    648,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "async"
    ContextualKeyword._async << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "aw"
    -1,
    702,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "awa"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    729,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "awai"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    756,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "await"
    ContextualKeyword._await << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "b"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    810,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "br"
    -1,
    -1,
    -1,
    -1,
    -1,
    837,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "bre"
    -1,
    864,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "brea"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    891,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "break"
    (TokenType._break << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "c"
    -1,
    945,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1107,
    -1,
    -1,
    -1,
    1242,
    -1,
    -1,
    1350,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ca"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    972,
    1026,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "cas"
    -1,
    -1,
    -1,
    -1,
    -1,
    999,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "case"
    (TokenType._case << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "cat"
    -1,
    -1,
    -1,
    1053,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "catc"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1080,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "catch"
    (TokenType._catch << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ch"
    -1,
    -1,
    -1,
    -1,
    -1,
    1134,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "che"
    -1,
    -1,
    -1,
    1161,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "chec"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1188,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "check"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1215,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "checks"
    ContextualKeyword._checks << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "cl"
    -1,
    1269,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "cla"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1296,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "clas"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1323,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "class"
    (TokenType._class << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "co"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1377,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "con"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1404,
    1620,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "cons"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1431,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "const"
    (TokenType._const << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1458,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "constr"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1485,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "constru"
    -1,
    -1,
    -1,
    1512,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "construc"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1539,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "construct"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1566,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "constructo"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1593,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "constructor"
    ContextualKeyword._constructor << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "cont"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1647,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "conti"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1674,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "contin"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1701,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "continu"
    -1,
    -1,
    -1,
    -1,
    -1,
    1728,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "continue"
    (TokenType._continue << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "d"
    -1,
    -1,
    -1,
    -1,
    -1,
    1782,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2349,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "de"
    -1,
    -1,
    1809,
    1971,
    -1,
    -1,
    2106,
    -1,
    -1,
    -1,
    -1,
    -1,
    2241,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "deb"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1836,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "debu"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1863,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "debug"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1890,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "debugg"
    -1,
    -1,
    -1,
    -1,
    -1,
    1917,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "debugge"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1944,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "debugger"
    (TokenType._debugger << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "dec"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1998,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "decl"
    -1,
    2025,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "decla"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2052,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "declar"
    -1,
    -1,
    -1,
    -1,
    -1,
    2079,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "declare"
    ContextualKeyword._declare << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "def"
    -1,
    2133,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "defa"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2160,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "defau"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2187,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "defaul"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2214,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "default"
    (TokenType._default << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "del"
    -1,
    -1,
    -1,
    -1,
    -1,
    2268,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "dele"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2295,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "delet"
    -1,
    -1,
    -1,
    -1,
    -1,
    2322,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "delete"
    (TokenType._delete << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "do"
    (TokenType._do << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "e"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2403,
    -1,
    2484,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2565,
    -1,
    -1,
    // "el"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2430,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "els"
    -1,
    -1,
    -1,
    -1,
    -1,
    2457,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "else"
    (TokenType._else << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "en"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2511,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "enu"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2538,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "enum"
    ContextualKeyword._enum << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ex"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2592,
    -1,
    -1,
    -1,
    2727,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "exp"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2619,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "expo"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2646,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "expor"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2673,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "export"
    (TokenType._export << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2700,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "exports"
    ContextualKeyword._exports << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ext"
    -1,
    -1,
    -1,
    -1,
    -1,
    2754,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "exte"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2781,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "exten"
    -1,
    -1,
    -1,
    -1,
    2808,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "extend"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2835,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "extends"
    (TokenType._extends << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "f"
    -1,
    2889,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2997,
    -1,
    -1,
    -1,
    -1,
    -1,
    3159,
    -1,
    -1,
    3213,
    -1,
    -1,
    3294,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fa"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2916,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fal"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2943,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fals"
    -1,
    -1,
    -1,
    -1,
    -1,
    2970,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "false"
    (TokenType._false << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3024,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fin"
    -1,
    3051,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fina"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3078,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "final"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3105,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "finall"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3132,
    -1,
    // "finally"
    (TokenType._finally << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fo"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3186,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "for"
    (TokenType._for << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fr"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3240,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fro"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3267,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "from"
    ContextualKeyword._from << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fu"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3321,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "fun"
    -1,
    -1,
    -1,
    3348,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "func"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3375,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "funct"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3402,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "functi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3429,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "functio"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3456,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "function"
    (TokenType._function << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "g"
    -1,
    -1,
    -1,
    -1,
    -1,
    3510,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3564,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ge"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3537,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "get"
    ContextualKeyword._get << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "gl"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3591,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "glo"
    -1,
    -1,
    3618,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "glob"
    -1,
    3645,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "globa"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3672,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "global"
    ContextualKeyword._global << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "i"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3726,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3753,
    4077,
    -1,
    -1,
    -1,
    -1,
    4590,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "if"
    (TokenType._if << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "im"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3780,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "imp"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3807,
    -1,
    -1,
    3996,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "impl"
    -1,
    -1,
    -1,
    -1,
    -1,
    3834,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "imple"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3861,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "implem"
    -1,
    -1,
    -1,
    -1,
    -1,
    3888,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "impleme"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3915,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "implemen"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3942,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "implement"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3969,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "implements"
    ContextualKeyword._implements << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "impo"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4023,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "impor"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4050,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "import"
    (TokenType._import << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "in"
    (TokenType._in << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4104,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4185,
    4401,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "inf"
    -1,
    -1,
    -1,
    -1,
    -1,
    4131,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "infe"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4158,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "infer"
    ContextualKeyword._infer << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ins"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4212,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "inst"
    -1,
    4239,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "insta"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4266,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "instan"
    -1,
    -1,
    -1,
    4293,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "instanc"
    -1,
    -1,
    -1,
    -1,
    -1,
    4320,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "instance"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4347,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "instanceo"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4374,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "instanceof"
    (TokenType._instanceof << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "int"
    -1,
    -1,
    -1,
    -1,
    -1,
    4428,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "inte"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4455,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "inter"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4482,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "interf"
    -1,
    4509,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "interfa"
    -1,
    -1,
    -1,
    4536,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "interfac"
    -1,
    -1,
    -1,
    -1,
    -1,
    4563,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "interface"
    ContextualKeyword._interface << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "is"
    ContextualKeyword._is << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "k"
    -1,
    -1,
    -1,
    -1,
    -1,
    4644,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ke"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4671,
    -1,
    // "key"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4698,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "keyo"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4725,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "keyof"
    ContextualKeyword._keyof << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "l"
    -1,
    -1,
    -1,
    -1,
    -1,
    4779,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "le"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4806,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "let"
    (TokenType._let << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "m"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4860,
    -1,
    -1,
    -1,
    -1,
    -1,
    4995,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "mi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4887,
    -1,
    -1,
    // "mix"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4914,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "mixi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4941,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "mixin"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4968,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "mixins"
    ContextualKeyword._mixins << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "mo"
    -1,
    -1,
    -1,
    -1,
    5022,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "mod"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5049,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "modu"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5076,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "modul"
    -1,
    -1,
    -1,
    -1,
    -1,
    5103,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "module"
    ContextualKeyword._module << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "n"
    -1,
    5157,
    -1,
    -1,
    -1,
    5373,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5427,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "na"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5184,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "nam"
    -1,
    -1,
    -1,
    -1,
    -1,
    5211,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "name"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5238,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "names"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5265,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "namesp"
    -1,
    5292,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "namespa"
    -1,
    -1,
    -1,
    5319,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "namespac"
    -1,
    -1,
    -1,
    -1,
    -1,
    5346,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "namespace"
    ContextualKeyword._namespace << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ne"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5400,
    -1,
    -1,
    -1,
    // "new"
    (TokenType._new << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "nu"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5454,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "nul"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5481,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "null"
    (TokenType._null << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "o"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5535,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5562,
    -1,
    -1,
    -1,
    -1,
    5697,
    5751,
    -1,
    -1,
    -1,
    -1,
    // "of"
    ContextualKeyword._of << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "op"
    -1,
    5589,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "opa"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5616,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "opaq"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5643,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "opaqu"
    -1,
    -1,
    -1,
    -1,
    -1,
    5670,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "opaque"
    ContextualKeyword._opaque << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ou"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5724,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "out"
    ContextualKeyword._out << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ov"
    -1,
    -1,
    -1,
    -1,
    -1,
    5778,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ove"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5805,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "over"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5832,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "overr"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5859,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "overri"
    -1,
    -1,
    -1,
    -1,
    5886,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "overrid"
    -1,
    -1,
    -1,
    -1,
    -1,
    5913,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "override"
    ContextualKeyword._override << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "p"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5967,
    -1,
    -1,
    6345,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "pr"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5994,
    -1,
    -1,
    -1,
    -1,
    -1,
    6129,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "pri"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6021,
    -1,
    -1,
    -1,
    -1,
    // "priv"
    -1,
    6048,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "priva"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6075,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "privat"
    -1,
    -1,
    -1,
    -1,
    -1,
    6102,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "private"
    ContextualKeyword._private << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "pro"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6156,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "prot"
    -1,
    -1,
    -1,
    -1,
    -1,
    6183,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6318,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "prote"
    -1,
    -1,
    -1,
    6210,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "protec"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6237,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "protect"
    -1,
    -1,
    -1,
    -1,
    -1,
    6264,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "protecte"
    -1,
    -1,
    -1,
    -1,
    6291,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "protected"
    ContextualKeyword._protected << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "proto"
    ContextualKeyword._proto << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "pu"
    -1,
    -1,
    6372,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "pub"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6399,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "publ"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6426,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "publi"
    -1,
    -1,
    -1,
    6453,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "public"
    ContextualKeyword._public << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "r"
    -1,
    -1,
    -1,
    -1,
    -1,
    6507,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "re"
    -1,
    6534,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6696,
    -1,
    -1,
    6831,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "rea"
    -1,
    -1,
    -1,
    -1,
    6561,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "read"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6588,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "reado"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6615,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "readon"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6642,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "readonl"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6669,
    -1,
    // "readonly"
    ContextualKeyword._readonly << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "req"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6723,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "requ"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6750,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "requi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6777,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "requir"
    -1,
    -1,
    -1,
    -1,
    -1,
    6804,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "require"
    ContextualKeyword._require << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ret"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6858,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "retu"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6885,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "retur"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6912,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "return"
    (TokenType._return << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "s"
    -1,
    6966,
    -1,
    -1,
    -1,
    7182,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7236,
    7371,
    -1,
    7479,
    -1,
    7614,
    -1,
    // "sa"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6993,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "sat"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7020,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "sati"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7047,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "satis"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7074,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "satisf"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7101,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "satisfi"
    -1,
    -1,
    -1,
    -1,
    -1,
    7128,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "satisfie"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7155,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "satisfies"
    ContextualKeyword._satisfies << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "se"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7209,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "set"
    ContextualKeyword._set << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "st"
    -1,
    7263,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "sta"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7290,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "stat"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7317,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "stati"
    -1,
    -1,
    -1,
    7344,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "static"
    ContextualKeyword._static << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "su"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7398,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "sup"
    -1,
    -1,
    -1,
    -1,
    -1,
    7425,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "supe"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7452,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "super"
    (TokenType._super << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "sw"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7506,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "swi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7533,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "swit"
    -1,
    -1,
    -1,
    7560,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "switc"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7587,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "switch"
    (TokenType._switch << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "sy"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7641,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "sym"
    -1,
    -1,
    7668,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "symb"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7695,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "symbo"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7722,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "symbol"
    ContextualKeyword._symbol << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "t"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7776,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7938,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8046,
    -1,
    // "th"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7803,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7857,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "thi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7830,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "this"
    (TokenType._this << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "thr"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7884,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "thro"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7911,
    -1,
    -1,
    -1,
    // "throw"
    (TokenType._throw << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "tr"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7965,
    -1,
    -1,
    -1,
    8019,
    -1,
    // "tru"
    -1,
    -1,
    -1,
    -1,
    -1,
    7992,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "true"
    (TokenType._true << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "try"
    (TokenType._try << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "ty"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8073,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "typ"
    -1,
    -1,
    -1,
    -1,
    -1,
    8100,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "type"
    ContextualKeyword._type << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8127,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "typeo"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8154,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "typeof"
    (TokenType._typeof << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "u"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8208,
    -1,
    -1,
    -1,
    -1,
    8343,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "un"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8235,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "uni"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8262,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "uniq"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8289,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "uniqu"
    -1,
    -1,
    -1,
    -1,
    -1,
    8316,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "unique"
    ContextualKeyword._unique << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "us"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8370,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "usi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8397,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "usin"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8424,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "using"
    ContextualKeyword._using << 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "v"
    -1,
    8478,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8532,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "va"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8505,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "var"
    (TokenType._var << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "vo"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8559,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "voi"
    -1,
    -1,
    -1,
    -1,
    8586,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "void"
    (TokenType._void << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "w"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8640,
    8748,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "wh"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8667,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "whi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8694,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "whil"
    -1,
    -1,
    -1,
    -1,
    -1,
    8721,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "while"
    (TokenType._while << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "wi"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8775,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "wit"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8802,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "with"
    (TokenType._with << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "y"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8856,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "yi"
    -1,
    -1,
    -1,
    -1,
    -1,
    8883,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "yie"
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8910,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "yiel"
    -1,
    -1,
    -1,
    -1,
    8937,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    // "yield"
    (TokenType._yield << 1) + 1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
  ]);

  // node_modules/sucrase/dist/esm/parser/tokenizer/readWord.js
  function readWord() {
    let treePos = 0;
    let code = 0;
    let pos = state.pos;
    while (pos < input.length) {
      code = input.charCodeAt(pos);
      if (code < charCodes.lowercaseA || code > charCodes.lowercaseZ) {
        break;
      }
      const next2 = READ_WORD_TREE[treePos + (code - charCodes.lowercaseA) + 1];
      if (next2 === -1) {
        break;
      } else {
        treePos = next2;
        pos++;
      }
    }
    const keywordValue = READ_WORD_TREE[treePos];
    if (keywordValue > -1 && !IS_IDENTIFIER_CHAR[code]) {
      state.pos = pos;
      if (keywordValue & 1) {
        finishToken(keywordValue >>> 1);
      } else {
        finishToken(TokenType.name, keywordValue >>> 1);
      }
      return;
    }
    while (pos < input.length) {
      const ch = input.charCodeAt(pos);
      if (IS_IDENTIFIER_CHAR[ch]) {
        pos++;
      } else if (ch === charCodes.backslash) {
        pos += 2;
        if (input.charCodeAt(pos) === charCodes.leftCurlyBrace) {
          while (pos < input.length && input.charCodeAt(pos) !== charCodes.rightCurlyBrace) {
            pos++;
          }
          pos++;
        }
      } else if (ch === charCodes.atSign && input.charCodeAt(pos + 1) === charCodes.atSign) {
        pos += 2;
      } else {
        break;
      }
    }
    state.pos = pos;
    finishToken(TokenType.name);
  }

  // node_modules/sucrase/dist/esm/parser/tokenizer/index.js
  var IdentifierRole;
  (function(IdentifierRole2) {
    const Access = 0;
    IdentifierRole2[IdentifierRole2["Access"] = Access] = "Access";
    const ExportAccess = Access + 1;
    IdentifierRole2[IdentifierRole2["ExportAccess"] = ExportAccess] = "ExportAccess";
    const TopLevelDeclaration = ExportAccess + 1;
    IdentifierRole2[IdentifierRole2["TopLevelDeclaration"] = TopLevelDeclaration] = "TopLevelDeclaration";
    const FunctionScopedDeclaration = TopLevelDeclaration + 1;
    IdentifierRole2[IdentifierRole2["FunctionScopedDeclaration"] = FunctionScopedDeclaration] = "FunctionScopedDeclaration";
    const BlockScopedDeclaration = FunctionScopedDeclaration + 1;
    IdentifierRole2[IdentifierRole2["BlockScopedDeclaration"] = BlockScopedDeclaration] = "BlockScopedDeclaration";
    const ObjectShorthandTopLevelDeclaration = BlockScopedDeclaration + 1;
    IdentifierRole2[IdentifierRole2["ObjectShorthandTopLevelDeclaration"] = ObjectShorthandTopLevelDeclaration] = "ObjectShorthandTopLevelDeclaration";
    const ObjectShorthandFunctionScopedDeclaration = ObjectShorthandTopLevelDeclaration + 1;
    IdentifierRole2[IdentifierRole2["ObjectShorthandFunctionScopedDeclaration"] = ObjectShorthandFunctionScopedDeclaration] = "ObjectShorthandFunctionScopedDeclaration";
    const ObjectShorthandBlockScopedDeclaration = ObjectShorthandFunctionScopedDeclaration + 1;
    IdentifierRole2[IdentifierRole2["ObjectShorthandBlockScopedDeclaration"] = ObjectShorthandBlockScopedDeclaration] = "ObjectShorthandBlockScopedDeclaration";
    const ObjectShorthand = ObjectShorthandBlockScopedDeclaration + 1;
    IdentifierRole2[IdentifierRole2["ObjectShorthand"] = ObjectShorthand] = "ObjectShorthand";
    const ImportDeclaration = ObjectShorthand + 1;
    IdentifierRole2[IdentifierRole2["ImportDeclaration"] = ImportDeclaration] = "ImportDeclaration";
    const ObjectKey = ImportDeclaration + 1;
    IdentifierRole2[IdentifierRole2["ObjectKey"] = ObjectKey] = "ObjectKey";
    const ImportAccess = ObjectKey + 1;
    IdentifierRole2[IdentifierRole2["ImportAccess"] = ImportAccess] = "ImportAccess";
  })(IdentifierRole || (IdentifierRole = {}));
  var JSXRole;
  (function(JSXRole2) {
    const NoChildren = 0;
    JSXRole2[JSXRole2["NoChildren"] = NoChildren] = "NoChildren";
    const OneChild = NoChildren + 1;
    JSXRole2[JSXRole2["OneChild"] = OneChild] = "OneChild";
    const StaticChildren = OneChild + 1;
    JSXRole2[JSXRole2["StaticChildren"] = StaticChildren] = "StaticChildren";
    const KeyAfterPropSpread = StaticChildren + 1;
    JSXRole2[JSXRole2["KeyAfterPropSpread"] = KeyAfterPropSpread] = "KeyAfterPropSpread";
  })(JSXRole || (JSXRole = {}));
  function isDeclaration(token) {
    const role = token.identifierRole;
    return role === IdentifierRole.TopLevelDeclaration || role === IdentifierRole.FunctionScopedDeclaration || role === IdentifierRole.BlockScopedDeclaration || role === IdentifierRole.ObjectShorthandTopLevelDeclaration || role === IdentifierRole.ObjectShorthandFunctionScopedDeclaration || role === IdentifierRole.ObjectShorthandBlockScopedDeclaration;
  }
  function isNonTopLevelDeclaration(token) {
    const role = token.identifierRole;
    return role === IdentifierRole.FunctionScopedDeclaration || role === IdentifierRole.BlockScopedDeclaration || role === IdentifierRole.ObjectShorthandFunctionScopedDeclaration || role === IdentifierRole.ObjectShorthandBlockScopedDeclaration;
  }
  function isTopLevelDeclaration(token) {
    const role = token.identifierRole;
    return role === IdentifierRole.TopLevelDeclaration || role === IdentifierRole.ObjectShorthandTopLevelDeclaration || role === IdentifierRole.ImportDeclaration;
  }
  function isBlockScopedDeclaration(token) {
    const role = token.identifierRole;
    return role === IdentifierRole.TopLevelDeclaration || role === IdentifierRole.BlockScopedDeclaration || role === IdentifierRole.ObjectShorthandTopLevelDeclaration || role === IdentifierRole.ObjectShorthandBlockScopedDeclaration;
  }
  function isFunctionScopedDeclaration(token) {
    const role = token.identifierRole;
    return role === IdentifierRole.FunctionScopedDeclaration || role === IdentifierRole.ObjectShorthandFunctionScopedDeclaration;
  }
  function isObjectShorthandDeclaration(token) {
    return token.identifierRole === IdentifierRole.ObjectShorthandTopLevelDeclaration || token.identifierRole === IdentifierRole.ObjectShorthandBlockScopedDeclaration || token.identifierRole === IdentifierRole.ObjectShorthandFunctionScopedDeclaration;
  }
  var Token = class {
    constructor() {
      this.type = state.type;
      this.contextualKeyword = state.contextualKeyword;
      this.start = state.start;
      this.end = state.end;
      this.scopeDepth = state.scopeDepth;
      this.isType = state.isType;
      this.identifierRole = null;
      this.jsxRole = null;
      this.shadowsGlobal = false;
      this.isAsyncOperation = false;
      this.contextId = null;
      this.rhsEndIndex = null;
      this.isExpression = false;
      this.numNullishCoalesceStarts = 0;
      this.numNullishCoalesceEnds = 0;
      this.isOptionalChainStart = false;
      this.isOptionalChainEnd = false;
      this.subscriptStartIndex = null;
      this.nullishStartIndex = null;
    }
    // Initially false for all tokens, then may be computed in a follow-up step that does scope
    // analysis.
    // Initially false for all tokens, but may be set during transform to mark it as containing an
    // await operation.
    // For assignments, the index of the RHS. For export tokens, the end of the export.
    // For class tokens, records if the class is a class expression or a class statement.
    // Number of times to insert a `nullishCoalesce(` snippet before this token.
    // Number of times to insert a `)` snippet after this token.
    // If true, insert an `optionalChain([` snippet before this token.
    // If true, insert a `])` snippet after this token.
    // Tag for `.`, `?.`, `[`, `?.[`, `(`, and `?.(` to denote the "root" token for this
    // subscript chain. This can be used to determine if this chain is an optional chain.
    // Tag for `??` operators to denote the root token for this nullish coalescing call.
  };
  function next() {
    state.tokens.push(new Token());
    nextToken();
  }
  function nextTemplateToken() {
    state.tokens.push(new Token());
    state.start = state.pos;
    readTmplToken();
  }
  function retokenizeSlashAsRegex() {
    if (state.type === TokenType.assign) {
      --state.pos;
    }
    readRegexp();
  }
  function pushTypeContext(existingTokensInType) {
    for (let i = state.tokens.length - existingTokensInType; i < state.tokens.length; i++) {
      state.tokens[i].isType = true;
    }
    const oldIsType = state.isType;
    state.isType = true;
    return oldIsType;
  }
  function popTypeContext(oldIsType) {
    state.isType = oldIsType;
  }
  function eat(type) {
    if (match(type)) {
      next();
      return true;
    } else {
      return false;
    }
  }
  function eatTypeToken(tokenType) {
    const oldIsType = state.isType;
    state.isType = true;
    eat(tokenType);
    state.isType = oldIsType;
  }
  function match(type) {
    return state.type === type;
  }
  function lookaheadType() {
    const snapshot = state.snapshot();
    next();
    const type = state.type;
    state.restoreFromSnapshot(snapshot);
    return type;
  }
  var TypeAndKeyword = class {
    constructor(type, contextualKeyword) {
      this.type = type;
      this.contextualKeyword = contextualKeyword;
    }
  };
  function lookaheadTypeAndKeyword() {
    const snapshot = state.snapshot();
    next();
    const type = state.type;
    const contextualKeyword = state.contextualKeyword;
    state.restoreFromSnapshot(snapshot);
    return new TypeAndKeyword(type, contextualKeyword);
  }
  function nextTokenStart() {
    return nextTokenStartSince(state.pos);
  }
  function nextTokenStartSince(pos) {
    skipWhiteSpace.lastIndex = pos;
    const skip = skipWhiteSpace.exec(input);
    return pos + skip[0].length;
  }
  function lookaheadCharCode() {
    return input.charCodeAt(nextTokenStart());
  }
  function nextToken() {
    skipSpace();
    state.start = state.pos;
    if (state.pos >= input.length) {
      const tokens = state.tokens;
      if (tokens.length >= 2 && tokens[tokens.length - 1].start >= input.length && tokens[tokens.length - 2].start >= input.length) {
        unexpected("Unexpectedly reached the end of input.");
      }
      finishToken(TokenType.eof);
      return;
    }
    readToken(input.charCodeAt(state.pos));
  }
  function readToken(code) {
    if (IS_IDENTIFIER_START[code] || code === charCodes.backslash || code === charCodes.atSign && input.charCodeAt(state.pos + 1) === charCodes.atSign) {
      readWord();
    } else {
      getTokenFromCode(code);
    }
  }
  function skipBlockComment() {
    while (input.charCodeAt(state.pos) !== charCodes.asterisk || input.charCodeAt(state.pos + 1) !== charCodes.slash) {
      state.pos++;
      if (state.pos > input.length) {
        unexpected("Unterminated comment", state.pos - 2);
        return;
      }
    }
    state.pos += 2;
  }
  function skipLineComment(startSkip) {
    let ch = input.charCodeAt(state.pos += startSkip);
    if (state.pos < input.length) {
      while (ch !== charCodes.lineFeed && ch !== charCodes.carriageReturn && ch !== charCodes.lineSeparator && ch !== charCodes.paragraphSeparator && ++state.pos < input.length) {
        ch = input.charCodeAt(state.pos);
      }
    }
  }
  function skipSpace() {
    while (state.pos < input.length) {
      const ch = input.charCodeAt(state.pos);
      switch (ch) {
        case charCodes.carriageReturn:
          if (input.charCodeAt(state.pos + 1) === charCodes.lineFeed) {
            ++state.pos;
          }
        case charCodes.lineFeed:
        case charCodes.lineSeparator:
        case charCodes.paragraphSeparator:
          ++state.pos;
          break;
        case charCodes.slash:
          switch (input.charCodeAt(state.pos + 1)) {
            case charCodes.asterisk:
              state.pos += 2;
              skipBlockComment();
              break;
            case charCodes.slash:
              skipLineComment(2);
              break;
            default:
              return;
          }
          break;
        default:
          if (IS_WHITESPACE[ch]) {
            ++state.pos;
          } else {
            return;
          }
      }
    }
  }
  function finishToken(type, contextualKeyword = ContextualKeyword.NONE) {
    state.end = state.pos;
    state.type = type;
    state.contextualKeyword = contextualKeyword;
  }
  function readToken_dot() {
    const nextChar = input.charCodeAt(state.pos + 1);
    if (nextChar >= charCodes.digit0 && nextChar <= charCodes.digit9) {
      readNumber(true);
      return;
    }
    if (nextChar === charCodes.dot && input.charCodeAt(state.pos + 2) === charCodes.dot) {
      state.pos += 3;
      finishToken(TokenType.ellipsis);
    } else {
      ++state.pos;
      finishToken(TokenType.dot);
    }
  }
  function readToken_slash() {
    const nextChar = input.charCodeAt(state.pos + 1);
    if (nextChar === charCodes.equalsTo) {
      finishOp(TokenType.assign, 2);
    } else {
      finishOp(TokenType.slash, 1);
    }
  }
  function readToken_mult_modulo(code) {
    let tokenType = code === charCodes.asterisk ? TokenType.star : TokenType.modulo;
    let width = 1;
    let nextChar = input.charCodeAt(state.pos + 1);
    if (code === charCodes.asterisk && nextChar === charCodes.asterisk) {
      width++;
      nextChar = input.charCodeAt(state.pos + 2);
      tokenType = TokenType.exponent;
    }
    if (nextChar === charCodes.equalsTo && input.charCodeAt(state.pos + 2) !== charCodes.greaterThan) {
      width++;
      tokenType = TokenType.assign;
    }
    finishOp(tokenType, width);
  }
  function readToken_pipe_amp(code) {
    const nextChar = input.charCodeAt(state.pos + 1);
    if (nextChar === code) {
      if (input.charCodeAt(state.pos + 2) === charCodes.equalsTo) {
        finishOp(TokenType.assign, 3);
      } else {
        finishOp(code === charCodes.verticalBar ? TokenType.logicalOR : TokenType.logicalAND, 2);
      }
      return;
    }
    if (code === charCodes.verticalBar) {
      if (nextChar === charCodes.greaterThan) {
        finishOp(TokenType.pipeline, 2);
        return;
      } else if (nextChar === charCodes.rightCurlyBrace && isFlowEnabled) {
        finishOp(TokenType.braceBarR, 2);
        return;
      }
    }
    if (nextChar === charCodes.equalsTo) {
      finishOp(TokenType.assign, 2);
      return;
    }
    finishOp(code === charCodes.verticalBar ? TokenType.bitwiseOR : TokenType.bitwiseAND, 1);
  }
  function readToken_caret() {
    const nextChar = input.charCodeAt(state.pos + 1);
    if (nextChar === charCodes.equalsTo) {
      finishOp(TokenType.assign, 2);
    } else {
      finishOp(TokenType.bitwiseXOR, 1);
    }
  }
  function readToken_plus_min(code) {
    const nextChar = input.charCodeAt(state.pos + 1);
    if (nextChar === code) {
      finishOp(TokenType.preIncDec, 2);
      return;
    }
    if (nextChar === charCodes.equalsTo) {
      finishOp(TokenType.assign, 2);
    } else if (code === charCodes.plusSign) {
      finishOp(TokenType.plus, 1);
    } else {
      finishOp(TokenType.minus, 1);
    }
  }
  function readToken_lt() {
    const nextChar = input.charCodeAt(state.pos + 1);
    if (nextChar === charCodes.lessThan) {
      if (input.charCodeAt(state.pos + 2) === charCodes.equalsTo) {
        finishOp(TokenType.assign, 3);
        return;
      }
      if (state.isType) {
        finishOp(TokenType.lessThan, 1);
      } else {
        finishOp(TokenType.bitShiftL, 2);
      }
      return;
    }
    if (nextChar === charCodes.equalsTo) {
      finishOp(TokenType.relationalOrEqual, 2);
    } else {
      finishOp(TokenType.lessThan, 1);
    }
  }
  function readToken_gt() {
    if (state.isType) {
      finishOp(TokenType.greaterThan, 1);
      return;
    }
    const nextChar = input.charCodeAt(state.pos + 1);
    if (nextChar === charCodes.greaterThan) {
      const size = input.charCodeAt(state.pos + 2) === charCodes.greaterThan ? 3 : 2;
      if (input.charCodeAt(state.pos + size) === charCodes.equalsTo) {
        finishOp(TokenType.assign, size + 1);
        return;
      }
      finishOp(TokenType.bitShiftR, size);
      return;
    }
    if (nextChar === charCodes.equalsTo) {
      finishOp(TokenType.relationalOrEqual, 2);
    } else {
      finishOp(TokenType.greaterThan, 1);
    }
  }
  function rescan_gt() {
    if (state.type === TokenType.greaterThan) {
      state.pos -= 1;
      readToken_gt();
    }
  }
  function readToken_eq_excl(code) {
    const nextChar = input.charCodeAt(state.pos + 1);
    if (nextChar === charCodes.equalsTo) {
      finishOp(TokenType.equality, input.charCodeAt(state.pos + 2) === charCodes.equalsTo ? 3 : 2);
      return;
    }
    if (code === charCodes.equalsTo && nextChar === charCodes.greaterThan) {
      state.pos += 2;
      finishToken(TokenType.arrow);
      return;
    }
    finishOp(code === charCodes.equalsTo ? TokenType.eq : TokenType.bang, 1);
  }
  function readToken_question() {
    const nextChar = input.charCodeAt(state.pos + 1);
    const nextChar2 = input.charCodeAt(state.pos + 2);
    if (nextChar === charCodes.questionMark && // In Flow (but not TypeScript), ??string is a valid type that should be
    // tokenized as two individual ? tokens.
    !(isFlowEnabled && state.isType)) {
      if (nextChar2 === charCodes.equalsTo) {
        finishOp(TokenType.assign, 3);
      } else {
        finishOp(TokenType.nullishCoalescing, 2);
      }
    } else if (nextChar === charCodes.dot && !(nextChar2 >= charCodes.digit0 && nextChar2 <= charCodes.digit9)) {
      state.pos += 2;
      finishToken(TokenType.questionDot);
    } else {
      ++state.pos;
      finishToken(TokenType.question);
    }
  }
  function getTokenFromCode(code) {
    switch (code) {
      case charCodes.numberSign:
        ++state.pos;
        finishToken(TokenType.hash);
        return;
      // The interpretation of a dot depends on whether it is followed
      // by a digit or another two dots.
      case charCodes.dot:
        readToken_dot();
        return;
      // Punctuation tokens.
      case charCodes.leftParenthesis:
        ++state.pos;
        finishToken(TokenType.parenL);
        return;
      case charCodes.rightParenthesis:
        ++state.pos;
        finishToken(TokenType.parenR);
        return;
      case charCodes.semicolon:
        ++state.pos;
        finishToken(TokenType.semi);
        return;
      case charCodes.comma:
        ++state.pos;
        finishToken(TokenType.comma);
        return;
      case charCodes.leftSquareBracket:
        ++state.pos;
        finishToken(TokenType.bracketL);
        return;
      case charCodes.rightSquareBracket:
        ++state.pos;
        finishToken(TokenType.bracketR);
        return;
      case charCodes.leftCurlyBrace:
        if (isFlowEnabled && input.charCodeAt(state.pos + 1) === charCodes.verticalBar) {
          finishOp(TokenType.braceBarL, 2);
        } else {
          ++state.pos;
          finishToken(TokenType.braceL);
        }
        return;
      case charCodes.rightCurlyBrace:
        ++state.pos;
        finishToken(TokenType.braceR);
        return;
      case charCodes.colon:
        if (input.charCodeAt(state.pos + 1) === charCodes.colon) {
          finishOp(TokenType.doubleColon, 2);
        } else {
          ++state.pos;
          finishToken(TokenType.colon);
        }
        return;
      case charCodes.questionMark:
        readToken_question();
        return;
      case charCodes.atSign:
        ++state.pos;
        finishToken(TokenType.at);
        return;
      case charCodes.graveAccent:
        ++state.pos;
        finishToken(TokenType.backQuote);
        return;
      case charCodes.digit0: {
        const nextChar = input.charCodeAt(state.pos + 1);
        if (nextChar === charCodes.lowercaseX || nextChar === charCodes.uppercaseX || nextChar === charCodes.lowercaseO || nextChar === charCodes.uppercaseO || nextChar === charCodes.lowercaseB || nextChar === charCodes.uppercaseB) {
          readRadixNumber();
          return;
        }
      }
      // Anything else beginning with a digit is an integer, octal
      // number, or float.
      case charCodes.digit1:
      case charCodes.digit2:
      case charCodes.digit3:
      case charCodes.digit4:
      case charCodes.digit5:
      case charCodes.digit6:
      case charCodes.digit7:
      case charCodes.digit8:
      case charCodes.digit9:
        readNumber(false);
        return;
      // Quotes produce strings.
      case charCodes.quotationMark:
      case charCodes.apostrophe:
        readString(code);
        return;
      // Operators are parsed inline in tiny state machines. '=' (charCodes.equalsTo) is
      // often referred to. `finishOp` simply skips the amount of
      // characters it is given as second argument, and returns a token
      // of the type given by its first argument.
      case charCodes.slash:
        readToken_slash();
        return;
      case charCodes.percentSign:
      case charCodes.asterisk:
        readToken_mult_modulo(code);
        return;
      case charCodes.verticalBar:
      case charCodes.ampersand:
        readToken_pipe_amp(code);
        return;
      case charCodes.caret:
        readToken_caret();
        return;
      case charCodes.plusSign:
      case charCodes.dash:
        readToken_plus_min(code);
        return;
      case charCodes.lessThan:
        readToken_lt();
        return;
      case charCodes.greaterThan:
        readToken_gt();
        return;
      case charCodes.equalsTo:
      case charCodes.exclamationMark:
        readToken_eq_excl(code);
        return;
      case charCodes.tilde:
        finishOp(TokenType.tilde, 1);
        return;
      default:
        break;
    }
    unexpected(`Unexpected character '${String.fromCharCode(code)}'`, state.pos);
  }
  function finishOp(type, size) {
    state.pos += size;
    finishToken(type);
  }
  function readRegexp() {
    const start = state.pos;
    let escaped = false;
    let inClass = false;
    for (; ; ) {
      if (state.pos >= input.length) {
        unexpected("Unterminated regular expression", start);
        return;
      }
      const code = input.charCodeAt(state.pos);
      if (escaped) {
        escaped = false;
      } else {
        if (code === charCodes.leftSquareBracket) {
          inClass = true;
        } else if (code === charCodes.rightSquareBracket && inClass) {
          inClass = false;
        } else if (code === charCodes.slash && !inClass) {
          break;
        }
        escaped = code === charCodes.backslash;
      }
      ++state.pos;
    }
    ++state.pos;
    skipWord();
    finishToken(TokenType.regexp);
  }
  function readInt() {
    while (true) {
      const code = input.charCodeAt(state.pos);
      if (code >= charCodes.digit0 && code <= charCodes.digit9 || code === charCodes.underscore) {
        state.pos++;
      } else {
        break;
      }
    }
  }
  function readRadixNumber() {
    state.pos += 2;
    while (true) {
      const code = input.charCodeAt(state.pos);
      if (code >= charCodes.digit0 && code <= charCodes.digit9 || code >= charCodes.lowercaseA && code <= charCodes.lowercaseF || code >= charCodes.uppercaseA && code <= charCodes.uppercaseF || code === charCodes.underscore) {
        state.pos++;
      } else {
        break;
      }
    }
    const nextChar = input.charCodeAt(state.pos);
    if (nextChar === charCodes.lowercaseN) {
      ++state.pos;
      finishToken(TokenType.bigint);
    } else {
      finishToken(TokenType.num);
    }
  }
  function readNumber(startsWithDot) {
    let isBigInt = false;
    let isDecimal = false;
    if (!startsWithDot) {
      readInt();
    }
    let nextChar = input.charCodeAt(state.pos);
    if (nextChar === charCodes.dot) {
      ++state.pos;
      readInt();
      nextChar = input.charCodeAt(state.pos);
    }
    if (nextChar === charCodes.uppercaseE || nextChar === charCodes.lowercaseE) {
      nextChar = input.charCodeAt(++state.pos);
      if (nextChar === charCodes.plusSign || nextChar === charCodes.dash) {
        ++state.pos;
      }
      readInt();
      nextChar = input.charCodeAt(state.pos);
    }
    if (nextChar === charCodes.lowercaseN) {
      ++state.pos;
      isBigInt = true;
    } else if (nextChar === charCodes.lowercaseM) {
      ++state.pos;
      isDecimal = true;
    }
    if (isBigInt) {
      finishToken(TokenType.bigint);
      return;
    }
    if (isDecimal) {
      finishToken(TokenType.decimal);
      return;
    }
    finishToken(TokenType.num);
  }
  function readString(quote) {
    state.pos++;
    for (; ; ) {
      if (state.pos >= input.length) {
        unexpected("Unterminated string constant");
        return;
      }
      const ch = input.charCodeAt(state.pos);
      if (ch === charCodes.backslash) {
        state.pos++;
      } else if (ch === quote) {
        break;
      }
      state.pos++;
    }
    state.pos++;
    finishToken(TokenType.string);
  }
  function readTmplToken() {
    for (; ; ) {
      if (state.pos >= input.length) {
        unexpected("Unterminated template");
        return;
      }
      const ch = input.charCodeAt(state.pos);
      if (ch === charCodes.graveAccent || ch === charCodes.dollarSign && input.charCodeAt(state.pos + 1) === charCodes.leftCurlyBrace) {
        if (state.pos === state.start && match(TokenType.template)) {
          if (ch === charCodes.dollarSign) {
            state.pos += 2;
            finishToken(TokenType.dollarBraceL);
            return;
          } else {
            ++state.pos;
            finishToken(TokenType.backQuote);
            return;
          }
        }
        finishToken(TokenType.template);
        return;
      }
      if (ch === charCodes.backslash) {
        state.pos++;
      }
      state.pos++;
    }
  }
  function skipWord() {
    while (state.pos < input.length) {
      const ch = input.charCodeAt(state.pos);
      if (IS_IDENTIFIER_CHAR[ch]) {
        state.pos++;
      } else if (ch === charCodes.backslash) {
        state.pos += 2;
        if (input.charCodeAt(state.pos) === charCodes.leftCurlyBrace) {
          while (state.pos < input.length && input.charCodeAt(state.pos) !== charCodes.rightCurlyBrace) {
            state.pos++;
          }
          state.pos++;
        }
      } else {
        break;
      }
    }
  }

  // node_modules/sucrase/dist/esm/util/getImportExportSpecifierInfo.js
  function getImportExportSpecifierInfo(tokens, index = tokens.currentIndex()) {
    let endIndex = index + 1;
    if (isSpecifierEnd(tokens, endIndex)) {
      const name = tokens.identifierNameAtIndex(index);
      return {
        isType: false,
        leftName: name,
        rightName: name,
        endIndex
      };
    }
    endIndex++;
    if (isSpecifierEnd(tokens, endIndex)) {
      return {
        isType: true,
        leftName: null,
        rightName: null,
        endIndex
      };
    }
    endIndex++;
    if (isSpecifierEnd(tokens, endIndex)) {
      return {
        isType: false,
        leftName: tokens.identifierNameAtIndex(index),
        rightName: tokens.identifierNameAtIndex(index + 2),
        endIndex
      };
    }
    endIndex++;
    if (isSpecifierEnd(tokens, endIndex)) {
      return {
        isType: true,
        leftName: null,
        rightName: null,
        endIndex
      };
    }
    throw new Error(`Unexpected import/export specifier at ${index}`);
  }
  function isSpecifierEnd(tokens, index) {
    const token = tokens.tokens[index];
    return token.type === TokenType.braceR || token.type === TokenType.comma;
  }

  // node_modules/sucrase/dist/esm/parser/plugins/jsx/xhtml.js
  var xhtml_default = /* @__PURE__ */ new Map([
    ["quot", '"'],
    ["amp", "&"],
    ["apos", "'"],
    ["lt", "<"],
    ["gt", ">"],
    ["nbsp", "\xA0"],
    ["iexcl", "\xA1"],
    ["cent", "\xA2"],
    ["pound", "\xA3"],
    ["curren", "\xA4"],
    ["yen", "\xA5"],
    ["brvbar", "\xA6"],
    ["sect", "\xA7"],
    ["uml", "\xA8"],
    ["copy", "\xA9"],
    ["ordf", "\xAA"],
    ["laquo", "\xAB"],
    ["not", "\xAC"],
    ["shy", "\xAD"],
    ["reg", "\xAE"],
    ["macr", "\xAF"],
    ["deg", "\xB0"],
    ["plusmn", "\xB1"],
    ["sup2", "\xB2"],
    ["sup3", "\xB3"],
    ["acute", "\xB4"],
    ["micro", "\xB5"],
    ["para", "\xB6"],
    ["middot", "\xB7"],
    ["cedil", "\xB8"],
    ["sup1", "\xB9"],
    ["ordm", "\xBA"],
    ["raquo", "\xBB"],
    ["frac14", "\xBC"],
    ["frac12", "\xBD"],
    ["frac34", "\xBE"],
    ["iquest", "\xBF"],
    ["Agrave", "\xC0"],
    ["Aacute", "\xC1"],
    ["Acirc", "\xC2"],
    ["Atilde", "\xC3"],
    ["Auml", "\xC4"],
    ["Aring", "\xC5"],
    ["AElig", "\xC6"],
    ["Ccedil", "\xC7"],
    ["Egrave", "\xC8"],
    ["Eacute", "\xC9"],
    ["Ecirc", "\xCA"],
    ["Euml", "\xCB"],
    ["Igrave", "\xCC"],
    ["Iacute", "\xCD"],
    ["Icirc", "\xCE"],
    ["Iuml", "\xCF"],
    ["ETH", "\xD0"],
    ["Ntilde", "\xD1"],
    ["Ograve", "\xD2"],
    ["Oacute", "\xD3"],
    ["Ocirc", "\xD4"],
    ["Otilde", "\xD5"],
    ["Ouml", "\xD6"],
    ["times", "\xD7"],
    ["Oslash", "\xD8"],
    ["Ugrave", "\xD9"],
    ["Uacute", "\xDA"],
    ["Ucirc", "\xDB"],
    ["Uuml", "\xDC"],
    ["Yacute", "\xDD"],
    ["THORN", "\xDE"],
    ["szlig", "\xDF"],
    ["agrave", "\xE0"],
    ["aacute", "\xE1"],
    ["acirc", "\xE2"],
    ["atilde", "\xE3"],
    ["auml", "\xE4"],
    ["aring", "\xE5"],
    ["aelig", "\xE6"],
    ["ccedil", "\xE7"],
    ["egrave", "\xE8"],
    ["eacute", "\xE9"],
    ["ecirc", "\xEA"],
    ["euml", "\xEB"],
    ["igrave", "\xEC"],
    ["iacute", "\xED"],
    ["icirc", "\xEE"],
    ["iuml", "\xEF"],
    ["eth", "\xF0"],
    ["ntilde", "\xF1"],
    ["ograve", "\xF2"],
    ["oacute", "\xF3"],
    ["ocirc", "\xF4"],
    ["otilde", "\xF5"],
    ["ouml", "\xF6"],
    ["divide", "\xF7"],
    ["oslash", "\xF8"],
    ["ugrave", "\xF9"],
    ["uacute", "\xFA"],
    ["ucirc", "\xFB"],
    ["uuml", "\xFC"],
    ["yacute", "\xFD"],
    ["thorn", "\xFE"],
    ["yuml", "\xFF"],
    ["OElig", "\u0152"],
    ["oelig", "\u0153"],
    ["Scaron", "\u0160"],
    ["scaron", "\u0161"],
    ["Yuml", "\u0178"],
    ["fnof", "\u0192"],
    ["circ", "\u02C6"],
    ["tilde", "\u02DC"],
    ["Alpha", "\u0391"],
    ["Beta", "\u0392"],
    ["Gamma", "\u0393"],
    ["Delta", "\u0394"],
    ["Epsilon", "\u0395"],
    ["Zeta", "\u0396"],
    ["Eta", "\u0397"],
    ["Theta", "\u0398"],
    ["Iota", "\u0399"],
    ["Kappa", "\u039A"],
    ["Lambda", "\u039B"],
    ["Mu", "\u039C"],
    ["Nu", "\u039D"],
    ["Xi", "\u039E"],
    ["Omicron", "\u039F"],
    ["Pi", "\u03A0"],
    ["Rho", "\u03A1"],
    ["Sigma", "\u03A3"],
    ["Tau", "\u03A4"],
    ["Upsilon", "\u03A5"],
    ["Phi", "\u03A6"],
    ["Chi", "\u03A7"],
    ["Psi", "\u03A8"],
    ["Omega", "\u03A9"],
    ["alpha", "\u03B1"],
    ["beta", "\u03B2"],
    ["gamma", "\u03B3"],
    ["delta", "\u03B4"],
    ["epsilon", "\u03B5"],
    ["zeta", "\u03B6"],
    ["eta", "\u03B7"],
    ["theta", "\u03B8"],
    ["iota", "\u03B9"],
    ["kappa", "\u03BA"],
    ["lambda", "\u03BB"],
    ["mu", "\u03BC"],
    ["nu", "\u03BD"],
    ["xi", "\u03BE"],
    ["omicron", "\u03BF"],
    ["pi", "\u03C0"],
    ["rho", "\u03C1"],
    ["sigmaf", "\u03C2"],
    ["sigma", "\u03C3"],
    ["tau", "\u03C4"],
    ["upsilon", "\u03C5"],
    ["phi", "\u03C6"],
    ["chi", "\u03C7"],
    ["psi", "\u03C8"],
    ["omega", "\u03C9"],
    ["thetasym", "\u03D1"],
    ["upsih", "\u03D2"],
    ["piv", "\u03D6"],
    ["ensp", "\u2002"],
    ["emsp", "\u2003"],
    ["thinsp", "\u2009"],
    ["zwnj", "\u200C"],
    ["zwj", "\u200D"],
    ["lrm", "\u200E"],
    ["rlm", "\u200F"],
    ["ndash", "\u2013"],
    ["mdash", "\u2014"],
    ["lsquo", "\u2018"],
    ["rsquo", "\u2019"],
    ["sbquo", "\u201A"],
    ["ldquo", "\u201C"],
    ["rdquo", "\u201D"],
    ["bdquo", "\u201E"],
    ["dagger", "\u2020"],
    ["Dagger", "\u2021"],
    ["bull", "\u2022"],
    ["hellip", "\u2026"],
    ["permil", "\u2030"],
    ["prime", "\u2032"],
    ["Prime", "\u2033"],
    ["lsaquo", "\u2039"],
    ["rsaquo", "\u203A"],
    ["oline", "\u203E"],
    ["frasl", "\u2044"],
    ["euro", "\u20AC"],
    ["image", "\u2111"],
    ["weierp", "\u2118"],
    ["real", "\u211C"],
    ["trade", "\u2122"],
    ["alefsym", "\u2135"],
    ["larr", "\u2190"],
    ["uarr", "\u2191"],
    ["rarr", "\u2192"],
    ["darr", "\u2193"],
    ["harr", "\u2194"],
    ["crarr", "\u21B5"],
    ["lArr", "\u21D0"],
    ["uArr", "\u21D1"],
    ["rArr", "\u21D2"],
    ["dArr", "\u21D3"],
    ["hArr", "\u21D4"],
    ["forall", "\u2200"],
    ["part", "\u2202"],
    ["exist", "\u2203"],
    ["empty", "\u2205"],
    ["nabla", "\u2207"],
    ["isin", "\u2208"],
    ["notin", "\u2209"],
    ["ni", "\u220B"],
    ["prod", "\u220F"],
    ["sum", "\u2211"],
    ["minus", "\u2212"],
    ["lowast", "\u2217"],
    ["radic", "\u221A"],
    ["prop", "\u221D"],
    ["infin", "\u221E"],
    ["ang", "\u2220"],
    ["and", "\u2227"],
    ["or", "\u2228"],
    ["cap", "\u2229"],
    ["cup", "\u222A"],
    ["int", "\u222B"],
    ["there4", "\u2234"],
    ["sim", "\u223C"],
    ["cong", "\u2245"],
    ["asymp", "\u2248"],
    ["ne", "\u2260"],
    ["equiv", "\u2261"],
    ["le", "\u2264"],
    ["ge", "\u2265"],
    ["sub", "\u2282"],
    ["sup", "\u2283"],
    ["nsub", "\u2284"],
    ["sube", "\u2286"],
    ["supe", "\u2287"],
    ["oplus", "\u2295"],
    ["otimes", "\u2297"],
    ["perp", "\u22A5"],
    ["sdot", "\u22C5"],
    ["lceil", "\u2308"],
    ["rceil", "\u2309"],
    ["lfloor", "\u230A"],
    ["rfloor", "\u230B"],
    ["lang", "\u2329"],
    ["rang", "\u232A"],
    ["loz", "\u25CA"],
    ["spades", "\u2660"],
    ["clubs", "\u2663"],
    ["hearts", "\u2665"],
    ["diams", "\u2666"]
  ]);

  // node_modules/sucrase/dist/esm/util/getJSXPragmaInfo.js
  function getJSXPragmaInfo(options) {
    const [base, suffix] = splitPragma(options.jsxPragma || "React.createElement");
    const [fragmentBase, fragmentSuffix] = splitPragma(options.jsxFragmentPragma || "React.Fragment");
    return { base, suffix, fragmentBase, fragmentSuffix };
  }
  function splitPragma(pragma) {
    let dotIndex = pragma.indexOf(".");
    if (dotIndex === -1) {
      dotIndex = pragma.length;
    }
    return [pragma.slice(0, dotIndex), pragma.slice(dotIndex)];
  }

  // node_modules/sucrase/dist/esm/transformers/Transformer.js
  var Transformer = class {
    // Return true if anything was processed, false otherwise.
    getPrefixCode() {
      return "";
    }
    getHoistedCode() {
      return "";
    }
    getSuffixCode() {
      return "";
    }
  };

  // node_modules/sucrase/dist/esm/transformers/JSXTransformer.js
  var JSXTransformer = class _JSXTransformer extends Transformer {
    // State for calculating the line number of each JSX tag in development.
    __init() {
      this.lastLineNumber = 1;
    }
    __init2() {
      this.lastIndex = 0;
    }
    // In development, variable name holding the name of the current file.
    __init3() {
      this.filenameVarName = null;
    }
    // Mapping of claimed names for imports in the automatic transform, e,g.
    // {jsx: "_jsx"}. This determines which imports to generate in the prefix.
    __init4() {
      this.esmAutomaticImportNameResolutions = {};
    }
    // When automatically adding imports in CJS mode, we store the variable name
    // holding the imported CJS module so we can require it in the prefix.
    __init5() {
      this.cjsAutomaticModuleNameResolutions = {};
    }
    constructor(rootTransformer, tokens, importProcessor, nameManager, options) {
      super();
      this.rootTransformer = rootTransformer;
      this.tokens = tokens;
      this.importProcessor = importProcessor;
      this.nameManager = nameManager;
      this.options = options;
      _JSXTransformer.prototype.__init.call(this);
      _JSXTransformer.prototype.__init2.call(this);
      _JSXTransformer.prototype.__init3.call(this);
      _JSXTransformer.prototype.__init4.call(this);
      _JSXTransformer.prototype.__init5.call(this);
      ;
      this.jsxPragmaInfo = getJSXPragmaInfo(options);
      this.isAutomaticRuntime = options.jsxRuntime === "automatic";
      this.jsxImportSource = options.jsxImportSource || "react";
    }
    process() {
      if (this.tokens.matches1(TokenType.jsxTagStart)) {
        this.processJSXTag();
        return true;
      }
      return false;
    }
    getPrefixCode() {
      let prefix = "";
      if (this.filenameVarName) {
        prefix += `const ${this.filenameVarName} = ${JSON.stringify(this.options.filePath || "")};`;
      }
      if (this.isAutomaticRuntime) {
        if (this.importProcessor) {
          for (const [path, resolvedName] of Object.entries(this.cjsAutomaticModuleNameResolutions)) {
            prefix += `var ${resolvedName} = require("${path}");`;
          }
        } else {
          const { createElement: createElementResolution, ...otherResolutions } = this.esmAutomaticImportNameResolutions;
          if (createElementResolution) {
            prefix += `import {createElement as ${createElementResolution}} from "${this.jsxImportSource}";`;
          }
          const importSpecifiers = Object.entries(otherResolutions).map(([name, resolvedName]) => `${name} as ${resolvedName}`).join(", ");
          if (importSpecifiers) {
            const importPath = this.jsxImportSource + (this.options.production ? "/jsx-runtime" : "/jsx-dev-runtime");
            prefix += `import {${importSpecifiers}} from "${importPath}";`;
          }
        }
      }
      return prefix;
    }
    processJSXTag() {
      const { jsxRole, start } = this.tokens.currentToken();
      const elementLocationCode = this.options.production ? null : this.getElementLocationCode(start);
      if (this.isAutomaticRuntime && jsxRole !== JSXRole.KeyAfterPropSpread) {
        this.transformTagToJSXFunc(elementLocationCode, jsxRole);
      } else {
        this.transformTagToCreateElement(elementLocationCode);
      }
    }
    getElementLocationCode(firstTokenStart) {
      const lineNumber = this.getLineNumberForIndex(firstTokenStart);
      return `lineNumber: ${lineNumber}`;
    }
    /**
     * Get the line number for this source position. This is calculated lazily and
     * must be called in increasing order by index.
     */
    getLineNumberForIndex(index) {
      const code = this.tokens.code;
      while (this.lastIndex < index && this.lastIndex < code.length) {
        if (code[this.lastIndex] === "\n") {
          this.lastLineNumber++;
        }
        this.lastIndex++;
      }
      return this.lastLineNumber;
    }
    /**
     * Convert the current JSX element to a call to jsx, jsxs, or jsxDEV. This is
     * the primary transformation for the automatic transform.
     *
     * Example:
     * <div a={1} key={2}>Hello{x}</div>
     * becomes
     * jsxs('div', {a: 1, children: ["Hello", x]}, 2)
     */
    transformTagToJSXFunc(elementLocationCode, jsxRole) {
      const isStatic = jsxRole === JSXRole.StaticChildren;
      this.tokens.replaceToken(this.getJSXFuncInvocationCode(isStatic));
      let keyCode = null;
      if (this.tokens.matches1(TokenType.jsxTagEnd)) {
        this.tokens.replaceToken(`${this.getFragmentCode()}, {`);
        this.processAutomaticChildrenAndEndProps(jsxRole);
      } else {
        this.processTagIntro();
        this.tokens.appendCode(", {");
        keyCode = this.processProps(true);
        if (this.tokens.matches2(TokenType.slash, TokenType.jsxTagEnd)) {
          this.tokens.appendCode("}");
        } else if (this.tokens.matches1(TokenType.jsxTagEnd)) {
          this.tokens.removeToken();
          this.processAutomaticChildrenAndEndProps(jsxRole);
        } else {
          throw new Error("Expected either /> or > at the end of the tag.");
        }
        if (keyCode) {
          this.tokens.appendCode(`, ${keyCode}`);
        }
      }
      if (!this.options.production) {
        if (keyCode === null) {
          this.tokens.appendCode(", void 0");
        }
        this.tokens.appendCode(`, ${isStatic}, ${this.getDevSource(elementLocationCode)}, this`);
      }
      this.tokens.removeInitialToken();
      while (!this.tokens.matches1(TokenType.jsxTagEnd)) {
        this.tokens.removeToken();
      }
      this.tokens.replaceToken(")");
    }
    /**
     * Convert the current JSX element to a createElement call. In the classic
     * runtime, this is the only case. In the automatic runtime, this is called
     * as a fallback in some situations.
     *
     * Example:
     * <div a={1} key={2}>Hello{x}</div>
     * becomes
     * React.createElement('div', {a: 1, key: 2}, "Hello", x)
     */
    transformTagToCreateElement(elementLocationCode) {
      this.tokens.replaceToken(this.getCreateElementInvocationCode());
      if (this.tokens.matches1(TokenType.jsxTagEnd)) {
        this.tokens.replaceToken(`${this.getFragmentCode()}, null`);
        this.processChildren(true);
      } else {
        this.processTagIntro();
        this.processPropsObjectWithDevInfo(elementLocationCode);
        if (this.tokens.matches2(TokenType.slash, TokenType.jsxTagEnd)) {
        } else if (this.tokens.matches1(TokenType.jsxTagEnd)) {
          this.tokens.removeToken();
          this.processChildren(true);
        } else {
          throw new Error("Expected either /> or > at the end of the tag.");
        }
      }
      this.tokens.removeInitialToken();
      while (!this.tokens.matches1(TokenType.jsxTagEnd)) {
        this.tokens.removeToken();
      }
      this.tokens.replaceToken(")");
    }
    /**
     * Get the code for the relevant function for this context: jsx, jsxs,
     * or jsxDEV. The following open-paren is included as well.
     *
     * These functions are only used for the automatic runtime, so they are always
     * auto-imported, but the auto-import will be either CJS or ESM based on the
     * target module format.
     */
    getJSXFuncInvocationCode(isStatic) {
      if (this.options.production) {
        if (isStatic) {
          return this.claimAutoImportedFuncInvocation("jsxs", "/jsx-runtime");
        } else {
          return this.claimAutoImportedFuncInvocation("jsx", "/jsx-runtime");
        }
      } else {
        return this.claimAutoImportedFuncInvocation("jsxDEV", "/jsx-dev-runtime");
      }
    }
    /**
     * Return the code to use for the createElement function, e.g.
     * `React.createElement`, including the following open-paren.
     *
     * This is the main function to use for the classic runtime. For the
     * automatic runtime, this function is used as a fallback function to
     * preserve behavior when there is a prop spread followed by an explicit
     * key. In that automatic runtime case, the function should be automatically
     * imported.
     */
    getCreateElementInvocationCode() {
      if (this.isAutomaticRuntime) {
        return this.claimAutoImportedFuncInvocation("createElement", "");
      } else {
        const { jsxPragmaInfo } = this;
        const resolvedPragmaBaseName = this.importProcessor ? this.importProcessor.getIdentifierReplacement(jsxPragmaInfo.base) || jsxPragmaInfo.base : jsxPragmaInfo.base;
        return `${resolvedPragmaBaseName}${jsxPragmaInfo.suffix}(`;
      }
    }
    /**
     * Return the code to use as the component when compiling a shorthand
     * fragment, e.g. `React.Fragment`.
     *
     * This may be called from either the classic or automatic runtime, and
     * the value should be auto-imported for the automatic runtime.
     */
    getFragmentCode() {
      if (this.isAutomaticRuntime) {
        return this.claimAutoImportedName(
          "Fragment",
          this.options.production ? "/jsx-runtime" : "/jsx-dev-runtime"
        );
      } else {
        const { jsxPragmaInfo } = this;
        const resolvedFragmentPragmaBaseName = this.importProcessor ? this.importProcessor.getIdentifierReplacement(jsxPragmaInfo.fragmentBase) || jsxPragmaInfo.fragmentBase : jsxPragmaInfo.fragmentBase;
        return resolvedFragmentPragmaBaseName + jsxPragmaInfo.fragmentSuffix;
      }
    }
    /**
     * Return code that invokes the given function.
     *
     * When the imports transform is enabled, use the CJSImportTransformer
     * strategy of using `.call(void 0, ...` to avoid passing a `this` value in a
     * situation that would otherwise look like a method call.
     */
    claimAutoImportedFuncInvocation(funcName, importPathSuffix) {
      const funcCode = this.claimAutoImportedName(funcName, importPathSuffix);
      if (this.importProcessor) {
        return `${funcCode}.call(void 0, `;
      } else {
        return `${funcCode}(`;
      }
    }
    claimAutoImportedName(funcName, importPathSuffix) {
      if (this.importProcessor) {
        const path = this.jsxImportSource + importPathSuffix;
        if (!this.cjsAutomaticModuleNameResolutions[path]) {
          this.cjsAutomaticModuleNameResolutions[path] = this.importProcessor.getFreeIdentifierForPath(path);
        }
        return `${this.cjsAutomaticModuleNameResolutions[path]}.${funcName}`;
      } else {
        if (!this.esmAutomaticImportNameResolutions[funcName]) {
          this.esmAutomaticImportNameResolutions[funcName] = this.nameManager.claimFreeName(
            `_${funcName}`
          );
        }
        return this.esmAutomaticImportNameResolutions[funcName];
      }
    }
    /**
     * Process the first part of a tag, before any props.
     */
    processTagIntro() {
      let introEnd = this.tokens.currentIndex() + 1;
      while (this.tokens.tokens[introEnd].isType || !this.tokens.matches2AtIndex(introEnd - 1, TokenType.jsxName, TokenType.jsxName) && !this.tokens.matches2AtIndex(introEnd - 1, TokenType.greaterThan, TokenType.jsxName) && !this.tokens.matches1AtIndex(introEnd, TokenType.braceL) && !this.tokens.matches1AtIndex(introEnd, TokenType.jsxTagEnd) && !this.tokens.matches2AtIndex(introEnd, TokenType.slash, TokenType.jsxTagEnd)) {
        introEnd++;
      }
      if (introEnd === this.tokens.currentIndex() + 1) {
        const tagName = this.tokens.identifierName();
        if (startsWithLowerCase(tagName)) {
          this.tokens.replaceToken(`'${tagName}'`);
        }
      }
      while (this.tokens.currentIndex() < introEnd) {
        this.rootTransformer.processToken();
      }
    }
    /**
     * Starting at the beginning of the props, add the props argument to
     * React.createElement, including the comma before it.
     */
    processPropsObjectWithDevInfo(elementLocationCode) {
      const devProps = this.options.production ? "" : `__self: this, __source: ${this.getDevSource(elementLocationCode)}`;
      if (!this.tokens.matches1(TokenType.jsxName) && !this.tokens.matches1(TokenType.braceL)) {
        if (devProps) {
          this.tokens.appendCode(`, {${devProps}}`);
        } else {
          this.tokens.appendCode(`, null`);
        }
        return;
      }
      this.tokens.appendCode(`, {`);
      this.processProps(false);
      if (devProps) {
        this.tokens.appendCode(` ${devProps}}`);
      } else {
        this.tokens.appendCode("}");
      }
    }
    /**
     * Transform the core part of the props, assuming that a { has already been
     * inserted before us and that a } will be inserted after us.
     *
     * If extractKeyCode is true (i.e. when using any jsx... function), any prop
     * named "key" has its code captured and returned rather than being emitted to
     * the output code. This shifts line numbers, and emitting the code later will
     * correct line numbers again. If no key is found or if extractKeyCode is
     * false, this function returns null.
     */
    processProps(extractKeyCode) {
      let keyCode = null;
      while (true) {
        if (this.tokens.matches2(TokenType.jsxName, TokenType.eq)) {
          const propName = this.tokens.identifierName();
          if (extractKeyCode && propName === "key") {
            if (keyCode !== null) {
              this.tokens.appendCode(keyCode.replace(/[^\n]/g, ""));
            }
            this.tokens.removeToken();
            this.tokens.removeToken();
            const snapshot = this.tokens.snapshot();
            this.processPropValue();
            keyCode = this.tokens.dangerouslyGetAndRemoveCodeSinceSnapshot(snapshot);
            continue;
          } else {
            this.processPropName(propName);
            this.tokens.replaceToken(": ");
            this.processPropValue();
          }
        } else if (this.tokens.matches1(TokenType.jsxName)) {
          const propName = this.tokens.identifierName();
          this.processPropName(propName);
          this.tokens.appendCode(": true");
        } else if (this.tokens.matches1(TokenType.braceL)) {
          this.tokens.replaceToken("");
          this.rootTransformer.processBalancedCode();
          this.tokens.replaceToken("");
        } else {
          break;
        }
        this.tokens.appendCode(",");
      }
      return keyCode;
    }
    processPropName(propName) {
      if (propName.includes("-")) {
        this.tokens.replaceToken(`'${propName}'`);
      } else {
        this.tokens.copyToken();
      }
    }
    processPropValue() {
      if (this.tokens.matches1(TokenType.braceL)) {
        this.tokens.replaceToken("");
        this.rootTransformer.processBalancedCode();
        this.tokens.replaceToken("");
      } else if (this.tokens.matches1(TokenType.jsxTagStart)) {
        this.processJSXTag();
      } else {
        this.processStringPropValue();
      }
    }
    processStringPropValue() {
      const token = this.tokens.currentToken();
      const valueCode = this.tokens.code.slice(token.start + 1, token.end - 1);
      const replacementCode = formatJSXTextReplacement(valueCode);
      const literalCode = formatJSXStringValueLiteral(valueCode);
      this.tokens.replaceToken(literalCode + replacementCode);
    }
    /**
     * Starting in the middle of the props object literal, produce an additional
     * prop for the children and close the object literal.
     */
    processAutomaticChildrenAndEndProps(jsxRole) {
      if (jsxRole === JSXRole.StaticChildren) {
        this.tokens.appendCode(" children: [");
        this.processChildren(false);
        this.tokens.appendCode("]}");
      } else {
        if (jsxRole === JSXRole.OneChild) {
          this.tokens.appendCode(" children: ");
        }
        this.processChildren(false);
        this.tokens.appendCode("}");
      }
    }
    /**
     * Transform children into a comma-separated list, which will be either
     * arguments to createElement or array elements of a children prop.
     */
    processChildren(needsInitialComma) {
      let needsComma = needsInitialComma;
      while (true) {
        if (this.tokens.matches2(TokenType.jsxTagStart, TokenType.slash)) {
          return;
        }
        let didEmitElement = false;
        if (this.tokens.matches1(TokenType.braceL)) {
          if (this.tokens.matches2(TokenType.braceL, TokenType.braceR)) {
            this.tokens.replaceToken("");
            this.tokens.replaceToken("");
          } else {
            this.tokens.replaceToken(needsComma ? ", " : "");
            this.rootTransformer.processBalancedCode();
            this.tokens.replaceToken("");
            didEmitElement = true;
          }
        } else if (this.tokens.matches1(TokenType.jsxTagStart)) {
          this.tokens.appendCode(needsComma ? ", " : "");
          this.processJSXTag();
          didEmitElement = true;
        } else if (this.tokens.matches1(TokenType.jsxText) || this.tokens.matches1(TokenType.jsxEmptyText)) {
          didEmitElement = this.processChildTextElement(needsComma);
        } else {
          throw new Error("Unexpected token when processing JSX children.");
        }
        if (didEmitElement) {
          needsComma = true;
        }
      }
    }
    /**
     * Turn a JSX text element into a string literal, or nothing at all if the JSX
     * text resolves to the empty string.
     *
     * Returns true if a string literal is emitted, false otherwise.
     */
    processChildTextElement(needsComma) {
      const token = this.tokens.currentToken();
      const valueCode = this.tokens.code.slice(token.start, token.end);
      const replacementCode = formatJSXTextReplacement(valueCode);
      const literalCode = formatJSXTextLiteral(valueCode);
      if (literalCode === '""') {
        this.tokens.replaceToken(replacementCode);
        return false;
      } else {
        this.tokens.replaceToken(`${needsComma ? ", " : ""}${literalCode}${replacementCode}`);
        return true;
      }
    }
    getDevSource(elementLocationCode) {
      return `{fileName: ${this.getFilenameVarName()}, ${elementLocationCode}}`;
    }
    getFilenameVarName() {
      if (!this.filenameVarName) {
        this.filenameVarName = this.nameManager.claimFreeName("_jsxFileName");
      }
      return this.filenameVarName;
    }
  };
  function startsWithLowerCase(s) {
    const firstChar = s.charCodeAt(0);
    return firstChar >= charCodes.lowercaseA && firstChar <= charCodes.lowercaseZ;
  }
  function formatJSXTextLiteral(text) {
    let result = "";
    let whitespace = "";
    let isInInitialLineWhitespace = false;
    let seenNonWhitespace = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === " " || c === "	" || c === "\r") {
        if (!isInInitialLineWhitespace) {
          whitespace += c;
        }
      } else if (c === "\n") {
        whitespace = "";
        isInInitialLineWhitespace = true;
      } else {
        if (seenNonWhitespace && isInInitialLineWhitespace) {
          result += " ";
        }
        result += whitespace;
        whitespace = "";
        if (c === "&") {
          const { entity, newI } = processEntity(text, i + 1);
          i = newI - 1;
          result += entity;
        } else {
          result += c;
        }
        seenNonWhitespace = true;
        isInInitialLineWhitespace = false;
      }
    }
    if (!isInInitialLineWhitespace) {
      result += whitespace;
    }
    return JSON.stringify(result);
  }
  function formatJSXTextReplacement(text) {
    let numNewlines = 0;
    let numSpaces = 0;
    for (const c of text) {
      if (c === "\n") {
        numNewlines++;
        numSpaces = 0;
      } else if (c === " ") {
        numSpaces++;
      }
    }
    return "\n".repeat(numNewlines) + " ".repeat(numSpaces);
  }
  function formatJSXStringValueLiteral(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === "\n") {
        if (/\s/.test(text[i + 1])) {
          result += " ";
          while (i < text.length && /\s/.test(text[i + 1])) {
            i++;
          }
        } else {
          result += "\n";
        }
      } else if (c === "&") {
        const { entity, newI } = processEntity(text, i + 1);
        result += entity;
        i = newI - 1;
      } else {
        result += c;
      }
    }
    return JSON.stringify(result);
  }
  function processEntity(text, indexAfterAmpersand) {
    let str = "";
    let count = 0;
    let entity;
    let i = indexAfterAmpersand;
    if (text[i] === "#") {
      let radix = 10;
      i++;
      let numStart;
      if (text[i] === "x") {
        radix = 16;
        i++;
        numStart = i;
        while (i < text.length && isHexDigit(text.charCodeAt(i))) {
          i++;
        }
      } else {
        numStart = i;
        while (i < text.length && isDecimalDigit(text.charCodeAt(i))) {
          i++;
        }
      }
      if (text[i] === ";") {
        const numStr = text.slice(numStart, i);
        if (numStr) {
          i++;
          entity = String.fromCodePoint(parseInt(numStr, radix));
        }
      }
    } else {
      while (i < text.length && count++ < 10) {
        const ch = text[i];
        i++;
        if (ch === ";") {
          entity = xhtml_default.get(str);
          break;
        }
        str += ch;
      }
    }
    if (!entity) {
      return { entity: "&", newI: indexAfterAmpersand };
    }
    return { entity, newI: i };
  }
  function isDecimalDigit(code) {
    return code >= charCodes.digit0 && code <= charCodes.digit9;
  }
  function isHexDigit(code) {
    return code >= charCodes.digit0 && code <= charCodes.digit9 || code >= charCodes.lowercaseA && code <= charCodes.lowercaseF || code >= charCodes.uppercaseA && code <= charCodes.uppercaseF;
  }

  // node_modules/sucrase/dist/esm/util/getNonTypeIdentifiers.js
  function getNonTypeIdentifiers(tokens, options) {
    const jsxPragmaInfo = getJSXPragmaInfo(options);
    const nonTypeIdentifiers = /* @__PURE__ */ new Set();
    for (let i = 0; i < tokens.tokens.length; i++) {
      const token = tokens.tokens[i];
      if (token.type === TokenType.name && !token.isType && (token.identifierRole === IdentifierRole.Access || token.identifierRole === IdentifierRole.ObjectShorthand || token.identifierRole === IdentifierRole.ExportAccess) && !token.shadowsGlobal) {
        nonTypeIdentifiers.add(tokens.identifierNameForToken(token));
      }
      if (token.type === TokenType.jsxTagStart) {
        nonTypeIdentifiers.add(jsxPragmaInfo.base);
      }
      if (token.type === TokenType.jsxTagStart && i + 1 < tokens.tokens.length && tokens.tokens[i + 1].type === TokenType.jsxTagEnd) {
        nonTypeIdentifiers.add(jsxPragmaInfo.base);
        nonTypeIdentifiers.add(jsxPragmaInfo.fragmentBase);
      }
      if (token.type === TokenType.jsxName && token.identifierRole === IdentifierRole.Access) {
        const identifierName = tokens.identifierNameForToken(token);
        if (!startsWithLowerCase(identifierName) || tokens.tokens[i + 1].type === TokenType.dot) {
          nonTypeIdentifiers.add(tokens.identifierNameForToken(token));
        }
      }
    }
    return nonTypeIdentifiers;
  }

  // node_modules/sucrase/dist/esm/CJSImportProcessor.js
  var CJSImportProcessor = class _CJSImportProcessor {
    __init() {
      this.nonTypeIdentifiers = /* @__PURE__ */ new Set();
    }
    __init2() {
      this.importInfoByPath = /* @__PURE__ */ new Map();
    }
    __init3() {
      this.importsToReplace = /* @__PURE__ */ new Map();
    }
    __init4() {
      this.identifierReplacements = /* @__PURE__ */ new Map();
    }
    __init5() {
      this.exportBindingsByLocalName = /* @__PURE__ */ new Map();
    }
    constructor(nameManager, tokens, enableLegacyTypeScriptModuleInterop, options, isTypeScriptTransformEnabled, keepUnusedImports, helperManager) {
      ;
      this.nameManager = nameManager;
      this.tokens = tokens;
      this.enableLegacyTypeScriptModuleInterop = enableLegacyTypeScriptModuleInterop;
      this.options = options;
      this.isTypeScriptTransformEnabled = isTypeScriptTransformEnabled;
      this.keepUnusedImports = keepUnusedImports;
      this.helperManager = helperManager;
      _CJSImportProcessor.prototype.__init.call(this);
      _CJSImportProcessor.prototype.__init2.call(this);
      _CJSImportProcessor.prototype.__init3.call(this);
      _CJSImportProcessor.prototype.__init4.call(this);
      _CJSImportProcessor.prototype.__init5.call(this);
    }
    preprocessTokens() {
      for (let i = 0; i < this.tokens.tokens.length; i++) {
        if (this.tokens.matches1AtIndex(i, TokenType._import) && !this.tokens.matches3AtIndex(i, TokenType._import, TokenType.name, TokenType.eq)) {
          this.preprocessImportAtIndex(i);
        }
        if (this.tokens.matches1AtIndex(i, TokenType._export) && !this.tokens.matches2AtIndex(i, TokenType._export, TokenType.eq)) {
          this.preprocessExportAtIndex(i);
        }
      }
      this.generateImportReplacements();
    }
    /**
     * In TypeScript, import statements that only import types should be removed.
     * This includes `import {} from 'foo';`, but not `import 'foo';`.
     */
    pruneTypeOnlyImports() {
      this.nonTypeIdentifiers = getNonTypeIdentifiers(this.tokens, this.options);
      for (const [path, importInfo] of this.importInfoByPath.entries()) {
        if (importInfo.hasBareImport || importInfo.hasStarExport || importInfo.exportStarNames.length > 0 || importInfo.namedExports.length > 0) {
          continue;
        }
        const names = [
          ...importInfo.defaultNames,
          ...importInfo.wildcardNames,
          ...importInfo.namedImports.map(({ localName }) => localName)
        ];
        if (names.every((name) => this.shouldAutomaticallyElideImportedName(name))) {
          this.importsToReplace.set(path, "");
        }
      }
    }
    shouldAutomaticallyElideImportedName(name) {
      return this.isTypeScriptTransformEnabled && !this.keepUnusedImports && !this.nonTypeIdentifiers.has(name);
    }
    generateImportReplacements() {
      for (const [path, importInfo] of this.importInfoByPath.entries()) {
        const {
          defaultNames,
          wildcardNames,
          namedImports,
          namedExports,
          exportStarNames,
          hasStarExport
        } = importInfo;
        if (defaultNames.length === 0 && wildcardNames.length === 0 && namedImports.length === 0 && namedExports.length === 0 && exportStarNames.length === 0 && !hasStarExport) {
          this.importsToReplace.set(path, `require('${path}');`);
          continue;
        }
        const primaryImportName = this.getFreeIdentifierForPath(path);
        let secondaryImportName;
        if (this.enableLegacyTypeScriptModuleInterop) {
          secondaryImportName = primaryImportName;
        } else {
          secondaryImportName = wildcardNames.length > 0 ? wildcardNames[0] : this.getFreeIdentifierForPath(path);
        }
        let requireCode = `var ${primaryImportName} = require('${path}');`;
        if (wildcardNames.length > 0) {
          for (const wildcardName of wildcardNames) {
            const moduleExpr = this.enableLegacyTypeScriptModuleInterop ? primaryImportName : `${this.helperManager.getHelperName("interopRequireWildcard")}(${primaryImportName})`;
            requireCode += ` var ${wildcardName} = ${moduleExpr};`;
          }
        } else if (exportStarNames.length > 0 && secondaryImportName !== primaryImportName) {
          requireCode += ` var ${secondaryImportName} = ${this.helperManager.getHelperName(
            "interopRequireWildcard"
          )}(${primaryImportName});`;
        } else if (defaultNames.length > 0 && secondaryImportName !== primaryImportName) {
          requireCode += ` var ${secondaryImportName} = ${this.helperManager.getHelperName(
            "interopRequireDefault"
          )}(${primaryImportName});`;
        }
        for (const { importedName, localName } of namedExports) {
          requireCode += ` ${this.helperManager.getHelperName(
            "createNamedExportFrom"
          )}(${primaryImportName}, '${localName}', '${importedName}');`;
        }
        for (const exportStarName of exportStarNames) {
          requireCode += ` exports.${exportStarName} = ${secondaryImportName};`;
        }
        if (hasStarExport) {
          requireCode += ` ${this.helperManager.getHelperName(
            "createStarExport"
          )}(${primaryImportName});`;
        }
        this.importsToReplace.set(path, requireCode);
        for (const defaultName of defaultNames) {
          this.identifierReplacements.set(defaultName, `${secondaryImportName}.default`);
        }
        for (const { importedName, localName } of namedImports) {
          this.identifierReplacements.set(localName, `${primaryImportName}.${importedName}`);
        }
      }
    }
    getFreeIdentifierForPath(path) {
      const components = path.split("/");
      const lastComponent = components[components.length - 1];
      const baseName = lastComponent.replace(/\W/g, "");
      return this.nameManager.claimFreeName(`_${baseName}`);
    }
    preprocessImportAtIndex(index) {
      const defaultNames = [];
      const wildcardNames = [];
      const namedImports = [];
      index++;
      if ((this.tokens.matchesContextualAtIndex(index, ContextualKeyword._type) || this.tokens.matches1AtIndex(index, TokenType._typeof)) && !this.tokens.matches1AtIndex(index + 1, TokenType.comma) && !this.tokens.matchesContextualAtIndex(index + 1, ContextualKeyword._from)) {
        return;
      }
      if (this.tokens.matches1AtIndex(index, TokenType.parenL)) {
        return;
      }
      if (this.tokens.matches1AtIndex(index, TokenType.name)) {
        defaultNames.push(this.tokens.identifierNameAtIndex(index));
        index++;
        if (this.tokens.matches1AtIndex(index, TokenType.comma)) {
          index++;
        }
      }
      if (this.tokens.matches1AtIndex(index, TokenType.star)) {
        index += 2;
        wildcardNames.push(this.tokens.identifierNameAtIndex(index));
        index++;
      }
      if (this.tokens.matches1AtIndex(index, TokenType.braceL)) {
        const result = this.getNamedImports(index + 1);
        index = result.newIndex;
        for (const namedImport of result.namedImports) {
          if (namedImport.importedName === "default") {
            defaultNames.push(namedImport.localName);
          } else {
            namedImports.push(namedImport);
          }
        }
      }
      if (this.tokens.matchesContextualAtIndex(index, ContextualKeyword._from)) {
        index++;
      }
      if (!this.tokens.matches1AtIndex(index, TokenType.string)) {
        throw new Error("Expected string token at the end of import statement.");
      }
      const path = this.tokens.stringValueAtIndex(index);
      const importInfo = this.getImportInfo(path);
      importInfo.defaultNames.push(...defaultNames);
      importInfo.wildcardNames.push(...wildcardNames);
      importInfo.namedImports.push(...namedImports);
      if (defaultNames.length === 0 && wildcardNames.length === 0 && namedImports.length === 0) {
        importInfo.hasBareImport = true;
      }
    }
    preprocessExportAtIndex(index) {
      if (this.tokens.matches2AtIndex(index, TokenType._export, TokenType._var) || this.tokens.matches2AtIndex(index, TokenType._export, TokenType._let) || this.tokens.matches2AtIndex(index, TokenType._export, TokenType._const)) {
        this.preprocessVarExportAtIndex(index);
      } else if (this.tokens.matches2AtIndex(index, TokenType._export, TokenType._function) || this.tokens.matches2AtIndex(index, TokenType._export, TokenType._class)) {
        const exportName = this.tokens.identifierNameAtIndex(index + 2);
        this.addExportBinding(exportName, exportName);
      } else if (this.tokens.matches3AtIndex(index, TokenType._export, TokenType.name, TokenType._function)) {
        const exportName = this.tokens.identifierNameAtIndex(index + 3);
        this.addExportBinding(exportName, exportName);
      } else if (this.tokens.matches2AtIndex(index, TokenType._export, TokenType.braceL)) {
        this.preprocessNamedExportAtIndex(index);
      } else if (this.tokens.matches2AtIndex(index, TokenType._export, TokenType.star)) {
        this.preprocessExportStarAtIndex(index);
      }
    }
    preprocessVarExportAtIndex(index) {
      let depth = 0;
      for (let i = index + 2; ; i++) {
        if (this.tokens.matches1AtIndex(i, TokenType.braceL) || this.tokens.matches1AtIndex(i, TokenType.dollarBraceL) || this.tokens.matches1AtIndex(i, TokenType.bracketL)) {
          depth++;
        } else if (this.tokens.matches1AtIndex(i, TokenType.braceR) || this.tokens.matches1AtIndex(i, TokenType.bracketR)) {
          depth--;
        } else if (depth === 0 && !this.tokens.matches1AtIndex(i, TokenType.name)) {
          break;
        } else if (this.tokens.matches1AtIndex(1, TokenType.eq)) {
          const endIndex = this.tokens.currentToken().rhsEndIndex;
          if (endIndex == null) {
            throw new Error("Expected = token with an end index.");
          }
          i = endIndex - 1;
        } else {
          const token = this.tokens.tokens[i];
          if (isDeclaration(token)) {
            const exportName = this.tokens.identifierNameAtIndex(i);
            this.identifierReplacements.set(exportName, `exports.${exportName}`);
          }
        }
      }
    }
    /**
     * Walk this export statement just in case it's an export...from statement.
     * If it is, combine it into the import info for that path. Otherwise, just
     * bail out; it'll be handled later.
     */
    preprocessNamedExportAtIndex(index) {
      index += 2;
      const { newIndex, namedImports } = this.getNamedImports(index);
      index = newIndex;
      if (this.tokens.matchesContextualAtIndex(index, ContextualKeyword._from)) {
        index++;
      } else {
        for (const { importedName: localName, localName: exportedName } of namedImports) {
          this.addExportBinding(localName, exportedName);
        }
        return;
      }
      if (!this.tokens.matches1AtIndex(index, TokenType.string)) {
        throw new Error("Expected string token at the end of import statement.");
      }
      const path = this.tokens.stringValueAtIndex(index);
      const importInfo = this.getImportInfo(path);
      importInfo.namedExports.push(...namedImports);
    }
    preprocessExportStarAtIndex(index) {
      let exportedName = null;
      if (this.tokens.matches3AtIndex(index, TokenType._export, TokenType.star, TokenType._as)) {
        index += 3;
        exportedName = this.tokens.identifierNameAtIndex(index);
        index += 2;
      } else {
        index += 3;
      }
      if (!this.tokens.matches1AtIndex(index, TokenType.string)) {
        throw new Error("Expected string token at the end of star export statement.");
      }
      const path = this.tokens.stringValueAtIndex(index);
      const importInfo = this.getImportInfo(path);
      if (exportedName !== null) {
        importInfo.exportStarNames.push(exportedName);
      } else {
        importInfo.hasStarExport = true;
      }
    }
    getNamedImports(index) {
      const namedImports = [];
      while (true) {
        if (this.tokens.matches1AtIndex(index, TokenType.braceR)) {
          index++;
          break;
        }
        const specifierInfo = getImportExportSpecifierInfo(this.tokens, index);
        index = specifierInfo.endIndex;
        if (!specifierInfo.isType) {
          namedImports.push({
            importedName: specifierInfo.leftName,
            localName: specifierInfo.rightName
          });
        }
        if (this.tokens.matches2AtIndex(index, TokenType.comma, TokenType.braceR)) {
          index += 2;
          break;
        } else if (this.tokens.matches1AtIndex(index, TokenType.braceR)) {
          index++;
          break;
        } else if (this.tokens.matches1AtIndex(index, TokenType.comma)) {
          index++;
        } else {
          throw new Error(`Unexpected token: ${JSON.stringify(this.tokens.tokens[index])}`);
        }
      }
      return { newIndex: index, namedImports };
    }
    /**
     * Get a mutable import info object for this path, creating one if it doesn't
     * exist yet.
     */
    getImportInfo(path) {
      const existingInfo = this.importInfoByPath.get(path);
      if (existingInfo) {
        return existingInfo;
      }
      const newInfo = {
        defaultNames: [],
        wildcardNames: [],
        namedImports: [],
        namedExports: [],
        hasBareImport: false,
        exportStarNames: [],
        hasStarExport: false
      };
      this.importInfoByPath.set(path, newInfo);
      return newInfo;
    }
    addExportBinding(localName, exportedName) {
      if (!this.exportBindingsByLocalName.has(localName)) {
        this.exportBindingsByLocalName.set(localName, []);
      }
      this.exportBindingsByLocalName.get(localName).push(exportedName);
    }
    /**
     * Return the code to use for the import for this path, or the empty string if
     * the code has already been "claimed" by a previous import.
     */
    claimImportCode(importPath) {
      const result = this.importsToReplace.get(importPath);
      this.importsToReplace.set(importPath, "");
      return result || "";
    }
    getIdentifierReplacement(identifierName) {
      return this.identifierReplacements.get(identifierName) || null;
    }
    /**
     * Return a string like `exports.foo = exports.bar`.
     */
    resolveExportBinding(assignedName) {
      const exportedNames = this.exportBindingsByLocalName.get(assignedName);
      if (!exportedNames || exportedNames.length === 0) {
        return null;
      }
      return exportedNames.map((exportedName) => `exports.${exportedName}`).join(" = ");
    }
    /**
     * Return all imported/exported names where we might be interested in whether usages of those
     * names are shadowed.
     */
    getGlobalNames() {
      return /* @__PURE__ */ new Set([
        ...this.identifierReplacements.keys(),
        ...this.exportBindingsByLocalName.keys()
      ]);
    }
  };

  // node_modules/sucrase/dist/esm/computeSourceMap.js
  var import_gen_mapping = __toESM(require_gen_mapping_umd());
  function computeSourceMap({ code: generatedCode, mappings: rawMappings }, filePath, options, source, tokens) {
    const sourceColumns = computeSourceColumns(source, tokens);
    const map = new import_gen_mapping.GenMapping({ file: options.compiledFilename });
    let tokenIndex = 0;
    let currentMapping = rawMappings[0];
    while (currentMapping === void 0 && tokenIndex < rawMappings.length - 1) {
      tokenIndex++;
      currentMapping = rawMappings[tokenIndex];
    }
    let line = 0;
    let lineStart = 0;
    if (currentMapping !== lineStart) {
      (0, import_gen_mapping.maybeAddSegment)(map, line, 0, filePath, line, 0);
    }
    for (let i = 0; i < generatedCode.length; i++) {
      if (i === currentMapping) {
        const genColumn = currentMapping - lineStart;
        const sourceColumn = sourceColumns[tokenIndex];
        (0, import_gen_mapping.maybeAddSegment)(map, line, genColumn, filePath, line, sourceColumn);
        while ((currentMapping === i || currentMapping === void 0) && tokenIndex < rawMappings.length - 1) {
          tokenIndex++;
          currentMapping = rawMappings[tokenIndex];
        }
      }
      if (generatedCode.charCodeAt(i) === charCodes.lineFeed) {
        line++;
        lineStart = i + 1;
        if (currentMapping !== lineStart) {
          (0, import_gen_mapping.maybeAddSegment)(map, line, 0, filePath, line, 0);
        }
      }
    }
    const { sourceRoot, sourcesContent, ...sourceMap } = (0, import_gen_mapping.toEncodedMap)(map);
    return sourceMap;
  }
  function computeSourceColumns(code, tokens) {
    const sourceColumns = new Array(tokens.length);
    let tokenIndex = 0;
    let currentMapping = tokens[tokenIndex].start;
    let lineStart = 0;
    for (let i = 0; i < code.length; i++) {
      if (i === currentMapping) {
        sourceColumns[tokenIndex] = currentMapping - lineStart;
        tokenIndex++;
        currentMapping = tokens[tokenIndex].start;
      }
      if (code.charCodeAt(i) === charCodes.lineFeed) {
        lineStart = i + 1;
      }
    }
    return sourceColumns;
  }

  // node_modules/sucrase/dist/esm/HelperManager.js
  var HELPERS = {
    require: `
    import {createRequire as CREATE_REQUIRE_NAME} from "module";
    const require = CREATE_REQUIRE_NAME(import.meta.url);
  `,
    interopRequireWildcard: `
    function interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              newObj[key] = obj[key];
            }
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
  `,
    interopRequireDefault: `
    function interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  `,
    createNamedExportFrom: `
    function createNamedExportFrom(obj, localName, importedName) {
      Object.defineProperty(exports, localName, {enumerable: true, configurable: true, get: () => obj[importedName]});
    }
  `,
    // Note that TypeScript and Babel do this differently; TypeScript does a simple existence
    // check in the exports object and does a plain assignment, whereas Babel uses
    // defineProperty and builds an object of explicitly-exported names so that star exports can
    // always take lower precedence. For now, we do the easier TypeScript thing.
    createStarExport: `
    function createStarExport(obj) {
      Object.keys(obj)
        .filter((key) => key !== "default" && key !== "__esModule")
        .forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, {enumerable: true, configurable: true, get: () => obj[key]});
        });
    }
  `,
    nullishCoalesce: `
    function nullishCoalesce(lhs, rhsFn) {
      if (lhs != null) {
        return lhs;
      } else {
        return rhsFn();
      }
    }
  `,
    asyncNullishCoalesce: `
    async function asyncNullishCoalesce(lhs, rhsFn) {
      if (lhs != null) {
        return lhs;
      } else {
        return await rhsFn();
      }
    }
  `,
    optionalChain: `
    function optionalChain(ops) {
      let lastAccessLHS = undefined;
      let value = ops[0];
      let i = 1;
      while (i < ops.length) {
        const op = ops[i];
        const fn = ops[i + 1];
        i += 2;
        if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
          return undefined;
        }
        if (op === 'access' || op === 'optionalAccess') {
          lastAccessLHS = value;
          value = fn(value);
        } else if (op === 'call' || op === 'optionalCall') {
          value = fn((...args) => value.call(lastAccessLHS, ...args));
          lastAccessLHS = undefined;
        }
      }
      return value;
    }
  `,
    asyncOptionalChain: `
    async function asyncOptionalChain(ops) {
      let lastAccessLHS = undefined;
      let value = ops[0];
      let i = 1;
      while (i < ops.length) {
        const op = ops[i];
        const fn = ops[i + 1];
        i += 2;
        if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
          return undefined;
        }
        if (op === 'access' || op === 'optionalAccess') {
          lastAccessLHS = value;
          value = await fn(value);
        } else if (op === 'call' || op === 'optionalCall') {
          value = await fn((...args) => value.call(lastAccessLHS, ...args));
          lastAccessLHS = undefined;
        }
      }
      return value;
    }
  `,
    optionalChainDelete: `
    function optionalChainDelete(ops) {
      const result = OPTIONAL_CHAIN_NAME(ops);
      return result == null ? true : result;
    }
  `,
    asyncOptionalChainDelete: `
    async function asyncOptionalChainDelete(ops) {
      const result = await ASYNC_OPTIONAL_CHAIN_NAME(ops);
      return result == null ? true : result;
    }
  `
  };
  var HelperManager = class _HelperManager {
    __init() {
      this.helperNames = {};
    }
    __init2() {
      this.createRequireName = null;
    }
    constructor(nameManager) {
      ;
      this.nameManager = nameManager;
      _HelperManager.prototype.__init.call(this);
      _HelperManager.prototype.__init2.call(this);
    }
    getHelperName(baseName) {
      let helperName = this.helperNames[baseName];
      if (helperName) {
        return helperName;
      }
      helperName = this.nameManager.claimFreeName(`_${baseName}`);
      this.helperNames[baseName] = helperName;
      return helperName;
    }
    emitHelpers() {
      let resultCode = "";
      if (this.helperNames.optionalChainDelete) {
        this.getHelperName("optionalChain");
      }
      if (this.helperNames.asyncOptionalChainDelete) {
        this.getHelperName("asyncOptionalChain");
      }
      for (const [baseName, helperCodeTemplate] of Object.entries(HELPERS)) {
        const helperName = this.helperNames[baseName];
        let helperCode = helperCodeTemplate;
        if (baseName === "optionalChainDelete") {
          helperCode = helperCode.replace("OPTIONAL_CHAIN_NAME", this.helperNames.optionalChain);
        } else if (baseName === "asyncOptionalChainDelete") {
          helperCode = helperCode.replace(
            "ASYNC_OPTIONAL_CHAIN_NAME",
            this.helperNames.asyncOptionalChain
          );
        } else if (baseName === "require") {
          if (this.createRequireName === null) {
            this.createRequireName = this.nameManager.claimFreeName("_createRequire");
          }
          helperCode = helperCode.replace(/CREATE_REQUIRE_NAME/g, this.createRequireName);
        }
        if (helperName) {
          resultCode += " ";
          resultCode += helperCode.replace(baseName, helperName).replace(/\s+/g, " ").trim();
        }
      }
      return resultCode;
    }
  };

  // node_modules/sucrase/dist/esm/identifyShadowedGlobals.js
  function identifyShadowedGlobals(tokens, scopes, globalNames) {
    if (!hasShadowedGlobals(tokens, globalNames)) {
      return;
    }
    markShadowedGlobals(tokens, scopes, globalNames);
  }
  function hasShadowedGlobals(tokens, globalNames) {
    for (const token of tokens.tokens) {
      if (token.type === TokenType.name && !token.isType && isNonTopLevelDeclaration(token) && globalNames.has(tokens.identifierNameForToken(token))) {
        return true;
      }
    }
    return false;
  }
  function markShadowedGlobals(tokens, scopes, globalNames) {
    const scopeStack = [];
    let scopeIndex = scopes.length - 1;
    for (let i = tokens.tokens.length - 1; ; i--) {
      while (scopeStack.length > 0 && scopeStack[scopeStack.length - 1].startTokenIndex === i + 1) {
        scopeStack.pop();
      }
      while (scopeIndex >= 0 && scopes[scopeIndex].endTokenIndex === i + 1) {
        scopeStack.push(scopes[scopeIndex]);
        scopeIndex--;
      }
      if (i < 0) {
        break;
      }
      const token = tokens.tokens[i];
      const name = tokens.identifierNameForToken(token);
      if (scopeStack.length > 1 && !token.isType && token.type === TokenType.name && globalNames.has(name)) {
        if (isBlockScopedDeclaration(token)) {
          markShadowedForScope(scopeStack[scopeStack.length - 1], tokens, name);
        } else if (isFunctionScopedDeclaration(token)) {
          let stackIndex = scopeStack.length - 1;
          while (stackIndex > 0 && !scopeStack[stackIndex].isFunctionScope) {
            stackIndex--;
          }
          if (stackIndex < 0) {
            throw new Error("Did not find parent function scope.");
          }
          markShadowedForScope(scopeStack[stackIndex], tokens, name);
        }
      }
    }
    if (scopeStack.length > 0) {
      throw new Error("Expected empty scope stack after processing file.");
    }
  }
  function markShadowedForScope(scope, tokens, name) {
    for (let i = scope.startTokenIndex; i < scope.endTokenIndex; i++) {
      const token = tokens.tokens[i];
      if ((token.type === TokenType.name || token.type === TokenType.jsxName) && tokens.identifierNameForToken(token) === name) {
        token.shadowsGlobal = true;
      }
    }
  }

  // node_modules/sucrase/dist/esm/util/getIdentifierNames.js
  function getIdentifierNames(code, tokens) {
    const names = [];
    for (const token of tokens) {
      if (token.type === TokenType.name) {
        names.push(code.slice(token.start, token.end));
      }
    }
    return names;
  }

  // node_modules/sucrase/dist/esm/NameManager.js
  var NameManager = class _NameManager {
    __init() {
      this.usedNames = /* @__PURE__ */ new Set();
    }
    constructor(code, tokens) {
      ;
      _NameManager.prototype.__init.call(this);
      this.usedNames = new Set(getIdentifierNames(code, tokens));
    }
    claimFreeName(name) {
      const newName = this.findFreeName(name);
      this.usedNames.add(newName);
      return newName;
    }
    findFreeName(name) {
      if (!this.usedNames.has(name)) {
        return name;
      }
      let suffixNum = 2;
      while (this.usedNames.has(name + String(suffixNum))) {
        suffixNum++;
      }
      return name + String(suffixNum);
    }
  };

  // node_modules/sucrase/dist/esm/Options.js
  var import_ts_interface_checker = __toESM(require_dist());

  // node_modules/sucrase/dist/esm/Options-gen-types.js
  var t = __toESM(require_dist());
  var Transform = t.union(
    t.lit("jsx"),
    t.lit("typescript"),
    t.lit("flow"),
    t.lit("imports"),
    t.lit("react-hot-loader"),
    t.lit("jest")
  );
  var SourceMapOptions = t.iface([], {
    compiledFilename: "string"
  });
  var Options = t.iface([], {
    transforms: t.array("Transform"),
    disableESTransforms: t.opt("boolean"),
    jsxRuntime: t.opt(t.union(t.lit("classic"), t.lit("automatic"), t.lit("preserve"))),
    production: t.opt("boolean"),
    jsxImportSource: t.opt("string"),
    jsxPragma: t.opt("string"),
    jsxFragmentPragma: t.opt("string"),
    keepUnusedImports: t.opt("boolean"),
    preserveDynamicImport: t.opt("boolean"),
    injectCreateRequireForImportRequire: t.opt("boolean"),
    enableLegacyTypeScriptModuleInterop: t.opt("boolean"),
    enableLegacyBabel5ModuleInterop: t.opt("boolean"),
    sourceMapOptions: t.opt("SourceMapOptions"),
    filePath: t.opt("string")
  });
  var exportedTypeSuite = {
    Transform,
    SourceMapOptions,
    Options
  };
  var Options_gen_types_default = exportedTypeSuite;

  // node_modules/sucrase/dist/esm/Options.js
  var { Options: OptionsChecker } = (0, import_ts_interface_checker.createCheckers)(Options_gen_types_default);
  function validateOptions(options) {
    OptionsChecker.strictCheck(options);
  }

  // node_modules/sucrase/dist/esm/parser/traverser/lval.js
  function parseSpread() {
    next();
    parseMaybeAssign(false);
  }
  function parseRest(isBlockScope) {
    next();
    parseBindingAtom(isBlockScope);
  }
  function parseBindingIdentifier(isBlockScope) {
    parseIdentifier();
    markPriorBindingIdentifier(isBlockScope);
  }
  function parseImportedIdentifier() {
    parseIdentifier();
    state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ImportDeclaration;
  }
  function markPriorBindingIdentifier(isBlockScope) {
    let identifierRole;
    if (state.scopeDepth === 0) {
      identifierRole = IdentifierRole.TopLevelDeclaration;
    } else if (isBlockScope) {
      identifierRole = IdentifierRole.BlockScopedDeclaration;
    } else {
      identifierRole = IdentifierRole.FunctionScopedDeclaration;
    }
    state.tokens[state.tokens.length - 1].identifierRole = identifierRole;
  }
  function parseBindingAtom(isBlockScope) {
    switch (state.type) {
      case TokenType._this: {
        const oldIsType = pushTypeContext(0);
        next();
        popTypeContext(oldIsType);
        return;
      }
      case TokenType._yield:
      case TokenType.name: {
        state.type = TokenType.name;
        parseBindingIdentifier(isBlockScope);
        return;
      }
      case TokenType.bracketL: {
        next();
        parseBindingList(
          TokenType.bracketR,
          isBlockScope,
          true
          /* allowEmpty */
        );
        return;
      }
      case TokenType.braceL:
        parseObj(true, isBlockScope);
        return;
      default:
        unexpected();
    }
  }
  function parseBindingList(close, isBlockScope, allowEmpty = false, allowModifiers = false, contextId = 0) {
    let first = true;
    let hasRemovedComma = false;
    const firstItemTokenIndex = state.tokens.length;
    while (!eat(close) && !state.error) {
      if (first) {
        first = false;
      } else {
        expect(TokenType.comma);
        state.tokens[state.tokens.length - 1].contextId = contextId;
        if (!hasRemovedComma && state.tokens[firstItemTokenIndex].isType) {
          state.tokens[state.tokens.length - 1].isType = true;
          hasRemovedComma = true;
        }
      }
      if (allowEmpty && match(TokenType.comma)) {
      } else if (eat(close)) {
        break;
      } else if (match(TokenType.ellipsis)) {
        parseRest(isBlockScope);
        parseAssignableListItemTypes();
        eat(TokenType.comma);
        expect(close);
        break;
      } else {
        parseAssignableListItem(allowModifiers, isBlockScope);
      }
    }
  }
  function parseAssignableListItem(allowModifiers, isBlockScope) {
    if (allowModifiers) {
      tsParseModifiers([
        ContextualKeyword._public,
        ContextualKeyword._protected,
        ContextualKeyword._private,
        ContextualKeyword._readonly,
        ContextualKeyword._override
      ]);
    }
    parseMaybeDefault(isBlockScope);
    parseAssignableListItemTypes();
    parseMaybeDefault(
      isBlockScope,
      true
      /* leftAlreadyParsed */
    );
  }
  function parseAssignableListItemTypes() {
    if (isFlowEnabled) {
      flowParseAssignableListItemTypes();
    } else if (isTypeScriptEnabled) {
      tsParseAssignableListItemTypes();
    }
  }
  function parseMaybeDefault(isBlockScope, leftAlreadyParsed = false) {
    if (!leftAlreadyParsed) {
      parseBindingAtom(isBlockScope);
    }
    if (!eat(TokenType.eq)) {
      return;
    }
    const eqIndex = state.tokens.length - 1;
    parseMaybeAssign();
    state.tokens[eqIndex].rhsEndIndex = state.tokens.length;
  }

  // node_modules/sucrase/dist/esm/parser/plugins/typescript.js
  function tsIsIdentifier() {
    return match(TokenType.name);
  }
  function isLiteralPropertyName() {
    return match(TokenType.name) || Boolean(state.type & TokenType.IS_KEYWORD) || match(TokenType.string) || match(TokenType.num) || match(TokenType.bigint) || match(TokenType.decimal);
  }
  function tsNextTokenCanFollowModifier() {
    const snapshot = state.snapshot();
    next();
    const canFollowModifier = (match(TokenType.bracketL) || match(TokenType.braceL) || match(TokenType.star) || match(TokenType.ellipsis) || match(TokenType.hash) || isLiteralPropertyName()) && !hasPrecedingLineBreak();
    if (canFollowModifier) {
      return true;
    } else {
      state.restoreFromSnapshot(snapshot);
      return false;
    }
  }
  function tsParseModifiers(allowedModifiers) {
    while (true) {
      const modifier = tsParseModifier(allowedModifiers);
      if (modifier === null) {
        break;
      }
    }
  }
  function tsParseModifier(allowedModifiers) {
    if (!match(TokenType.name)) {
      return null;
    }
    const modifier = state.contextualKeyword;
    if (allowedModifiers.indexOf(modifier) !== -1 && tsNextTokenCanFollowModifier()) {
      switch (modifier) {
        case ContextualKeyword._readonly:
          state.tokens[state.tokens.length - 1].type = TokenType._readonly;
          break;
        case ContextualKeyword._abstract:
          state.tokens[state.tokens.length - 1].type = TokenType._abstract;
          break;
        case ContextualKeyword._static:
          state.tokens[state.tokens.length - 1].type = TokenType._static;
          break;
        case ContextualKeyword._public:
          state.tokens[state.tokens.length - 1].type = TokenType._public;
          break;
        case ContextualKeyword._private:
          state.tokens[state.tokens.length - 1].type = TokenType._private;
          break;
        case ContextualKeyword._protected:
          state.tokens[state.tokens.length - 1].type = TokenType._protected;
          break;
        case ContextualKeyword._override:
          state.tokens[state.tokens.length - 1].type = TokenType._override;
          break;
        case ContextualKeyword._declare:
          state.tokens[state.tokens.length - 1].type = TokenType._declare;
          break;
        default:
          break;
      }
      return modifier;
    }
    return null;
  }
  function tsParseEntityName() {
    parseIdentifier();
    while (eat(TokenType.dot)) {
      parseIdentifier();
    }
  }
  function tsParseTypeReference() {
    tsParseEntityName();
    if (!hasPrecedingLineBreak() && match(TokenType.lessThan)) {
      tsParseTypeArguments();
    }
  }
  function tsParseThisTypePredicate() {
    next();
    tsParseTypeAnnotation();
  }
  function tsParseThisTypeNode() {
    next();
  }
  function tsParseTypeQuery() {
    expect(TokenType._typeof);
    if (match(TokenType._import)) {
      tsParseImportType();
    } else {
      tsParseEntityName();
    }
    if (!hasPrecedingLineBreak() && match(TokenType.lessThan)) {
      tsParseTypeArguments();
    }
  }
  function tsParseImportType() {
    expect(TokenType._import);
    expect(TokenType.parenL);
    expect(TokenType.string);
    expect(TokenType.parenR);
    if (eat(TokenType.dot)) {
      tsParseEntityName();
    }
    if (match(TokenType.lessThan)) {
      tsParseTypeArguments();
    }
  }
  function tsParseTypeParameter() {
    eat(TokenType._const);
    const hadIn = eat(TokenType._in);
    const hadOut = eatContextual(ContextualKeyword._out);
    eat(TokenType._const);
    if ((hadIn || hadOut) && !match(TokenType.name)) {
      state.tokens[state.tokens.length - 1].type = TokenType.name;
    } else {
      parseIdentifier();
    }
    if (eat(TokenType._extends)) {
      tsParseType();
    }
    if (eat(TokenType.eq)) {
      tsParseType();
    }
  }
  function tsTryParseTypeParameters() {
    if (match(TokenType.lessThan)) {
      tsParseTypeParameters();
    }
  }
  function tsParseTypeParameters() {
    const oldIsType = pushTypeContext(0);
    if (match(TokenType.lessThan) || match(TokenType.typeParameterStart)) {
      next();
    } else {
      unexpected();
    }
    while (!eat(TokenType.greaterThan) && !state.error) {
      tsParseTypeParameter();
      eat(TokenType.comma);
    }
    popTypeContext(oldIsType);
  }
  function tsFillSignature(returnToken) {
    const returnTokenRequired = returnToken === TokenType.arrow;
    tsTryParseTypeParameters();
    expect(TokenType.parenL);
    state.scopeDepth++;
    tsParseBindingListForSignature(
      false
      /* isBlockScope */
    );
    state.scopeDepth--;
    if (returnTokenRequired) {
      tsParseTypeOrTypePredicateAnnotation(returnToken);
    } else if (match(returnToken)) {
      tsParseTypeOrTypePredicateAnnotation(returnToken);
    }
  }
  function tsParseBindingListForSignature(isBlockScope) {
    parseBindingList(TokenType.parenR, isBlockScope);
  }
  function tsParseTypeMemberSemicolon() {
    if (!eat(TokenType.comma)) {
      semicolon();
    }
  }
  function tsParseSignatureMember() {
    tsFillSignature(TokenType.colon);
    tsParseTypeMemberSemicolon();
  }
  function tsIsUnambiguouslyIndexSignature() {
    const snapshot = state.snapshot();
    next();
    const isIndexSignature = eat(TokenType.name) && match(TokenType.colon);
    state.restoreFromSnapshot(snapshot);
    return isIndexSignature;
  }
  function tsTryParseIndexSignature() {
    if (!(match(TokenType.bracketL) && tsIsUnambiguouslyIndexSignature())) {
      return false;
    }
    const oldIsType = pushTypeContext(0);
    expect(TokenType.bracketL);
    parseIdentifier();
    tsParseTypeAnnotation();
    expect(TokenType.bracketR);
    tsTryParseTypeAnnotation();
    tsParseTypeMemberSemicolon();
    popTypeContext(oldIsType);
    return true;
  }
  function tsParsePropertyOrMethodSignature(isReadonly) {
    eat(TokenType.question);
    if (!isReadonly && (match(TokenType.parenL) || match(TokenType.lessThan))) {
      tsFillSignature(TokenType.colon);
      tsParseTypeMemberSemicolon();
    } else {
      tsTryParseTypeAnnotation();
      tsParseTypeMemberSemicolon();
    }
  }
  function tsParseTypeMember() {
    if (match(TokenType.parenL) || match(TokenType.lessThan)) {
      tsParseSignatureMember();
      return;
    }
    if (match(TokenType._new)) {
      next();
      if (match(TokenType.parenL) || match(TokenType.lessThan)) {
        tsParseSignatureMember();
      } else {
        tsParsePropertyOrMethodSignature(false);
      }
      return;
    }
    const readonly = !!tsParseModifier([ContextualKeyword._readonly]);
    const found = tsTryParseIndexSignature();
    if (found) {
      return;
    }
    if ((isContextual(ContextualKeyword._get) || isContextual(ContextualKeyword._set)) && tsNextTokenCanFollowModifier()) {
    }
    parsePropertyName(
      -1
      /* Types don't need context IDs. */
    );
    tsParsePropertyOrMethodSignature(readonly);
  }
  function tsParseTypeLiteral() {
    tsParseObjectTypeMembers();
  }
  function tsParseObjectTypeMembers() {
    expect(TokenType.braceL);
    while (!eat(TokenType.braceR) && !state.error) {
      tsParseTypeMember();
    }
  }
  function tsLookaheadIsStartOfMappedType() {
    const snapshot = state.snapshot();
    const isStartOfMappedType = tsIsStartOfMappedType();
    state.restoreFromSnapshot(snapshot);
    return isStartOfMappedType;
  }
  function tsIsStartOfMappedType() {
    next();
    if (eat(TokenType.plus) || eat(TokenType.minus)) {
      return isContextual(ContextualKeyword._readonly);
    }
    if (isContextual(ContextualKeyword._readonly)) {
      next();
    }
    if (!match(TokenType.bracketL)) {
      return false;
    }
    next();
    if (!tsIsIdentifier()) {
      return false;
    }
    next();
    return match(TokenType._in);
  }
  function tsParseMappedTypeParameter() {
    parseIdentifier();
    expect(TokenType._in);
    tsParseType();
  }
  function tsParseMappedType() {
    expect(TokenType.braceL);
    if (match(TokenType.plus) || match(TokenType.minus)) {
      next();
      expectContextual(ContextualKeyword._readonly);
    } else {
      eatContextual(ContextualKeyword._readonly);
    }
    expect(TokenType.bracketL);
    tsParseMappedTypeParameter();
    if (eatContextual(ContextualKeyword._as)) {
      tsParseType();
    }
    expect(TokenType.bracketR);
    if (match(TokenType.plus) || match(TokenType.minus)) {
      next();
      expect(TokenType.question);
    } else {
      eat(TokenType.question);
    }
    tsTryParseType();
    semicolon();
    expect(TokenType.braceR);
  }
  function tsParseTupleType() {
    expect(TokenType.bracketL);
    while (!eat(TokenType.bracketR) && !state.error) {
      tsParseTupleElementType();
      eat(TokenType.comma);
    }
  }
  function tsParseTupleElementType() {
    if (eat(TokenType.ellipsis)) {
      tsParseType();
    } else {
      tsParseType();
      eat(TokenType.question);
    }
    if (eat(TokenType.colon)) {
      tsParseType();
    }
  }
  function tsParseParenthesizedType() {
    expect(TokenType.parenL);
    tsParseType();
    expect(TokenType.parenR);
  }
  function tsParseTemplateLiteralType() {
    nextTemplateToken();
    nextTemplateToken();
    while (!match(TokenType.backQuote) && !state.error) {
      expect(TokenType.dollarBraceL);
      tsParseType();
      nextTemplateToken();
      nextTemplateToken();
    }
    next();
  }
  var FunctionType;
  (function(FunctionType2) {
    const TSFunctionType = 0;
    FunctionType2[FunctionType2["TSFunctionType"] = TSFunctionType] = "TSFunctionType";
    const TSConstructorType = TSFunctionType + 1;
    FunctionType2[FunctionType2["TSConstructorType"] = TSConstructorType] = "TSConstructorType";
    const TSAbstractConstructorType = TSConstructorType + 1;
    FunctionType2[FunctionType2["TSAbstractConstructorType"] = TSAbstractConstructorType] = "TSAbstractConstructorType";
  })(FunctionType || (FunctionType = {}));
  function tsParseFunctionOrConstructorType(type) {
    if (type === FunctionType.TSAbstractConstructorType) {
      expectContextual(ContextualKeyword._abstract);
    }
    if (type === FunctionType.TSConstructorType || type === FunctionType.TSAbstractConstructorType) {
      expect(TokenType._new);
    }
    const oldInDisallowConditionalTypesContext = state.inDisallowConditionalTypesContext;
    state.inDisallowConditionalTypesContext = false;
    tsFillSignature(TokenType.arrow);
    state.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
  }
  function tsParseNonArrayType() {
    switch (state.type) {
      case TokenType.name:
        tsParseTypeReference();
        return;
      case TokenType._void:
      case TokenType._null:
        next();
        return;
      case TokenType.string:
      case TokenType.num:
      case TokenType.bigint:
      case TokenType.decimal:
      case TokenType._true:
      case TokenType._false:
        parseLiteral();
        return;
      case TokenType.minus:
        next();
        parseLiteral();
        return;
      case TokenType._this: {
        tsParseThisTypeNode();
        if (isContextual(ContextualKeyword._is) && !hasPrecedingLineBreak()) {
          tsParseThisTypePredicate();
        }
        return;
      }
      case TokenType._typeof:
        tsParseTypeQuery();
        return;
      case TokenType._import:
        tsParseImportType();
        return;
      case TokenType.braceL:
        if (tsLookaheadIsStartOfMappedType()) {
          tsParseMappedType();
        } else {
          tsParseTypeLiteral();
        }
        return;
      case TokenType.bracketL:
        tsParseTupleType();
        return;
      case TokenType.parenL:
        tsParseParenthesizedType();
        return;
      case TokenType.backQuote:
        tsParseTemplateLiteralType();
        return;
      default:
        if (state.type & TokenType.IS_KEYWORD) {
          next();
          state.tokens[state.tokens.length - 1].type = TokenType.name;
          return;
        }
        break;
    }
    unexpected();
  }
  function tsParseArrayTypeOrHigher() {
    tsParseNonArrayType();
    while (!hasPrecedingLineBreak() && eat(TokenType.bracketL)) {
      if (!eat(TokenType.bracketR)) {
        tsParseType();
        expect(TokenType.bracketR);
      }
    }
  }
  function tsParseInferType() {
    expectContextual(ContextualKeyword._infer);
    parseIdentifier();
    if (match(TokenType._extends)) {
      const snapshot = state.snapshot();
      expect(TokenType._extends);
      const oldInDisallowConditionalTypesContext = state.inDisallowConditionalTypesContext;
      state.inDisallowConditionalTypesContext = true;
      tsParseType();
      state.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
      if (state.error || !state.inDisallowConditionalTypesContext && match(TokenType.question)) {
        state.restoreFromSnapshot(snapshot);
      }
    }
  }
  function tsParseTypeOperatorOrHigher() {
    if (isContextual(ContextualKeyword._keyof) || isContextual(ContextualKeyword._unique) || isContextual(ContextualKeyword._readonly)) {
      next();
      tsParseTypeOperatorOrHigher();
    } else if (isContextual(ContextualKeyword._infer)) {
      tsParseInferType();
    } else {
      const oldInDisallowConditionalTypesContext = state.inDisallowConditionalTypesContext;
      state.inDisallowConditionalTypesContext = false;
      tsParseArrayTypeOrHigher();
      state.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
    }
  }
  function tsParseIntersectionTypeOrHigher() {
    eat(TokenType.bitwiseAND);
    tsParseTypeOperatorOrHigher();
    if (match(TokenType.bitwiseAND)) {
      while (eat(TokenType.bitwiseAND)) {
        tsParseTypeOperatorOrHigher();
      }
    }
  }
  function tsParseUnionTypeOrHigher() {
    eat(TokenType.bitwiseOR);
    tsParseIntersectionTypeOrHigher();
    if (match(TokenType.bitwiseOR)) {
      while (eat(TokenType.bitwiseOR)) {
        tsParseIntersectionTypeOrHigher();
      }
    }
  }
  function tsIsStartOfFunctionType() {
    if (match(TokenType.lessThan)) {
      return true;
    }
    return match(TokenType.parenL) && tsLookaheadIsUnambiguouslyStartOfFunctionType();
  }
  function tsSkipParameterStart() {
    if (match(TokenType.name) || match(TokenType._this)) {
      next();
      return true;
    }
    if (match(TokenType.braceL) || match(TokenType.bracketL)) {
      let depth = 1;
      next();
      while (depth > 0 && !state.error) {
        if (match(TokenType.braceL) || match(TokenType.bracketL)) {
          depth++;
        } else if (match(TokenType.braceR) || match(TokenType.bracketR)) {
          depth--;
        }
        next();
      }
      return true;
    }
    return false;
  }
  function tsLookaheadIsUnambiguouslyStartOfFunctionType() {
    const snapshot = state.snapshot();
    const isUnambiguouslyStartOfFunctionType = tsIsUnambiguouslyStartOfFunctionType();
    state.restoreFromSnapshot(snapshot);
    return isUnambiguouslyStartOfFunctionType;
  }
  function tsIsUnambiguouslyStartOfFunctionType() {
    next();
    if (match(TokenType.parenR) || match(TokenType.ellipsis)) {
      return true;
    }
    if (tsSkipParameterStart()) {
      if (match(TokenType.colon) || match(TokenType.comma) || match(TokenType.question) || match(TokenType.eq)) {
        return true;
      }
      if (match(TokenType.parenR)) {
        next();
        if (match(TokenType.arrow)) {
          return true;
        }
      }
    }
    return false;
  }
  function tsParseTypeOrTypePredicateAnnotation(returnToken) {
    const oldIsType = pushTypeContext(0);
    expect(returnToken);
    const finishedReturn = tsParseTypePredicateOrAssertsPrefix();
    if (!finishedReturn) {
      tsParseType();
    }
    popTypeContext(oldIsType);
  }
  function tsTryParseTypeOrTypePredicateAnnotation() {
    if (match(TokenType.colon)) {
      tsParseTypeOrTypePredicateAnnotation(TokenType.colon);
    }
  }
  function tsTryParseTypeAnnotation() {
    if (match(TokenType.colon)) {
      tsParseTypeAnnotation();
    }
  }
  function tsTryParseType() {
    if (eat(TokenType.colon)) {
      tsParseType();
    }
  }
  function tsParseTypePredicateOrAssertsPrefix() {
    const snapshot = state.snapshot();
    if (isContextual(ContextualKeyword._asserts)) {
      next();
      if (eatContextual(ContextualKeyword._is)) {
        tsParseType();
        return true;
      } else if (tsIsIdentifier() || match(TokenType._this)) {
        next();
        if (eatContextual(ContextualKeyword._is)) {
          tsParseType();
        }
        return true;
      } else {
        state.restoreFromSnapshot(snapshot);
        return false;
      }
    } else if (tsIsIdentifier() || match(TokenType._this)) {
      next();
      if (isContextual(ContextualKeyword._is) && !hasPrecedingLineBreak()) {
        next();
        tsParseType();
        return true;
      } else {
        state.restoreFromSnapshot(snapshot);
        return false;
      }
    }
    return false;
  }
  function tsParseTypeAnnotation() {
    const oldIsType = pushTypeContext(0);
    expect(TokenType.colon);
    tsParseType();
    popTypeContext(oldIsType);
  }
  function tsParseType() {
    tsParseNonConditionalType();
    if (state.inDisallowConditionalTypesContext || hasPrecedingLineBreak() || !eat(TokenType._extends)) {
      return;
    }
    const oldInDisallowConditionalTypesContext = state.inDisallowConditionalTypesContext;
    state.inDisallowConditionalTypesContext = true;
    tsParseNonConditionalType();
    state.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
    expect(TokenType.question);
    tsParseType();
    expect(TokenType.colon);
    tsParseType();
  }
  function isAbstractConstructorSignature() {
    return isContextual(ContextualKeyword._abstract) && lookaheadType() === TokenType._new;
  }
  function tsParseNonConditionalType() {
    if (tsIsStartOfFunctionType()) {
      tsParseFunctionOrConstructorType(FunctionType.TSFunctionType);
      return;
    }
    if (match(TokenType._new)) {
      tsParseFunctionOrConstructorType(FunctionType.TSConstructorType);
      return;
    } else if (isAbstractConstructorSignature()) {
      tsParseFunctionOrConstructorType(FunctionType.TSAbstractConstructorType);
      return;
    }
    tsParseUnionTypeOrHigher();
  }
  function tsParseTypeAssertion() {
    const oldIsType = pushTypeContext(1);
    tsParseType();
    expect(TokenType.greaterThan);
    popTypeContext(oldIsType);
    parseMaybeUnary();
  }
  function tsTryParseJSXTypeArgument() {
    if (eat(TokenType.jsxTagStart)) {
      state.tokens[state.tokens.length - 1].type = TokenType.typeParameterStart;
      const oldIsType = pushTypeContext(1);
      while (!match(TokenType.greaterThan) && !state.error) {
        tsParseType();
        eat(TokenType.comma);
      }
      nextJSXTagToken();
      popTypeContext(oldIsType);
    }
  }
  function tsParseHeritageClause() {
    while (!match(TokenType.braceL) && !state.error) {
      tsParseExpressionWithTypeArguments();
      eat(TokenType.comma);
    }
  }
  function tsParseExpressionWithTypeArguments() {
    tsParseEntityName();
    if (match(TokenType.lessThan)) {
      tsParseTypeArguments();
    }
  }
  function tsParseInterfaceDeclaration() {
    parseBindingIdentifier(false);
    tsTryParseTypeParameters();
    if (eat(TokenType._extends)) {
      tsParseHeritageClause();
    }
    tsParseObjectTypeMembers();
  }
  function tsParseTypeAliasDeclaration() {
    parseBindingIdentifier(false);
    tsTryParseTypeParameters();
    expect(TokenType.eq);
    tsParseType();
    semicolon();
  }
  function tsParseEnumMember() {
    if (match(TokenType.string)) {
      parseLiteral();
    } else {
      parseIdentifier();
    }
    if (eat(TokenType.eq)) {
      const eqIndex = state.tokens.length - 1;
      parseMaybeAssign();
      state.tokens[eqIndex].rhsEndIndex = state.tokens.length;
    }
  }
  function tsParseEnumDeclaration() {
    parseBindingIdentifier(false);
    expect(TokenType.braceL);
    while (!eat(TokenType.braceR) && !state.error) {
      tsParseEnumMember();
      eat(TokenType.comma);
    }
  }
  function tsParseModuleBlock() {
    expect(TokenType.braceL);
    parseBlockBody(
      /* end */
      TokenType.braceR
    );
  }
  function tsParseModuleOrNamespaceDeclaration() {
    parseBindingIdentifier(false);
    if (eat(TokenType.dot)) {
      tsParseModuleOrNamespaceDeclaration();
    } else {
      tsParseModuleBlock();
    }
  }
  function tsParseAmbientExternalModuleDeclaration() {
    if (isContextual(ContextualKeyword._global)) {
      parseIdentifier();
    } else if (match(TokenType.string)) {
      parseExprAtom();
    } else {
      unexpected();
    }
    if (match(TokenType.braceL)) {
      tsParseModuleBlock();
    } else {
      semicolon();
    }
  }
  function tsParseImportEqualsDeclaration() {
    parseImportedIdentifier();
    expect(TokenType.eq);
    tsParseModuleReference();
    semicolon();
  }
  function tsIsExternalModuleReference() {
    return isContextual(ContextualKeyword._require) && lookaheadType() === TokenType.parenL;
  }
  function tsParseModuleReference() {
    if (tsIsExternalModuleReference()) {
      tsParseExternalModuleReference();
    } else {
      tsParseEntityName();
    }
  }
  function tsParseExternalModuleReference() {
    expectContextual(ContextualKeyword._require);
    expect(TokenType.parenL);
    if (!match(TokenType.string)) {
      unexpected();
    }
    parseLiteral();
    expect(TokenType.parenR);
  }
  function tsTryParseDeclare() {
    if (isLineTerminator()) {
      return false;
    }
    switch (state.type) {
      case TokenType._function: {
        const oldIsType = pushTypeContext(1);
        next();
        const functionStart = state.start;
        parseFunction(
          functionStart,
          /* isStatement */
          true
        );
        popTypeContext(oldIsType);
        return true;
      }
      case TokenType._class: {
        const oldIsType = pushTypeContext(1);
        parseClass(
          /* isStatement */
          true,
          /* optionalId */
          false
        );
        popTypeContext(oldIsType);
        return true;
      }
      case TokenType._const: {
        if (match(TokenType._const) && isLookaheadContextual(ContextualKeyword._enum)) {
          const oldIsType = pushTypeContext(1);
          expect(TokenType._const);
          expectContextual(ContextualKeyword._enum);
          state.tokens[state.tokens.length - 1].type = TokenType._enum;
          tsParseEnumDeclaration();
          popTypeContext(oldIsType);
          return true;
        }
      }
      // falls through
      case TokenType._var:
      case TokenType._let: {
        const oldIsType = pushTypeContext(1);
        parseVarStatement(state.type !== TokenType._var);
        popTypeContext(oldIsType);
        return true;
      }
      case TokenType.name: {
        const oldIsType = pushTypeContext(1);
        const contextualKeyword = state.contextualKeyword;
        let matched = false;
        if (contextualKeyword === ContextualKeyword._global) {
          tsParseAmbientExternalModuleDeclaration();
          matched = true;
        } else {
          matched = tsParseDeclaration(
            contextualKeyword,
            /* isBeforeToken */
            true
          );
        }
        popTypeContext(oldIsType);
        return matched;
      }
      default:
        return false;
    }
  }
  function tsTryParseExportDeclaration() {
    return tsParseDeclaration(
      state.contextualKeyword,
      /* isBeforeToken */
      true
    );
  }
  function tsParseExpressionStatement(contextualKeyword) {
    switch (contextualKeyword) {
      case ContextualKeyword._declare: {
        const declareTokenIndex = state.tokens.length - 1;
        const matched = tsTryParseDeclare();
        if (matched) {
          state.tokens[declareTokenIndex].type = TokenType._declare;
          return true;
        }
        break;
      }
      case ContextualKeyword._global:
        if (match(TokenType.braceL)) {
          tsParseModuleBlock();
          return true;
        }
        break;
      default:
        return tsParseDeclaration(
          contextualKeyword,
          /* isBeforeToken */
          false
        );
    }
    return false;
  }
  function tsParseDeclaration(contextualKeyword, isBeforeToken) {
    switch (contextualKeyword) {
      case ContextualKeyword._abstract:
        if (tsCheckLineTerminator(isBeforeToken) && match(TokenType._class)) {
          state.tokens[state.tokens.length - 1].type = TokenType._abstract;
          parseClass(
            /* isStatement */
            true,
            /* optionalId */
            false
          );
          return true;
        }
        break;
      case ContextualKeyword._enum:
        if (tsCheckLineTerminator(isBeforeToken) && match(TokenType.name)) {
          state.tokens[state.tokens.length - 1].type = TokenType._enum;
          tsParseEnumDeclaration();
          return true;
        }
        break;
      case ContextualKeyword._interface:
        if (tsCheckLineTerminator(isBeforeToken) && match(TokenType.name)) {
          const oldIsType = pushTypeContext(isBeforeToken ? 2 : 1);
          tsParseInterfaceDeclaration();
          popTypeContext(oldIsType);
          return true;
        }
        break;
      case ContextualKeyword._module:
        if (tsCheckLineTerminator(isBeforeToken)) {
          if (match(TokenType.string)) {
            const oldIsType = pushTypeContext(isBeforeToken ? 2 : 1);
            tsParseAmbientExternalModuleDeclaration();
            popTypeContext(oldIsType);
            return true;
          } else if (match(TokenType.name)) {
            const oldIsType = pushTypeContext(isBeforeToken ? 2 : 1);
            tsParseModuleOrNamespaceDeclaration();
            popTypeContext(oldIsType);
            return true;
          }
        }
        break;
      case ContextualKeyword._namespace:
        if (tsCheckLineTerminator(isBeforeToken) && match(TokenType.name)) {
          const oldIsType = pushTypeContext(isBeforeToken ? 2 : 1);
          tsParseModuleOrNamespaceDeclaration();
          popTypeContext(oldIsType);
          return true;
        }
        break;
      case ContextualKeyword._type:
        if (tsCheckLineTerminator(isBeforeToken) && match(TokenType.name)) {
          const oldIsType = pushTypeContext(isBeforeToken ? 2 : 1);
          tsParseTypeAliasDeclaration();
          popTypeContext(oldIsType);
          return true;
        }
        break;
      default:
        break;
    }
    return false;
  }
  function tsCheckLineTerminator(isBeforeToken) {
    if (isBeforeToken) {
      next();
      return true;
    } else {
      return !isLineTerminator();
    }
  }
  function tsTryParseGenericAsyncArrowFunction() {
    const snapshot = state.snapshot();
    tsParseTypeParameters();
    parseFunctionParams();
    tsTryParseTypeOrTypePredicateAnnotation();
    expect(TokenType.arrow);
    if (state.error) {
      state.restoreFromSnapshot(snapshot);
      return false;
    }
    parseFunctionBody(true);
    return true;
  }
  function tsParseTypeArgumentsWithPossibleBitshift() {
    if (state.type === TokenType.bitShiftL) {
      state.pos -= 1;
      finishToken(TokenType.lessThan);
    }
    tsParseTypeArguments();
  }
  function tsParseTypeArguments() {
    const oldIsType = pushTypeContext(0);
    expect(TokenType.lessThan);
    while (!match(TokenType.greaterThan) && !state.error) {
      tsParseType();
      eat(TokenType.comma);
    }
    if (!oldIsType) {
      popTypeContext(oldIsType);
      rescan_gt();
      expect(TokenType.greaterThan);
      state.tokens[state.tokens.length - 1].isType = true;
    } else {
      expect(TokenType.greaterThan);
      popTypeContext(oldIsType);
    }
  }
  function tsIsDeclarationStart() {
    if (match(TokenType.name)) {
      switch (state.contextualKeyword) {
        case ContextualKeyword._abstract:
        case ContextualKeyword._declare:
        case ContextualKeyword._enum:
        case ContextualKeyword._interface:
        case ContextualKeyword._module:
        case ContextualKeyword._namespace:
        case ContextualKeyword._type:
          return true;
        default:
          break;
      }
    }
    return false;
  }
  function tsParseFunctionBodyAndFinish(functionStart, funcContextId) {
    if (match(TokenType.colon)) {
      tsParseTypeOrTypePredicateAnnotation(TokenType.colon);
    }
    if (!match(TokenType.braceL) && isLineTerminator()) {
      let i = state.tokens.length - 1;
      while (i >= 0 && (state.tokens[i].start >= functionStart || state.tokens[i].type === TokenType._default || state.tokens[i].type === TokenType._export)) {
        state.tokens[i].isType = true;
        i--;
      }
      return;
    }
    parseFunctionBody(false, funcContextId);
  }
  function tsParseSubscript(startTokenIndex, noCalls, stopState) {
    if (!hasPrecedingLineBreak() && eat(TokenType.bang)) {
      state.tokens[state.tokens.length - 1].type = TokenType.nonNullAssertion;
      return;
    }
    if (match(TokenType.lessThan) || match(TokenType.bitShiftL)) {
      const snapshot = state.snapshot();
      if (!noCalls && atPossibleAsync()) {
        const asyncArrowFn = tsTryParseGenericAsyncArrowFunction();
        if (asyncArrowFn) {
          return;
        }
      }
      tsParseTypeArgumentsWithPossibleBitshift();
      if (!noCalls && eat(TokenType.parenL)) {
        state.tokens[state.tokens.length - 1].subscriptStartIndex = startTokenIndex;
        parseCallExpressionArguments();
      } else if (match(TokenType.backQuote)) {
        parseTemplate();
      } else if (
        // The remaining possible case is an instantiation expression, e.g.
        // Array<number> . Check for a few cases that would disqualify it and
        // cause us to bail out.
        // a<b>>c is not (a<b>)>c, but a<(b>>c)
        state.type === TokenType.greaterThan || // a<b>c is (a<b)>c
        state.type !== TokenType.parenL && Boolean(state.type & TokenType.IS_EXPRESSION_START) && !hasPrecedingLineBreak()
      ) {
        unexpected();
      }
      if (state.error) {
        state.restoreFromSnapshot(snapshot);
      } else {
        return;
      }
    } else if (!noCalls && match(TokenType.questionDot) && lookaheadType() === TokenType.lessThan) {
      next();
      state.tokens[startTokenIndex].isOptionalChainStart = true;
      state.tokens[state.tokens.length - 1].subscriptStartIndex = startTokenIndex;
      tsParseTypeArguments();
      expect(TokenType.parenL);
      parseCallExpressionArguments();
    }
    baseParseSubscript(startTokenIndex, noCalls, stopState);
  }
  function tsTryParseExport() {
    if (eat(TokenType._import)) {
      if (isContextual(ContextualKeyword._type) && lookaheadType() !== TokenType.eq) {
        expectContextual(ContextualKeyword._type);
      }
      tsParseImportEqualsDeclaration();
      return true;
    } else if (eat(TokenType.eq)) {
      parseExpression();
      semicolon();
      return true;
    } else if (eatContextual(ContextualKeyword._as)) {
      expectContextual(ContextualKeyword._namespace);
      parseIdentifier();
      semicolon();
      return true;
    } else {
      if (isContextual(ContextualKeyword._type)) {
        const nextType = lookaheadType();
        if (nextType === TokenType.braceL || nextType === TokenType.star) {
          next();
        }
      }
      return false;
    }
  }
  function tsParseImportSpecifier() {
    parseIdentifier();
    if (match(TokenType.comma) || match(TokenType.braceR)) {
      state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ImportDeclaration;
      return;
    }
    parseIdentifier();
    if (match(TokenType.comma) || match(TokenType.braceR)) {
      state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ImportDeclaration;
      state.tokens[state.tokens.length - 2].isType = true;
      state.tokens[state.tokens.length - 1].isType = true;
      return;
    }
    parseIdentifier();
    if (match(TokenType.comma) || match(TokenType.braceR)) {
      state.tokens[state.tokens.length - 3].identifierRole = IdentifierRole.ImportAccess;
      state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ImportDeclaration;
      return;
    }
    parseIdentifier();
    state.tokens[state.tokens.length - 3].identifierRole = IdentifierRole.ImportAccess;
    state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ImportDeclaration;
    state.tokens[state.tokens.length - 4].isType = true;
    state.tokens[state.tokens.length - 3].isType = true;
    state.tokens[state.tokens.length - 2].isType = true;
    state.tokens[state.tokens.length - 1].isType = true;
  }
  function tsParseExportSpecifier() {
    parseIdentifier();
    if (match(TokenType.comma) || match(TokenType.braceR)) {
      state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ExportAccess;
      return;
    }
    parseIdentifier();
    if (match(TokenType.comma) || match(TokenType.braceR)) {
      state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ExportAccess;
      state.tokens[state.tokens.length - 2].isType = true;
      state.tokens[state.tokens.length - 1].isType = true;
      return;
    }
    parseIdentifier();
    if (match(TokenType.comma) || match(TokenType.braceR)) {
      state.tokens[state.tokens.length - 3].identifierRole = IdentifierRole.ExportAccess;
      return;
    }
    parseIdentifier();
    state.tokens[state.tokens.length - 3].identifierRole = IdentifierRole.ExportAccess;
    state.tokens[state.tokens.length - 4].isType = true;
    state.tokens[state.tokens.length - 3].isType = true;
    state.tokens[state.tokens.length - 2].isType = true;
    state.tokens[state.tokens.length - 1].isType = true;
  }
  function tsTryParseExportDefaultExpression() {
    if (isContextual(ContextualKeyword._abstract) && lookaheadType() === TokenType._class) {
      state.type = TokenType._abstract;
      next();
      parseClass(true, true);
      return true;
    }
    if (isContextual(ContextualKeyword._interface)) {
      const oldIsType = pushTypeContext(2);
      tsParseDeclaration(ContextualKeyword._interface, true);
      popTypeContext(oldIsType);
      return true;
    }
    return false;
  }
  function tsTryParseStatementContent() {
    if (state.type === TokenType._const) {
      const ahead = lookaheadTypeAndKeyword();
      if (ahead.type === TokenType.name && ahead.contextualKeyword === ContextualKeyword._enum) {
        expect(TokenType._const);
        expectContextual(ContextualKeyword._enum);
        state.tokens[state.tokens.length - 1].type = TokenType._enum;
        tsParseEnumDeclaration();
        return true;
      }
    }
    return false;
  }
  function tsTryParseClassMemberWithIsStatic(isStatic) {
    const memberStartIndexAfterStatic = state.tokens.length;
    tsParseModifiers([
      ContextualKeyword._abstract,
      ContextualKeyword._readonly,
      ContextualKeyword._declare,
      ContextualKeyword._static,
      ContextualKeyword._override
    ]);
    const modifiersEndIndex = state.tokens.length;
    const found = tsTryParseIndexSignature();
    if (found) {
      const memberStartIndex = isStatic ? memberStartIndexAfterStatic - 1 : memberStartIndexAfterStatic;
      for (let i = memberStartIndex; i < modifiersEndIndex; i++) {
        state.tokens[i].isType = true;
      }
      return true;
    }
    return false;
  }
  function tsParseIdentifierStatement(contextualKeyword) {
    const matched = tsParseExpressionStatement(contextualKeyword);
    if (!matched) {
      semicolon();
    }
  }
  function tsParseExportDeclaration() {
    const isDeclare = eatContextual(ContextualKeyword._declare);
    if (isDeclare) {
      state.tokens[state.tokens.length - 1].type = TokenType._declare;
    }
    let matchedDeclaration = false;
    if (match(TokenType.name)) {
      if (isDeclare) {
        const oldIsType = pushTypeContext(2);
        matchedDeclaration = tsTryParseExportDeclaration();
        popTypeContext(oldIsType);
      } else {
        matchedDeclaration = tsTryParseExportDeclaration();
      }
    }
    if (!matchedDeclaration) {
      if (isDeclare) {
        const oldIsType = pushTypeContext(2);
        parseStatement(true);
        popTypeContext(oldIsType);
      } else {
        parseStatement(true);
      }
    }
  }
  function tsAfterParseClassSuper(hasSuper) {
    if (hasSuper && (match(TokenType.lessThan) || match(TokenType.bitShiftL))) {
      tsParseTypeArgumentsWithPossibleBitshift();
    }
    if (eatContextual(ContextualKeyword._implements)) {
      state.tokens[state.tokens.length - 1].type = TokenType._implements;
      const oldIsType = pushTypeContext(1);
      tsParseHeritageClause();
      popTypeContext(oldIsType);
    }
  }
  function tsStartParseObjPropValue() {
    tsTryParseTypeParameters();
  }
  function tsStartParseFunctionParams() {
    tsTryParseTypeParameters();
  }
  function tsAfterParseVarHead() {
    const oldIsType = pushTypeContext(0);
    if (!hasPrecedingLineBreak()) {
      eat(TokenType.bang);
    }
    tsTryParseTypeAnnotation();
    popTypeContext(oldIsType);
  }
  function tsStartParseAsyncArrowFromCallExpression() {
    if (match(TokenType.colon)) {
      tsParseTypeAnnotation();
    }
  }
  function tsParseMaybeAssign(noIn, isWithinParens) {
    if (isJSXEnabled) {
      return tsParseMaybeAssignWithJSX(noIn, isWithinParens);
    } else {
      return tsParseMaybeAssignWithoutJSX(noIn, isWithinParens);
    }
  }
  function tsParseMaybeAssignWithJSX(noIn, isWithinParens) {
    if (!match(TokenType.lessThan)) {
      return baseParseMaybeAssign(noIn, isWithinParens);
    }
    const snapshot = state.snapshot();
    let wasArrow = baseParseMaybeAssign(noIn, isWithinParens);
    if (state.error) {
      state.restoreFromSnapshot(snapshot);
    } else {
      return wasArrow;
    }
    state.type = TokenType.typeParameterStart;
    tsParseTypeParameters();
    wasArrow = baseParseMaybeAssign(noIn, isWithinParens);
    if (!wasArrow) {
      unexpected();
    }
    return wasArrow;
  }
  function tsParseMaybeAssignWithoutJSX(noIn, isWithinParens) {
    if (!match(TokenType.lessThan)) {
      return baseParseMaybeAssign(noIn, isWithinParens);
    }
    const snapshot = state.snapshot();
    tsParseTypeParameters();
    const wasArrow = baseParseMaybeAssign(noIn, isWithinParens);
    if (!wasArrow) {
      unexpected();
    }
    if (state.error) {
      state.restoreFromSnapshot(snapshot);
    } else {
      return wasArrow;
    }
    return baseParseMaybeAssign(noIn, isWithinParens);
  }
  function tsParseArrow() {
    if (match(TokenType.colon)) {
      const snapshot = state.snapshot();
      tsParseTypeOrTypePredicateAnnotation(TokenType.colon);
      if (canInsertSemicolon()) unexpected();
      if (!match(TokenType.arrow)) unexpected();
      if (state.error) {
        state.restoreFromSnapshot(snapshot);
      }
    }
    return eat(TokenType.arrow);
  }
  function tsParseAssignableListItemTypes() {
    const oldIsType = pushTypeContext(0);
    eat(TokenType.question);
    tsTryParseTypeAnnotation();
    popTypeContext(oldIsType);
  }
  function tsParseMaybeDecoratorArguments() {
    if (match(TokenType.lessThan) || match(TokenType.bitShiftL)) {
      tsParseTypeArgumentsWithPossibleBitshift();
    }
    baseParseMaybeDecoratorArguments();
  }

  // node_modules/sucrase/dist/esm/parser/plugins/jsx/index.js
  function jsxReadToken() {
    let sawNewline = false;
    let sawNonWhitespace = false;
    while (true) {
      if (state.pos >= input.length) {
        unexpected("Unterminated JSX contents");
        return;
      }
      const ch = input.charCodeAt(state.pos);
      if (ch === charCodes.lessThan || ch === charCodes.leftCurlyBrace) {
        if (state.pos === state.start) {
          if (ch === charCodes.lessThan) {
            state.pos++;
            finishToken(TokenType.jsxTagStart);
            return;
          }
          getTokenFromCode(ch);
          return;
        }
        if (sawNewline && !sawNonWhitespace) {
          finishToken(TokenType.jsxEmptyText);
        } else {
          finishToken(TokenType.jsxText);
        }
        return;
      }
      if (ch === charCodes.lineFeed) {
        sawNewline = true;
      } else if (ch !== charCodes.space && ch !== charCodes.carriageReturn && ch !== charCodes.tab) {
        sawNonWhitespace = true;
      }
      state.pos++;
    }
  }
  function jsxReadString(quote) {
    state.pos++;
    for (; ; ) {
      if (state.pos >= input.length) {
        unexpected("Unterminated string constant");
        return;
      }
      const ch = input.charCodeAt(state.pos);
      if (ch === quote) {
        state.pos++;
        break;
      }
      state.pos++;
    }
    finishToken(TokenType.string);
  }
  function jsxReadWord() {
    let ch;
    do {
      if (state.pos > input.length) {
        unexpected("Unexpectedly reached the end of input.");
        return;
      }
      ch = input.charCodeAt(++state.pos);
    } while (IS_IDENTIFIER_CHAR[ch] || ch === charCodes.dash);
    finishToken(TokenType.jsxName);
  }
  function jsxParseIdentifier() {
    nextJSXTagToken();
  }
  function jsxParseNamespacedName(identifierRole) {
    jsxParseIdentifier();
    if (!eat(TokenType.colon)) {
      state.tokens[state.tokens.length - 1].identifierRole = identifierRole;
      return;
    }
    jsxParseIdentifier();
  }
  function jsxParseElementName() {
    const firstTokenIndex = state.tokens.length;
    jsxParseNamespacedName(IdentifierRole.Access);
    let hadDot = false;
    while (match(TokenType.dot)) {
      hadDot = true;
      nextJSXTagToken();
      jsxParseIdentifier();
    }
    if (!hadDot) {
      const firstToken = state.tokens[firstTokenIndex];
      const firstChar = input.charCodeAt(firstToken.start);
      if (firstChar >= charCodes.lowercaseA && firstChar <= charCodes.lowercaseZ) {
        firstToken.identifierRole = null;
      }
    }
  }
  function jsxParseAttributeValue() {
    switch (state.type) {
      case TokenType.braceL:
        next();
        parseExpression();
        nextJSXTagToken();
        return;
      case TokenType.jsxTagStart:
        jsxParseElement();
        nextJSXTagToken();
        return;
      case TokenType.string:
        nextJSXTagToken();
        return;
      default:
        unexpected("JSX value should be either an expression or a quoted JSX text");
    }
  }
  function jsxParseSpreadChild() {
    expect(TokenType.ellipsis);
    parseExpression();
  }
  function jsxParseOpeningElement(initialTokenIndex) {
    if (match(TokenType.jsxTagEnd)) {
      return false;
    }
    jsxParseElementName();
    if (isTypeScriptEnabled) {
      tsTryParseJSXTypeArgument();
    }
    let hasSeenPropSpread = false;
    while (!match(TokenType.slash) && !match(TokenType.jsxTagEnd) && !state.error) {
      if (eat(TokenType.braceL)) {
        hasSeenPropSpread = true;
        expect(TokenType.ellipsis);
        parseMaybeAssign();
        nextJSXTagToken();
        continue;
      }
      if (hasSeenPropSpread && state.end - state.start === 3 && input.charCodeAt(state.start) === charCodes.lowercaseK && input.charCodeAt(state.start + 1) === charCodes.lowercaseE && input.charCodeAt(state.start + 2) === charCodes.lowercaseY) {
        state.tokens[initialTokenIndex].jsxRole = JSXRole.KeyAfterPropSpread;
      }
      jsxParseNamespacedName(IdentifierRole.ObjectKey);
      if (match(TokenType.eq)) {
        nextJSXTagToken();
        jsxParseAttributeValue();
      }
    }
    const isSelfClosing = match(TokenType.slash);
    if (isSelfClosing) {
      nextJSXTagToken();
    }
    return isSelfClosing;
  }
  function jsxParseClosingElement() {
    if (match(TokenType.jsxTagEnd)) {
      return;
    }
    jsxParseElementName();
  }
  function jsxParseElementAt() {
    const initialTokenIndex = state.tokens.length - 1;
    state.tokens[initialTokenIndex].jsxRole = JSXRole.NoChildren;
    let numExplicitChildren = 0;
    const isSelfClosing = jsxParseOpeningElement(initialTokenIndex);
    if (!isSelfClosing) {
      nextJSXExprToken();
      while (true) {
        switch (state.type) {
          case TokenType.jsxTagStart:
            nextJSXTagToken();
            if (match(TokenType.slash)) {
              nextJSXTagToken();
              jsxParseClosingElement();
              if (state.tokens[initialTokenIndex].jsxRole !== JSXRole.KeyAfterPropSpread) {
                if (numExplicitChildren === 1) {
                  state.tokens[initialTokenIndex].jsxRole = JSXRole.OneChild;
                } else if (numExplicitChildren > 1) {
                  state.tokens[initialTokenIndex].jsxRole = JSXRole.StaticChildren;
                }
              }
              return;
            }
            numExplicitChildren++;
            jsxParseElementAt();
            nextJSXExprToken();
            break;
          case TokenType.jsxText:
            numExplicitChildren++;
            nextJSXExprToken();
            break;
          case TokenType.jsxEmptyText:
            nextJSXExprToken();
            break;
          case TokenType.braceL:
            next();
            if (match(TokenType.ellipsis)) {
              jsxParseSpreadChild();
              nextJSXExprToken();
              numExplicitChildren += 2;
            } else {
              if (!match(TokenType.braceR)) {
                numExplicitChildren++;
                parseExpression();
              }
              nextJSXExprToken();
            }
            break;
          // istanbul ignore next - should never happen
          default:
            unexpected();
            return;
        }
      }
    }
  }
  function jsxParseElement() {
    nextJSXTagToken();
    jsxParseElementAt();
  }
  function nextJSXTagToken() {
    state.tokens.push(new Token());
    skipSpace();
    state.start = state.pos;
    const code = input.charCodeAt(state.pos);
    if (IS_IDENTIFIER_START[code]) {
      jsxReadWord();
    } else if (code === charCodes.quotationMark || code === charCodes.apostrophe) {
      jsxReadString(code);
    } else {
      ++state.pos;
      switch (code) {
        case charCodes.greaterThan:
          finishToken(TokenType.jsxTagEnd);
          break;
        case charCodes.lessThan:
          finishToken(TokenType.jsxTagStart);
          break;
        case charCodes.slash:
          finishToken(TokenType.slash);
          break;
        case charCodes.equalsTo:
          finishToken(TokenType.eq);
          break;
        case charCodes.leftCurlyBrace:
          finishToken(TokenType.braceL);
          break;
        case charCodes.dot:
          finishToken(TokenType.dot);
          break;
        case charCodes.colon:
          finishToken(TokenType.colon);
          break;
        default:
          unexpected();
      }
    }
  }
  function nextJSXExprToken() {
    state.tokens.push(new Token());
    state.start = state.pos;
    jsxReadToken();
  }

  // node_modules/sucrase/dist/esm/parser/plugins/types.js
  function typedParseConditional(noIn) {
    if (match(TokenType.question)) {
      const nextType = lookaheadType();
      if (nextType === TokenType.colon || nextType === TokenType.comma || nextType === TokenType.parenR) {
        return;
      }
    }
    baseParseConditional(noIn);
  }
  function typedParseParenItem() {
    eatTypeToken(TokenType.question);
    if (match(TokenType.colon)) {
      if (isTypeScriptEnabled) {
        tsParseTypeAnnotation();
      } else if (isFlowEnabled) {
        flowParseTypeAnnotation();
      }
    }
  }

  // node_modules/sucrase/dist/esm/parser/traverser/expression.js
  var StopState = class {
    constructor(stop) {
      this.stop = stop;
    }
  };
  function parseExpression(noIn = false) {
    parseMaybeAssign(noIn);
    if (match(TokenType.comma)) {
      while (eat(TokenType.comma)) {
        parseMaybeAssign(noIn);
      }
    }
  }
  function parseMaybeAssign(noIn = false, isWithinParens = false) {
    if (isTypeScriptEnabled) {
      return tsParseMaybeAssign(noIn, isWithinParens);
    } else if (isFlowEnabled) {
      return flowParseMaybeAssign(noIn, isWithinParens);
    } else {
      return baseParseMaybeAssign(noIn, isWithinParens);
    }
  }
  function baseParseMaybeAssign(noIn, isWithinParens) {
    if (match(TokenType._yield)) {
      parseYield();
      return false;
    }
    if (match(TokenType.parenL) || match(TokenType.name) || match(TokenType._yield)) {
      state.potentialArrowAt = state.start;
    }
    const wasArrow = parseMaybeConditional(noIn);
    if (isWithinParens) {
      parseParenItem();
    }
    if (state.type & TokenType.IS_ASSIGN) {
      next();
      parseMaybeAssign(noIn);
      return false;
    }
    return wasArrow;
  }
  function parseMaybeConditional(noIn) {
    const wasArrow = parseExprOps(noIn);
    if (wasArrow) {
      return true;
    }
    parseConditional(noIn);
    return false;
  }
  function parseConditional(noIn) {
    if (isTypeScriptEnabled || isFlowEnabled) {
      typedParseConditional(noIn);
    } else {
      baseParseConditional(noIn);
    }
  }
  function baseParseConditional(noIn) {
    if (eat(TokenType.question)) {
      parseMaybeAssign();
      expect(TokenType.colon);
      parseMaybeAssign(noIn);
    }
  }
  function parseExprOps(noIn) {
    const startTokenIndex = state.tokens.length;
    const wasArrow = parseMaybeUnary();
    if (wasArrow) {
      return true;
    }
    parseExprOp(startTokenIndex, -1, noIn);
    return false;
  }
  function parseExprOp(startTokenIndex, minPrec, noIn) {
    if (isTypeScriptEnabled && (TokenType._in & TokenType.PRECEDENCE_MASK) > minPrec && !hasPrecedingLineBreak() && (eatContextual(ContextualKeyword._as) || eatContextual(ContextualKeyword._satisfies))) {
      const oldIsType = pushTypeContext(1);
      tsParseType();
      popTypeContext(oldIsType);
      rescan_gt();
      parseExprOp(startTokenIndex, minPrec, noIn);
      return;
    }
    const prec = state.type & TokenType.PRECEDENCE_MASK;
    if (prec > 0 && (!noIn || !match(TokenType._in))) {
      if (prec > minPrec) {
        const op = state.type;
        next();
        if (op === TokenType.nullishCoalescing) {
          state.tokens[state.tokens.length - 1].nullishStartIndex = startTokenIndex;
        }
        const rhsStartTokenIndex = state.tokens.length;
        parseMaybeUnary();
        parseExprOp(rhsStartTokenIndex, op & TokenType.IS_RIGHT_ASSOCIATIVE ? prec - 1 : prec, noIn);
        if (op === TokenType.nullishCoalescing) {
          state.tokens[startTokenIndex].numNullishCoalesceStarts++;
          state.tokens[state.tokens.length - 1].numNullishCoalesceEnds++;
        }
        parseExprOp(startTokenIndex, minPrec, noIn);
      }
    }
  }
  function parseMaybeUnary() {
    if (isTypeScriptEnabled && !isJSXEnabled && eat(TokenType.lessThan)) {
      tsParseTypeAssertion();
      return false;
    }
    if (isContextual(ContextualKeyword._module) && lookaheadCharCode() === charCodes.leftCurlyBrace && !hasFollowingLineBreak()) {
      parseModuleExpression();
      return false;
    }
    if (state.type & TokenType.IS_PREFIX) {
      next();
      parseMaybeUnary();
      return false;
    }
    const wasArrow = parseExprSubscripts();
    if (wasArrow) {
      return true;
    }
    while (state.type & TokenType.IS_POSTFIX && !canInsertSemicolon()) {
      if (state.type === TokenType.preIncDec) {
        state.type = TokenType.postIncDec;
      }
      next();
    }
    return false;
  }
  function parseExprSubscripts() {
    const startTokenIndex = state.tokens.length;
    const wasArrow = parseExprAtom();
    if (wasArrow) {
      return true;
    }
    parseSubscripts(startTokenIndex);
    if (state.tokens.length > startTokenIndex && state.tokens[startTokenIndex].isOptionalChainStart) {
      state.tokens[state.tokens.length - 1].isOptionalChainEnd = true;
    }
    return false;
  }
  function parseSubscripts(startTokenIndex, noCalls = false) {
    if (isFlowEnabled) {
      flowParseSubscripts(startTokenIndex, noCalls);
    } else {
      baseParseSubscripts(startTokenIndex, noCalls);
    }
  }
  function baseParseSubscripts(startTokenIndex, noCalls = false) {
    const stopState = new StopState(false);
    do {
      parseSubscript(startTokenIndex, noCalls, stopState);
    } while (!stopState.stop && !state.error);
  }
  function parseSubscript(startTokenIndex, noCalls, stopState) {
    if (isTypeScriptEnabled) {
      tsParseSubscript(startTokenIndex, noCalls, stopState);
    } else if (isFlowEnabled) {
      flowParseSubscript(startTokenIndex, noCalls, stopState);
    } else {
      baseParseSubscript(startTokenIndex, noCalls, stopState);
    }
  }
  function baseParseSubscript(startTokenIndex, noCalls, stopState) {
    if (!noCalls && eat(TokenType.doubleColon)) {
      parseNoCallExpr();
      stopState.stop = true;
      parseSubscripts(startTokenIndex, noCalls);
    } else if (match(TokenType.questionDot)) {
      state.tokens[startTokenIndex].isOptionalChainStart = true;
      if (noCalls && lookaheadType() === TokenType.parenL) {
        stopState.stop = true;
        return;
      }
      next();
      state.tokens[state.tokens.length - 1].subscriptStartIndex = startTokenIndex;
      if (eat(TokenType.bracketL)) {
        parseExpression();
        expect(TokenType.bracketR);
      } else if (eat(TokenType.parenL)) {
        parseCallExpressionArguments();
      } else {
        parseMaybePrivateName();
      }
    } else if (eat(TokenType.dot)) {
      state.tokens[state.tokens.length - 1].subscriptStartIndex = startTokenIndex;
      parseMaybePrivateName();
    } else if (eat(TokenType.bracketL)) {
      state.tokens[state.tokens.length - 1].subscriptStartIndex = startTokenIndex;
      parseExpression();
      expect(TokenType.bracketR);
    } else if (!noCalls && match(TokenType.parenL)) {
      if (atPossibleAsync()) {
        const snapshot = state.snapshot();
        const asyncStartTokenIndex = state.tokens.length;
        next();
        state.tokens[state.tokens.length - 1].subscriptStartIndex = startTokenIndex;
        const callContextId = getNextContextId();
        state.tokens[state.tokens.length - 1].contextId = callContextId;
        parseCallExpressionArguments();
        state.tokens[state.tokens.length - 1].contextId = callContextId;
        if (shouldParseAsyncArrow()) {
          state.restoreFromSnapshot(snapshot);
          stopState.stop = true;
          state.scopeDepth++;
          parseFunctionParams();
          parseAsyncArrowFromCallExpression(asyncStartTokenIndex);
        }
      } else {
        next();
        state.tokens[state.tokens.length - 1].subscriptStartIndex = startTokenIndex;
        const callContextId = getNextContextId();
        state.tokens[state.tokens.length - 1].contextId = callContextId;
        parseCallExpressionArguments();
        state.tokens[state.tokens.length - 1].contextId = callContextId;
      }
    } else if (match(TokenType.backQuote)) {
      parseTemplate();
    } else {
      stopState.stop = true;
    }
  }
  function atPossibleAsync() {
    return state.tokens[state.tokens.length - 1].contextualKeyword === ContextualKeyword._async && !canInsertSemicolon();
  }
  function parseCallExpressionArguments() {
    let first = true;
    while (!eat(TokenType.parenR) && !state.error) {
      if (first) {
        first = false;
      } else {
        expect(TokenType.comma);
        if (eat(TokenType.parenR)) {
          break;
        }
      }
      parseExprListItem(false);
    }
  }
  function shouldParseAsyncArrow() {
    return match(TokenType.colon) || match(TokenType.arrow);
  }
  function parseAsyncArrowFromCallExpression(startTokenIndex) {
    if (isTypeScriptEnabled) {
      tsStartParseAsyncArrowFromCallExpression();
    } else if (isFlowEnabled) {
      flowStartParseAsyncArrowFromCallExpression();
    }
    expect(TokenType.arrow);
    parseArrowExpression(startTokenIndex);
  }
  function parseNoCallExpr() {
    const startTokenIndex = state.tokens.length;
    parseExprAtom();
    parseSubscripts(startTokenIndex, true);
  }
  function parseExprAtom() {
    if (eat(TokenType.modulo)) {
      parseIdentifier();
      return false;
    }
    if (match(TokenType.jsxText) || match(TokenType.jsxEmptyText)) {
      parseLiteral();
      return false;
    } else if (match(TokenType.lessThan) && isJSXEnabled) {
      state.type = TokenType.jsxTagStart;
      jsxParseElement();
      next();
      return false;
    }
    const canBeArrow = state.potentialArrowAt === state.start;
    switch (state.type) {
      case TokenType.slash:
      case TokenType.assign:
        retokenizeSlashAsRegex();
      // Fall through.
      case TokenType._super:
      case TokenType._this:
      case TokenType.regexp:
      case TokenType.num:
      case TokenType.bigint:
      case TokenType.decimal:
      case TokenType.string:
      case TokenType._null:
      case TokenType._true:
      case TokenType._false:
        next();
        return false;
      case TokenType._import:
        next();
        if (match(TokenType.dot)) {
          state.tokens[state.tokens.length - 1].type = TokenType.name;
          next();
          parseIdentifier();
        }
        return false;
      case TokenType.name: {
        const startTokenIndex = state.tokens.length;
        const functionStart = state.start;
        const contextualKeyword = state.contextualKeyword;
        parseIdentifier();
        if (contextualKeyword === ContextualKeyword._await) {
          parseAwait();
          return false;
        } else if (contextualKeyword === ContextualKeyword._async && match(TokenType._function) && !canInsertSemicolon()) {
          next();
          parseFunction(functionStart, false);
          return false;
        } else if (canBeArrow && contextualKeyword === ContextualKeyword._async && !canInsertSemicolon() && match(TokenType.name)) {
          state.scopeDepth++;
          parseBindingIdentifier(false);
          expect(TokenType.arrow);
          parseArrowExpression(startTokenIndex);
          return true;
        } else if (match(TokenType._do) && !canInsertSemicolon()) {
          next();
          parseBlock();
          return false;
        }
        if (canBeArrow && !canInsertSemicolon() && match(TokenType.arrow)) {
          state.scopeDepth++;
          markPriorBindingIdentifier(false);
          expect(TokenType.arrow);
          parseArrowExpression(startTokenIndex);
          return true;
        }
        state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.Access;
        return false;
      }
      case TokenType._do: {
        next();
        parseBlock();
        return false;
      }
      case TokenType.parenL: {
        const wasArrow = parseParenAndDistinguishExpression(canBeArrow);
        return wasArrow;
      }
      case TokenType.bracketL:
        next();
        parseExprList(TokenType.bracketR, true);
        return false;
      case TokenType.braceL:
        parseObj(false, false);
        return false;
      case TokenType._function:
        parseFunctionExpression();
        return false;
      case TokenType.at:
        parseDecorators();
      // Fall through.
      case TokenType._class:
        parseClass(false);
        return false;
      case TokenType._new:
        parseNew();
        return false;
      case TokenType.backQuote:
        parseTemplate();
        return false;
      case TokenType.doubleColon: {
        next();
        parseNoCallExpr();
        return false;
      }
      case TokenType.hash: {
        const code = lookaheadCharCode();
        if (IS_IDENTIFIER_START[code] || code === charCodes.backslash) {
          parseMaybePrivateName();
        } else {
          next();
        }
        return false;
      }
      default:
        unexpected();
        return false;
    }
  }
  function parseMaybePrivateName() {
    eat(TokenType.hash);
    parseIdentifier();
  }
  function parseFunctionExpression() {
    const functionStart = state.start;
    parseIdentifier();
    if (eat(TokenType.dot)) {
      parseIdentifier();
    }
    parseFunction(functionStart, false);
  }
  function parseLiteral() {
    next();
  }
  function parseParenExpression() {
    expect(TokenType.parenL);
    parseExpression();
    expect(TokenType.parenR);
  }
  function parseParenAndDistinguishExpression(canBeArrow) {
    const snapshot = state.snapshot();
    const startTokenIndex = state.tokens.length;
    expect(TokenType.parenL);
    let first = true;
    while (!match(TokenType.parenR) && !state.error) {
      if (first) {
        first = false;
      } else {
        expect(TokenType.comma);
        if (match(TokenType.parenR)) {
          break;
        }
      }
      if (match(TokenType.ellipsis)) {
        parseRest(
          false
          /* isBlockScope */
        );
        parseParenItem();
        break;
      } else {
        parseMaybeAssign(false, true);
      }
    }
    expect(TokenType.parenR);
    if (canBeArrow && shouldParseArrow()) {
      const wasArrow = parseArrow();
      if (wasArrow) {
        state.restoreFromSnapshot(snapshot);
        state.scopeDepth++;
        parseFunctionParams();
        parseArrow();
        parseArrowExpression(startTokenIndex);
        if (state.error) {
          state.restoreFromSnapshot(snapshot);
          parseParenAndDistinguishExpression(false);
          return false;
        }
        return true;
      }
    }
    return false;
  }
  function shouldParseArrow() {
    return match(TokenType.colon) || !canInsertSemicolon();
  }
  function parseArrow() {
    if (isTypeScriptEnabled) {
      return tsParseArrow();
    } else if (isFlowEnabled) {
      return flowParseArrow();
    } else {
      return eat(TokenType.arrow);
    }
  }
  function parseParenItem() {
    if (isTypeScriptEnabled || isFlowEnabled) {
      typedParseParenItem();
    }
  }
  function parseNew() {
    expect(TokenType._new);
    if (eat(TokenType.dot)) {
      parseIdentifier();
      return;
    }
    parseNewCallee();
    if (isFlowEnabled) {
      flowStartParseNewArguments();
    }
    if (eat(TokenType.parenL)) {
      parseExprList(TokenType.parenR);
    }
  }
  function parseNewCallee() {
    parseNoCallExpr();
    eat(TokenType.questionDot);
  }
  function parseTemplate() {
    nextTemplateToken();
    nextTemplateToken();
    while (!match(TokenType.backQuote) && !state.error) {
      expect(TokenType.dollarBraceL);
      parseExpression();
      nextTemplateToken();
      nextTemplateToken();
    }
    next();
  }
  function parseObj(isPattern, isBlockScope) {
    const contextId = getNextContextId();
    let first = true;
    next();
    state.tokens[state.tokens.length - 1].contextId = contextId;
    while (!eat(TokenType.braceR) && !state.error) {
      if (first) {
        first = false;
      } else {
        expect(TokenType.comma);
        if (eat(TokenType.braceR)) {
          break;
        }
      }
      let isGenerator = false;
      if (match(TokenType.ellipsis)) {
        const previousIndex = state.tokens.length;
        parseSpread();
        if (isPattern) {
          if (state.tokens.length === previousIndex + 2) {
            markPriorBindingIdentifier(isBlockScope);
          }
          if (eat(TokenType.braceR)) {
            break;
          }
        }
        continue;
      }
      if (!isPattern) {
        isGenerator = eat(TokenType.star);
      }
      if (!isPattern && isContextual(ContextualKeyword._async)) {
        if (isGenerator) unexpected();
        parseIdentifier();
        if (match(TokenType.colon) || match(TokenType.parenL) || match(TokenType.braceR) || match(TokenType.eq) || match(TokenType.comma)) {
        } else {
          if (match(TokenType.star)) {
            next();
            isGenerator = true;
          }
          parsePropertyName(contextId);
        }
      } else {
        parsePropertyName(contextId);
      }
      parseObjPropValue(isPattern, isBlockScope, contextId);
    }
    state.tokens[state.tokens.length - 1].contextId = contextId;
  }
  function isGetterOrSetterMethod(isPattern) {
    return !isPattern && (match(TokenType.string) || // get "string"() {}
    match(TokenType.num) || // get 1() {}
    match(TokenType.bracketL) || // get ["string"]() {}
    match(TokenType.name) || // get foo() {}
    !!(state.type & TokenType.IS_KEYWORD));
  }
  function parseObjectMethod(isPattern, objectContextId) {
    const functionStart = state.start;
    if (match(TokenType.parenL)) {
      if (isPattern) unexpected();
      parseMethod(
        functionStart,
        /* isConstructor */
        false
      );
      return true;
    }
    if (isGetterOrSetterMethod(isPattern)) {
      parsePropertyName(objectContextId);
      parseMethod(
        functionStart,
        /* isConstructor */
        false
      );
      return true;
    }
    return false;
  }
  function parseObjectProperty(isPattern, isBlockScope) {
    if (eat(TokenType.colon)) {
      if (isPattern) {
        parseMaybeDefault(isBlockScope);
      } else {
        parseMaybeAssign(false);
      }
      return;
    }
    let identifierRole;
    if (isPattern) {
      if (state.scopeDepth === 0) {
        identifierRole = IdentifierRole.ObjectShorthandTopLevelDeclaration;
      } else if (isBlockScope) {
        identifierRole = IdentifierRole.ObjectShorthandBlockScopedDeclaration;
      } else {
        identifierRole = IdentifierRole.ObjectShorthandFunctionScopedDeclaration;
      }
    } else {
      identifierRole = IdentifierRole.ObjectShorthand;
    }
    state.tokens[state.tokens.length - 1].identifierRole = identifierRole;
    parseMaybeDefault(isBlockScope, true);
  }
  function parseObjPropValue(isPattern, isBlockScope, objectContextId) {
    if (isTypeScriptEnabled) {
      tsStartParseObjPropValue();
    } else if (isFlowEnabled) {
      flowStartParseObjPropValue();
    }
    const wasMethod = parseObjectMethod(isPattern, objectContextId);
    if (!wasMethod) {
      parseObjectProperty(isPattern, isBlockScope);
    }
  }
  function parsePropertyName(objectContextId) {
    if (isFlowEnabled) {
      flowParseVariance();
    }
    if (eat(TokenType.bracketL)) {
      state.tokens[state.tokens.length - 1].contextId = objectContextId;
      parseMaybeAssign();
      expect(TokenType.bracketR);
      state.tokens[state.tokens.length - 1].contextId = objectContextId;
    } else {
      if (match(TokenType.num) || match(TokenType.string) || match(TokenType.bigint) || match(TokenType.decimal)) {
        parseExprAtom();
      } else {
        parseMaybePrivateName();
      }
      state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ObjectKey;
      state.tokens[state.tokens.length - 1].contextId = objectContextId;
    }
  }
  function parseMethod(functionStart, isConstructor) {
    const funcContextId = getNextContextId();
    state.scopeDepth++;
    const startTokenIndex = state.tokens.length;
    const allowModifiers = isConstructor;
    parseFunctionParams(allowModifiers, funcContextId);
    parseFunctionBodyAndFinish(functionStart, funcContextId);
    const endTokenIndex = state.tokens.length;
    state.scopes.push(new Scope(startTokenIndex, endTokenIndex, true));
    state.scopeDepth--;
  }
  function parseArrowExpression(startTokenIndex) {
    parseFunctionBody(true);
    const endTokenIndex = state.tokens.length;
    state.scopes.push(new Scope(startTokenIndex, endTokenIndex, true));
    state.scopeDepth--;
  }
  function parseFunctionBodyAndFinish(functionStart, funcContextId = 0) {
    if (isTypeScriptEnabled) {
      tsParseFunctionBodyAndFinish(functionStart, funcContextId);
    } else if (isFlowEnabled) {
      flowParseFunctionBodyAndFinish(funcContextId);
    } else {
      parseFunctionBody(false, funcContextId);
    }
  }
  function parseFunctionBody(allowExpression, funcContextId = 0) {
    const isExpression = allowExpression && !match(TokenType.braceL);
    if (isExpression) {
      parseMaybeAssign();
    } else {
      parseBlock(true, funcContextId);
    }
  }
  function parseExprList(close, allowEmpty = false) {
    let first = true;
    while (!eat(close) && !state.error) {
      if (first) {
        first = false;
      } else {
        expect(TokenType.comma);
        if (eat(close)) break;
      }
      parseExprListItem(allowEmpty);
    }
  }
  function parseExprListItem(allowEmpty) {
    if (allowEmpty && match(TokenType.comma)) {
    } else if (match(TokenType.ellipsis)) {
      parseSpread();
      parseParenItem();
    } else if (match(TokenType.question)) {
      next();
    } else {
      parseMaybeAssign(false, true);
    }
  }
  function parseIdentifier() {
    next();
    state.tokens[state.tokens.length - 1].type = TokenType.name;
  }
  function parseAwait() {
    parseMaybeUnary();
  }
  function parseYield() {
    next();
    if (!match(TokenType.semi) && !canInsertSemicolon()) {
      eat(TokenType.star);
      parseMaybeAssign();
    }
  }
  function parseModuleExpression() {
    expectContextual(ContextualKeyword._module);
    expect(TokenType.braceL);
    parseBlockBody(TokenType.braceR);
  }

  // node_modules/sucrase/dist/esm/parser/plugins/flow.js
  function isMaybeDefaultImport(lookahead) {
    return (lookahead.type === TokenType.name || !!(lookahead.type & TokenType.IS_KEYWORD)) && lookahead.contextualKeyword !== ContextualKeyword._from;
  }
  function flowParseTypeInitialiser(tok) {
    const oldIsType = pushTypeContext(0);
    expect(tok || TokenType.colon);
    flowParseType();
    popTypeContext(oldIsType);
  }
  function flowParsePredicate() {
    expect(TokenType.modulo);
    expectContextual(ContextualKeyword._checks);
    if (eat(TokenType.parenL)) {
      parseExpression();
      expect(TokenType.parenR);
    }
  }
  function flowParseTypeAndPredicateInitialiser() {
    const oldIsType = pushTypeContext(0);
    expect(TokenType.colon);
    if (match(TokenType.modulo)) {
      flowParsePredicate();
    } else {
      flowParseType();
      if (match(TokenType.modulo)) {
        flowParsePredicate();
      }
    }
    popTypeContext(oldIsType);
  }
  function flowParseDeclareClass() {
    next();
    flowParseInterfaceish(
      /* isClass */
      true
    );
  }
  function flowParseDeclareFunction() {
    next();
    parseIdentifier();
    if (match(TokenType.lessThan)) {
      flowParseTypeParameterDeclaration();
    }
    expect(TokenType.parenL);
    flowParseFunctionTypeParams();
    expect(TokenType.parenR);
    flowParseTypeAndPredicateInitialiser();
    semicolon();
  }
  function flowParseDeclare() {
    if (match(TokenType._class)) {
      flowParseDeclareClass();
    } else if (match(TokenType._function)) {
      flowParseDeclareFunction();
    } else if (match(TokenType._var)) {
      flowParseDeclareVariable();
    } else if (eatContextual(ContextualKeyword._module)) {
      if (eat(TokenType.dot)) {
        flowParseDeclareModuleExports();
      } else {
        flowParseDeclareModule();
      }
    } else if (isContextual(ContextualKeyword._type)) {
      flowParseDeclareTypeAlias();
    } else if (isContextual(ContextualKeyword._opaque)) {
      flowParseDeclareOpaqueType();
    } else if (isContextual(ContextualKeyword._interface)) {
      flowParseDeclareInterface();
    } else if (match(TokenType._export)) {
      flowParseDeclareExportDeclaration();
    } else {
      unexpected();
    }
  }
  function flowParseDeclareVariable() {
    next();
    flowParseTypeAnnotatableIdentifier();
    semicolon();
  }
  function flowParseDeclareModule() {
    if (match(TokenType.string)) {
      parseExprAtom();
    } else {
      parseIdentifier();
    }
    expect(TokenType.braceL);
    while (!match(TokenType.braceR) && !state.error) {
      if (match(TokenType._import)) {
        next();
        parseImport();
      } else {
        unexpected();
      }
    }
    expect(TokenType.braceR);
  }
  function flowParseDeclareExportDeclaration() {
    expect(TokenType._export);
    if (eat(TokenType._default)) {
      if (match(TokenType._function) || match(TokenType._class)) {
        flowParseDeclare();
      } else {
        flowParseType();
        semicolon();
      }
    } else if (match(TokenType._var) || // declare export var ...
    match(TokenType._function) || // declare export function ...
    match(TokenType._class) || // declare export class ...
    isContextual(ContextualKeyword._opaque)) {
      flowParseDeclare();
    } else if (match(TokenType.star) || // declare export * from ''
    match(TokenType.braceL) || // declare export {} ...
    isContextual(ContextualKeyword._interface) || // declare export interface ...
    isContextual(ContextualKeyword._type) || // declare export type ...
    isContextual(ContextualKeyword._opaque)) {
      parseExport();
    } else {
      unexpected();
    }
  }
  function flowParseDeclareModuleExports() {
    expectContextual(ContextualKeyword._exports);
    flowParseTypeAnnotation();
    semicolon();
  }
  function flowParseDeclareTypeAlias() {
    next();
    flowParseTypeAlias();
  }
  function flowParseDeclareOpaqueType() {
    next();
    flowParseOpaqueType(true);
  }
  function flowParseDeclareInterface() {
    next();
    flowParseInterfaceish();
  }
  function flowParseInterfaceish(isClass = false) {
    flowParseRestrictedIdentifier();
    if (match(TokenType.lessThan)) {
      flowParseTypeParameterDeclaration();
    }
    if (eat(TokenType._extends)) {
      do {
        flowParseInterfaceExtends();
      } while (!isClass && eat(TokenType.comma));
    }
    if (isContextual(ContextualKeyword._mixins)) {
      next();
      do {
        flowParseInterfaceExtends();
      } while (eat(TokenType.comma));
    }
    if (isContextual(ContextualKeyword._implements)) {
      next();
      do {
        flowParseInterfaceExtends();
      } while (eat(TokenType.comma));
    }
    flowParseObjectType(isClass, false, isClass);
  }
  function flowParseInterfaceExtends() {
    flowParseQualifiedTypeIdentifier(false);
    if (match(TokenType.lessThan)) {
      flowParseTypeParameterInstantiation();
    }
  }
  function flowParseInterface() {
    flowParseInterfaceish();
  }
  function flowParseRestrictedIdentifier() {
    parseIdentifier();
  }
  function flowParseTypeAlias() {
    flowParseRestrictedIdentifier();
    if (match(TokenType.lessThan)) {
      flowParseTypeParameterDeclaration();
    }
    flowParseTypeInitialiser(TokenType.eq);
    semicolon();
  }
  function flowParseOpaqueType(declare) {
    expectContextual(ContextualKeyword._type);
    flowParseRestrictedIdentifier();
    if (match(TokenType.lessThan)) {
      flowParseTypeParameterDeclaration();
    }
    if (match(TokenType.colon)) {
      flowParseTypeInitialiser(TokenType.colon);
    }
    if (!declare) {
      flowParseTypeInitialiser(TokenType.eq);
    }
    semicolon();
  }
  function flowParseTypeParameter() {
    flowParseVariance();
    flowParseTypeAnnotatableIdentifier();
    if (eat(TokenType.eq)) {
      flowParseType();
    }
  }
  function flowParseTypeParameterDeclaration() {
    const oldIsType = pushTypeContext(0);
    if (match(TokenType.lessThan) || match(TokenType.typeParameterStart)) {
      next();
    } else {
      unexpected();
    }
    do {
      flowParseTypeParameter();
      if (!match(TokenType.greaterThan)) {
        expect(TokenType.comma);
      }
    } while (!match(TokenType.greaterThan) && !state.error);
    expect(TokenType.greaterThan);
    popTypeContext(oldIsType);
  }
  function flowParseTypeParameterInstantiation() {
    const oldIsType = pushTypeContext(0);
    expect(TokenType.lessThan);
    while (!match(TokenType.greaterThan) && !state.error) {
      flowParseType();
      if (!match(TokenType.greaterThan)) {
        expect(TokenType.comma);
      }
    }
    expect(TokenType.greaterThan);
    popTypeContext(oldIsType);
  }
  function flowParseInterfaceType() {
    expectContextual(ContextualKeyword._interface);
    if (eat(TokenType._extends)) {
      do {
        flowParseInterfaceExtends();
      } while (eat(TokenType.comma));
    }
    flowParseObjectType(false, false, false);
  }
  function flowParseObjectPropertyKey() {
    if (match(TokenType.num) || match(TokenType.string)) {
      parseExprAtom();
    } else {
      parseIdentifier();
    }
  }
  function flowParseObjectTypeIndexer() {
    if (lookaheadType() === TokenType.colon) {
      flowParseObjectPropertyKey();
      flowParseTypeInitialiser();
    } else {
      flowParseType();
    }
    expect(TokenType.bracketR);
    flowParseTypeInitialiser();
  }
  function flowParseObjectTypeInternalSlot() {
    flowParseObjectPropertyKey();
    expect(TokenType.bracketR);
    expect(TokenType.bracketR);
    if (match(TokenType.lessThan) || match(TokenType.parenL)) {
      flowParseObjectTypeMethodish();
    } else {
      eat(TokenType.question);
      flowParseTypeInitialiser();
    }
  }
  function flowParseObjectTypeMethodish() {
    if (match(TokenType.lessThan)) {
      flowParseTypeParameterDeclaration();
    }
    expect(TokenType.parenL);
    while (!match(TokenType.parenR) && !match(TokenType.ellipsis) && !state.error) {
      flowParseFunctionTypeParam();
      if (!match(TokenType.parenR)) {
        expect(TokenType.comma);
      }
    }
    if (eat(TokenType.ellipsis)) {
      flowParseFunctionTypeParam();
    }
    expect(TokenType.parenR);
    flowParseTypeInitialiser();
  }
  function flowParseObjectTypeCallProperty() {
    flowParseObjectTypeMethodish();
  }
  function flowParseObjectType(allowStatic, allowExact, allowProto) {
    let endDelim;
    if (allowExact && match(TokenType.braceBarL)) {
      expect(TokenType.braceBarL);
      endDelim = TokenType.braceBarR;
    } else {
      expect(TokenType.braceL);
      endDelim = TokenType.braceR;
    }
    while (!match(endDelim) && !state.error) {
      if (allowProto && isContextual(ContextualKeyword._proto)) {
        const lookahead = lookaheadType();
        if (lookahead !== TokenType.colon && lookahead !== TokenType.question) {
          next();
          allowStatic = false;
        }
      }
      if (allowStatic && isContextual(ContextualKeyword._static)) {
        const lookahead = lookaheadType();
        if (lookahead !== TokenType.colon && lookahead !== TokenType.question) {
          next();
        }
      }
      flowParseVariance();
      if (eat(TokenType.bracketL)) {
        if (eat(TokenType.bracketL)) {
          flowParseObjectTypeInternalSlot();
        } else {
          flowParseObjectTypeIndexer();
        }
      } else if (match(TokenType.parenL) || match(TokenType.lessThan)) {
        flowParseObjectTypeCallProperty();
      } else {
        if (isContextual(ContextualKeyword._get) || isContextual(ContextualKeyword._set)) {
          const lookahead = lookaheadType();
          if (lookahead === TokenType.name || lookahead === TokenType.string || lookahead === TokenType.num) {
            next();
          }
        }
        flowParseObjectTypeProperty();
      }
      flowObjectTypeSemicolon();
    }
    expect(endDelim);
  }
  function flowParseObjectTypeProperty() {
    if (match(TokenType.ellipsis)) {
      expect(TokenType.ellipsis);
      if (!eat(TokenType.comma)) {
        eat(TokenType.semi);
      }
      if (match(TokenType.braceR)) {
        return;
      }
      flowParseType();
    } else {
      flowParseObjectPropertyKey();
      if (match(TokenType.lessThan) || match(TokenType.parenL)) {
        flowParseObjectTypeMethodish();
      } else {
        eat(TokenType.question);
        flowParseTypeInitialiser();
      }
    }
  }
  function flowObjectTypeSemicolon() {
    if (!eat(TokenType.semi) && !eat(TokenType.comma) && !match(TokenType.braceR) && !match(TokenType.braceBarR)) {
      unexpected();
    }
  }
  function flowParseQualifiedTypeIdentifier(initialIdAlreadyParsed) {
    if (!initialIdAlreadyParsed) {
      parseIdentifier();
    }
    while (eat(TokenType.dot)) {
      parseIdentifier();
    }
  }
  function flowParseGenericType() {
    flowParseQualifiedTypeIdentifier(true);
    if (match(TokenType.lessThan)) {
      flowParseTypeParameterInstantiation();
    }
  }
  function flowParseTypeofType() {
    expect(TokenType._typeof);
    flowParsePrimaryType();
  }
  function flowParseTupleType() {
    expect(TokenType.bracketL);
    while (state.pos < input.length && !match(TokenType.bracketR)) {
      flowParseType();
      if (match(TokenType.bracketR)) {
        break;
      }
      expect(TokenType.comma);
    }
    expect(TokenType.bracketR);
  }
  function flowParseFunctionTypeParam() {
    const lookahead = lookaheadType();
    if (lookahead === TokenType.colon || lookahead === TokenType.question) {
      parseIdentifier();
      eat(TokenType.question);
      flowParseTypeInitialiser();
    } else {
      flowParseType();
    }
  }
  function flowParseFunctionTypeParams() {
    while (!match(TokenType.parenR) && !match(TokenType.ellipsis) && !state.error) {
      flowParseFunctionTypeParam();
      if (!match(TokenType.parenR)) {
        expect(TokenType.comma);
      }
    }
    if (eat(TokenType.ellipsis)) {
      flowParseFunctionTypeParam();
    }
  }
  function flowParsePrimaryType() {
    let isGroupedType = false;
    const oldNoAnonFunctionType = state.noAnonFunctionType;
    switch (state.type) {
      case TokenType.name: {
        if (isContextual(ContextualKeyword._interface)) {
          flowParseInterfaceType();
          return;
        }
        parseIdentifier();
        flowParseGenericType();
        return;
      }
      case TokenType.braceL:
        flowParseObjectType(false, false, false);
        return;
      case TokenType.braceBarL:
        flowParseObjectType(false, true, false);
        return;
      case TokenType.bracketL:
        flowParseTupleType();
        return;
      case TokenType.lessThan:
        flowParseTypeParameterDeclaration();
        expect(TokenType.parenL);
        flowParseFunctionTypeParams();
        expect(TokenType.parenR);
        expect(TokenType.arrow);
        flowParseType();
        return;
      case TokenType.parenL:
        next();
        if (!match(TokenType.parenR) && !match(TokenType.ellipsis)) {
          if (match(TokenType.name)) {
            const token = lookaheadType();
            isGroupedType = token !== TokenType.question && token !== TokenType.colon;
          } else {
            isGroupedType = true;
          }
        }
        if (isGroupedType) {
          state.noAnonFunctionType = false;
          flowParseType();
          state.noAnonFunctionType = oldNoAnonFunctionType;
          if (state.noAnonFunctionType || !(match(TokenType.comma) || match(TokenType.parenR) && lookaheadType() === TokenType.arrow)) {
            expect(TokenType.parenR);
            return;
          } else {
            eat(TokenType.comma);
          }
        }
        flowParseFunctionTypeParams();
        expect(TokenType.parenR);
        expect(TokenType.arrow);
        flowParseType();
        return;
      case TokenType.minus:
        next();
        parseLiteral();
        return;
      case TokenType.string:
      case TokenType.num:
      case TokenType._true:
      case TokenType._false:
      case TokenType._null:
      case TokenType._this:
      case TokenType._void:
      case TokenType.star:
        next();
        return;
      default:
        if (state.type === TokenType._typeof) {
          flowParseTypeofType();
          return;
        } else if (state.type & TokenType.IS_KEYWORD) {
          next();
          state.tokens[state.tokens.length - 1].type = TokenType.name;
          return;
        }
    }
    unexpected();
  }
  function flowParsePostfixType() {
    flowParsePrimaryType();
    while (!canInsertSemicolon() && (match(TokenType.bracketL) || match(TokenType.questionDot))) {
      eat(TokenType.questionDot);
      expect(TokenType.bracketL);
      if (eat(TokenType.bracketR)) {
      } else {
        flowParseType();
        expect(TokenType.bracketR);
      }
    }
  }
  function flowParsePrefixType() {
    if (eat(TokenType.question)) {
      flowParsePrefixType();
    } else {
      flowParsePostfixType();
    }
  }
  function flowParseAnonFunctionWithoutParens() {
    flowParsePrefixType();
    if (!state.noAnonFunctionType && eat(TokenType.arrow)) {
      flowParseType();
    }
  }
  function flowParseIntersectionType() {
    eat(TokenType.bitwiseAND);
    flowParseAnonFunctionWithoutParens();
    while (eat(TokenType.bitwiseAND)) {
      flowParseAnonFunctionWithoutParens();
    }
  }
  function flowParseUnionType() {
    eat(TokenType.bitwiseOR);
    flowParseIntersectionType();
    while (eat(TokenType.bitwiseOR)) {
      flowParseIntersectionType();
    }
  }
  function flowParseType() {
    flowParseUnionType();
  }
  function flowParseTypeAnnotation() {
    flowParseTypeInitialiser();
  }
  function flowParseTypeAnnotatableIdentifier() {
    parseIdentifier();
    if (match(TokenType.colon)) {
      flowParseTypeAnnotation();
    }
  }
  function flowParseVariance() {
    if (match(TokenType.plus) || match(TokenType.minus)) {
      next();
      state.tokens[state.tokens.length - 1].isType = true;
    }
  }
  function flowParseFunctionBodyAndFinish(funcContextId) {
    if (match(TokenType.colon)) {
      flowParseTypeAndPredicateInitialiser();
    }
    parseFunctionBody(false, funcContextId);
  }
  function flowParseSubscript(startTokenIndex, noCalls, stopState) {
    if (match(TokenType.questionDot) && lookaheadType() === TokenType.lessThan) {
      if (noCalls) {
        stopState.stop = true;
        return;
      }
      next();
      flowParseTypeParameterInstantiation();
      expect(TokenType.parenL);
      parseCallExpressionArguments();
      return;
    } else if (!noCalls && match(TokenType.lessThan)) {
      const snapshot = state.snapshot();
      flowParseTypeParameterInstantiation();
      expect(TokenType.parenL);
      parseCallExpressionArguments();
      if (state.error) {
        state.restoreFromSnapshot(snapshot);
      } else {
        return;
      }
    }
    baseParseSubscript(startTokenIndex, noCalls, stopState);
  }
  function flowStartParseNewArguments() {
    if (match(TokenType.lessThan)) {
      const snapshot = state.snapshot();
      flowParseTypeParameterInstantiation();
      if (state.error) {
        state.restoreFromSnapshot(snapshot);
      }
    }
  }
  function flowTryParseStatement() {
    if (match(TokenType.name) && state.contextualKeyword === ContextualKeyword._interface) {
      const oldIsType = pushTypeContext(0);
      next();
      flowParseInterface();
      popTypeContext(oldIsType);
      return true;
    } else if (isContextual(ContextualKeyword._enum)) {
      flowParseEnumDeclaration();
      return true;
    }
    return false;
  }
  function flowTryParseExportDefaultExpression() {
    if (isContextual(ContextualKeyword._enum)) {
      flowParseEnumDeclaration();
      return true;
    }
    return false;
  }
  function flowParseIdentifierStatement(contextualKeyword) {
    if (contextualKeyword === ContextualKeyword._declare) {
      if (match(TokenType._class) || match(TokenType.name) || match(TokenType._function) || match(TokenType._var) || match(TokenType._export)) {
        const oldIsType = pushTypeContext(1);
        flowParseDeclare();
        popTypeContext(oldIsType);
      }
    } else if (match(TokenType.name)) {
      if (contextualKeyword === ContextualKeyword._interface) {
        const oldIsType = pushTypeContext(1);
        flowParseInterface();
        popTypeContext(oldIsType);
      } else if (contextualKeyword === ContextualKeyword._type) {
        const oldIsType = pushTypeContext(1);
        flowParseTypeAlias();
        popTypeContext(oldIsType);
      } else if (contextualKeyword === ContextualKeyword._opaque) {
        const oldIsType = pushTypeContext(1);
        flowParseOpaqueType(false);
        popTypeContext(oldIsType);
      }
    }
    semicolon();
  }
  function flowShouldParseExportDeclaration() {
    return isContextual(ContextualKeyword._type) || isContextual(ContextualKeyword._interface) || isContextual(ContextualKeyword._opaque) || isContextual(ContextualKeyword._enum);
  }
  function flowShouldDisallowExportDefaultSpecifier() {
    return match(TokenType.name) && (state.contextualKeyword === ContextualKeyword._type || state.contextualKeyword === ContextualKeyword._interface || state.contextualKeyword === ContextualKeyword._opaque || state.contextualKeyword === ContextualKeyword._enum);
  }
  function flowParseExportDeclaration() {
    if (isContextual(ContextualKeyword._type)) {
      const oldIsType = pushTypeContext(1);
      next();
      if (match(TokenType.braceL)) {
        parseExportSpecifiers();
        parseExportFrom();
      } else {
        flowParseTypeAlias();
      }
      popTypeContext(oldIsType);
    } else if (isContextual(ContextualKeyword._opaque)) {
      const oldIsType = pushTypeContext(1);
      next();
      flowParseOpaqueType(false);
      popTypeContext(oldIsType);
    } else if (isContextual(ContextualKeyword._interface)) {
      const oldIsType = pushTypeContext(1);
      next();
      flowParseInterface();
      popTypeContext(oldIsType);
    } else {
      parseStatement(true);
    }
  }
  function flowShouldParseExportStar() {
    return match(TokenType.star) || isContextual(ContextualKeyword._type) && lookaheadType() === TokenType.star;
  }
  function flowParseExportStar() {
    if (eatContextual(ContextualKeyword._type)) {
      const oldIsType = pushTypeContext(2);
      baseParseExportStar();
      popTypeContext(oldIsType);
    } else {
      baseParseExportStar();
    }
  }
  function flowAfterParseClassSuper(hasSuper) {
    if (hasSuper && match(TokenType.lessThan)) {
      flowParseTypeParameterInstantiation();
    }
    if (isContextual(ContextualKeyword._implements)) {
      const oldIsType = pushTypeContext(0);
      next();
      state.tokens[state.tokens.length - 1].type = TokenType._implements;
      do {
        flowParseRestrictedIdentifier();
        if (match(TokenType.lessThan)) {
          flowParseTypeParameterInstantiation();
        }
      } while (eat(TokenType.comma));
      popTypeContext(oldIsType);
    }
  }
  function flowStartParseObjPropValue() {
    if (match(TokenType.lessThan)) {
      flowParseTypeParameterDeclaration();
      if (!match(TokenType.parenL)) unexpected();
    }
  }
  function flowParseAssignableListItemTypes() {
    const oldIsType = pushTypeContext(0);
    eat(TokenType.question);
    if (match(TokenType.colon)) {
      flowParseTypeAnnotation();
    }
    popTypeContext(oldIsType);
  }
  function flowStartParseImportSpecifiers() {
    if (match(TokenType._typeof) || isContextual(ContextualKeyword._type)) {
      const lh = lookaheadTypeAndKeyword();
      if (isMaybeDefaultImport(lh) || lh.type === TokenType.braceL || lh.type === TokenType.star) {
        next();
      }
    }
  }
  function flowParseImportSpecifier() {
    const isTypeKeyword = state.contextualKeyword === ContextualKeyword._type || state.type === TokenType._typeof;
    if (isTypeKeyword) {
      next();
    } else {
      parseIdentifier();
    }
    if (isContextual(ContextualKeyword._as) && !isLookaheadContextual(ContextualKeyword._as)) {
      parseIdentifier();
      if (isTypeKeyword && !match(TokenType.name) && !(state.type & TokenType.IS_KEYWORD)) {
      } else {
        parseIdentifier();
      }
    } else {
      if (isTypeKeyword && (match(TokenType.name) || !!(state.type & TokenType.IS_KEYWORD))) {
        parseIdentifier();
      }
      if (eatContextual(ContextualKeyword._as)) {
        parseIdentifier();
      }
    }
  }
  function flowStartParseFunctionParams() {
    if (match(TokenType.lessThan)) {
      const oldIsType = pushTypeContext(0);
      flowParseTypeParameterDeclaration();
      popTypeContext(oldIsType);
    }
  }
  function flowAfterParseVarHead() {
    if (match(TokenType.colon)) {
      flowParseTypeAnnotation();
    }
  }
  function flowStartParseAsyncArrowFromCallExpression() {
    if (match(TokenType.colon)) {
      const oldNoAnonFunctionType = state.noAnonFunctionType;
      state.noAnonFunctionType = true;
      flowParseTypeAnnotation();
      state.noAnonFunctionType = oldNoAnonFunctionType;
    }
  }
  function flowParseMaybeAssign(noIn, isWithinParens) {
    if (match(TokenType.lessThan)) {
      const snapshot = state.snapshot();
      let wasArrow = baseParseMaybeAssign(noIn, isWithinParens);
      if (state.error) {
        state.restoreFromSnapshot(snapshot);
        state.type = TokenType.typeParameterStart;
      } else {
        return wasArrow;
      }
      const oldIsType = pushTypeContext(0);
      flowParseTypeParameterDeclaration();
      popTypeContext(oldIsType);
      wasArrow = baseParseMaybeAssign(noIn, isWithinParens);
      if (wasArrow) {
        return true;
      }
      unexpected();
    }
    return baseParseMaybeAssign(noIn, isWithinParens);
  }
  function flowParseArrow() {
    if (match(TokenType.colon)) {
      const oldIsType = pushTypeContext(0);
      const snapshot = state.snapshot();
      const oldNoAnonFunctionType = state.noAnonFunctionType;
      state.noAnonFunctionType = true;
      flowParseTypeAndPredicateInitialiser();
      state.noAnonFunctionType = oldNoAnonFunctionType;
      if (canInsertSemicolon()) unexpected();
      if (!match(TokenType.arrow)) unexpected();
      if (state.error) {
        state.restoreFromSnapshot(snapshot);
      }
      popTypeContext(oldIsType);
    }
    return eat(TokenType.arrow);
  }
  function flowParseSubscripts(startTokenIndex, noCalls = false) {
    if (state.tokens[state.tokens.length - 1].contextualKeyword === ContextualKeyword._async && match(TokenType.lessThan)) {
      const snapshot = state.snapshot();
      const wasArrow = parseAsyncArrowWithTypeParameters();
      if (wasArrow && !state.error) {
        return;
      }
      state.restoreFromSnapshot(snapshot);
    }
    baseParseSubscripts(startTokenIndex, noCalls);
  }
  function parseAsyncArrowWithTypeParameters() {
    state.scopeDepth++;
    const startTokenIndex = state.tokens.length;
    parseFunctionParams();
    if (!parseArrow()) {
      return false;
    }
    parseArrowExpression(startTokenIndex);
    return true;
  }
  function flowParseEnumDeclaration() {
    expectContextual(ContextualKeyword._enum);
    state.tokens[state.tokens.length - 1].type = TokenType._enum;
    parseIdentifier();
    flowParseEnumBody();
  }
  function flowParseEnumBody() {
    if (eatContextual(ContextualKeyword._of)) {
      next();
    }
    expect(TokenType.braceL);
    flowParseEnumMembers();
    expect(TokenType.braceR);
  }
  function flowParseEnumMembers() {
    while (!match(TokenType.braceR) && !state.error) {
      if (eat(TokenType.ellipsis)) {
        break;
      }
      flowParseEnumMember();
      if (!match(TokenType.braceR)) {
        expect(TokenType.comma);
      }
    }
  }
  function flowParseEnumMember() {
    parseIdentifier();
    if (eat(TokenType.eq)) {
      next();
    }
  }

  // node_modules/sucrase/dist/esm/parser/traverser/statement.js
  function parseTopLevel() {
    parseBlockBody(TokenType.eof);
    state.scopes.push(new Scope(0, state.tokens.length, true));
    if (state.scopeDepth !== 0) {
      throw new Error(`Invalid scope depth at end of file: ${state.scopeDepth}`);
    }
    return new File(state.tokens, state.scopes);
  }
  function parseStatement(declaration) {
    if (isFlowEnabled) {
      if (flowTryParseStatement()) {
        return;
      }
    }
    if (match(TokenType.at)) {
      parseDecorators();
    }
    parseStatementContent(declaration);
  }
  function parseStatementContent(declaration) {
    if (isTypeScriptEnabled) {
      if (tsTryParseStatementContent()) {
        return;
      }
    }
    const starttype = state.type;
    switch (starttype) {
      case TokenType._break:
      case TokenType._continue:
        parseBreakContinueStatement();
        return;
      case TokenType._debugger:
        parseDebuggerStatement();
        return;
      case TokenType._do:
        parseDoStatement();
        return;
      case TokenType._for:
        parseForStatement();
        return;
      case TokenType._function:
        if (lookaheadType() === TokenType.dot) break;
        if (!declaration) unexpected();
        parseFunctionStatement();
        return;
      case TokenType._class:
        if (!declaration) unexpected();
        parseClass(true);
        return;
      case TokenType._if:
        parseIfStatement();
        return;
      case TokenType._return:
        parseReturnStatement();
        return;
      case TokenType._switch:
        parseSwitchStatement();
        return;
      case TokenType._throw:
        parseThrowStatement();
        return;
      case TokenType._try:
        parseTryStatement();
        return;
      case TokenType._let:
      case TokenType._const:
        if (!declaration) unexpected();
      // NOTE: falls through to _var
      case TokenType._var:
        parseVarStatement(starttype !== TokenType._var);
        return;
      case TokenType._while:
        parseWhileStatement();
        return;
      case TokenType.braceL:
        parseBlock();
        return;
      case TokenType.semi:
        parseEmptyStatement();
        return;
      case TokenType._export:
      case TokenType._import: {
        const nextType = lookaheadType();
        if (nextType === TokenType.parenL || nextType === TokenType.dot) {
          break;
        }
        next();
        if (starttype === TokenType._import) {
          parseImport();
        } else {
          parseExport();
        }
        return;
      }
      case TokenType.name:
        if (state.contextualKeyword === ContextualKeyword._async) {
          const functionStart = state.start;
          const snapshot = state.snapshot();
          next();
          if (match(TokenType._function) && !canInsertSemicolon()) {
            expect(TokenType._function);
            parseFunction(functionStart, true);
            return;
          } else {
            state.restoreFromSnapshot(snapshot);
          }
        } else if (state.contextualKeyword === ContextualKeyword._using && !hasFollowingLineBreak() && // Statements like `using[0]` and `using in foo` aren't actual using
        // declarations.
        lookaheadType() === TokenType.name) {
          parseVarStatement(true);
          return;
        } else if (startsAwaitUsing()) {
          expectContextual(ContextualKeyword._await);
          parseVarStatement(true);
          return;
        }
      default:
        break;
    }
    const initialTokensLength = state.tokens.length;
    parseExpression();
    let simpleName = null;
    if (state.tokens.length === initialTokensLength + 1) {
      const token = state.tokens[state.tokens.length - 1];
      if (token.type === TokenType.name) {
        simpleName = token.contextualKeyword;
      }
    }
    if (simpleName == null) {
      semicolon();
      return;
    }
    if (eat(TokenType.colon)) {
      parseLabeledStatement();
    } else {
      parseIdentifierStatement(simpleName);
    }
  }
  function startsAwaitUsing() {
    if (!isContextual(ContextualKeyword._await)) {
      return false;
    }
    const snapshot = state.snapshot();
    next();
    if (!isContextual(ContextualKeyword._using) || hasPrecedingLineBreak()) {
      state.restoreFromSnapshot(snapshot);
      return false;
    }
    next();
    if (!match(TokenType.name) || hasPrecedingLineBreak()) {
      state.restoreFromSnapshot(snapshot);
      return false;
    }
    state.restoreFromSnapshot(snapshot);
    return true;
  }
  function parseDecorators() {
    while (match(TokenType.at)) {
      parseDecorator();
    }
  }
  function parseDecorator() {
    next();
    if (eat(TokenType.parenL)) {
      parseExpression();
      expect(TokenType.parenR);
    } else {
      parseIdentifier();
      while (eat(TokenType.dot)) {
        parseIdentifier();
      }
      parseMaybeDecoratorArguments();
    }
  }
  function parseMaybeDecoratorArguments() {
    if (isTypeScriptEnabled) {
      tsParseMaybeDecoratorArguments();
    } else {
      baseParseMaybeDecoratorArguments();
    }
  }
  function baseParseMaybeDecoratorArguments() {
    if (eat(TokenType.parenL)) {
      parseCallExpressionArguments();
    }
  }
  function parseBreakContinueStatement() {
    next();
    if (!isLineTerminator()) {
      parseIdentifier();
      semicolon();
    }
  }
  function parseDebuggerStatement() {
    next();
    semicolon();
  }
  function parseDoStatement() {
    next();
    parseStatement(false);
    expect(TokenType._while);
    parseParenExpression();
    eat(TokenType.semi);
  }
  function parseForStatement() {
    state.scopeDepth++;
    const startTokenIndex = state.tokens.length;
    parseAmbiguousForStatement();
    const endTokenIndex = state.tokens.length;
    state.scopes.push(new Scope(startTokenIndex, endTokenIndex, false));
    state.scopeDepth--;
  }
  function isUsingInLoop() {
    if (!isContextual(ContextualKeyword._using)) {
      return false;
    }
    if (isLookaheadContextual(ContextualKeyword._of)) {
      return false;
    }
    return true;
  }
  function parseAmbiguousForStatement() {
    next();
    let forAwait = false;
    if (isContextual(ContextualKeyword._await)) {
      forAwait = true;
      next();
    }
    expect(TokenType.parenL);
    if (match(TokenType.semi)) {
      if (forAwait) {
        unexpected();
      }
      parseFor();
      return;
    }
    const isAwaitUsing = startsAwaitUsing();
    if (isAwaitUsing || match(TokenType._var) || match(TokenType._let) || match(TokenType._const) || isUsingInLoop()) {
      if (isAwaitUsing) {
        expectContextual(ContextualKeyword._await);
      }
      next();
      parseVar(true, state.type !== TokenType._var);
      if (match(TokenType._in) || isContextual(ContextualKeyword._of)) {
        parseForIn(forAwait);
        return;
      }
      parseFor();
      return;
    }
    parseExpression(true);
    if (match(TokenType._in) || isContextual(ContextualKeyword._of)) {
      parseForIn(forAwait);
      return;
    }
    if (forAwait) {
      unexpected();
    }
    parseFor();
  }
  function parseFunctionStatement() {
    const functionStart = state.start;
    next();
    parseFunction(functionStart, true);
  }
  function parseIfStatement() {
    next();
    parseParenExpression();
    parseStatement(false);
    if (eat(TokenType._else)) {
      parseStatement(false);
    }
  }
  function parseReturnStatement() {
    next();
    if (!isLineTerminator()) {
      parseExpression();
      semicolon();
    }
  }
  function parseSwitchStatement() {
    next();
    parseParenExpression();
    state.scopeDepth++;
    const startTokenIndex = state.tokens.length;
    expect(TokenType.braceL);
    while (!match(TokenType.braceR) && !state.error) {
      if (match(TokenType._case) || match(TokenType._default)) {
        const isCase = match(TokenType._case);
        next();
        if (isCase) {
          parseExpression();
        }
        expect(TokenType.colon);
      } else {
        parseStatement(true);
      }
    }
    next();
    const endTokenIndex = state.tokens.length;
    state.scopes.push(new Scope(startTokenIndex, endTokenIndex, false));
    state.scopeDepth--;
  }
  function parseThrowStatement() {
    next();
    parseExpression();
    semicolon();
  }
  function parseCatchClauseParam() {
    parseBindingAtom(
      true
      /* isBlockScope */
    );
    if (isTypeScriptEnabled) {
      tsTryParseTypeAnnotation();
    }
  }
  function parseTryStatement() {
    next();
    parseBlock();
    if (match(TokenType._catch)) {
      next();
      let catchBindingStartTokenIndex = null;
      if (match(TokenType.parenL)) {
        state.scopeDepth++;
        catchBindingStartTokenIndex = state.tokens.length;
        expect(TokenType.parenL);
        parseCatchClauseParam();
        expect(TokenType.parenR);
      }
      parseBlock();
      if (catchBindingStartTokenIndex != null) {
        const endTokenIndex = state.tokens.length;
        state.scopes.push(new Scope(catchBindingStartTokenIndex, endTokenIndex, false));
        state.scopeDepth--;
      }
    }
    if (eat(TokenType._finally)) {
      parseBlock();
    }
  }
  function parseVarStatement(isBlockScope) {
    next();
    parseVar(false, isBlockScope);
    semicolon();
  }
  function parseWhileStatement() {
    next();
    parseParenExpression();
    parseStatement(false);
  }
  function parseEmptyStatement() {
    next();
  }
  function parseLabeledStatement() {
    parseStatement(true);
  }
  function parseIdentifierStatement(contextualKeyword) {
    if (isTypeScriptEnabled) {
      tsParseIdentifierStatement(contextualKeyword);
    } else if (isFlowEnabled) {
      flowParseIdentifierStatement(contextualKeyword);
    } else {
      semicolon();
    }
  }
  function parseBlock(isFunctionScope = false, contextId = 0) {
    const startTokenIndex = state.tokens.length;
    state.scopeDepth++;
    expect(TokenType.braceL);
    if (contextId) {
      state.tokens[state.tokens.length - 1].contextId = contextId;
    }
    parseBlockBody(TokenType.braceR);
    if (contextId) {
      state.tokens[state.tokens.length - 1].contextId = contextId;
    }
    const endTokenIndex = state.tokens.length;
    state.scopes.push(new Scope(startTokenIndex, endTokenIndex, isFunctionScope));
    state.scopeDepth--;
  }
  function parseBlockBody(end) {
    while (!eat(end) && !state.error) {
      parseStatement(true);
    }
  }
  function parseFor() {
    expect(TokenType.semi);
    if (!match(TokenType.semi)) {
      parseExpression();
    }
    expect(TokenType.semi);
    if (!match(TokenType.parenR)) {
      parseExpression();
    }
    expect(TokenType.parenR);
    parseStatement(false);
  }
  function parseForIn(forAwait) {
    if (forAwait) {
      eatContextual(ContextualKeyword._of);
    } else {
      next();
    }
    parseExpression();
    expect(TokenType.parenR);
    parseStatement(false);
  }
  function parseVar(isFor, isBlockScope) {
    while (true) {
      parseVarHead(isBlockScope);
      if (eat(TokenType.eq)) {
        const eqIndex = state.tokens.length - 1;
        parseMaybeAssign(isFor);
        state.tokens[eqIndex].rhsEndIndex = state.tokens.length;
      }
      if (!eat(TokenType.comma)) {
        break;
      }
    }
  }
  function parseVarHead(isBlockScope) {
    parseBindingAtom(isBlockScope);
    if (isTypeScriptEnabled) {
      tsAfterParseVarHead();
    } else if (isFlowEnabled) {
      flowAfterParseVarHead();
    }
  }
  function parseFunction(functionStart, isStatement, optionalId = false) {
    if (match(TokenType.star)) {
      next();
    }
    if (isStatement && !optionalId && !match(TokenType.name) && !match(TokenType._yield)) {
      unexpected();
    }
    let nameScopeStartTokenIndex = null;
    if (match(TokenType.name)) {
      if (!isStatement) {
        nameScopeStartTokenIndex = state.tokens.length;
        state.scopeDepth++;
      }
      parseBindingIdentifier(false);
    }
    const startTokenIndex = state.tokens.length;
    state.scopeDepth++;
    parseFunctionParams();
    parseFunctionBodyAndFinish(functionStart);
    const endTokenIndex = state.tokens.length;
    state.scopes.push(new Scope(startTokenIndex, endTokenIndex, true));
    state.scopeDepth--;
    if (nameScopeStartTokenIndex !== null) {
      state.scopes.push(new Scope(nameScopeStartTokenIndex, endTokenIndex, true));
      state.scopeDepth--;
    }
  }
  function parseFunctionParams(allowModifiers = false, funcContextId = 0) {
    if (isTypeScriptEnabled) {
      tsStartParseFunctionParams();
    } else if (isFlowEnabled) {
      flowStartParseFunctionParams();
    }
    expect(TokenType.parenL);
    if (funcContextId) {
      state.tokens[state.tokens.length - 1].contextId = funcContextId;
    }
    parseBindingList(
      TokenType.parenR,
      false,
      false,
      allowModifiers,
      funcContextId
    );
    if (funcContextId) {
      state.tokens[state.tokens.length - 1].contextId = funcContextId;
    }
  }
  function parseClass(isStatement, optionalId = false) {
    const contextId = getNextContextId();
    next();
    state.tokens[state.tokens.length - 1].contextId = contextId;
    state.tokens[state.tokens.length - 1].isExpression = !isStatement;
    let nameScopeStartTokenIndex = null;
    if (!isStatement) {
      nameScopeStartTokenIndex = state.tokens.length;
      state.scopeDepth++;
    }
    parseClassId(isStatement, optionalId);
    parseClassSuper();
    const openBraceIndex = state.tokens.length;
    parseClassBody(contextId);
    if (state.error) {
      return;
    }
    state.tokens[openBraceIndex].contextId = contextId;
    state.tokens[state.tokens.length - 1].contextId = contextId;
    if (nameScopeStartTokenIndex !== null) {
      const endTokenIndex = state.tokens.length;
      state.scopes.push(new Scope(nameScopeStartTokenIndex, endTokenIndex, false));
      state.scopeDepth--;
    }
  }
  function isClassProperty() {
    return match(TokenType.eq) || match(TokenType.semi) || match(TokenType.braceR) || match(TokenType.bang) || match(TokenType.colon);
  }
  function isClassMethod() {
    return match(TokenType.parenL) || match(TokenType.lessThan);
  }
  function parseClassBody(classContextId) {
    expect(TokenType.braceL);
    while (!eat(TokenType.braceR) && !state.error) {
      if (eat(TokenType.semi)) {
        continue;
      }
      if (match(TokenType.at)) {
        parseDecorator();
        continue;
      }
      const memberStart = state.start;
      parseClassMember(memberStart, classContextId);
    }
  }
  function parseClassMember(memberStart, classContextId) {
    if (isTypeScriptEnabled) {
      tsParseModifiers([
        ContextualKeyword._declare,
        ContextualKeyword._public,
        ContextualKeyword._protected,
        ContextualKeyword._private,
        ContextualKeyword._override
      ]);
    }
    let isStatic = false;
    if (match(TokenType.name) && state.contextualKeyword === ContextualKeyword._static) {
      parseIdentifier();
      if (isClassMethod()) {
        parseClassMethod(
          memberStart,
          /* isConstructor */
          false
        );
        return;
      } else if (isClassProperty()) {
        parseClassProperty();
        return;
      }
      state.tokens[state.tokens.length - 1].type = TokenType._static;
      isStatic = true;
      if (match(TokenType.braceL)) {
        state.tokens[state.tokens.length - 1].contextId = classContextId;
        parseBlock();
        return;
      }
    }
    parseClassMemberWithIsStatic(memberStart, isStatic, classContextId);
  }
  function parseClassMemberWithIsStatic(memberStart, isStatic, classContextId) {
    if (isTypeScriptEnabled) {
      if (tsTryParseClassMemberWithIsStatic(isStatic)) {
        return;
      }
    }
    if (eat(TokenType.star)) {
      parseClassPropertyName(classContextId);
      parseClassMethod(
        memberStart,
        /* isConstructor */
        false
      );
      return;
    }
    parseClassPropertyName(classContextId);
    let isConstructor = false;
    const token = state.tokens[state.tokens.length - 1];
    if (token.contextualKeyword === ContextualKeyword._constructor) {
      isConstructor = true;
    }
    parsePostMemberNameModifiers();
    if (isClassMethod()) {
      parseClassMethod(memberStart, isConstructor);
    } else if (isClassProperty()) {
      parseClassProperty();
    } else if (token.contextualKeyword === ContextualKeyword._async && !isLineTerminator()) {
      state.tokens[state.tokens.length - 1].type = TokenType._async;
      const isGenerator = match(TokenType.star);
      if (isGenerator) {
        next();
      }
      parseClassPropertyName(classContextId);
      parsePostMemberNameModifiers();
      parseClassMethod(
        memberStart,
        false
        /* isConstructor */
      );
    } else if ((token.contextualKeyword === ContextualKeyword._get || token.contextualKeyword === ContextualKeyword._set) && !(isLineTerminator() && match(TokenType.star))) {
      if (token.contextualKeyword === ContextualKeyword._get) {
        state.tokens[state.tokens.length - 1].type = TokenType._get;
      } else {
        state.tokens[state.tokens.length - 1].type = TokenType._set;
      }
      parseClassPropertyName(classContextId);
      parseClassMethod(
        memberStart,
        /* isConstructor */
        false
      );
    } else if (token.contextualKeyword === ContextualKeyword._accessor && !isLineTerminator()) {
      parseClassPropertyName(classContextId);
      parseClassProperty();
    } else if (isLineTerminator()) {
      parseClassProperty();
    } else {
      unexpected();
    }
  }
  function parseClassMethod(functionStart, isConstructor) {
    if (isTypeScriptEnabled) {
      tsTryParseTypeParameters();
    } else if (isFlowEnabled) {
      if (match(TokenType.lessThan)) {
        flowParseTypeParameterDeclaration();
      }
    }
    parseMethod(functionStart, isConstructor);
  }
  function parseClassPropertyName(classContextId) {
    parsePropertyName(classContextId);
  }
  function parsePostMemberNameModifiers() {
    if (isTypeScriptEnabled) {
      const oldIsType = pushTypeContext(0);
      eat(TokenType.question);
      popTypeContext(oldIsType);
    }
  }
  function parseClassProperty() {
    if (isTypeScriptEnabled) {
      eatTypeToken(TokenType.bang);
      tsTryParseTypeAnnotation();
    } else if (isFlowEnabled) {
      if (match(TokenType.colon)) {
        flowParseTypeAnnotation();
      }
    }
    if (match(TokenType.eq)) {
      const equalsTokenIndex = state.tokens.length;
      next();
      parseMaybeAssign();
      state.tokens[equalsTokenIndex].rhsEndIndex = state.tokens.length;
    }
    semicolon();
  }
  function parseClassId(isStatement, optionalId = false) {
    if (isTypeScriptEnabled && (!isStatement || optionalId) && isContextual(ContextualKeyword._implements)) {
      return;
    }
    if (match(TokenType.name)) {
      parseBindingIdentifier(true);
    }
    if (isTypeScriptEnabled) {
      tsTryParseTypeParameters();
    } else if (isFlowEnabled) {
      if (match(TokenType.lessThan)) {
        flowParseTypeParameterDeclaration();
      }
    }
  }
  function parseClassSuper() {
    let hasSuper = false;
    if (eat(TokenType._extends)) {
      parseExprSubscripts();
      hasSuper = true;
    } else {
      hasSuper = false;
    }
    if (isTypeScriptEnabled) {
      tsAfterParseClassSuper(hasSuper);
    } else if (isFlowEnabled) {
      flowAfterParseClassSuper(hasSuper);
    }
  }
  function parseExport() {
    const exportIndex = state.tokens.length - 1;
    if (isTypeScriptEnabled) {
      if (tsTryParseExport()) {
        return;
      }
    }
    if (shouldParseExportStar()) {
      parseExportStar();
    } else if (isExportDefaultSpecifier()) {
      parseIdentifier();
      if (match(TokenType.comma) && lookaheadType() === TokenType.star) {
        expect(TokenType.comma);
        expect(TokenType.star);
        expectContextual(ContextualKeyword._as);
        parseIdentifier();
      } else {
        parseExportSpecifiersMaybe();
      }
      parseExportFrom();
    } else if (eat(TokenType._default)) {
      parseExportDefaultExpression();
    } else if (shouldParseExportDeclaration()) {
      parseExportDeclaration();
    } else {
      parseExportSpecifiers();
      parseExportFrom();
    }
    state.tokens[exportIndex].rhsEndIndex = state.tokens.length;
  }
  function parseExportDefaultExpression() {
    if (isTypeScriptEnabled) {
      if (tsTryParseExportDefaultExpression()) {
        return;
      }
    }
    if (isFlowEnabled) {
      if (flowTryParseExportDefaultExpression()) {
        return;
      }
    }
    const functionStart = state.start;
    if (eat(TokenType._function)) {
      parseFunction(functionStart, true, true);
    } else if (isContextual(ContextualKeyword._async) && lookaheadType() === TokenType._function) {
      eatContextual(ContextualKeyword._async);
      eat(TokenType._function);
      parseFunction(functionStart, true, true);
    } else if (match(TokenType._class)) {
      parseClass(true, true);
    } else if (match(TokenType.at)) {
      parseDecorators();
      parseClass(true, true);
    } else {
      parseMaybeAssign();
      semicolon();
    }
  }
  function parseExportDeclaration() {
    if (isTypeScriptEnabled) {
      tsParseExportDeclaration();
    } else if (isFlowEnabled) {
      flowParseExportDeclaration();
    } else {
      parseStatement(true);
    }
  }
  function isExportDefaultSpecifier() {
    if (isTypeScriptEnabled && tsIsDeclarationStart()) {
      return false;
    } else if (isFlowEnabled && flowShouldDisallowExportDefaultSpecifier()) {
      return false;
    }
    if (match(TokenType.name)) {
      return state.contextualKeyword !== ContextualKeyword._async;
    }
    if (!match(TokenType._default)) {
      return false;
    }
    const _next = nextTokenStart();
    const lookahead = lookaheadTypeAndKeyword();
    const hasFrom = lookahead.type === TokenType.name && lookahead.contextualKeyword === ContextualKeyword._from;
    if (lookahead.type === TokenType.comma) {
      return true;
    }
    if (hasFrom) {
      const nextAfterFrom = input.charCodeAt(nextTokenStartSince(_next + 4));
      return nextAfterFrom === charCodes.quotationMark || nextAfterFrom === charCodes.apostrophe;
    }
    return false;
  }
  function parseExportSpecifiersMaybe() {
    if (eat(TokenType.comma)) {
      parseExportSpecifiers();
    }
  }
  function parseExportFrom() {
    if (eatContextual(ContextualKeyword._from)) {
      parseExprAtom();
      maybeParseImportAttributes();
    }
    semicolon();
  }
  function shouldParseExportStar() {
    if (isFlowEnabled) {
      return flowShouldParseExportStar();
    } else {
      return match(TokenType.star);
    }
  }
  function parseExportStar() {
    if (isFlowEnabled) {
      flowParseExportStar();
    } else {
      baseParseExportStar();
    }
  }
  function baseParseExportStar() {
    expect(TokenType.star);
    if (isContextual(ContextualKeyword._as)) {
      parseExportNamespace();
    } else {
      parseExportFrom();
    }
  }
  function parseExportNamespace() {
    next();
    state.tokens[state.tokens.length - 1].type = TokenType._as;
    parseIdentifier();
    parseExportSpecifiersMaybe();
    parseExportFrom();
  }
  function shouldParseExportDeclaration() {
    return isTypeScriptEnabled && tsIsDeclarationStart() || isFlowEnabled && flowShouldParseExportDeclaration() || state.type === TokenType._var || state.type === TokenType._const || state.type === TokenType._let || state.type === TokenType._function || state.type === TokenType._class || isContextual(ContextualKeyword._async) || match(TokenType.at);
  }
  function parseExportSpecifiers() {
    let first = true;
    expect(TokenType.braceL);
    while (!eat(TokenType.braceR) && !state.error) {
      if (first) {
        first = false;
      } else {
        expect(TokenType.comma);
        if (eat(TokenType.braceR)) {
          break;
        }
      }
      parseExportSpecifier();
    }
  }
  function parseExportSpecifier() {
    if (isTypeScriptEnabled) {
      tsParseExportSpecifier();
      return;
    }
    parseIdentifier();
    state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ExportAccess;
    if (eatContextual(ContextualKeyword._as)) {
      parseIdentifier();
    }
  }
  function isImportReflection() {
    const snapshot = state.snapshot();
    expectContextual(ContextualKeyword._module);
    if (eatContextual(ContextualKeyword._from)) {
      if (isContextual(ContextualKeyword._from)) {
        state.restoreFromSnapshot(snapshot);
        return true;
      } else {
        state.restoreFromSnapshot(snapshot);
        return false;
      }
    } else if (match(TokenType.comma)) {
      state.restoreFromSnapshot(snapshot);
      return false;
    } else {
      state.restoreFromSnapshot(snapshot);
      return true;
    }
  }
  function parseMaybeImportReflection() {
    if (isContextual(ContextualKeyword._module) && isImportReflection()) {
      next();
    }
  }
  function parseImport() {
    if (isTypeScriptEnabled && match(TokenType.name) && lookaheadType() === TokenType.eq) {
      tsParseImportEqualsDeclaration();
      return;
    }
    if (isTypeScriptEnabled && isContextual(ContextualKeyword._type)) {
      const lookahead = lookaheadTypeAndKeyword();
      if (lookahead.type === TokenType.name && lookahead.contextualKeyword !== ContextualKeyword._from) {
        expectContextual(ContextualKeyword._type);
        if (lookaheadType() === TokenType.eq) {
          tsParseImportEqualsDeclaration();
          return;
        }
      } else if (lookahead.type === TokenType.star || lookahead.type === TokenType.braceL) {
        expectContextual(ContextualKeyword._type);
      }
    }
    if (match(TokenType.string)) {
      parseExprAtom();
    } else {
      parseMaybeImportReflection();
      parseImportSpecifiers();
      expectContextual(ContextualKeyword._from);
      parseExprAtom();
    }
    maybeParseImportAttributes();
    semicolon();
  }
  function shouldParseDefaultImport() {
    return match(TokenType.name);
  }
  function parseImportSpecifierLocal() {
    parseImportedIdentifier();
  }
  function parseImportSpecifiers() {
    if (isFlowEnabled) {
      flowStartParseImportSpecifiers();
    }
    let first = true;
    if (shouldParseDefaultImport()) {
      parseImportSpecifierLocal();
      if (!eat(TokenType.comma)) return;
    }
    if (match(TokenType.star)) {
      next();
      expectContextual(ContextualKeyword._as);
      parseImportSpecifierLocal();
      return;
    }
    expect(TokenType.braceL);
    while (!eat(TokenType.braceR) && !state.error) {
      if (first) {
        first = false;
      } else {
        if (eat(TokenType.colon)) {
          unexpected(
            "ES2015 named imports do not destructure. Use another statement for destructuring after the import."
          );
        }
        expect(TokenType.comma);
        if (eat(TokenType.braceR)) {
          break;
        }
      }
      parseImportSpecifier();
    }
  }
  function parseImportSpecifier() {
    if (isTypeScriptEnabled) {
      tsParseImportSpecifier();
      return;
    }
    if (isFlowEnabled) {
      flowParseImportSpecifier();
      return;
    }
    parseImportedIdentifier();
    if (isContextual(ContextualKeyword._as)) {
      state.tokens[state.tokens.length - 1].identifierRole = IdentifierRole.ImportAccess;
      next();
      parseImportedIdentifier();
    }
  }
  function maybeParseImportAttributes() {
    if (match(TokenType._with) || isContextual(ContextualKeyword._assert) && !hasPrecedingLineBreak()) {
      next();
      parseObj(false, false);
    }
  }

  // node_modules/sucrase/dist/esm/parser/traverser/index.js
  function parseFile() {
    if (state.pos === 0 && input.charCodeAt(0) === charCodes.numberSign && input.charCodeAt(1) === charCodes.exclamationMark) {
      skipLineComment(2);
    }
    nextToken();
    return parseTopLevel();
  }

  // node_modules/sucrase/dist/esm/parser/index.js
  var File = class {
    constructor(tokens, scopes) {
      this.tokens = tokens;
      this.scopes = scopes;
    }
  };
  function parse(input2, isJSXEnabled2, isTypeScriptEnabled2, isFlowEnabled2) {
    if (isFlowEnabled2 && isTypeScriptEnabled2) {
      throw new Error("Cannot combine flow and typescript plugins.");
    }
    initParser(input2, isJSXEnabled2, isTypeScriptEnabled2, isFlowEnabled2);
    const result = parseFile();
    if (state.error) {
      throw augmentError(state.error);
    }
    return result;
  }

  // node_modules/sucrase/dist/esm/util/isAsyncOperation.js
  function isAsyncOperation(tokens) {
    let index = tokens.currentIndex();
    let depth = 0;
    const startToken = tokens.currentToken();
    do {
      const token = tokens.tokens[index];
      if (token.isOptionalChainStart) {
        depth++;
      }
      if (token.isOptionalChainEnd) {
        depth--;
      }
      depth += token.numNullishCoalesceStarts;
      depth -= token.numNullishCoalesceEnds;
      if (token.contextualKeyword === ContextualKeyword._await && token.identifierRole == null && token.scopeDepth === startToken.scopeDepth) {
        return true;
      }
      index += 1;
    } while (depth > 0 && index < tokens.tokens.length);
    return false;
  }

  // node_modules/sucrase/dist/esm/TokenProcessor.js
  var TokenProcessor = class _TokenProcessor {
    __init() {
      this.resultCode = "";
    }
    // Array mapping input token index to optional string index position in the
    // output code.
    __init2() {
      this.resultMappings = new Array(this.tokens.length);
    }
    __init3() {
      this.tokenIndex = 0;
    }
    constructor(code, tokens, isFlowEnabled2, disableESTransforms, helperManager) {
      ;
      this.code = code;
      this.tokens = tokens;
      this.isFlowEnabled = isFlowEnabled2;
      this.disableESTransforms = disableESTransforms;
      this.helperManager = helperManager;
      _TokenProcessor.prototype.__init.call(this);
      _TokenProcessor.prototype.__init2.call(this);
      _TokenProcessor.prototype.__init3.call(this);
    }
    /**
     * Snapshot the token state in a way that can be restored later, useful for
     * things like lookahead.
     *
     * resultMappings do not need to be copied since in all use cases, they will
     * be overwritten anyway after restore.
     */
    snapshot() {
      return {
        resultCode: this.resultCode,
        tokenIndex: this.tokenIndex
      };
    }
    restoreToSnapshot(snapshot) {
      this.resultCode = snapshot.resultCode;
      this.tokenIndex = snapshot.tokenIndex;
    }
    /**
     * Remove and return the code generated since the snapshot, leaving the
     * current token position in-place. Unlike most TokenProcessor operations,
     * this operation can result in input/output line number mismatches because
     * the removed code may contain newlines, so this operation should be used
     * sparingly.
     */
    dangerouslyGetAndRemoveCodeSinceSnapshot(snapshot) {
      const result = this.resultCode.slice(snapshot.resultCode.length);
      this.resultCode = snapshot.resultCode;
      return result;
    }
    reset() {
      this.resultCode = "";
      this.resultMappings = new Array(this.tokens.length);
      this.tokenIndex = 0;
    }
    matchesContextualAtIndex(index, contextualKeyword) {
      return this.matches1AtIndex(index, TokenType.name) && this.tokens[index].contextualKeyword === contextualKeyword;
    }
    identifierNameAtIndex(index) {
      return this.identifierNameForToken(this.tokens[index]);
    }
    identifierNameAtRelativeIndex(relativeIndex) {
      return this.identifierNameForToken(this.tokenAtRelativeIndex(relativeIndex));
    }
    identifierName() {
      return this.identifierNameForToken(this.currentToken());
    }
    identifierNameForToken(token) {
      return this.code.slice(token.start, token.end);
    }
    rawCodeForToken(token) {
      return this.code.slice(token.start, token.end);
    }
    stringValueAtIndex(index) {
      return this.stringValueForToken(this.tokens[index]);
    }
    stringValue() {
      return this.stringValueForToken(this.currentToken());
    }
    stringValueForToken(token) {
      return this.code.slice(token.start + 1, token.end - 1);
    }
    matches1AtIndex(index, t1) {
      return this.tokens[index].type === t1;
    }
    matches2AtIndex(index, t1, t2) {
      return this.tokens[index].type === t1 && this.tokens[index + 1].type === t2;
    }
    matches3AtIndex(index, t1, t2, t3) {
      return this.tokens[index].type === t1 && this.tokens[index + 1].type === t2 && this.tokens[index + 2].type === t3;
    }
    matches1(t1) {
      return this.tokens[this.tokenIndex].type === t1;
    }
    matches2(t1, t2) {
      return this.tokens[this.tokenIndex].type === t1 && this.tokens[this.tokenIndex + 1].type === t2;
    }
    matches3(t1, t2, t3) {
      return this.tokens[this.tokenIndex].type === t1 && this.tokens[this.tokenIndex + 1].type === t2 && this.tokens[this.tokenIndex + 2].type === t3;
    }
    matches4(t1, t2, t3, t4) {
      return this.tokens[this.tokenIndex].type === t1 && this.tokens[this.tokenIndex + 1].type === t2 && this.tokens[this.tokenIndex + 2].type === t3 && this.tokens[this.tokenIndex + 3].type === t4;
    }
    matches5(t1, t2, t3, t4, t5) {
      return this.tokens[this.tokenIndex].type === t1 && this.tokens[this.tokenIndex + 1].type === t2 && this.tokens[this.tokenIndex + 2].type === t3 && this.tokens[this.tokenIndex + 3].type === t4 && this.tokens[this.tokenIndex + 4].type === t5;
    }
    matchesContextual(contextualKeyword) {
      return this.matchesContextualAtIndex(this.tokenIndex, contextualKeyword);
    }
    matchesContextIdAndLabel(type, contextId) {
      return this.matches1(type) && this.currentToken().contextId === contextId;
    }
    previousWhitespaceAndComments() {
      let whitespaceAndComments = this.code.slice(
        this.tokenIndex > 0 ? this.tokens[this.tokenIndex - 1].end : 0,
        this.tokenIndex < this.tokens.length ? this.tokens[this.tokenIndex].start : this.code.length
      );
      if (this.isFlowEnabled) {
        whitespaceAndComments = whitespaceAndComments.replace(/@flow/g, "");
      }
      return whitespaceAndComments;
    }
    replaceToken(newCode) {
      this.resultCode += this.previousWhitespaceAndComments();
      this.appendTokenPrefix();
      this.resultMappings[this.tokenIndex] = this.resultCode.length;
      this.resultCode += newCode;
      this.appendTokenSuffix();
      this.tokenIndex++;
    }
    replaceTokenTrimmingLeftWhitespace(newCode) {
      this.resultCode += this.previousWhitespaceAndComments().replace(/[^\r\n]/g, "");
      this.appendTokenPrefix();
      this.resultMappings[this.tokenIndex] = this.resultCode.length;
      this.resultCode += newCode;
      this.appendTokenSuffix();
      this.tokenIndex++;
    }
    removeInitialToken() {
      this.replaceToken("");
    }
    removeToken() {
      this.replaceTokenTrimmingLeftWhitespace("");
    }
    /**
     * Remove all code until the next }, accounting for balanced braces.
     */
    removeBalancedCode() {
      let braceDepth = 0;
      while (!this.isAtEnd()) {
        if (this.matches1(TokenType.braceL)) {
          braceDepth++;
        } else if (this.matches1(TokenType.braceR)) {
          if (braceDepth === 0) {
            return;
          }
          braceDepth--;
        }
        this.removeToken();
      }
    }
    copyExpectedToken(tokenType) {
      if (this.tokens[this.tokenIndex].type !== tokenType) {
        throw new Error(`Expected token ${tokenType}`);
      }
      this.copyToken();
    }
    copyToken() {
      this.resultCode += this.previousWhitespaceAndComments();
      this.appendTokenPrefix();
      this.resultMappings[this.tokenIndex] = this.resultCode.length;
      this.resultCode += this.code.slice(
        this.tokens[this.tokenIndex].start,
        this.tokens[this.tokenIndex].end
      );
      this.appendTokenSuffix();
      this.tokenIndex++;
    }
    copyTokenWithPrefix(prefix) {
      this.resultCode += this.previousWhitespaceAndComments();
      this.appendTokenPrefix();
      this.resultCode += prefix;
      this.resultMappings[this.tokenIndex] = this.resultCode.length;
      this.resultCode += this.code.slice(
        this.tokens[this.tokenIndex].start,
        this.tokens[this.tokenIndex].end
      );
      this.appendTokenSuffix();
      this.tokenIndex++;
    }
    appendTokenPrefix() {
      const token = this.currentToken();
      if (token.numNullishCoalesceStarts || token.isOptionalChainStart) {
        token.isAsyncOperation = isAsyncOperation(this);
      }
      if (this.disableESTransforms) {
        return;
      }
      if (token.numNullishCoalesceStarts) {
        for (let i = 0; i < token.numNullishCoalesceStarts; i++) {
          if (token.isAsyncOperation) {
            this.resultCode += "await ";
            this.resultCode += this.helperManager.getHelperName("asyncNullishCoalesce");
          } else {
            this.resultCode += this.helperManager.getHelperName("nullishCoalesce");
          }
          this.resultCode += "(";
        }
      }
      if (token.isOptionalChainStart) {
        if (token.isAsyncOperation) {
          this.resultCode += "await ";
        }
        if (this.tokenIndex > 0 && this.tokenAtRelativeIndex(-1).type === TokenType._delete) {
          if (token.isAsyncOperation) {
            this.resultCode += this.helperManager.getHelperName("asyncOptionalChainDelete");
          } else {
            this.resultCode += this.helperManager.getHelperName("optionalChainDelete");
          }
        } else if (token.isAsyncOperation) {
          this.resultCode += this.helperManager.getHelperName("asyncOptionalChain");
        } else {
          this.resultCode += this.helperManager.getHelperName("optionalChain");
        }
        this.resultCode += "([";
      }
    }
    appendTokenSuffix() {
      const token = this.currentToken();
      if (token.isOptionalChainEnd && !this.disableESTransforms) {
        this.resultCode += "])";
      }
      if (token.numNullishCoalesceEnds && !this.disableESTransforms) {
        for (let i = 0; i < token.numNullishCoalesceEnds; i++) {
          this.resultCode += "))";
        }
      }
    }
    appendCode(code) {
      this.resultCode += code;
    }
    currentToken() {
      return this.tokens[this.tokenIndex];
    }
    currentTokenCode() {
      const token = this.currentToken();
      return this.code.slice(token.start, token.end);
    }
    tokenAtRelativeIndex(relativeIndex) {
      return this.tokens[this.tokenIndex + relativeIndex];
    }
    currentIndex() {
      return this.tokenIndex;
    }
    /**
     * Move to the next token. Only suitable in preprocessing steps. When
     * generating new code, you should use copyToken or removeToken.
     */
    nextToken() {
      if (this.tokenIndex === this.tokens.length) {
        throw new Error("Unexpectedly reached end of input.");
      }
      this.tokenIndex++;
    }
    previousToken() {
      this.tokenIndex--;
    }
    finish() {
      if (this.tokenIndex !== this.tokens.length) {
        throw new Error("Tried to finish processing tokens before reaching the end.");
      }
      this.resultCode += this.previousWhitespaceAndComments();
      return { code: this.resultCode, mappings: this.resultMappings };
    }
    isAtEnd() {
      return this.tokenIndex === this.tokens.length;
    }
  };

  // node_modules/sucrase/dist/esm/util/getClassInfo.js
  function getClassInfo(rootTransformer, tokens, nameManager, disableESTransforms) {
    const snapshot = tokens.snapshot();
    const headerInfo = processClassHeader(tokens);
    let constructorInitializerStatements = [];
    const instanceInitializerNames = [];
    const staticInitializerNames = [];
    let constructorInsertPos = null;
    const fields = [];
    const rangesToRemove = [];
    const classContextId = tokens.currentToken().contextId;
    if (classContextId == null) {
      throw new Error("Expected non-null class context ID on class open-brace.");
    }
    tokens.nextToken();
    while (!tokens.matchesContextIdAndLabel(TokenType.braceR, classContextId)) {
      if (tokens.matchesContextual(ContextualKeyword._constructor) && !tokens.currentToken().isType) {
        ({ constructorInitializerStatements, constructorInsertPos } = processConstructor(tokens));
      } else if (tokens.matches1(TokenType.semi)) {
        if (!disableESTransforms) {
          rangesToRemove.push({ start: tokens.currentIndex(), end: tokens.currentIndex() + 1 });
        }
        tokens.nextToken();
      } else if (tokens.currentToken().isType) {
        tokens.nextToken();
      } else {
        const statementStartIndex = tokens.currentIndex();
        let isStatic = false;
        let isESPrivate = false;
        let isDeclareOrAbstract = false;
        while (isAccessModifier(tokens.currentToken())) {
          if (tokens.matches1(TokenType._static)) {
            isStatic = true;
          }
          if (tokens.matches1(TokenType.hash)) {
            isESPrivate = true;
          }
          if (tokens.matches1(TokenType._declare) || tokens.matches1(TokenType._abstract)) {
            isDeclareOrAbstract = true;
          }
          tokens.nextToken();
        }
        if (isStatic && tokens.matches1(TokenType.braceL)) {
          skipToNextClassElement(tokens, classContextId);
          continue;
        }
        if (isESPrivate) {
          skipToNextClassElement(tokens, classContextId);
          continue;
        }
        if (tokens.matchesContextual(ContextualKeyword._constructor) && !tokens.currentToken().isType) {
          ({ constructorInitializerStatements, constructorInsertPos } = processConstructor(tokens));
          continue;
        }
        const nameStartIndex = tokens.currentIndex();
        skipFieldName(tokens);
        if (tokens.matches1(TokenType.lessThan) || tokens.matches1(TokenType.parenL)) {
          skipToNextClassElement(tokens, classContextId);
          continue;
        }
        while (tokens.currentToken().isType) {
          tokens.nextToken();
        }
        if (tokens.matches1(TokenType.eq)) {
          const equalsIndex = tokens.currentIndex();
          const valueEnd = tokens.currentToken().rhsEndIndex;
          if (valueEnd == null) {
            throw new Error("Expected rhsEndIndex on class field assignment.");
          }
          tokens.nextToken();
          while (tokens.currentIndex() < valueEnd) {
            rootTransformer.processToken();
          }
          let initializerName;
          if (isStatic) {
            initializerName = nameManager.claimFreeName("__initStatic");
            staticInitializerNames.push(initializerName);
          } else {
            initializerName = nameManager.claimFreeName("__init");
            instanceInitializerNames.push(initializerName);
          }
          fields.push({
            initializerName,
            equalsIndex,
            start: nameStartIndex,
            end: tokens.currentIndex()
          });
        } else if (!disableESTransforms || isDeclareOrAbstract) {
          rangesToRemove.push({ start: statementStartIndex, end: tokens.currentIndex() });
        }
      }
    }
    tokens.restoreToSnapshot(snapshot);
    if (disableESTransforms) {
      return {
        headerInfo,
        constructorInitializerStatements,
        instanceInitializerNames: [],
        staticInitializerNames: [],
        constructorInsertPos,
        fields: [],
        rangesToRemove
      };
    } else {
      return {
        headerInfo,
        constructorInitializerStatements,
        instanceInitializerNames,
        staticInitializerNames,
        constructorInsertPos,
        fields,
        rangesToRemove
      };
    }
  }
  function skipToNextClassElement(tokens, classContextId) {
    tokens.nextToken();
    while (tokens.currentToken().contextId !== classContextId) {
      tokens.nextToken();
    }
    while (isAccessModifier(tokens.tokenAtRelativeIndex(-1))) {
      tokens.previousToken();
    }
  }
  function processClassHeader(tokens) {
    const classToken = tokens.currentToken();
    const contextId = classToken.contextId;
    if (contextId == null) {
      throw new Error("Expected context ID on class token.");
    }
    const isExpression = classToken.isExpression;
    if (isExpression == null) {
      throw new Error("Expected isExpression on class token.");
    }
    let className = null;
    let hasSuperclass = false;
    tokens.nextToken();
    if (tokens.matches1(TokenType.name)) {
      className = tokens.identifierName();
    }
    while (!tokens.matchesContextIdAndLabel(TokenType.braceL, contextId)) {
      if (tokens.matches1(TokenType._extends) && !tokens.currentToken().isType) {
        hasSuperclass = true;
      }
      tokens.nextToken();
    }
    return { isExpression, className, hasSuperclass };
  }
  function processConstructor(tokens) {
    const constructorInitializerStatements = [];
    tokens.nextToken();
    const constructorContextId = tokens.currentToken().contextId;
    if (constructorContextId == null) {
      throw new Error("Expected context ID on open-paren starting constructor params.");
    }
    while (!tokens.matchesContextIdAndLabel(TokenType.parenR, constructorContextId)) {
      if (tokens.currentToken().contextId === constructorContextId) {
        tokens.nextToken();
        if (isAccessModifier(tokens.currentToken())) {
          tokens.nextToken();
          while (isAccessModifier(tokens.currentToken())) {
            tokens.nextToken();
          }
          const token = tokens.currentToken();
          if (token.type !== TokenType.name) {
            throw new Error("Expected identifier after access modifiers in constructor arg.");
          }
          const name = tokens.identifierNameForToken(token);
          constructorInitializerStatements.push(`this.${name} = ${name}`);
        }
      } else {
        tokens.nextToken();
      }
    }
    tokens.nextToken();
    while (tokens.currentToken().isType) {
      tokens.nextToken();
    }
    let constructorInsertPos = tokens.currentIndex();
    let foundSuperCall = false;
    while (!tokens.matchesContextIdAndLabel(TokenType.braceR, constructorContextId)) {
      if (!foundSuperCall && tokens.matches2(TokenType._super, TokenType.parenL)) {
        tokens.nextToken();
        const superCallContextId = tokens.currentToken().contextId;
        if (superCallContextId == null) {
          throw new Error("Expected a context ID on the super call");
        }
        while (!tokens.matchesContextIdAndLabel(TokenType.parenR, superCallContextId)) {
          tokens.nextToken();
        }
        constructorInsertPos = tokens.currentIndex();
        foundSuperCall = true;
      }
      tokens.nextToken();
    }
    tokens.nextToken();
    return { constructorInitializerStatements, constructorInsertPos };
  }
  function isAccessModifier(token) {
    return [
      TokenType._async,
      TokenType._get,
      TokenType._set,
      TokenType.plus,
      TokenType.minus,
      TokenType._readonly,
      TokenType._static,
      TokenType._public,
      TokenType._private,
      TokenType._protected,
      TokenType._override,
      TokenType._abstract,
      TokenType.star,
      TokenType._declare,
      TokenType.hash
    ].includes(token.type);
  }
  function skipFieldName(tokens) {
    if (tokens.matches1(TokenType.bracketL)) {
      const startToken = tokens.currentToken();
      const classContextId = startToken.contextId;
      if (classContextId == null) {
        throw new Error("Expected class context ID on computed name open bracket.");
      }
      while (!tokens.matchesContextIdAndLabel(TokenType.bracketR, classContextId)) {
        tokens.nextToken();
      }
      tokens.nextToken();
    } else {
      tokens.nextToken();
    }
  }

  // node_modules/sucrase/dist/esm/util/elideImportEquals.js
  function elideImportEquals(tokens) {
    tokens.removeInitialToken();
    tokens.removeToken();
    tokens.removeToken();
    tokens.removeToken();
    if (tokens.matches1(TokenType.parenL)) {
      tokens.removeToken();
      tokens.removeToken();
      tokens.removeToken();
    } else {
      while (tokens.matches1(TokenType.dot)) {
        tokens.removeToken();
        tokens.removeToken();
      }
    }
  }

  // node_modules/sucrase/dist/esm/util/getDeclarationInfo.js
  var EMPTY_DECLARATION_INFO = {
    typeDeclarations: /* @__PURE__ */ new Set(),
    valueDeclarations: /* @__PURE__ */ new Set()
  };
  function getDeclarationInfo(tokens) {
    const typeDeclarations = /* @__PURE__ */ new Set();
    const valueDeclarations = /* @__PURE__ */ new Set();
    for (let i = 0; i < tokens.tokens.length; i++) {
      const token = tokens.tokens[i];
      if (token.type === TokenType.name && isTopLevelDeclaration(token)) {
        if (token.isType) {
          typeDeclarations.add(tokens.identifierNameForToken(token));
        } else {
          valueDeclarations.add(tokens.identifierNameForToken(token));
        }
      }
    }
    return { typeDeclarations, valueDeclarations };
  }

  // node_modules/sucrase/dist/esm/util/isExportFrom.js
  function isExportFrom(tokens) {
    let closeBraceIndex = tokens.currentIndex();
    while (!tokens.matches1AtIndex(closeBraceIndex, TokenType.braceR)) {
      closeBraceIndex++;
    }
    return tokens.matchesContextualAtIndex(closeBraceIndex + 1, ContextualKeyword._from) && tokens.matches1AtIndex(closeBraceIndex + 2, TokenType.string);
  }

  // node_modules/sucrase/dist/esm/util/removeMaybeImportAttributes.js
  function removeMaybeImportAttributes(tokens) {
    if (tokens.matches2(TokenType._with, TokenType.braceL) || tokens.matches2(TokenType.name, TokenType.braceL) && tokens.matchesContextual(ContextualKeyword._assert)) {
      tokens.removeToken();
      tokens.removeToken();
      tokens.removeBalancedCode();
      tokens.removeToken();
    }
  }

  // node_modules/sucrase/dist/esm/util/shouldElideDefaultExport.js
  function shouldElideDefaultExport(isTypeScriptTransformEnabled, keepUnusedImports, tokens, declarationInfo) {
    if (!isTypeScriptTransformEnabled || keepUnusedImports) {
      return false;
    }
    const exportToken = tokens.currentToken();
    if (exportToken.rhsEndIndex == null) {
      throw new Error("Expected non-null rhsEndIndex on export token.");
    }
    const numTokens = exportToken.rhsEndIndex - tokens.currentIndex();
    if (numTokens !== 3 && !(numTokens === 4 && tokens.matches1AtIndex(exportToken.rhsEndIndex - 1, TokenType.semi))) {
      return false;
    }
    const identifierToken = tokens.tokenAtRelativeIndex(2);
    if (identifierToken.type !== TokenType.name) {
      return false;
    }
    const exportedName = tokens.identifierNameForToken(identifierToken);
    return declarationInfo.typeDeclarations.has(exportedName) && !declarationInfo.valueDeclarations.has(exportedName);
  }

  // node_modules/sucrase/dist/esm/transformers/CJSImportTransformer.js
  var CJSImportTransformer = class _CJSImportTransformer extends Transformer {
    __init() {
      this.hadExport = false;
    }
    __init2() {
      this.hadNamedExport = false;
    }
    __init3() {
      this.hadDefaultExport = false;
    }
    constructor(rootTransformer, tokens, importProcessor, nameManager, helperManager, reactHotLoaderTransformer, enableLegacyBabel5ModuleInterop, enableLegacyTypeScriptModuleInterop, isTypeScriptTransformEnabled, isFlowTransformEnabled, preserveDynamicImport, keepUnusedImports) {
      super();
      this.rootTransformer = rootTransformer;
      this.tokens = tokens;
      this.importProcessor = importProcessor;
      this.nameManager = nameManager;
      this.helperManager = helperManager;
      this.reactHotLoaderTransformer = reactHotLoaderTransformer;
      this.enableLegacyBabel5ModuleInterop = enableLegacyBabel5ModuleInterop;
      this.enableLegacyTypeScriptModuleInterop = enableLegacyTypeScriptModuleInterop;
      this.isTypeScriptTransformEnabled = isTypeScriptTransformEnabled;
      this.isFlowTransformEnabled = isFlowTransformEnabled;
      this.preserveDynamicImport = preserveDynamicImport;
      this.keepUnusedImports = keepUnusedImports;
      _CJSImportTransformer.prototype.__init.call(this);
      _CJSImportTransformer.prototype.__init2.call(this);
      _CJSImportTransformer.prototype.__init3.call(this);
      ;
      this.declarationInfo = isTypeScriptTransformEnabled ? getDeclarationInfo(tokens) : EMPTY_DECLARATION_INFO;
    }
    getPrefixCode() {
      let prefix = "";
      if (this.hadExport) {
        prefix += 'Object.defineProperty(exports, "__esModule", {value: true});';
      }
      return prefix;
    }
    getSuffixCode() {
      if (this.enableLegacyBabel5ModuleInterop && this.hadDefaultExport && !this.hadNamedExport) {
        return "\nmodule.exports = exports.default;\n";
      }
      return "";
    }
    process() {
      if (this.tokens.matches3(TokenType._import, TokenType.name, TokenType.eq)) {
        return this.processImportEquals();
      }
      if (this.tokens.matches1(TokenType._import)) {
        this.processImport();
        return true;
      }
      if (this.tokens.matches2(TokenType._export, TokenType.eq)) {
        this.tokens.replaceToken("module.exports");
        return true;
      }
      if (this.tokens.matches1(TokenType._export) && !this.tokens.currentToken().isType) {
        this.hadExport = true;
        return this.processExport();
      }
      if (this.tokens.matches2(TokenType.name, TokenType.postIncDec)) {
        if (this.processPostIncDec()) {
          return true;
        }
      }
      if (this.tokens.matches1(TokenType.name) || this.tokens.matches1(TokenType.jsxName)) {
        return this.processIdentifier();
      }
      if (this.tokens.matches1(TokenType.eq)) {
        return this.processAssignment();
      }
      if (this.tokens.matches1(TokenType.assign)) {
        return this.processComplexAssignment();
      }
      if (this.tokens.matches1(TokenType.preIncDec)) {
        return this.processPreIncDec();
      }
      return false;
    }
    processImportEquals() {
      const importName = this.tokens.identifierNameAtIndex(this.tokens.currentIndex() + 1);
      if (this.importProcessor.shouldAutomaticallyElideImportedName(importName)) {
        elideImportEquals(this.tokens);
      } else {
        this.tokens.replaceToken("const");
      }
      return true;
    }
    /**
     * Transform this:
     * import foo, {bar} from 'baz';
     * into
     * var _baz = require('baz'); var _baz2 = _interopRequireDefault(_baz);
     *
     * The import code was already generated in the import preprocessing step, so
     * we just need to look it up.
     */
    processImport() {
      if (this.tokens.matches2(TokenType._import, TokenType.parenL)) {
        if (this.preserveDynamicImport) {
          this.tokens.copyToken();
          return;
        }
        const requireWrapper = this.enableLegacyTypeScriptModuleInterop ? "" : `${this.helperManager.getHelperName("interopRequireWildcard")}(`;
        this.tokens.replaceToken(`Promise.resolve().then(() => ${requireWrapper}require`);
        const contextId = this.tokens.currentToken().contextId;
        if (contextId == null) {
          throw new Error("Expected context ID on dynamic import invocation.");
        }
        this.tokens.copyToken();
        while (!this.tokens.matchesContextIdAndLabel(TokenType.parenR, contextId)) {
          this.rootTransformer.processToken();
        }
        this.tokens.replaceToken(requireWrapper ? ")))" : "))");
        return;
      }
      const shouldElideImport = this.removeImportAndDetectIfShouldElide();
      if (shouldElideImport) {
        this.tokens.removeToken();
      } else {
        const path = this.tokens.stringValue();
        this.tokens.replaceTokenTrimmingLeftWhitespace(this.importProcessor.claimImportCode(path));
        this.tokens.appendCode(this.importProcessor.claimImportCode(path));
      }
      removeMaybeImportAttributes(this.tokens);
      if (this.tokens.matches1(TokenType.semi)) {
        this.tokens.removeToken();
      }
    }
    /**
     * Erase this import (since any CJS output would be completely different), and
     * return true if this import is should be elided due to being a type-only
     * import. Such imports will not be emitted at all to avoid side effects.
     *
     * Import elision only happens with the TypeScript or Flow transforms enabled.
     *
     * TODO: This function has some awkward overlap with
     *  CJSImportProcessor.pruneTypeOnlyImports , and the two should be unified.
     *  That function handles TypeScript implicit import name elision, and removes
     *  an import if all typical imported names (without `type`) are removed due
     *  to being type-only imports. This function handles Flow import removal and
     *  properly distinguishes `import 'foo'` from `import {} from 'foo'` for TS
     *  purposes.
     *
     * The position should end at the import string.
     */
    removeImportAndDetectIfShouldElide() {
      this.tokens.removeInitialToken();
      if (this.tokens.matchesContextual(ContextualKeyword._type) && !this.tokens.matches1AtIndex(this.tokens.currentIndex() + 1, TokenType.comma) && !this.tokens.matchesContextualAtIndex(this.tokens.currentIndex() + 1, ContextualKeyword._from)) {
        this.removeRemainingImport();
        return true;
      }
      if (this.tokens.matches1(TokenType.name) || this.tokens.matches1(TokenType.star)) {
        this.removeRemainingImport();
        return false;
      }
      if (this.tokens.matches1(TokenType.string)) {
        return false;
      }
      let foundNonTypeImport = false;
      let foundAnyNamedImport = false;
      while (!this.tokens.matches1(TokenType.string)) {
        if (!foundNonTypeImport && this.tokens.matches1(TokenType.braceL) || this.tokens.matches1(TokenType.comma)) {
          this.tokens.removeToken();
          if (!this.tokens.matches1(TokenType.braceR)) {
            foundAnyNamedImport = true;
          }
          if (this.tokens.matches2(TokenType.name, TokenType.comma) || this.tokens.matches2(TokenType.name, TokenType.braceR) || this.tokens.matches4(TokenType.name, TokenType.name, TokenType.name, TokenType.comma) || this.tokens.matches4(TokenType.name, TokenType.name, TokenType.name, TokenType.braceR)) {
            foundNonTypeImport = true;
          }
        }
        this.tokens.removeToken();
      }
      if (this.keepUnusedImports) {
        return false;
      }
      if (this.isTypeScriptTransformEnabled) {
        return !foundNonTypeImport;
      } else if (this.isFlowTransformEnabled) {
        return foundAnyNamedImport && !foundNonTypeImport;
      } else {
        return false;
      }
    }
    removeRemainingImport() {
      while (!this.tokens.matches1(TokenType.string)) {
        this.tokens.removeToken();
      }
    }
    processIdentifier() {
      const token = this.tokens.currentToken();
      if (token.shadowsGlobal) {
        return false;
      }
      if (token.identifierRole === IdentifierRole.ObjectShorthand) {
        return this.processObjectShorthand();
      }
      if (token.identifierRole !== IdentifierRole.Access) {
        return false;
      }
      const replacement = this.importProcessor.getIdentifierReplacement(
        this.tokens.identifierNameForToken(token)
      );
      if (!replacement) {
        return false;
      }
      let possibleOpenParenIndex = this.tokens.currentIndex() + 1;
      while (possibleOpenParenIndex < this.tokens.tokens.length && this.tokens.tokens[possibleOpenParenIndex].type === TokenType.parenR) {
        possibleOpenParenIndex++;
      }
      if (this.tokens.tokens[possibleOpenParenIndex].type === TokenType.parenL) {
        if (this.tokens.tokenAtRelativeIndex(1).type === TokenType.parenL && this.tokens.tokenAtRelativeIndex(-1).type !== TokenType._new) {
          this.tokens.replaceToken(`${replacement}.call(void 0, `);
          this.tokens.removeToken();
          this.rootTransformer.processBalancedCode();
          this.tokens.copyExpectedToken(TokenType.parenR);
        } else {
          this.tokens.replaceToken(`(0, ${replacement})`);
        }
      } else {
        this.tokens.replaceToken(replacement);
      }
      return true;
    }
    processObjectShorthand() {
      const identifier = this.tokens.identifierName();
      const replacement = this.importProcessor.getIdentifierReplacement(identifier);
      if (!replacement) {
        return false;
      }
      this.tokens.replaceToken(`${identifier}: ${replacement}`);
      return true;
    }
    processExport() {
      if (this.tokens.matches2(TokenType._export, TokenType._enum) || this.tokens.matches3(TokenType._export, TokenType._const, TokenType._enum)) {
        this.hadNamedExport = true;
        return false;
      }
      if (this.tokens.matches2(TokenType._export, TokenType._default)) {
        if (this.tokens.matches3(TokenType._export, TokenType._default, TokenType._enum)) {
          this.hadDefaultExport = true;
          return false;
        }
        this.processExportDefault();
        return true;
      } else if (this.tokens.matches2(TokenType._export, TokenType.braceL)) {
        this.processExportBindings();
        return true;
      } else if (this.tokens.matches2(TokenType._export, TokenType.name) && this.tokens.matchesContextualAtIndex(this.tokens.currentIndex() + 1, ContextualKeyword._type)) {
        this.tokens.removeInitialToken();
        this.tokens.removeToken();
        if (this.tokens.matches1(TokenType.braceL)) {
          while (!this.tokens.matches1(TokenType.braceR)) {
            this.tokens.removeToken();
          }
          this.tokens.removeToken();
        } else {
          this.tokens.removeToken();
          if (this.tokens.matches1(TokenType._as)) {
            this.tokens.removeToken();
            this.tokens.removeToken();
          }
        }
        if (this.tokens.matchesContextual(ContextualKeyword._from) && this.tokens.matches1AtIndex(this.tokens.currentIndex() + 1, TokenType.string)) {
          this.tokens.removeToken();
          this.tokens.removeToken();
          removeMaybeImportAttributes(this.tokens);
        }
        return true;
      }
      this.hadNamedExport = true;
      if (this.tokens.matches2(TokenType._export, TokenType._var) || this.tokens.matches2(TokenType._export, TokenType._let) || this.tokens.matches2(TokenType._export, TokenType._const)) {
        this.processExportVar();
        return true;
      } else if (this.tokens.matches2(TokenType._export, TokenType._function) || // export async function
      this.tokens.matches3(TokenType._export, TokenType.name, TokenType._function)) {
        this.processExportFunction();
        return true;
      } else if (this.tokens.matches2(TokenType._export, TokenType._class) || this.tokens.matches3(TokenType._export, TokenType._abstract, TokenType._class) || this.tokens.matches2(TokenType._export, TokenType.at)) {
        this.processExportClass();
        return true;
      } else if (this.tokens.matches2(TokenType._export, TokenType.star)) {
        this.processExportStar();
        return true;
      } else {
        throw new Error("Unrecognized export syntax.");
      }
    }
    processAssignment() {
      const index = this.tokens.currentIndex();
      const identifierToken = this.tokens.tokens[index - 1];
      if (identifierToken.isType || identifierToken.type !== TokenType.name) {
        return false;
      }
      if (identifierToken.shadowsGlobal) {
        return false;
      }
      if (index >= 2 && this.tokens.matches1AtIndex(index - 2, TokenType.dot)) {
        return false;
      }
      if (index >= 2 && [TokenType._var, TokenType._let, TokenType._const].includes(this.tokens.tokens[index - 2].type)) {
        return false;
      }
      const assignmentSnippet = this.importProcessor.resolveExportBinding(
        this.tokens.identifierNameForToken(identifierToken)
      );
      if (!assignmentSnippet) {
        return false;
      }
      this.tokens.copyToken();
      this.tokens.appendCode(` ${assignmentSnippet} =`);
      return true;
    }
    /**
     * Process something like `a += 3`, where `a` might be an exported value.
     */
    processComplexAssignment() {
      const index = this.tokens.currentIndex();
      const identifierToken = this.tokens.tokens[index - 1];
      if (identifierToken.type !== TokenType.name) {
        return false;
      }
      if (identifierToken.shadowsGlobal) {
        return false;
      }
      if (index >= 2 && this.tokens.matches1AtIndex(index - 2, TokenType.dot)) {
        return false;
      }
      const assignmentSnippet = this.importProcessor.resolveExportBinding(
        this.tokens.identifierNameForToken(identifierToken)
      );
      if (!assignmentSnippet) {
        return false;
      }
      this.tokens.appendCode(` = ${assignmentSnippet}`);
      this.tokens.copyToken();
      return true;
    }
    /**
     * Process something like `++a`, where `a` might be an exported value.
     */
    processPreIncDec() {
      const index = this.tokens.currentIndex();
      const identifierToken = this.tokens.tokens[index + 1];
      if (identifierToken.type !== TokenType.name) {
        return false;
      }
      if (identifierToken.shadowsGlobal) {
        return false;
      }
      if (index + 2 < this.tokens.tokens.length && (this.tokens.matches1AtIndex(index + 2, TokenType.dot) || this.tokens.matches1AtIndex(index + 2, TokenType.bracketL) || this.tokens.matches1AtIndex(index + 2, TokenType.parenL))) {
        return false;
      }
      const identifierName = this.tokens.identifierNameForToken(identifierToken);
      const assignmentSnippet = this.importProcessor.resolveExportBinding(identifierName);
      if (!assignmentSnippet) {
        return false;
      }
      this.tokens.appendCode(`${assignmentSnippet} = `);
      this.tokens.copyToken();
      return true;
    }
    /**
     * Process something like `a++`, where `a` might be an exported value.
     * This starts at the `a`, not at the `++`.
     */
    processPostIncDec() {
      const index = this.tokens.currentIndex();
      const identifierToken = this.tokens.tokens[index];
      const operatorToken = this.tokens.tokens[index + 1];
      if (identifierToken.type !== TokenType.name) {
        return false;
      }
      if (identifierToken.shadowsGlobal) {
        return false;
      }
      if (index >= 1 && this.tokens.matches1AtIndex(index - 1, TokenType.dot)) {
        return false;
      }
      const identifierName = this.tokens.identifierNameForToken(identifierToken);
      const assignmentSnippet = this.importProcessor.resolveExportBinding(identifierName);
      if (!assignmentSnippet) {
        return false;
      }
      const operatorCode = this.tokens.rawCodeForToken(operatorToken);
      const base = this.importProcessor.getIdentifierReplacement(identifierName) || identifierName;
      if (operatorCode === "++") {
        this.tokens.replaceToken(`(${base} = ${assignmentSnippet} = ${base} + 1, ${base} - 1)`);
      } else if (operatorCode === "--") {
        this.tokens.replaceToken(`(${base} = ${assignmentSnippet} = ${base} - 1, ${base} + 1)`);
      } else {
        throw new Error(`Unexpected operator: ${operatorCode}`);
      }
      this.tokens.removeToken();
      return true;
    }
    processExportDefault() {
      let exportedRuntimeValue = true;
      if (this.tokens.matches4(TokenType._export, TokenType._default, TokenType._function, TokenType.name) || // export default async function
      this.tokens.matches5(TokenType._export, TokenType._default, TokenType.name, TokenType._function, TokenType.name) && this.tokens.matchesContextualAtIndex(
        this.tokens.currentIndex() + 2,
        ContextualKeyword._async
      )) {
        this.tokens.removeInitialToken();
        this.tokens.removeToken();
        const name = this.processNamedFunction();
        this.tokens.appendCode(` exports.default = ${name};`);
      } else if (this.tokens.matches4(TokenType._export, TokenType._default, TokenType._class, TokenType.name) || this.tokens.matches5(TokenType._export, TokenType._default, TokenType._abstract, TokenType._class, TokenType.name) || this.tokens.matches3(TokenType._export, TokenType._default, TokenType.at)) {
        this.tokens.removeInitialToken();
        this.tokens.removeToken();
        this.copyDecorators();
        if (this.tokens.matches1(TokenType._abstract)) {
          this.tokens.removeToken();
        }
        const name = this.rootTransformer.processNamedClass();
        this.tokens.appendCode(` exports.default = ${name};`);
      } else if (shouldElideDefaultExport(
        this.isTypeScriptTransformEnabled,
        this.keepUnusedImports,
        this.tokens,
        this.declarationInfo
      )) {
        exportedRuntimeValue = false;
        this.tokens.removeInitialToken();
        this.tokens.removeToken();
        this.tokens.removeToken();
      } else if (this.reactHotLoaderTransformer) {
        const defaultVarName = this.nameManager.claimFreeName("_default");
        this.tokens.replaceToken(`let ${defaultVarName}; exports.`);
        this.tokens.copyToken();
        this.tokens.appendCode(` = ${defaultVarName} =`);
        this.reactHotLoaderTransformer.setExtractedDefaultExportName(defaultVarName);
      } else {
        this.tokens.replaceToken("exports.");
        this.tokens.copyToken();
        this.tokens.appendCode(" =");
      }
      if (exportedRuntimeValue) {
        this.hadDefaultExport = true;
      }
    }
    copyDecorators() {
      while (this.tokens.matches1(TokenType.at)) {
        this.tokens.copyToken();
        if (this.tokens.matches1(TokenType.parenL)) {
          this.tokens.copyExpectedToken(TokenType.parenL);
          this.rootTransformer.processBalancedCode();
          this.tokens.copyExpectedToken(TokenType.parenR);
        } else {
          this.tokens.copyExpectedToken(TokenType.name);
          while (this.tokens.matches1(TokenType.dot)) {
            this.tokens.copyExpectedToken(TokenType.dot);
            this.tokens.copyExpectedToken(TokenType.name);
          }
          if (this.tokens.matches1(TokenType.parenL)) {
            this.tokens.copyExpectedToken(TokenType.parenL);
            this.rootTransformer.processBalancedCode();
            this.tokens.copyExpectedToken(TokenType.parenR);
          }
        }
      }
    }
    /**
     * Transform a declaration like `export var`, `export let`, or `export const`.
     */
    processExportVar() {
      if (this.isSimpleExportVar()) {
        this.processSimpleExportVar();
      } else {
        this.processComplexExportVar();
      }
    }
    /**
     * Determine if the export is of the form:
     * export var/let/const [varName] = [expr];
     * In other words, determine if function name inference might apply.
     */
    isSimpleExportVar() {
      let tokenIndex = this.tokens.currentIndex();
      tokenIndex++;
      tokenIndex++;
      if (!this.tokens.matches1AtIndex(tokenIndex, TokenType.name)) {
        return false;
      }
      tokenIndex++;
      while (tokenIndex < this.tokens.tokens.length && this.tokens.tokens[tokenIndex].isType) {
        tokenIndex++;
      }
      if (!this.tokens.matches1AtIndex(tokenIndex, TokenType.eq)) {
        return false;
      }
      return true;
    }
    /**
     * Transform an `export var` declaration initializing a single variable.
     *
     * For example, this:
     * export const f = () => {};
     * becomes this:
     * const f = () => {}; exports.f = f;
     *
     * The variable is unused (e.g. exports.f has the true value of the export).
     * We need to produce an assignment of this form so that the function will
     * have an inferred name of "f", which wouldn't happen in the more general
     * case below.
     */
    processSimpleExportVar() {
      this.tokens.removeInitialToken();
      this.tokens.copyToken();
      const varName = this.tokens.identifierName();
      while (!this.tokens.matches1(TokenType.eq)) {
        this.rootTransformer.processToken();
      }
      const endIndex = this.tokens.currentToken().rhsEndIndex;
      if (endIndex == null) {
        throw new Error("Expected = token with an end index.");
      }
      while (this.tokens.currentIndex() < endIndex) {
        this.rootTransformer.processToken();
      }
      this.tokens.appendCode(`; exports.${varName} = ${varName}`);
    }
    /**
     * Transform normal declaration exports, including handling destructuring.
     * For example, this:
     * export const {x: [a = 2, b], c} = d;
     * becomes this:
     * ({x: [exports.a = 2, exports.b], c: exports.c} = d;)
     */
    processComplexExportVar() {
      this.tokens.removeInitialToken();
      this.tokens.removeToken();
      const needsParens = this.tokens.matches1(TokenType.braceL);
      if (needsParens) {
        this.tokens.appendCode("(");
      }
      let depth = 0;
      while (true) {
        if (this.tokens.matches1(TokenType.braceL) || this.tokens.matches1(TokenType.dollarBraceL) || this.tokens.matches1(TokenType.bracketL)) {
          depth++;
          this.tokens.copyToken();
        } else if (this.tokens.matches1(TokenType.braceR) || this.tokens.matches1(TokenType.bracketR)) {
          depth--;
          this.tokens.copyToken();
        } else if (depth === 0 && !this.tokens.matches1(TokenType.name) && !this.tokens.currentToken().isType) {
          break;
        } else if (this.tokens.matches1(TokenType.eq)) {
          const endIndex = this.tokens.currentToken().rhsEndIndex;
          if (endIndex == null) {
            throw new Error("Expected = token with an end index.");
          }
          while (this.tokens.currentIndex() < endIndex) {
            this.rootTransformer.processToken();
          }
        } else {
          const token = this.tokens.currentToken();
          if (isDeclaration(token)) {
            const name = this.tokens.identifierName();
            let replacement = this.importProcessor.getIdentifierReplacement(name);
            if (replacement === null) {
              throw new Error(`Expected a replacement for ${name} in \`export var\` syntax.`);
            }
            if (isObjectShorthandDeclaration(token)) {
              replacement = `${name}: ${replacement}`;
            }
            this.tokens.replaceToken(replacement);
          } else {
            this.rootTransformer.processToken();
          }
        }
      }
      if (needsParens) {
        const endIndex = this.tokens.currentToken().rhsEndIndex;
        if (endIndex == null) {
          throw new Error("Expected = token with an end index.");
        }
        while (this.tokens.currentIndex() < endIndex) {
          this.rootTransformer.processToken();
        }
        this.tokens.appendCode(")");
      }
    }
    /**
     * Transform this:
     * export function foo() {}
     * into this:
     * function foo() {} exports.foo = foo;
     */
    processExportFunction() {
      this.tokens.replaceToken("");
      const name = this.processNamedFunction();
      this.tokens.appendCode(` exports.${name} = ${name};`);
    }
    /**
     * Skip past a function with a name and return that name.
     */
    processNamedFunction() {
      if (this.tokens.matches1(TokenType._function)) {
        this.tokens.copyToken();
      } else if (this.tokens.matches2(TokenType.name, TokenType._function)) {
        if (!this.tokens.matchesContextual(ContextualKeyword._async)) {
          throw new Error("Expected async keyword in function export.");
        }
        this.tokens.copyToken();
        this.tokens.copyToken();
      }
      if (this.tokens.matches1(TokenType.star)) {
        this.tokens.copyToken();
      }
      if (!this.tokens.matches1(TokenType.name)) {
        throw new Error("Expected identifier for exported function name.");
      }
      const name = this.tokens.identifierName();
      this.tokens.copyToken();
      if (this.tokens.currentToken().isType) {
        this.tokens.removeInitialToken();
        while (this.tokens.currentToken().isType) {
          this.tokens.removeToken();
        }
      }
      this.tokens.copyExpectedToken(TokenType.parenL);
      this.rootTransformer.processBalancedCode();
      this.tokens.copyExpectedToken(TokenType.parenR);
      this.rootTransformer.processPossibleTypeRange();
      this.tokens.copyExpectedToken(TokenType.braceL);
      this.rootTransformer.processBalancedCode();
      this.tokens.copyExpectedToken(TokenType.braceR);
      return name;
    }
    /**
     * Transform this:
     * export class A {}
     * into this:
     * class A {} exports.A = A;
     */
    processExportClass() {
      this.tokens.removeInitialToken();
      this.copyDecorators();
      if (this.tokens.matches1(TokenType._abstract)) {
        this.tokens.removeToken();
      }
      const name = this.rootTransformer.processNamedClass();
      this.tokens.appendCode(` exports.${name} = ${name};`);
    }
    /**
     * Transform this:
     * export {a, b as c};
     * into this:
     * exports.a = a; exports.c = b;
     *
     * OR
     *
     * Transform this:
     * export {a, b as c} from './foo';
     * into the pre-generated Object.defineProperty code from the ImportProcessor.
     *
     * For the first case, if the TypeScript transform is enabled, we need to skip
     * exports that are only defined as types.
     */
    processExportBindings() {
      this.tokens.removeInitialToken();
      this.tokens.removeToken();
      const isReExport = isExportFrom(this.tokens);
      const exportStatements = [];
      while (true) {
        if (this.tokens.matches1(TokenType.braceR)) {
          this.tokens.removeToken();
          break;
        }
        const specifierInfo = getImportExportSpecifierInfo(this.tokens);
        while (this.tokens.currentIndex() < specifierInfo.endIndex) {
          this.tokens.removeToken();
        }
        const shouldRemoveExport = specifierInfo.isType || !isReExport && this.shouldElideExportedIdentifier(specifierInfo.leftName);
        if (!shouldRemoveExport) {
          const exportedName = specifierInfo.rightName;
          if (exportedName === "default") {
            this.hadDefaultExport = true;
          } else {
            this.hadNamedExport = true;
          }
          const localName = specifierInfo.leftName;
          const newLocalName = this.importProcessor.getIdentifierReplacement(localName);
          exportStatements.push(`exports.${exportedName} = ${newLocalName || localName};`);
        }
        if (this.tokens.matches1(TokenType.braceR)) {
          this.tokens.removeToken();
          break;
        }
        if (this.tokens.matches2(TokenType.comma, TokenType.braceR)) {
          this.tokens.removeToken();
          this.tokens.removeToken();
          break;
        } else if (this.tokens.matches1(TokenType.comma)) {
          this.tokens.removeToken();
        } else {
          throw new Error(`Unexpected token: ${JSON.stringify(this.tokens.currentToken())}`);
        }
      }
      if (this.tokens.matchesContextual(ContextualKeyword._from)) {
        this.tokens.removeToken();
        const path = this.tokens.stringValue();
        this.tokens.replaceTokenTrimmingLeftWhitespace(this.importProcessor.claimImportCode(path));
        removeMaybeImportAttributes(this.tokens);
      } else {
        this.tokens.appendCode(exportStatements.join(" "));
      }
      if (this.tokens.matches1(TokenType.semi)) {
        this.tokens.removeToken();
      }
    }
    processExportStar() {
      this.tokens.removeInitialToken();
      while (!this.tokens.matches1(TokenType.string)) {
        this.tokens.removeToken();
      }
      const path = this.tokens.stringValue();
      this.tokens.replaceTokenTrimmingLeftWhitespace(this.importProcessor.claimImportCode(path));
      removeMaybeImportAttributes(this.tokens);
      if (this.tokens.matches1(TokenType.semi)) {
        this.tokens.removeToken();
      }
    }
    shouldElideExportedIdentifier(name) {
      return this.isTypeScriptTransformEnabled && !this.keepUnusedImports && !this.declarationInfo.valueDeclarations.has(name);
    }
  };

  // node_modules/sucrase/dist/esm/transformers/ESMImportTransformer.js
  var ESMImportTransformer = class extends Transformer {
    constructor(tokens, nameManager, helperManager, reactHotLoaderTransformer, isTypeScriptTransformEnabled, isFlowTransformEnabled, keepUnusedImports, options) {
      super();
      this.tokens = tokens;
      this.nameManager = nameManager;
      this.helperManager = helperManager;
      this.reactHotLoaderTransformer = reactHotLoaderTransformer;
      this.isTypeScriptTransformEnabled = isTypeScriptTransformEnabled;
      this.isFlowTransformEnabled = isFlowTransformEnabled;
      this.keepUnusedImports = keepUnusedImports;
      ;
      this.nonTypeIdentifiers = isTypeScriptTransformEnabled && !keepUnusedImports ? getNonTypeIdentifiers(tokens, options) : /* @__PURE__ */ new Set();
      this.declarationInfo = isTypeScriptTransformEnabled && !keepUnusedImports ? getDeclarationInfo(tokens) : EMPTY_DECLARATION_INFO;
      this.injectCreateRequireForImportRequire = Boolean(options.injectCreateRequireForImportRequire);
    }
    process() {
      if (this.tokens.matches3(TokenType._import, TokenType.name, TokenType.eq)) {
        return this.processImportEquals();
      }
      if (this.tokens.matches4(TokenType._import, TokenType.name, TokenType.name, TokenType.eq) && this.tokens.matchesContextualAtIndex(this.tokens.currentIndex() + 1, ContextualKeyword._type)) {
        this.tokens.removeInitialToken();
        for (let i = 0; i < 7; i++) {
          this.tokens.removeToken();
        }
        return true;
      }
      if (this.tokens.matches2(TokenType._export, TokenType.eq)) {
        this.tokens.replaceToken("module.exports");
        return true;
      }
      if (this.tokens.matches5(TokenType._export, TokenType._import, TokenType.name, TokenType.name, TokenType.eq) && this.tokens.matchesContextualAtIndex(this.tokens.currentIndex() + 2, ContextualKeyword._type)) {
        this.tokens.removeInitialToken();
        for (let i = 0; i < 8; i++) {
          this.tokens.removeToken();
        }
        return true;
      }
      if (this.tokens.matches1(TokenType._import)) {
        return this.processImport();
      }
      if (this.tokens.matches2(TokenType._export, TokenType._default)) {
        return this.processExportDefault();
      }
      if (this.tokens.matches2(TokenType._export, TokenType.braceL)) {
        return this.processNamedExports();
      }
      if (this.tokens.matches2(TokenType._export, TokenType.name) && this.tokens.matchesContextualAtIndex(this.tokens.currentIndex() + 1, ContextualKeyword._type)) {
        this.tokens.removeInitialToken();
        this.tokens.removeToken();
        if (this.tokens.matches1(TokenType.braceL)) {
          while (!this.tokens.matches1(TokenType.braceR)) {
            this.tokens.removeToken();
          }
          this.tokens.removeToken();
        } else {
          this.tokens.removeToken();
          if (this.tokens.matches1(TokenType._as)) {
            this.tokens.removeToken();
            this.tokens.removeToken();
          }
        }
        if (this.tokens.matchesContextual(ContextualKeyword._from) && this.tokens.matches1AtIndex(this.tokens.currentIndex() + 1, TokenType.string)) {
          this.tokens.removeToken();
          this.tokens.removeToken();
          removeMaybeImportAttributes(this.tokens);
        }
        return true;
      }
      return false;
    }
    processImportEquals() {
      const importName = this.tokens.identifierNameAtIndex(this.tokens.currentIndex() + 1);
      if (this.shouldAutomaticallyElideImportedName(importName)) {
        elideImportEquals(this.tokens);
      } else if (this.injectCreateRequireForImportRequire) {
        this.tokens.replaceToken("const");
        this.tokens.copyToken();
        this.tokens.copyToken();
        this.tokens.replaceToken(this.helperManager.getHelperName("require"));
      } else {
        this.tokens.replaceToken("const");
      }
      return true;
    }
    processImport() {
      if (this.tokens.matches2(TokenType._import, TokenType.parenL)) {
        return false;
      }
      const snapshot = this.tokens.snapshot();
      const allImportsRemoved = this.removeImportTypeBindings();
      if (allImportsRemoved) {
        this.tokens.restoreToSnapshot(snapshot);
        while (!this.tokens.matches1(TokenType.string)) {
          this.tokens.removeToken();
        }
        this.tokens.removeToken();
        removeMaybeImportAttributes(this.tokens);
        if (this.tokens.matches1(TokenType.semi)) {
          this.tokens.removeToken();
        }
      }
      return true;
    }
    /**
     * Remove type bindings from this import, leaving the rest of the import intact.
     *
     * Return true if this import was ONLY types, and thus is eligible for removal. This will bail out
     * of the replacement operation, so we can return early here.
     */
    removeImportTypeBindings() {
      this.tokens.copyExpectedToken(TokenType._import);
      if (this.tokens.matchesContextual(ContextualKeyword._type) && !this.tokens.matches1AtIndex(this.tokens.currentIndex() + 1, TokenType.comma) && !this.tokens.matchesContextualAtIndex(this.tokens.currentIndex() + 1, ContextualKeyword._from)) {
        return true;
      }
      if (this.tokens.matches1(TokenType.string)) {
        this.tokens.copyToken();
        return false;
      }
      if (this.tokens.matchesContextual(ContextualKeyword._module) && this.tokens.matchesContextualAtIndex(this.tokens.currentIndex() + 2, ContextualKeyword._from)) {
        this.tokens.copyToken();
      }
      let foundNonTypeImport = false;
      let foundAnyNamedImport = false;
      let needsComma = false;
      if (this.tokens.matches1(TokenType.name)) {
        if (this.shouldAutomaticallyElideImportedName(this.tokens.identifierName())) {
          this.tokens.removeToken();
          if (this.tokens.matches1(TokenType.comma)) {
            this.tokens.removeToken();
          }
        } else {
          foundNonTypeImport = true;
          this.tokens.copyToken();
          if (this.tokens.matches1(TokenType.comma)) {
            needsComma = true;
            this.tokens.removeToken();
          }
        }
      }
      if (this.tokens.matches1(TokenType.star)) {
        if (this.shouldAutomaticallyElideImportedName(this.tokens.identifierNameAtRelativeIndex(2))) {
          this.tokens.removeToken();
          this.tokens.removeToken();
          this.tokens.removeToken();
        } else {
          if (needsComma) {
            this.tokens.appendCode(",");
          }
          foundNonTypeImport = true;
          this.tokens.copyExpectedToken(TokenType.star);
          this.tokens.copyExpectedToken(TokenType.name);
          this.tokens.copyExpectedToken(TokenType.name);
        }
      } else if (this.tokens.matches1(TokenType.braceL)) {
        if (needsComma) {
          this.tokens.appendCode(",");
        }
        this.tokens.copyToken();
        while (!this.tokens.matches1(TokenType.braceR)) {
          foundAnyNamedImport = true;
          const specifierInfo = getImportExportSpecifierInfo(this.tokens);
          if (specifierInfo.isType || this.shouldAutomaticallyElideImportedName(specifierInfo.rightName)) {
            while (this.tokens.currentIndex() < specifierInfo.endIndex) {
              this.tokens.removeToken();
            }
            if (this.tokens.matches1(TokenType.comma)) {
              this.tokens.removeToken();
            }
          } else {
            foundNonTypeImport = true;
            while (this.tokens.currentIndex() < specifierInfo.endIndex) {
              this.tokens.copyToken();
            }
            if (this.tokens.matches1(TokenType.comma)) {
              this.tokens.copyToken();
            }
          }
        }
        this.tokens.copyExpectedToken(TokenType.braceR);
      }
      if (this.keepUnusedImports) {
        return false;
      }
      if (this.isTypeScriptTransformEnabled) {
        return !foundNonTypeImport;
      } else if (this.isFlowTransformEnabled) {
        return foundAnyNamedImport && !foundNonTypeImport;
      } else {
        return false;
      }
    }
    shouldAutomaticallyElideImportedName(name) {
      return this.isTypeScriptTransformEnabled && !this.keepUnusedImports && !this.nonTypeIdentifiers.has(name);
    }
    processExportDefault() {
      if (shouldElideDefaultExport(
        this.isTypeScriptTransformEnabled,
        this.keepUnusedImports,
        this.tokens,
        this.declarationInfo
      )) {
        this.tokens.removeInitialToken();
        this.tokens.removeToken();
        this.tokens.removeToken();
        return true;
      }
      const alreadyHasName = this.tokens.matches4(TokenType._export, TokenType._default, TokenType._function, TokenType.name) || // export default async function
      this.tokens.matches5(TokenType._export, TokenType._default, TokenType.name, TokenType._function, TokenType.name) && this.tokens.matchesContextualAtIndex(
        this.tokens.currentIndex() + 2,
        ContextualKeyword._async
      ) || this.tokens.matches4(TokenType._export, TokenType._default, TokenType._class, TokenType.name) || this.tokens.matches5(TokenType._export, TokenType._default, TokenType._abstract, TokenType._class, TokenType.name);
      if (!alreadyHasName && this.reactHotLoaderTransformer) {
        const defaultVarName = this.nameManager.claimFreeName("_default");
        this.tokens.replaceToken(`let ${defaultVarName}; export`);
        this.tokens.copyToken();
        this.tokens.appendCode(` ${defaultVarName} =`);
        this.reactHotLoaderTransformer.setExtractedDefaultExportName(defaultVarName);
        return true;
      }
      return false;
    }
    /**
     * Handle a statement with one of these forms:
     * export {a, type b};
     * export {c, type d} from 'foo';
     *
     * In both cases, any explicit type exports should be removed. In the first
     * case, we also need to handle implicit export elision for names declared as
     * types. In the second case, we must NOT do implicit named export elision,
     * but we must remove the runtime import if all exports are type exports.
     */
    processNamedExports() {
      if (!this.isTypeScriptTransformEnabled) {
        return false;
      }
      this.tokens.copyExpectedToken(TokenType._export);
      this.tokens.copyExpectedToken(TokenType.braceL);
      const isReExport = isExportFrom(this.tokens);
      let foundNonTypeExport = false;
      while (!this.tokens.matches1(TokenType.braceR)) {
        const specifierInfo = getImportExportSpecifierInfo(this.tokens);
        if (specifierInfo.isType || !isReExport && this.shouldElideExportedName(specifierInfo.leftName)) {
          while (this.tokens.currentIndex() < specifierInfo.endIndex) {
            this.tokens.removeToken();
          }
          if (this.tokens.matches1(TokenType.comma)) {
            this.tokens.removeToken();
          }
        } else {
          foundNonTypeExport = true;
          while (this.tokens.currentIndex() < specifierInfo.endIndex) {
            this.tokens.copyToken();
          }
          if (this.tokens.matches1(TokenType.comma)) {
            this.tokens.copyToken();
          }
        }
      }
      this.tokens.copyExpectedToken(TokenType.braceR);
      if (!this.keepUnusedImports && isReExport && !foundNonTypeExport) {
        this.tokens.removeToken();
        this.tokens.removeToken();
        removeMaybeImportAttributes(this.tokens);
      }
      return true;
    }
    /**
     * ESM elides all imports with the rule that we only elide if we see that it's
     * a type and never see it as a value. This is in contrast to CJS, which
     * elides imports that are completely unknown.
     */
    shouldElideExportedName(name) {
      return this.isTypeScriptTransformEnabled && !this.keepUnusedImports && this.declarationInfo.typeDeclarations.has(name) && !this.declarationInfo.valueDeclarations.has(name);
    }
  };

  // node_modules/sucrase/dist/esm/transformers/FlowTransformer.js
  var FlowTransformer = class extends Transformer {
    constructor(rootTransformer, tokens, isImportsTransformEnabled) {
      super();
      this.rootTransformer = rootTransformer;
      this.tokens = tokens;
      this.isImportsTransformEnabled = isImportsTransformEnabled;
      ;
    }
    process() {
      if (this.rootTransformer.processPossibleArrowParamEnd() || this.rootTransformer.processPossibleAsyncArrowWithTypeParams() || this.rootTransformer.processPossibleTypeRange()) {
        return true;
      }
      if (this.tokens.matches1(TokenType._enum)) {
        this.processEnum();
        return true;
      }
      if (this.tokens.matches2(TokenType._export, TokenType._enum)) {
        this.processNamedExportEnum();
        return true;
      }
      if (this.tokens.matches3(TokenType._export, TokenType._default, TokenType._enum)) {
        this.processDefaultExportEnum();
        return true;
      }
      return false;
    }
    /**
     * Handle a declaration like:
     * export enum E ...
     *
     * With this imports transform, this becomes:
     * const E = [[enum]]; exports.E = E;
     *
     * otherwise, it becomes:
     * export const E = [[enum]];
     */
    processNamedExportEnum() {
      if (this.isImportsTransformEnabled) {
        this.tokens.removeInitialToken();
        const enumName = this.tokens.identifierNameAtRelativeIndex(1);
        this.processEnum();
        this.tokens.appendCode(` exports.${enumName} = ${enumName};`);
      } else {
        this.tokens.copyToken();
        this.processEnum();
      }
    }
    /**
     * Handle a declaration like:
     * export default enum E
     *
     * With the imports transform, this becomes:
     * const E = [[enum]]; exports.default = E;
     *
     * otherwise, it becomes:
     * const E = [[enum]]; export default E;
     */
    processDefaultExportEnum() {
      this.tokens.removeInitialToken();
      this.tokens.removeToken();
      const enumName = this.tokens.identifierNameAtRelativeIndex(1);
      this.processEnum();
      if (this.isImportsTransformEnabled) {
        this.tokens.appendCode(` exports.default = ${enumName};`);
      } else {
        this.tokens.appendCode(` export default ${enumName};`);
      }
    }
    /**
     * Transpile flow enums to invoke the "flow-enums-runtime" library.
     *
     * Currently, the transpiled code always uses `require("flow-enums-runtime")`,
     * but if future flexibility is needed, we could expose a config option for
     * this string (similar to configurable JSX). Even when targeting ESM, the
     * default behavior of babel-plugin-transform-flow-enums is to use require
     * rather than injecting an import.
     *
     * Flow enums are quite a bit simpler than TS enums and have some convenient
     * constraints:
     * - Element initializers must be either always present or always absent. That
     *   means that we can use fixed lookahead on the first element (if any) and
     *   assume that all elements are like that.
     * - The right-hand side of an element initializer must be a literal value,
     *   not a complex expression and not referencing other elements. That means
     *   we can simply copy a single token.
     *
     * Enums can be broken up into three basic cases:
     *
     * Mirrored enums:
     * enum E {A, B}
     *   ->
     * const E = require("flow-enums-runtime").Mirrored(["A", "B"]);
     *
     * Initializer enums:
     * enum E {A = 1, B = 2}
     *   ->
     * const E = require("flow-enums-runtime")({A: 1, B: 2});
     *
     * Symbol enums:
     * enum E of symbol {A, B}
     *   ->
     * const E = require("flow-enums-runtime")({A: Symbol("A"), B: Symbol("B")});
     *
     * We can statically detect which of the three cases this is by looking at the
     * "of" declaration (if any) and seeing if the first element has an initializer.
     * Since the other transform details are so similar between the three cases, we
     * use a single implementation and vary the transform within processEnumElement
     * based on case.
     */
    processEnum() {
      this.tokens.replaceToken("const");
      this.tokens.copyExpectedToken(TokenType.name);
      let isSymbolEnum = false;
      if (this.tokens.matchesContextual(ContextualKeyword._of)) {
        this.tokens.removeToken();
        isSymbolEnum = this.tokens.matchesContextual(ContextualKeyword._symbol);
        this.tokens.removeToken();
      }
      const hasInitializers = this.tokens.matches3(TokenType.braceL, TokenType.name, TokenType.eq);
      this.tokens.appendCode(' = require("flow-enums-runtime")');
      const isMirrored = !isSymbolEnum && !hasInitializers;
      this.tokens.replaceTokenTrimmingLeftWhitespace(isMirrored ? ".Mirrored([" : "({");
      while (!this.tokens.matches1(TokenType.braceR)) {
        if (this.tokens.matches1(TokenType.ellipsis)) {
          this.tokens.removeToken();
          break;
        }
        this.processEnumElement(isSymbolEnum, hasInitializers);
        if (this.tokens.matches1(TokenType.comma)) {
          this.tokens.copyToken();
        }
      }
      this.tokens.replaceToken(isMirrored ? "]);" : "});");
    }
    /**
     * Process an individual enum element, producing either an array element or an
     * object element based on what type of enum this is.
     */
    processEnumElement(isSymbolEnum, hasInitializers) {
      if (isSymbolEnum) {
        const elementName = this.tokens.identifierName();
        this.tokens.copyToken();
        this.tokens.appendCode(`: Symbol("${elementName}")`);
      } else if (hasInitializers) {
        this.tokens.copyToken();
        this.tokens.replaceTokenTrimmingLeftWhitespace(":");
        this.tokens.copyToken();
      } else {
        this.tokens.replaceToken(`"${this.tokens.identifierName()}"`);
      }
    }
  };

  // node_modules/sucrase/dist/esm/transformers/JestHoistTransformer.js
  function _optionalChain(ops) {
    let lastAccessLHS = void 0;
    let value = ops[0];
    let i = 1;
    while (i < ops.length) {
      const op = ops[i];
      const fn = ops[i + 1];
      i += 2;
      if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
        return void 0;
      }
      if (op === "access" || op === "optionalAccess") {
        lastAccessLHS = value;
        value = fn(value);
      } else if (op === "call" || op === "optionalCall") {
        value = fn((...args) => value.call(lastAccessLHS, ...args));
        lastAccessLHS = void 0;
      }
    }
    return value;
  }
  var JEST_GLOBAL_NAME = "jest";
  var HOISTED_METHODS = ["mock", "unmock", "enableAutomock", "disableAutomock"];
  var JestHoistTransformer = class _JestHoistTransformer extends Transformer {
    __init() {
      this.hoistedFunctionNames = [];
    }
    constructor(rootTransformer, tokens, nameManager, importProcessor) {
      super();
      this.rootTransformer = rootTransformer;
      this.tokens = tokens;
      this.nameManager = nameManager;
      this.importProcessor = importProcessor;
      _JestHoistTransformer.prototype.__init.call(this);
      ;
    }
    process() {
      if (this.tokens.currentToken().scopeDepth === 0 && this.tokens.matches4(TokenType.name, TokenType.dot, TokenType.name, TokenType.parenL) && this.tokens.identifierName() === JEST_GLOBAL_NAME) {
        if (_optionalChain([this, "access", (_) => _.importProcessor, "optionalAccess", (_2) => _2.getGlobalNames, "call", (_3) => _3(), "optionalAccess", (_4) => _4.has, "call", (_5) => _5(JEST_GLOBAL_NAME)])) {
          return false;
        }
        return this.extractHoistedCalls();
      }
      return false;
    }
    getHoistedCode() {
      if (this.hoistedFunctionNames.length > 0) {
        return this.hoistedFunctionNames.map((name) => `${name}();`).join("");
      }
      return "";
    }
    /**
     * Extracts any methods calls on the jest-object that should be hoisted.
     *
     * According to the jest docs, https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options,
     * mock, unmock, enableAutomock, disableAutomock, are the methods that should be hoisted.
     *
     * We do not apply the same checks of the arguments as babel-plugin-jest-hoist does.
     */
    extractHoistedCalls() {
      this.tokens.removeToken();
      let followsNonHoistedJestCall = false;
      while (this.tokens.matches3(TokenType.dot, TokenType.name, TokenType.parenL)) {
        const methodName = this.tokens.identifierNameAtIndex(this.tokens.currentIndex() + 1);
        const shouldHoist = HOISTED_METHODS.includes(methodName);
        if (shouldHoist) {
          const hoistedFunctionName = this.nameManager.claimFreeName("__jestHoist");
          this.hoistedFunctionNames.push(hoistedFunctionName);
          this.tokens.replaceToken(`function ${hoistedFunctionName}(){${JEST_GLOBAL_NAME}.`);
          this.tokens.copyToken();
          this.tokens.copyToken();
          this.rootTransformer.processBalancedCode();
          this.tokens.copyExpectedToken(TokenType.parenR);
          this.tokens.appendCode(";}");
          followsNonHoistedJestCall = false;
        } else {
          if (followsNonHoistedJestCall) {
            this.tokens.copyToken();
          } else {
            this.tokens.replaceToken(`${JEST_GLOBAL_NAME}.`);
          }
          this.tokens.copyToken();
          this.tokens.copyToken();
          this.rootTransformer.processBalancedCode();
          this.tokens.copyExpectedToken(TokenType.parenR);
          followsNonHoistedJestCall = true;
        }
      }
      return true;
    }
  };

  // node_modules/sucrase/dist/esm/transformers/NumericSeparatorTransformer.js
  var NumericSeparatorTransformer = class extends Transformer {
    constructor(tokens) {
      super();
      this.tokens = tokens;
      ;
    }
    process() {
      if (this.tokens.matches1(TokenType.num)) {
        const code = this.tokens.currentTokenCode();
        if (code.includes("_")) {
          this.tokens.replaceToken(code.replace(/_/g, ""));
          return true;
        }
      }
      return false;
    }
  };

  // node_modules/sucrase/dist/esm/transformers/OptionalCatchBindingTransformer.js
  var OptionalCatchBindingTransformer = class extends Transformer {
    constructor(tokens, nameManager) {
      super();
      this.tokens = tokens;
      this.nameManager = nameManager;
      ;
    }
    process() {
      if (this.tokens.matches2(TokenType._catch, TokenType.braceL)) {
        this.tokens.copyToken();
        this.tokens.appendCode(` (${this.nameManager.claimFreeName("e")})`);
        return true;
      }
      return false;
    }
  };

  // node_modules/sucrase/dist/esm/transformers/OptionalChainingNullishTransformer.js
  var OptionalChainingNullishTransformer = class extends Transformer {
    constructor(tokens, nameManager) {
      super();
      this.tokens = tokens;
      this.nameManager = nameManager;
      ;
    }
    process() {
      if (this.tokens.matches1(TokenType.nullishCoalescing)) {
        const token2 = this.tokens.currentToken();
        if (this.tokens.tokens[token2.nullishStartIndex].isAsyncOperation) {
          this.tokens.replaceTokenTrimmingLeftWhitespace(", async () => (");
        } else {
          this.tokens.replaceTokenTrimmingLeftWhitespace(", () => (");
        }
        return true;
      }
      if (this.tokens.matches1(TokenType._delete)) {
        const nextToken2 = this.tokens.tokenAtRelativeIndex(1);
        if (nextToken2.isOptionalChainStart) {
          this.tokens.removeInitialToken();
          return true;
        }
      }
      const token = this.tokens.currentToken();
      const chainStart = token.subscriptStartIndex;
      if (chainStart != null && this.tokens.tokens[chainStart].isOptionalChainStart && // Super subscripts can't be optional (since super is never null/undefined), and the syntax
      // relies on the subscript being intact, so leave this token alone.
      this.tokens.tokenAtRelativeIndex(-1).type !== TokenType._super) {
        const param = this.nameManager.claimFreeName("_");
        let arrowStartSnippet;
        if (chainStart > 0 && this.tokens.matches1AtIndex(chainStart - 1, TokenType._delete) && this.isLastSubscriptInChain()) {
          arrowStartSnippet = `${param} => delete ${param}`;
        } else {
          arrowStartSnippet = `${param} => ${param}`;
        }
        if (this.tokens.tokens[chainStart].isAsyncOperation) {
          arrowStartSnippet = `async ${arrowStartSnippet}`;
        }
        if (this.tokens.matches2(TokenType.questionDot, TokenType.parenL) || this.tokens.matches2(TokenType.questionDot, TokenType.lessThan)) {
          if (this.justSkippedSuper()) {
            this.tokens.appendCode(".bind(this)");
          }
          this.tokens.replaceTokenTrimmingLeftWhitespace(`, 'optionalCall', ${arrowStartSnippet}`);
        } else if (this.tokens.matches2(TokenType.questionDot, TokenType.bracketL)) {
          this.tokens.replaceTokenTrimmingLeftWhitespace(`, 'optionalAccess', ${arrowStartSnippet}`);
        } else if (this.tokens.matches1(TokenType.questionDot)) {
          this.tokens.replaceTokenTrimmingLeftWhitespace(`, 'optionalAccess', ${arrowStartSnippet}.`);
        } else if (this.tokens.matches1(TokenType.dot)) {
          this.tokens.replaceTokenTrimmingLeftWhitespace(`, 'access', ${arrowStartSnippet}.`);
        } else if (this.tokens.matches1(TokenType.bracketL)) {
          this.tokens.replaceTokenTrimmingLeftWhitespace(`, 'access', ${arrowStartSnippet}[`);
        } else if (this.tokens.matches1(TokenType.parenL)) {
          if (this.justSkippedSuper()) {
            this.tokens.appendCode(".bind(this)");
          }
          this.tokens.replaceTokenTrimmingLeftWhitespace(`, 'call', ${arrowStartSnippet}(`);
        } else {
          throw new Error("Unexpected subscript operator in optional chain.");
        }
        return true;
      }
      return false;
    }
    /**
     * Determine if the current token is the last of its chain, so that we know whether it's eligible
     * to have a delete op inserted.
     *
     * We can do this by walking forward until we determine one way or another. Each
     * isOptionalChainStart token must be paired with exactly one isOptionalChainEnd token after it in
     * a nesting way, so we can track depth and walk to the end of the chain (the point where the
     * depth goes negative) and see if any other subscript token is after us in the chain.
     */
    isLastSubscriptInChain() {
      let depth = 0;
      for (let i = this.tokens.currentIndex() + 1; ; i++) {
        if (i >= this.tokens.tokens.length) {
          throw new Error("Reached the end of the code while finding the end of the access chain.");
        }
        if (this.tokens.tokens[i].isOptionalChainStart) {
          depth++;
        } else if (this.tokens.tokens[i].isOptionalChainEnd) {
          depth--;
        }
        if (depth < 0) {
          return true;
        }
        if (depth === 0 && this.tokens.tokens[i].subscriptStartIndex != null) {
          return false;
        }
      }
    }
    /**
     * Determine if we are the open-paren in an expression like super.a()?.b.
     *
     * We can do this by walking backward to find the previous subscript. If that subscript was
     * preceded by a super, then we must be the subscript after it, so if this is a call expression,
     * we'll need to attach the right context.
     */
    justSkippedSuper() {
      let depth = 0;
      let index = this.tokens.currentIndex() - 1;
      while (true) {
        if (index < 0) {
          throw new Error(
            "Reached the start of the code while finding the start of the access chain."
          );
        }
        if (this.tokens.tokens[index].isOptionalChainStart) {
          depth--;
        } else if (this.tokens.tokens[index].isOptionalChainEnd) {
          depth++;
        }
        if (depth < 0) {
          return false;
        }
        if (depth === 0 && this.tokens.tokens[index].subscriptStartIndex != null) {
          return this.tokens.tokens[index - 1].type === TokenType._super;
        }
        index--;
      }
    }
  };

  // node_modules/sucrase/dist/esm/transformers/ReactDisplayNameTransformer.js
  var ReactDisplayNameTransformer = class extends Transformer {
    constructor(rootTransformer, tokens, importProcessor, options) {
      super();
      this.rootTransformer = rootTransformer;
      this.tokens = tokens;
      this.importProcessor = importProcessor;
      this.options = options;
      ;
    }
    process() {
      const startIndex = this.tokens.currentIndex();
      if (this.tokens.identifierName() === "createReactClass") {
        const newName = this.importProcessor && this.importProcessor.getIdentifierReplacement("createReactClass");
        if (newName) {
          this.tokens.replaceToken(`(0, ${newName})`);
        } else {
          this.tokens.copyToken();
        }
        this.tryProcessCreateClassCall(startIndex);
        return true;
      }
      if (this.tokens.matches3(TokenType.name, TokenType.dot, TokenType.name) && this.tokens.identifierName() === "React" && this.tokens.identifierNameAtIndex(this.tokens.currentIndex() + 2) === "createClass") {
        const newName = this.importProcessor ? this.importProcessor.getIdentifierReplacement("React") || "React" : "React";
        if (newName) {
          this.tokens.replaceToken(newName);
          this.tokens.copyToken();
          this.tokens.copyToken();
        } else {
          this.tokens.copyToken();
          this.tokens.copyToken();
          this.tokens.copyToken();
        }
        this.tryProcessCreateClassCall(startIndex);
        return true;
      }
      return false;
    }
    /**
     * This is called with the token position at the open-paren.
     */
    tryProcessCreateClassCall(startIndex) {
      const displayName = this.findDisplayName(startIndex);
      if (!displayName) {
        return;
      }
      if (this.classNeedsDisplayName()) {
        this.tokens.copyExpectedToken(TokenType.parenL);
        this.tokens.copyExpectedToken(TokenType.braceL);
        this.tokens.appendCode(`displayName: '${displayName}',`);
        this.rootTransformer.processBalancedCode();
        this.tokens.copyExpectedToken(TokenType.braceR);
        this.tokens.copyExpectedToken(TokenType.parenR);
      }
    }
    findDisplayName(startIndex) {
      if (startIndex < 2) {
        return null;
      }
      if (this.tokens.matches2AtIndex(startIndex - 2, TokenType.name, TokenType.eq)) {
        return this.tokens.identifierNameAtIndex(startIndex - 2);
      }
      if (startIndex >= 2 && this.tokens.tokens[startIndex - 2].identifierRole === IdentifierRole.ObjectKey) {
        return this.tokens.identifierNameAtIndex(startIndex - 2);
      }
      if (this.tokens.matches2AtIndex(startIndex - 2, TokenType._export, TokenType._default)) {
        return this.getDisplayNameFromFilename();
      }
      return null;
    }
    getDisplayNameFromFilename() {
      const filePath = this.options.filePath || "unknown";
      const pathSegments = filePath.split("/");
      const filename = pathSegments[pathSegments.length - 1];
      const dotIndex = filename.lastIndexOf(".");
      const baseFilename = dotIndex === -1 ? filename : filename.slice(0, dotIndex);
      if (baseFilename === "index" && pathSegments[pathSegments.length - 2]) {
        return pathSegments[pathSegments.length - 2];
      } else {
        return baseFilename;
      }
    }
    /**
     * We only want to add a display name when this is a function call containing
     * one argument, which is an object literal without `displayName` as an
     * existing key.
     */
    classNeedsDisplayName() {
      let index = this.tokens.currentIndex();
      if (!this.tokens.matches2(TokenType.parenL, TokenType.braceL)) {
        return false;
      }
      const objectStartIndex = index + 1;
      const objectContextId = this.tokens.tokens[objectStartIndex].contextId;
      if (objectContextId == null) {
        throw new Error("Expected non-null context ID on object open-brace.");
      }
      for (; index < this.tokens.tokens.length; index++) {
        const token = this.tokens.tokens[index];
        if (token.type === TokenType.braceR && token.contextId === objectContextId) {
          index++;
          break;
        }
        if (this.tokens.identifierNameAtIndex(index) === "displayName" && this.tokens.tokens[index].identifierRole === IdentifierRole.ObjectKey && token.contextId === objectContextId) {
          return false;
        }
      }
      if (index === this.tokens.tokens.length) {
        throw new Error("Unexpected end of input when processing React class.");
      }
      return this.tokens.matches1AtIndex(index, TokenType.parenR) || this.tokens.matches2AtIndex(index, TokenType.comma, TokenType.parenR);
    }
  };

  // node_modules/sucrase/dist/esm/transformers/ReactHotLoaderTransformer.js
  var ReactHotLoaderTransformer = class _ReactHotLoaderTransformer extends Transformer {
    __init() {
      this.extractedDefaultExportName = null;
    }
    constructor(tokens, filePath) {
      super();
      this.tokens = tokens;
      this.filePath = filePath;
      _ReactHotLoaderTransformer.prototype.__init.call(this);
      ;
    }
    setExtractedDefaultExportName(extractedDefaultExportName) {
      this.extractedDefaultExportName = extractedDefaultExportName;
    }
    getPrefixCode() {
      return `
      (function () {
        var enterModule = require('react-hot-loader').enterModule;
        enterModule && enterModule(module);
      })();`.replace(/\s+/g, " ").trim();
    }
    getSuffixCode() {
      const topLevelNames = /* @__PURE__ */ new Set();
      for (const token of this.tokens.tokens) {
        if (!token.isType && isTopLevelDeclaration(token) && token.identifierRole !== IdentifierRole.ImportDeclaration) {
          topLevelNames.add(this.tokens.identifierNameForToken(token));
        }
      }
      const namesToRegister = Array.from(topLevelNames).map((name) => ({
        variableName: name,
        uniqueLocalName: name
      }));
      if (this.extractedDefaultExportName) {
        namesToRegister.push({
          variableName: this.extractedDefaultExportName,
          uniqueLocalName: "default"
        });
      }
      return `
;(function () {
  var reactHotLoader = require('react-hot-loader').default;
  var leaveModule = require('react-hot-loader').leaveModule;
  if (!reactHotLoader) {
    return;
  }
${namesToRegister.map(
        ({ variableName, uniqueLocalName }) => `  reactHotLoader.register(${variableName}, "${uniqueLocalName}", ${JSON.stringify(
          this.filePath || ""
        )});`
      ).join("\n")}
  leaveModule(module);
})();`;
    }
    process() {
      return false;
    }
  };

  // node_modules/sucrase/dist/esm/util/isIdentifier.js
  var RESERVED_WORDS = /* @__PURE__ */ new Set([
    // Reserved keywords as of ECMAScript 2015
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
    // Future reserved keywords
    "enum",
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "await",
    // Literals that cannot be used as identifiers
    "false",
    "null",
    "true"
  ]);
  function isIdentifier(name) {
    if (name.length === 0) {
      return false;
    }
    if (!IS_IDENTIFIER_START[name.charCodeAt(0)]) {
      return false;
    }
    for (let i = 1; i < name.length; i++) {
      if (!IS_IDENTIFIER_CHAR[name.charCodeAt(i)]) {
        return false;
      }
    }
    return !RESERVED_WORDS.has(name);
  }

  // node_modules/sucrase/dist/esm/transformers/TypeScriptTransformer.js
  var TypeScriptTransformer = class extends Transformer {
    constructor(rootTransformer, tokens, isImportsTransformEnabled) {
      super();
      this.rootTransformer = rootTransformer;
      this.tokens = tokens;
      this.isImportsTransformEnabled = isImportsTransformEnabled;
      ;
    }
    process() {
      if (this.rootTransformer.processPossibleArrowParamEnd() || this.rootTransformer.processPossibleAsyncArrowWithTypeParams() || this.rootTransformer.processPossibleTypeRange()) {
        return true;
      }
      if (this.tokens.matches1(TokenType._public) || this.tokens.matches1(TokenType._protected) || this.tokens.matches1(TokenType._private) || this.tokens.matches1(TokenType._abstract) || this.tokens.matches1(TokenType._readonly) || this.tokens.matches1(TokenType._override) || this.tokens.matches1(TokenType.nonNullAssertion)) {
        this.tokens.removeInitialToken();
        return true;
      }
      if (this.tokens.matches1(TokenType._enum) || this.tokens.matches2(TokenType._const, TokenType._enum)) {
        this.processEnum();
        return true;
      }
      if (this.tokens.matches2(TokenType._export, TokenType._enum) || this.tokens.matches3(TokenType._export, TokenType._const, TokenType._enum)) {
        this.processEnum(true);
        return true;
      }
      return false;
    }
    processEnum(isExport = false) {
      this.tokens.removeInitialToken();
      while (this.tokens.matches1(TokenType._const) || this.tokens.matches1(TokenType._enum)) {
        this.tokens.removeToken();
      }
      const enumName = this.tokens.identifierName();
      this.tokens.removeToken();
      if (isExport && !this.isImportsTransformEnabled) {
        this.tokens.appendCode("export ");
      }
      this.tokens.appendCode(`var ${enumName}; (function (${enumName})`);
      this.tokens.copyExpectedToken(TokenType.braceL);
      this.processEnumBody(enumName);
      this.tokens.copyExpectedToken(TokenType.braceR);
      if (isExport && this.isImportsTransformEnabled) {
        this.tokens.appendCode(`)(${enumName} || (exports.${enumName} = ${enumName} = {}));`);
      } else {
        this.tokens.appendCode(`)(${enumName} || (${enumName} = {}));`);
      }
    }
    /**
     * Transform an enum into equivalent JS. This has complexity in a few places:
     * - TS allows string enums, numeric enums, and a mix of the two styles within an enum.
     * - Enum keys are allowed to be referenced in later enum values.
     * - Enum keys are allowed to be strings.
     * - When enum values are omitted, they should follow an auto-increment behavior.
     */
    processEnumBody(enumName) {
      let previousValueCode = null;
      while (true) {
        if (this.tokens.matches1(TokenType.braceR)) {
          break;
        }
        const { nameStringCode, variableName } = this.extractEnumKeyInfo(this.tokens.currentToken());
        this.tokens.removeInitialToken();
        if (this.tokens.matches3(TokenType.eq, TokenType.string, TokenType.comma) || this.tokens.matches3(TokenType.eq, TokenType.string, TokenType.braceR)) {
          this.processStringLiteralEnumMember(enumName, nameStringCode, variableName);
        } else if (this.tokens.matches1(TokenType.eq)) {
          this.processExplicitValueEnumMember(enumName, nameStringCode, variableName);
        } else {
          this.processImplicitValueEnumMember(
            enumName,
            nameStringCode,
            variableName,
            previousValueCode
          );
        }
        if (this.tokens.matches1(TokenType.comma)) {
          this.tokens.removeToken();
        }
        if (variableName != null) {
          previousValueCode = variableName;
        } else {
          previousValueCode = `${enumName}[${nameStringCode}]`;
        }
      }
    }
    /**
     * Detect name information about this enum key, which will be used to determine which code to emit
     * and whether we should declare a variable as part of this declaration.
     *
     * Some cases to keep in mind:
     * - Enum keys can be implicitly referenced later, e.g. `X = 1, Y = X`. In Sucrase, we implement
     *   this by declaring a variable `X` so that later expressions can use it.
     * - In addition to the usual identifier key syntax, enum keys are allowed to be string literals,
     *   e.g. `"hello world" = 3,`. Template literal syntax is NOT allowed.
     * - Even if the enum key is defined as a string literal, it may still be referenced by identifier
     *   later, e.g. `"X" = 1, Y = X`. That means that we need to detect whether or not a string
     *   literal is identifier-like and emit a variable if so, even if the declaration did not use an
     *   identifier.
     * - Reserved keywords like `break` are valid enum keys, but are not valid to be referenced later
     *   and would be a syntax error if we emitted a variable, so we need to skip the variable
     *   declaration in those cases.
     *
     * The variableName return value captures these nuances: if non-null, we can and must emit a
     * variable declaration, and if null, we can't and shouldn't.
     */
    extractEnumKeyInfo(nameToken) {
      if (nameToken.type === TokenType.name) {
        const name = this.tokens.identifierNameForToken(nameToken);
        return {
          nameStringCode: `"${name}"`,
          variableName: isIdentifier(name) ? name : null
        };
      } else if (nameToken.type === TokenType.string) {
        const name = this.tokens.stringValueForToken(nameToken);
        return {
          nameStringCode: this.tokens.code.slice(nameToken.start, nameToken.end),
          variableName: isIdentifier(name) ? name : null
        };
      } else {
        throw new Error("Expected name or string at beginning of enum element.");
      }
    }
    /**
     * Handle an enum member where the RHS is just a string literal (not omitted, not a number, and
     * not a complex expression). This is the typical form for TS string enums, and in this case, we
     * do *not* create a reverse mapping.
     *
     * This is called after deleting the key token, when the token processor is at the equals sign.
     *
     * Example 1:
     * someKey = "some value"
     * ->
     * const someKey = "some value"; MyEnum["someKey"] = someKey;
     *
     * Example 2:
     * "some key" = "some value"
     * ->
     * MyEnum["some key"] = "some value";
     */
    processStringLiteralEnumMember(enumName, nameStringCode, variableName) {
      if (variableName != null) {
        this.tokens.appendCode(`const ${variableName}`);
        this.tokens.copyToken();
        this.tokens.copyToken();
        this.tokens.appendCode(`; ${enumName}[${nameStringCode}] = ${variableName};`);
      } else {
        this.tokens.appendCode(`${enumName}[${nameStringCode}]`);
        this.tokens.copyToken();
        this.tokens.copyToken();
        this.tokens.appendCode(";");
      }
    }
    /**
     * Handle an enum member initialized with an expression on the right-hand side (other than a
     * string literal). In these cases, we should transform the expression and emit code that sets up
     * a reverse mapping.
     *
     * The TypeScript implementation of this operation distinguishes between expressions that can be
     * "constant folded" at compile time (i.e. consist of number literals and simple math operations
     * on those numbers) and ones that are dynamic. For constant expressions, it emits the resolved
     * numeric value, and auto-incrementing is only allowed in that case. Evaluating expressions at
     * compile time would add significant complexity to Sucrase, so Sucrase instead leaves the
     * expression as-is, and will later emit something like `MyEnum["previousKey"] + 1` to implement
     * auto-incrementing.
     *
     * This is called after deleting the key token, when the token processor is at the equals sign.
     *
     * Example 1:
     * someKey = 1 + 1
     * ->
     * const someKey = 1 + 1; MyEnum[MyEnum["someKey"] = someKey] = "someKey";
     *
     * Example 2:
     * "some key" = 1 + 1
     * ->
     * MyEnum[MyEnum["some key"] = 1 + 1] = "some key";
     */
    processExplicitValueEnumMember(enumName, nameStringCode, variableName) {
      const rhsEndIndex = this.tokens.currentToken().rhsEndIndex;
      if (rhsEndIndex == null) {
        throw new Error("Expected rhsEndIndex on enum assign.");
      }
      if (variableName != null) {
        this.tokens.appendCode(`const ${variableName}`);
        this.tokens.copyToken();
        while (this.tokens.currentIndex() < rhsEndIndex) {
          this.rootTransformer.processToken();
        }
        this.tokens.appendCode(
          `; ${enumName}[${enumName}[${nameStringCode}] = ${variableName}] = ${nameStringCode};`
        );
      } else {
        this.tokens.appendCode(`${enumName}[${enumName}[${nameStringCode}]`);
        this.tokens.copyToken();
        while (this.tokens.currentIndex() < rhsEndIndex) {
          this.rootTransformer.processToken();
        }
        this.tokens.appendCode(`] = ${nameStringCode};`);
      }
    }
    /**
     * Handle an enum member with no right-hand side expression. In this case, the value is the
     * previous value plus 1, or 0 if there was no previous value. We should also always emit a
     * reverse mapping.
     *
     * Example 1:
     * someKey2
     * ->
     * const someKey2 = someKey1 + 1; MyEnum[MyEnum["someKey2"] = someKey2] = "someKey2";
     *
     * Example 2:
     * "some key 2"
     * ->
     * MyEnum[MyEnum["some key 2"] = someKey1 + 1] = "some key 2";
     */
    processImplicitValueEnumMember(enumName, nameStringCode, variableName, previousValueCode) {
      let valueCode = previousValueCode != null ? `${previousValueCode} + 1` : "0";
      if (variableName != null) {
        this.tokens.appendCode(`const ${variableName} = ${valueCode}; `);
        valueCode = variableName;
      }
      this.tokens.appendCode(
        `${enumName}[${enumName}[${nameStringCode}] = ${valueCode}] = ${nameStringCode};`
      );
    }
  };

  // node_modules/sucrase/dist/esm/transformers/RootTransformer.js
  var RootTransformer = class _RootTransformer {
    __init() {
      this.transformers = [];
    }
    __init2() {
      this.generatedVariables = [];
    }
    constructor(sucraseContext, transforms, enableLegacyBabel5ModuleInterop, options) {
      ;
      _RootTransformer.prototype.__init.call(this);
      _RootTransformer.prototype.__init2.call(this);
      this.nameManager = sucraseContext.nameManager;
      this.helperManager = sucraseContext.helperManager;
      const { tokenProcessor, importProcessor } = sucraseContext;
      this.tokens = tokenProcessor;
      this.isImportsTransformEnabled = transforms.includes("imports");
      this.isReactHotLoaderTransformEnabled = transforms.includes("react-hot-loader");
      this.disableESTransforms = Boolean(options.disableESTransforms);
      if (!options.disableESTransforms) {
        this.transformers.push(
          new OptionalChainingNullishTransformer(tokenProcessor, this.nameManager)
        );
        this.transformers.push(new NumericSeparatorTransformer(tokenProcessor));
        this.transformers.push(new OptionalCatchBindingTransformer(tokenProcessor, this.nameManager));
      }
      if (transforms.includes("jsx")) {
        if (options.jsxRuntime !== "preserve") {
          this.transformers.push(
            new JSXTransformer(this, tokenProcessor, importProcessor, this.nameManager, options)
          );
        }
        this.transformers.push(
          new ReactDisplayNameTransformer(this, tokenProcessor, importProcessor, options)
        );
      }
      let reactHotLoaderTransformer = null;
      if (transforms.includes("react-hot-loader")) {
        if (!options.filePath) {
          throw new Error("filePath is required when using the react-hot-loader transform.");
        }
        reactHotLoaderTransformer = new ReactHotLoaderTransformer(tokenProcessor, options.filePath);
        this.transformers.push(reactHotLoaderTransformer);
      }
      if (transforms.includes("imports")) {
        if (importProcessor === null) {
          throw new Error("Expected non-null importProcessor with imports transform enabled.");
        }
        this.transformers.push(
          new CJSImportTransformer(
            this,
            tokenProcessor,
            importProcessor,
            this.nameManager,
            this.helperManager,
            reactHotLoaderTransformer,
            enableLegacyBabel5ModuleInterop,
            Boolean(options.enableLegacyTypeScriptModuleInterop),
            transforms.includes("typescript"),
            transforms.includes("flow"),
            Boolean(options.preserveDynamicImport),
            Boolean(options.keepUnusedImports)
          )
        );
      } else {
        this.transformers.push(
          new ESMImportTransformer(
            tokenProcessor,
            this.nameManager,
            this.helperManager,
            reactHotLoaderTransformer,
            transforms.includes("typescript"),
            transforms.includes("flow"),
            Boolean(options.keepUnusedImports),
            options
          )
        );
      }
      if (transforms.includes("flow")) {
        this.transformers.push(
          new FlowTransformer(this, tokenProcessor, transforms.includes("imports"))
        );
      }
      if (transforms.includes("typescript")) {
        this.transformers.push(
          new TypeScriptTransformer(this, tokenProcessor, transforms.includes("imports"))
        );
      }
      if (transforms.includes("jest")) {
        this.transformers.push(
          new JestHoistTransformer(this, tokenProcessor, this.nameManager, importProcessor)
        );
      }
    }
    transform() {
      this.tokens.reset();
      this.processBalancedCode();
      const shouldAddUseStrict = this.isImportsTransformEnabled;
      let prefix = shouldAddUseStrict ? '"use strict";' : "";
      for (const transformer of this.transformers) {
        prefix += transformer.getPrefixCode();
      }
      prefix += this.helperManager.emitHelpers();
      prefix += this.generatedVariables.map((v) => ` var ${v};`).join("");
      for (const transformer of this.transformers) {
        prefix += transformer.getHoistedCode();
      }
      let suffix = "";
      for (const transformer of this.transformers) {
        suffix += transformer.getSuffixCode();
      }
      const result = this.tokens.finish();
      let { code } = result;
      if (code.startsWith("#!")) {
        let newlineIndex = code.indexOf("\n");
        if (newlineIndex === -1) {
          newlineIndex = code.length;
          code += "\n";
        }
        return {
          code: code.slice(0, newlineIndex + 1) + prefix + code.slice(newlineIndex + 1) + suffix,
          // The hashbang line has no tokens, so shifting the tokens to account
          // for prefix can happen normally.
          mappings: this.shiftMappings(result.mappings, prefix.length)
        };
      } else {
        return {
          code: prefix + code + suffix,
          mappings: this.shiftMappings(result.mappings, prefix.length)
        };
      }
    }
    processBalancedCode() {
      let braceDepth = 0;
      let parenDepth = 0;
      while (!this.tokens.isAtEnd()) {
        if (this.tokens.matches1(TokenType.braceL) || this.tokens.matches1(TokenType.dollarBraceL)) {
          braceDepth++;
        } else if (this.tokens.matches1(TokenType.braceR)) {
          if (braceDepth === 0) {
            return;
          }
          braceDepth--;
        }
        if (this.tokens.matches1(TokenType.parenL)) {
          parenDepth++;
        } else if (this.tokens.matches1(TokenType.parenR)) {
          if (parenDepth === 0) {
            return;
          }
          parenDepth--;
        }
        this.processToken();
      }
    }
    processToken() {
      if (this.tokens.matches1(TokenType._class)) {
        this.processClass();
        return;
      }
      for (const transformer of this.transformers) {
        const wasProcessed = transformer.process();
        if (wasProcessed) {
          return;
        }
      }
      this.tokens.copyToken();
    }
    /**
     * Skip past a class with a name and return that name.
     */
    processNamedClass() {
      if (!this.tokens.matches2(TokenType._class, TokenType.name)) {
        throw new Error("Expected identifier for exported class name.");
      }
      const name = this.tokens.identifierNameAtIndex(this.tokens.currentIndex() + 1);
      this.processClass();
      return name;
    }
    processClass() {
      const classInfo = getClassInfo(this, this.tokens, this.nameManager, this.disableESTransforms);
      const needsCommaExpression = (classInfo.headerInfo.isExpression || !classInfo.headerInfo.className) && classInfo.staticInitializerNames.length + classInfo.instanceInitializerNames.length > 0;
      let className = classInfo.headerInfo.className;
      if (needsCommaExpression) {
        className = this.nameManager.claimFreeName("_class");
        this.generatedVariables.push(className);
        this.tokens.appendCode(` (${className} =`);
      }
      const classToken = this.tokens.currentToken();
      const contextId = classToken.contextId;
      if (contextId == null) {
        throw new Error("Expected class to have a context ID.");
      }
      this.tokens.copyExpectedToken(TokenType._class);
      while (!this.tokens.matchesContextIdAndLabel(TokenType.braceL, contextId)) {
        this.processToken();
      }
      this.processClassBody(classInfo, className);
      const staticInitializerStatements = classInfo.staticInitializerNames.map(
        (name) => `${className}.${name}()`
      );
      if (needsCommaExpression) {
        this.tokens.appendCode(
          `, ${staticInitializerStatements.map((s) => `${s}, `).join("")}${className})`
        );
      } else if (classInfo.staticInitializerNames.length > 0) {
        this.tokens.appendCode(` ${staticInitializerStatements.map((s) => `${s};`).join(" ")}`);
      }
    }
    /**
     * We want to just handle class fields in all contexts, since TypeScript supports them. Later,
     * when some JS implementations support class fields, this should be made optional.
     */
    processClassBody(classInfo, className) {
      const {
        headerInfo,
        constructorInsertPos,
        constructorInitializerStatements,
        fields,
        instanceInitializerNames,
        rangesToRemove
      } = classInfo;
      let fieldIndex = 0;
      let rangeToRemoveIndex = 0;
      const classContextId = this.tokens.currentToken().contextId;
      if (classContextId == null) {
        throw new Error("Expected non-null context ID on class.");
      }
      this.tokens.copyExpectedToken(TokenType.braceL);
      if (this.isReactHotLoaderTransformEnabled) {
        this.tokens.appendCode(
          "__reactstandin__regenerateByEval(key, code) {this[key] = eval(code);}"
        );
      }
      const needsConstructorInit = constructorInitializerStatements.length + instanceInitializerNames.length > 0;
      if (constructorInsertPos === null && needsConstructorInit) {
        const constructorInitializersCode = this.makeConstructorInitCode(
          constructorInitializerStatements,
          instanceInitializerNames,
          className
        );
        if (headerInfo.hasSuperclass) {
          const argsName = this.nameManager.claimFreeName("args");
          this.tokens.appendCode(
            `constructor(...${argsName}) { super(...${argsName}); ${constructorInitializersCode}; }`
          );
        } else {
          this.tokens.appendCode(`constructor() { ${constructorInitializersCode}; }`);
        }
      }
      while (!this.tokens.matchesContextIdAndLabel(TokenType.braceR, classContextId)) {
        if (fieldIndex < fields.length && this.tokens.currentIndex() === fields[fieldIndex].start) {
          let needsCloseBrace = false;
          if (this.tokens.matches1(TokenType.bracketL)) {
            this.tokens.copyTokenWithPrefix(`${fields[fieldIndex].initializerName}() {this`);
          } else if (this.tokens.matches1(TokenType.string) || this.tokens.matches1(TokenType.num)) {
            this.tokens.copyTokenWithPrefix(`${fields[fieldIndex].initializerName}() {this[`);
            needsCloseBrace = true;
          } else {
            this.tokens.copyTokenWithPrefix(`${fields[fieldIndex].initializerName}() {this.`);
          }
          while (this.tokens.currentIndex() < fields[fieldIndex].end) {
            if (needsCloseBrace && this.tokens.currentIndex() === fields[fieldIndex].equalsIndex) {
              this.tokens.appendCode("]");
            }
            this.processToken();
          }
          this.tokens.appendCode("}");
          fieldIndex++;
        } else if (rangeToRemoveIndex < rangesToRemove.length && this.tokens.currentIndex() >= rangesToRemove[rangeToRemoveIndex].start) {
          if (this.tokens.currentIndex() < rangesToRemove[rangeToRemoveIndex].end) {
            this.tokens.removeInitialToken();
          }
          while (this.tokens.currentIndex() < rangesToRemove[rangeToRemoveIndex].end) {
            this.tokens.removeToken();
          }
          rangeToRemoveIndex++;
        } else if (this.tokens.currentIndex() === constructorInsertPos) {
          this.tokens.copyToken();
          if (needsConstructorInit) {
            this.tokens.appendCode(
              `;${this.makeConstructorInitCode(
                constructorInitializerStatements,
                instanceInitializerNames,
                className
              )};`
            );
          }
          this.processToken();
        } else {
          this.processToken();
        }
      }
      this.tokens.copyExpectedToken(TokenType.braceR);
    }
    makeConstructorInitCode(constructorInitializerStatements, instanceInitializerNames, className) {
      return [
        ...constructorInitializerStatements,
        ...instanceInitializerNames.map((name) => `${className}.prototype.${name}.call(this)`)
      ].join(";");
    }
    /**
     * Normally it's ok to simply remove type tokens, but we need to be more careful when dealing with
     * arrow function return types since they can confuse the parser. In that case, we want to move
     * the close-paren to the same line as the arrow.
     *
     * See https://github.com/alangpierce/sucrase/issues/391 for more details.
     */
    processPossibleArrowParamEnd() {
      if (this.tokens.matches2(TokenType.parenR, TokenType.colon) && this.tokens.tokenAtRelativeIndex(1).isType) {
        let nextNonTypeIndex = this.tokens.currentIndex() + 1;
        while (this.tokens.tokens[nextNonTypeIndex].isType) {
          nextNonTypeIndex++;
        }
        if (this.tokens.matches1AtIndex(nextNonTypeIndex, TokenType.arrow)) {
          this.tokens.removeInitialToken();
          while (this.tokens.currentIndex() < nextNonTypeIndex) {
            this.tokens.removeToken();
          }
          this.tokens.replaceTokenTrimmingLeftWhitespace(") =>");
          return true;
        }
      }
      return false;
    }
    /**
     * An async arrow function might be of the form:
     *
     * async <
     *   T
     * >() => {}
     *
     * in which case, removing the type parameters will cause a syntax error. Detect this case and
     * move the open-paren earlier.
     */
    processPossibleAsyncArrowWithTypeParams() {
      if (!this.tokens.matchesContextual(ContextualKeyword._async) && !this.tokens.matches1(TokenType._async)) {
        return false;
      }
      const nextToken2 = this.tokens.tokenAtRelativeIndex(1);
      if (nextToken2.type !== TokenType.lessThan || !nextToken2.isType) {
        return false;
      }
      let nextNonTypeIndex = this.tokens.currentIndex() + 1;
      while (this.tokens.tokens[nextNonTypeIndex].isType) {
        nextNonTypeIndex++;
      }
      if (this.tokens.matches1AtIndex(nextNonTypeIndex, TokenType.parenL)) {
        this.tokens.replaceToken("async (");
        this.tokens.removeInitialToken();
        while (this.tokens.currentIndex() < nextNonTypeIndex) {
          this.tokens.removeToken();
        }
        this.tokens.removeToken();
        this.processBalancedCode();
        this.processToken();
        return true;
      }
      return false;
    }
    processPossibleTypeRange() {
      if (this.tokens.currentToken().isType) {
        this.tokens.removeInitialToken();
        while (this.tokens.currentToken().isType) {
          this.tokens.removeToken();
        }
        return true;
      }
      return false;
    }
    shiftMappings(mappings, prefixLength) {
      for (let i = 0; i < mappings.length; i++) {
        const mapping = mappings[i];
        if (mapping !== void 0) {
          mappings[i] = mapping + prefixLength;
        }
      }
      return mappings;
    }
  };

  // node_modules/sucrase/dist/esm/util/formatTokens.js
  var import_lines_and_columns = __toESM(require_build());

  // node_modules/sucrase/dist/esm/util/getTSImportedNames.js
  function getTSImportedNames(tokens) {
    const importedNames = /* @__PURE__ */ new Set();
    for (let i = 0; i < tokens.tokens.length; i++) {
      if (tokens.matches1AtIndex(i, TokenType._import) && !tokens.matches3AtIndex(i, TokenType._import, TokenType.name, TokenType.eq)) {
        collectNamesForImport(tokens, i, importedNames);
      }
    }
    return importedNames;
  }
  function collectNamesForImport(tokens, index, importedNames) {
    index++;
    if (tokens.matches1AtIndex(index, TokenType.parenL)) {
      return;
    }
    if (tokens.matches1AtIndex(index, TokenType.name)) {
      importedNames.add(tokens.identifierNameAtIndex(index));
      index++;
      if (tokens.matches1AtIndex(index, TokenType.comma)) {
        index++;
      }
    }
    if (tokens.matches1AtIndex(index, TokenType.star)) {
      index += 2;
      importedNames.add(tokens.identifierNameAtIndex(index));
      index++;
    }
    if (tokens.matches1AtIndex(index, TokenType.braceL)) {
      index++;
      collectNamesForNamedImport(tokens, index, importedNames);
    }
  }
  function collectNamesForNamedImport(tokens, index, importedNames) {
    while (true) {
      if (tokens.matches1AtIndex(index, TokenType.braceR)) {
        return;
      }
      const specifierInfo = getImportExportSpecifierInfo(tokens, index);
      index = specifierInfo.endIndex;
      if (!specifierInfo.isType) {
        importedNames.add(specifierInfo.rightName);
      }
      if (tokens.matches2AtIndex(index, TokenType.comma, TokenType.braceR)) {
        return;
      } else if (tokens.matches1AtIndex(index, TokenType.braceR)) {
        return;
      } else if (tokens.matches1AtIndex(index, TokenType.comma)) {
        index++;
      } else {
        throw new Error(`Unexpected token: ${JSON.stringify(tokens.tokens[index])}`);
      }
    }
  }

  // node_modules/sucrase/dist/esm/index.js
  function transform(code, options) {
    validateOptions(options);
    try {
      const sucraseContext = getSucraseContext(code, options);
      const transformer = new RootTransformer(
        sucraseContext,
        options.transforms,
        Boolean(options.enableLegacyBabel5ModuleInterop),
        options
      );
      const transformerResult = transformer.transform();
      let result = { code: transformerResult.code };
      if (options.sourceMapOptions) {
        if (!options.filePath) {
          throw new Error("filePath must be specified when generating a source map.");
        }
        result = {
          ...result,
          sourceMap: computeSourceMap(
            transformerResult,
            options.filePath,
            options.sourceMapOptions,
            code,
            sucraseContext.tokenProcessor.tokens
          )
        };
      }
      return result;
    } catch (e) {
      if (options.filePath) {
        e.message = `Error transforming ${options.filePath}: ${e.message}`;
      }
      throw e;
    }
  }
  function getSucraseContext(code, options) {
    const isJSXEnabled2 = options.transforms.includes("jsx");
    const isTypeScriptEnabled2 = options.transforms.includes("typescript");
    const isFlowEnabled2 = options.transforms.includes("flow");
    const disableESTransforms = options.disableESTransforms === true;
    const file = parse(code, isJSXEnabled2, isTypeScriptEnabled2, isFlowEnabled2);
    const tokens = file.tokens;
    const scopes = file.scopes;
    const nameManager = new NameManager(code, tokens);
    const helperManager = new HelperManager(nameManager);
    const tokenProcessor = new TokenProcessor(
      code,
      tokens,
      isFlowEnabled2,
      disableESTransforms,
      helperManager
    );
    const enableLegacyTypeScriptModuleInterop = Boolean(options.enableLegacyTypeScriptModuleInterop);
    let importProcessor = null;
    if (options.transforms.includes("imports")) {
      importProcessor = new CJSImportProcessor(
        nameManager,
        tokenProcessor,
        enableLegacyTypeScriptModuleInterop,
        options,
        options.transforms.includes("typescript"),
        Boolean(options.keepUnusedImports),
        helperManager
      );
      importProcessor.preprocessTokens();
      identifyShadowedGlobals(tokenProcessor, scopes, importProcessor.getGlobalNames());
      if (options.transforms.includes("typescript") && !options.keepUnusedImports) {
        importProcessor.pruneTypeOnlyImports();
      }
    } else if (options.transforms.includes("typescript") && !options.keepUnusedImports) {
      identifyShadowedGlobals(tokenProcessor, scopes, getTSImportedNames(tokenProcessor));
    }
    return { tokenProcessor, scopes, nameManager, importProcessor, helperManager };
  }

  // sucrase-wrapper.js
  globalThis.sucraseTransform = function(code) {
    return transform(code, {
      transforms: ["jsx"],
      jsxRuntime: "classic",
      production: true
    }).code;
  };
})();
