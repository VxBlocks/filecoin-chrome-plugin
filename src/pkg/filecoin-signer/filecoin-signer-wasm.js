import * as wasm from "./filecoin-signer-wasm_bg.wasm";
import { __wbg_set_wasm } from "./filecoin-signer-wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./filecoin-signer-wasm_bg.js";
