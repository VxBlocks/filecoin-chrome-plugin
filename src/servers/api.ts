/**
 * 封装接口调用方法
 *
 * @format
 */
import { BALANC, TYPE, INFO, MSIGINFO, LISTBALANC,TRANSITION } from "./global";
import { request } from "./request";

export async function getBalance(options: {}): Promise<Api.Balance> {
  const res = await request(BALANC, "POST", options);
  return res.data;
}

// 查询钱包类型
export async function getType(options: {}): Promise<Api.Type> {
  const res = await request(TYPE, "POST", options);
  return res.data;
}

// 批量查询钱包余额
// {
//   "walletAddrList":["f01245980","f01245981"]
// }
export async function getWalletList(options: {}): Promise<Api.WalletAddrList> {
  const res = await request(LISTBALANC, "POST", options);
  return res.data;
}

// 构建交易消息
export async function getTransition(options:{}){
  const res = await request(TRANSITION,'POST',options);
  return res.data;
}
