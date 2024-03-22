/* tslint:disable */
/* eslint-disable */
/**
* @param {number} mnemonictype
* @returns {string}
*/
export function generateMnemonic(mnemonictype: number): string;
/**
* @param {string} mnemonic
* @param {number} lang
* @returns {boolean}
*/
export function isMnemonicValid(mnemonic: string, lang: number): boolean;
/**
* @param {string} phrase
* @param {number} lang
* @param {string} path
* @returns {ExtendedKey}
*/
export function keyFromMnemonic(phrase: string, lang: number, path: string): ExtendedKey;
/**
* @param {string} mnemonic
* @param {string} path
* @param {string} password
* @param {string | undefined} language_code
* @returns {ExtendedKey}
*/
export function keyDerive(mnemonic: string, path: string, password: string, language_code?: string): ExtendedKey;
/**
* @param {any} seed
* @param {string} path
* @returns {ExtendedKey}
*/
export function keyDeriveFromSeed(seed: any, path: string): ExtendedKey;
/**
* @param {any} private_key_js
* @param {boolean} testnet
* @returns {ExtendedKey}
*/
export function keyRecover(private_key_js: any, testnet: boolean): ExtendedKey;
/**
* @param {any} private_key_js
* @param {boolean} testnet
* @returns {ExtendedKey}
*/
export function keyRecoverBLS(private_key_js: any, testnet: boolean): ExtendedKey;
/**
* @param {any} message
* @returns {string}
*/
export function transactionSerialize(message: any): string;
/**
* @param {any} unsigned_message
* @returns {Uint8Array}
*/
export function transactionSerializeRaw(unsigned_message: any): Uint8Array;
/**
* @param {any} cbor_js
* @param {boolean} testnet
* @returns {any}
*/
export function transactionParse(cbor_js: any, testnet: boolean): any;
/**
* @param {any} unsigned_tx_js
* @param {any} private_key_js
* @returns {any}
*/
export function transactionSign(unsigned_tx_js: any, private_key_js: any): any;
/**
* @param {any} unsigned_tx_js
* @param {any} private_key_js
* @returns {string}
*/
export function transactionSignLotus(unsigned_tx_js: any, private_key_js: any): string;
/**
* @param {any} unsigned_tx_js
* @param {any} private_key_js
* @returns {any}
*/
export function transactionSignRaw(unsigned_tx_js: any, private_key_js: any): any;
/**
* @param {any} signature_js
* @param {any} message_js
* @returns {boolean}
*/
export function verifySignature(signature_js: any, message_js: any): boolean;
/**
* @param {string} voucher
* @param {any} private_key_js
* @returns {any}
*/
export function signVoucher(voucher: string, private_key_js: any): any;
/**
* @param {string} payment_channel_address
* @param {string} time_lock_min
* @param {string} time_lock_max
* @param {string} amount
* @param {string} lane
* @param {number} nonce
* @param {string} min_settle_height
* @returns {any}
*/
export function createVoucher(payment_channel_address: string, time_lock_min: string, time_lock_max: string, amount: string, lane: string, nonce: number, min_settle_height: string): any;
/**
* @param {any} params_value
* @returns {Uint8Array}
*/
export function serializeParams(params_value: any): Uint8Array;
/**
* @param {string} params_base64
* @param {string} actor_type
* @param {number} method
* @returns {any}
*/
export function deserializeParams(params_base64: string, actor_type: string, method: number): any;
/**
* @param {string} params_base64
* @param {string} code_cid
* @returns {any}
*/
export function deserializeConstructorParams(params_base64: string, code_cid: string): any;
/**
* @param {string} voucher_base64
* @param {string} address_signer
* @returns {boolean}
*/
export function verifyVoucherSignature(voucher_base64: string, address_signer: string): boolean;
/**
* @param {any} voucher_api
* @returns {string}
*/
export function serializeVoucher(voucher_api: any): string;
/**
* @param {string} voucher_base64_string
* @returns {any}
*/
export function deserializeVoucher(voucher_base64_string: string): any;
/**
* @param {any} proposal_data_api
* @returns {string}
*/
export function computeProposalHash(proposal_data_api: any): string;
/**
* @param {any} message
* @returns {string}
*/
export function getCid(message: any): string;
/**
*/
export enum Language {
  English = 0,
  ChineseSimplified = 1,
  ChineseTraditional = 2,
  French = 3,
  Italian = 4,
  Japanese = 5,
  Korean = 6,
  Spanish = 7,
}
/**
*/
export class ExtendedKey {
  free(): void;
/**
*/
  readonly address: string;
/**
*/
  readonly private_base64: string;
/**
*/
  readonly private_hexstring: string;
/**
*/
  readonly private_raw: Uint8Array;
/**
*/
  readonly public_base64: string;
/**
*/
  readonly public_hexstring: string;
/**
*/
  readonly public_raw: Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_extendedkey_free: (a: number) => void;
  readonly extendedkey_public_raw: (a: number, b: number) => void;
  readonly extendedkey_private_raw: (a: number, b: number) => void;
  readonly extendedkey_public_hexstring: (a: number, b: number) => void;
  readonly extendedkey_private_hexstring: (a: number, b: number) => void;
  readonly extendedkey_public_base64: (a: number, b: number) => void;
  readonly extendedkey_private_base64: (a: number, b: number) => void;
  readonly extendedkey_address: (a: number, b: number) => void;
  readonly generateMnemonic: (a: number, b: number) => void;
  readonly isMnemonicValid: (a: number, b: number, c: number) => number;
  readonly keyFromMnemonic: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly keyDerive: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly keyDeriveFromSeed: (a: number, b: number, c: number, d: number) => void;
  readonly keyRecover: (a: number, b: number, c: number) => void;
  readonly keyRecoverBLS: (a: number, b: number, c: number) => void;
  readonly transactionSerialize: (a: number, b: number) => void;
  readonly transactionSerializeRaw: (a: number, b: number) => void;
  readonly transactionParse: (a: number, b: number, c: number) => void;
  readonly transactionSign: (a: number, b: number, c: number) => void;
  readonly transactionSignLotus: (a: number, b: number, c: number) => void;
  readonly transactionSignRaw: (a: number, b: number, c: number) => void;
  readonly verifySignature: (a: number, b: number, c: number) => void;
  readonly signVoucher: (a: number, b: number, c: number, d: number) => void;
  readonly createVoucher: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => void;
  readonly serializeParams: (a: number, b: number) => void;
  readonly deserializeParams: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly deserializeConstructorParams: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyVoucherSignature: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly serializeVoucher: (a: number, b: number) => void;
  readonly deserializeVoucher: (a: number, b: number, c: number) => void;
  readonly computeProposalHash: (a: number, b: number) => void;
  readonly getCid: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
