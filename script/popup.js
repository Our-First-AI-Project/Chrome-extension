import { checkCurrentTabUrl } from "./utils.js";

const supportMsgComponent = document.querySelector(
  ".section-support-text.support"
);
const notSupportMsgComponent = document.querySelector(
  ".section-support-text.not-support"
);

const onOffToggle = document.querySelector(".toggle-container");

const supportButton = document.querySelector(".section-support-button");

const optionBlockButton = document.querySelector(".option-button.block");
const optionShowButton = document.querySelector(".option-button.show");

checkCurrentTabUrl().then((isSupportedURL) => {
  if (isSupportedURL) {
    supportMsgComponent.style.display = "flex";
    notSupportMsgComponent.style.display = "none";
  } else {
    supportMsgComponent.style.display = "none";
    notSupportMsgComponent.style.display = "flex";
  }
});

chrome.storage.local.get(["option"], (result) => {
  if (result.option === "mark") {
    optionBlockButton.disabled = false;
    optionShowButton.disabled = true;
  } else {
    optionBlockButton.disabled = true;
    optionShowButton.disabled = false;
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

supportButton.addEventListener("click", () => {
  const supportMsgComponent = document.querySelector(".section-support-help");
  supportMsgComponent.classList.toggle("show");
});

optionBlockButton.addEventListener("click", () => {
  chrome.storage.local.set({ option: "remove" });
  optionBlockButton.disabled = true;
  optionShowButton.disabled = false;
});

optionShowButton.addEventListener("click", () => {
  chrome.storage.local.set({ option: "mark" });
  optionShowButton.disabled = true;
  optionBlockButton.disabled = false;
});
