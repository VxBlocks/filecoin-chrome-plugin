import { useEffect, useState } from "react";
import { account } from "../../model";
/**
 * 获取当前钱包账户
 */
export const useCurrentAccount = () => {
  const [currentAccount, setCurrentAccount] = useState({} as account);
  useEffect(() => {
    chrome.storage.local.get('current', function (res) {
      console.log(res)
      if (res.current) {
        setCurrentAccount(res.current);
      } else {
        setCurrentAccount({} as account);
      }
    })
  }, []);
  return currentAccount;
}