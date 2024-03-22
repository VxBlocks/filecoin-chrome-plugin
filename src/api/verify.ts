// import fileCoinSigner from "./fil-signer";
import { MainnetRPC, NetworkPrefix, SignatureType, Wallet } from '@zondax/izari-filecoin';
import { path } from '../common/js/var';
import { AccountData } from "../model";
export const verifyMnemonic = async (phrase: string) => {
  if (phrase) {
    console.log(phrase + '助记词');
    try {
      // 通过助记词创建钱包
      const res = Wallet.deriveAccount(phrase, SignatureType.SECP256K1, "44'/461'/1'/0/0", "", NetworkPrefix.Testnet);
      console.log("accountData", res);
      return {
        address: res.address.toString(),
        privateKey: Buffer.from(res.privateKey).toString('base64'),
        publicKey: Buffer.from(res.publicKey).toString('base64'),
        path: res.path,
        type: res.type,
        phrase,
      };
    } catch (e) {
      return {} as AccountData;
    }
  }
  return {} as AccountData;
}

export const verifyPrivate = async (privates: string) => {
  if (privates) {
    try {
      // const res = (await fileCoinSigner()).keyRecover(privates, true) as ExtendedKey;
      const res = Wallet.recoverAccount(NetworkPrefix.Testnet, SignatureType.SECP256K1, privates);
      // const { address, private_base64, public_base64 } = res;
      return {
        address: res.address.toString(),
        privateKey: Buffer.from(res.privateKey).toString('base64'),
        publicKey: Buffer.from(res.publicKey).toString('base64'),
        path: res.path,
        type: res.type,
      };
    } catch (e) {
      return {} as AccountData;
    }
  }
  return {} as AccountData;

}