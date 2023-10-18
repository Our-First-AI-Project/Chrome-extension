const supportMsgComponent = document.querySelector(
  ".section-support-text.support"
);
const notSupportMsgComponent = document.querySelector(
  ".section-support-text.not-support"
);

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

getCurrentTab().then((tab) => {
  if (tab) {
    const url = tab.url;
    if (url.startsWith("https://sports.chosun.com")) {
      supportMsgComponent.style.display = "block";
      notSupportMsgComponent.style.display = "none";
    } else {
      supportMsgComponent.style.display = "none";
      notSupportMsgComponent.style.display = "block";
    }
  }
});
