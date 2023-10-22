const removeAds = () => {
  // img 태그 제거
  let imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    img.remove();
  });
  // div 태그 제거
  let divs = document.querySelectorAll("div");
  divs.forEach((div) => {
    const divSrc = div.style.backgroundImage.split('"')[1];
    if (divSrc) {
      // 스포츠 조선 광고 삽입 특성을 고려하여 이미지의 부모 element 제거
      div.parentElement.remove();
    }
  });
};

window.onload = async function () {
  const isSupportedURL = await chrome.runtime.sendMessage({
    option: "isSupportedURL",
  });
  const isOn = await chrome.storage.local.get("isOn");
  // TODO :popup에서 토글을 클릭하지 않으면 isOn이 {}로 저장되는 문제 해결
  if (isSupportedURL && (isOn === true || isOn === {})) {
    removeAds();
  }
};
