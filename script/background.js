import { checkCurrentTabUrl } from "./background/checkCurrentTabUrl.js";

// chrome.tabs.onUpdated.addListener(checkCurrentTabUrl);

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // if (request.option === "isSupportedURL") {
  //   const ret = await checkCurrentTabUrl();
  //   console.log("resonpose", ret);
  //   sendResponse(ret);
  //   return true;
  // }
  switch (request.option) {
    case "isSupportedURL":
      const ret = await checkCurrentTabUrl();
      console.log("resonpose", ret);
      sendResponse(ret);
      return true;
    case "test":
      sendResponse("test");
      return true;
    default:
      return false;
  }
});
