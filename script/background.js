import { checkCurrentTabUrl } from "./utils.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.option) {
    case "isSupportedURL":
      checkCurrentTabUrl().then((isSupportedURL) => {
        sendResponse(isSupportedURL);
      });
      return true;
    default:
      return false;
  }
});
