// export function checkCurrentTabUrl(tabId, changeInfo, tabInfo) {
//   return tabInfo.url.startsWith("https://sports.chosun.com");
// }

import { getCurrentTab } from "../utils.js";

export const checkCurrentTabUrl = async () => {
  // getCurrentTab()
  //   .then((tab) => {
  //     if (tab) {
  //       const url = tab.url;
  //       console.log(url, url.startsWith("https://sports.chosun.com"));
  //       return url.startsWith("https://sports.chosun.com");
  //     }
  //     return false;
  //   })
  //   .finally(() => {
  //     return false;
  //   });
  const tab = await getCurrentTab();
  if (tab) {
    return tab.url.startsWith("https://sports.chosun.com");
  }
  return false;
};
