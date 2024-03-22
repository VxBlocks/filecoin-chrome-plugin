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
