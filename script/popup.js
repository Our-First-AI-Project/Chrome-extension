const supportMsgComponent = document.querySelector(
  ".section-support-text.support"
);
const notSupportMsgComponent = document.querySelector(
  ".section-support-text.not-support"
);

const onOffToggle = document.querySelector(".toggle-container");

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

onOffToggle.addEventListener("click", () => {
  const background = document.querySelector(".toggle-backgroud");
  const text = document.querySelector(".toggle-text");
  if (background.classList.contains("toggle-off")) {
    background.classList.remove("toggle-off");
    text.innerText = "On";
    // 스크립트 실행 On
  } else {
    background.classList.add("toggle-off");
    text.innerText = "Off";
    // 스크립트 실행 Off
  }
});
