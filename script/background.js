import { checkCurrentTabUrl, checkIsAd } from "./utils.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.option) {
    case "isSupportedURL":
      checkCurrentTabUrl().then((isSupportedURL) => {
        sendResponse(isSupportedURL);
      });
      return true;
    case "isAd":
      const { url } = request;
      checkIsAd(url)
        .then((isAd) => {
          sendResponse(isAd);
        })
        .catch((err) => {
          console.log(err);
          sendResponse("error");
        });
      return true;
    default:
      return false;
  }
});
