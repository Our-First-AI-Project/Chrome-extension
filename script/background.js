import { checkCurrentTabUrl } from "./background/checkCurrentTabUrl.js";

chrome.tabs.onUpdated.addListener(checkCurrentTabUrl);
