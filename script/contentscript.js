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

const makeAdMarkerTag = () => {
  const tag = document.createElement("div");
  tag.innerText = "광고";
  tag.style.display = "flex";
  tag.style.justifyContent = "center";
  tag.style.alignItems = "center";
  tag.style.position = "absolute";
  tag.style.top = "0";
  tag.style.left = "0";
  tag.style.fontSize = "20px";
  tag.style.fontWeight = "bold";
  tag.style.color = "#494959";
  tag.style.backgroundColor = "#FFACB7";
  tag.style.width = "50px";
  tag.style.height = "30px";
  tag.style.padding = "5px";
  tag.style.zIndex = "9999";
  return tag;
};

const markComponent = async (component, url, option) => {
  const isAd = await chrome.runtime.sendMessage({
    option: "isAd",
    url: url,
  });
  if (isAd === true) {
    const tag = makeAdMarkerTag();
    component.parentElement.appendChild(tag);
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
