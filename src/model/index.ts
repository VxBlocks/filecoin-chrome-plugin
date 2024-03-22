import { AddressSecp256k1,AddressBls } from "@zondax/izari-filecoin/dist/types/address";
import { SignatureType } from "@zondax/izari-filecoin/dist/types/artifacts";

export interface ExtendedKey {
  address: string;
  private_base64: string;
  private_hexstring: string;
  private_raw: Uint8Array;
  public_base64: string;
  public_hexstring: string;
  public_raw: Uint8Array;
  phrase?: string;
}
export type AccountData = AccountSecp256k1 | AccountBls
export interface AccountSecp256k1 {
  type: SignatureType.SECP256K1
  publicKey: Buffer
  privateKey: Buffer
  path?: string
  address: AddressSecp256k1
  phrase?: string;
}
export interface AccountBls {
  type: SignatureType.BLS
  publicKey: Buffer
  privateKey: Buffer
  path?: string
  address: AddressBls
  phrase?: string;
}


export interface account {
  type: SignatureType.SECP256K1
  publicKey: string
  privateKey: string
  path?: string
  address: string
  phrase?: string
}

export interface cookiePwd {
  url?: string;
  name: string;
  value?: string;
  expirationDate?: number;
}

export interface Type {
  result: boolean;
  walletType: number;
}