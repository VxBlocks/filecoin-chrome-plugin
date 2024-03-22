/** @format */

import { useEffect, useState } from "react";
import { account } from "../../model/index";

/**
 * get current account
 */
export const useAccount = () => {
  const [account, setAccount] = useState<account[]>([]);

  useEffect(() => {
    //@ts-ignore
    chrome.storage.local.get(["account"], function (res) {
      console.log(res);
      if (res.account) {
        setAccount(res.account);
      } else {
        setAccount([]);
      }
    });
  }, []);
  return account;
};
