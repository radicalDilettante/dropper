const searchForm = document.getElementById("searchForm");
const cameraButton = document.getElementById("cameraButton");
const urlInput = document.getElementById("urlInput");

const imageLoader = document.getElementById("imageLoader");
const imageLoaderClose = document.getElementById("imageLoaderClose");
const imageUrlHeader = document.getElementById("imageUrlHeader");
const imageFileHeader = document.getElementById("imageFileHeader");
const imageUrlLoader = document.getElementById("imageUrlLoader");
const imageFileLoader = document.getElementById("imageFileLoader");

const imageUrlLoaderForm = document.getElementById("imageUrlLoaderForm");
const imageUrlInput = document.getElementById("imageUrlInput");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let url;
  if (urlInput.value === "") {
    url = urlInput.placeholder;
  } else {
    url = urlInput.value;
  }
  // Load Image
});

cameraButton.addEventListener("click", (e) => {
  e.preventDefault();
  imageLoader.classList.remove("hide");
});

imageLoaderClose.addEventListener("click", (e) => {
  e.preventDefault();
  imageLoader.classList.add("hide");
});

imageUrlHeader.addEventListener("click", (e) => {
  e.preventDefault();
  imageUrlHeader.classList.remove("whiteBg");
  imageUrlHeader.classList.add("greyBg");
  imageFileHeader.classList.remove("greyBg");
  imageFileHeader.classList.add("whiteBg");
  imageUrlLoader.classList.remove("hide");
  imageFileLoader.classList.add("hide");
});
imageFileHeader.addEventListener("click", (e) => {
  e.preventDefault();
  imageFileHeader.classList.remove("whiteBg");
  imageFileHeader.classList.add("greyBg");
  imageUrlHeader.classList.remove("greyBg");
  imageUrlHeader.classList.add("whiteBg");
  imageFileLoader.classList.remove("hide");
  imageUrlLoader.classList.add("hide");
});

imageUrlLoaderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let url;
  if (imageUrlInput.value === "") {
    url = imageUrlInput.placeholder;
  } else {
    url = imageUrlInput.value;
  }
  // Load Image
});
