import { getCurrentTab } from "../utils.js";

export const checkCurrentTabUrl = async () => {
  const tab = await getCurrentTab();
  if (tab) {
    return tab.url.startsWith("https://sports.chosun.com");
  }
  return false;
};
