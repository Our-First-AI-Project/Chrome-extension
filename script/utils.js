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
