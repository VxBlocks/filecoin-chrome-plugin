/** @format */

import { useEffect, useState } from "react";
import { AleoAccount } from "../../../../../aleo钱包/plugins/src/model";

/**
 * get current account
 */
export const usePassword = () => {
  const [password, setPassword] = useState("");
  useEffect(() => {
     //@ts-ignore
    chrome.storage.local.get(["pwd"], function (res) {
      if (res.pwd) {
        setPassword(res.pwd);
      } else {
        setPassword("");
      }
    });
  }, []);
  return password;
};
