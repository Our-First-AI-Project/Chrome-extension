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
  const response = await chrome.runtime.sendMessage({
    option: "test",
  });
  console.log(response);
  removeAds();
};

// window.onload = async function () {
// chrome.runtime
//   .sendMessage({
//     option: "isSupportedURL",
//   })
//   .then((response) => {
//     console.log(response);
//     if (response) {
//       removeAds();
//     }
//   });
// const response = await chrome.runtime.sendMessage({
//   option: "isSupportedURL",
// });
// console.log("content : ", response);
// };

// window.onload = function () {
//   removeAds();
// };
