const searchForm = document.getElementById("searchForm");
const searchButton = document.getElementById("searchButton");
const cameraButton = document.getElementById("cameraButton");
const input = document.getElementById("url");
const locationWithUrl = (url) => {
  return `/search.html?url=${url}`;
};

cameraButton.addEventListener("click", openCameraFeature);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    location.href = locationWithUrl(input.placeholder);
  } else {
    location.href = locationWithUrl(input.value);
  }
});

function openCameraFeature(e) {
  e.preventDefault();
}
