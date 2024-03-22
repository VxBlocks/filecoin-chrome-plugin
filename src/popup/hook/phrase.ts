/** @format */

import { useEffect, useState } from "react";

/**
 * get current Phrase
 */
export const usePhrase = () => {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    //@ts-ignore
    chrome.storage.local.get(["phrase"], function (res) {
      console.log(res);
      if (res.phrase) {
        setPhrase(res.phrase);
      } else {
        setPhrase("");
      }
    });
  }, []);
  return phrase;
};
