/** @format */

import { useEffect, useState } from "react";
import { cookiePwd } from "../../../../../aleo钱包/plugins/src/model";
import { Cookies } from "../../../../../aleo钱包/plugins/src/api/Cookies";

/**
 * get current account
 */
export const useCookies = (Prop: cookiePwd) => {
  const { name, url = "https://*/*", value = "asdfasdf", expirationDate = 180 } = Prop;
  const [iscookie, setIsCookie] = useState(false);
  useEffect(() => {
    chrome.cookies.get({ url, name }, function (cookies) {
      if (cookies) {
        const params = {
          url: "https://*/*",
          name: cookies.name,
          value: cookies.value,
          expirationDate: 180,
        };
        setIsCookie(true);
        // Cookies.setCookies(params);
      } else {
        setIsCookie(false);
      }
    });
  }, [iscookie]);
  return iscookie;
};
