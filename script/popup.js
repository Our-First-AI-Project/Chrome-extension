import { checkCurrentTabUrl } from "./utils.js";

const supportMsgComponent = document.querySelector(
  ".section-support-text.support"
);
const notSupportMsgComponent = document.querySelector(
  ".section-support-text.not-support"
);

const onOffToggle = document.querySelector(".toggle-container");

checkCurrentTabUrl().then((isSupportedURL) => {
  if (isSupportedURL) {
    supportMsgComponent.style.display = "flex";
    notSupportMsgComponent.style.display = "none";
  } else {
    supportMsgComponent.style.display = "none";
    notSupportMsgComponent.style.display = "flex";
  }
});

onOffToggle.addEventListener("click", () => {
  const background = document.querySelector(".toggle-backgroud");
  const text = document.querySelector(".toggle-text");
  if (background.classList.contains("toggle-off")) {
    background.classList.remove("toggle-off");
    text.innerText = "On";
    chrome.storage.local.set({ isOn: true });
  } else {
    background.classList.add("toggle-off");
    text.innerText = "Off";
    chrome.storage.local.set({ isOn: false });
  }
});
