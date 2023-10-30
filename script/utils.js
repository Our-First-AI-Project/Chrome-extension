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
  try {
    const response = await fetch(APIURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    });
    const result = await response.json();
    return result.class === "ad" ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
