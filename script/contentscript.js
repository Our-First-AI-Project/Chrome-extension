const removeAds = () => {
  let imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    img.remove();
  });
};

window.onload = function () {
  removeAds();
};
