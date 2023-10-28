const removeComponent = async (component, url, option) => {
  const isAd = await chrome.runtime.sendMessage({
    option: "isAd",
    url: url,
  });
  if (isAd === true) {
    if (option === "img") component.remove();
    else {
      // 스포츠 조선 광고 삽입 특성을 고려하여 이미지의 부모 element 제거
      component.parentElement.remove();
    }
  }
  return;
};

const markComponent = async (component, url, option) => {
  const isAd = await chrome.runtime.sendMessage({
    option: "isAd",
    url: url,
  });
  if (isAd === true) {
    component.style.border = "5px solid #F266AB";
    component.style.boxSizing = "border-box";
  } else {
    component.style.border = "5px solid #2CD3E1";
    component.style.boxSizing = "border-box";
  }
  return;
};

const mainWorker = (workType, img, src, tagType) => {
  if (workType === "mark") {
    markComponent(img, src);
  } else {
    // workType === "remove" or undefined
    removeComponent(img, src, tagType);
  }
};

const workStart = (workType) => {
  // img 태그 제거
  let imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    mainWorker(workType, img, img.src, "img");
  });
  // div 태그 제거
  let divs = document.querySelectorAll("div");
  divs.forEach((div) => {
    const divSrc = div.style.backgroundImage.split('"')[1];
    if (divSrc) {
      mainWorker(workType, div, divSrc, "div");
    }
  });
};

window.onload = async function () {
  const isSupportedURL = await chrome.runtime.sendMessage({
    option: "isSupportedURL",
  });
  const isOnData = await chrome.storage.local.get("isOn");
  const optionData = await chrome.storage.local.get("option");
  const isEmptyData = Object.keys(isOnData).length === 0;
  // TODO :popup에서 토글을 클릭하지 않으면 isOn이 {}로 저장되는 문제 해결
  if (isSupportedURL === true && (isEmptyData || isOnData.isOn === true)) {
    workStart(optionData.option);
  }
};
