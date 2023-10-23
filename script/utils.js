import { APIURL } from "./constant.js";

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export const checkCurrentTabUrl = async () => {
  const tab = await getCurrentTab();
  if (tab) {
    return tab.url.startsWith("https://sports.chosun.com");
  }
  return false;
};

export const checkIsAd = async (url) => {
  const requestUrl = APIURL + "?url=" + url;
  const response = await fetch(requestUrl);
  // TODO : 에러처리
  const result = await response.json();
  return result.class === "ad" ? true : false;
};
