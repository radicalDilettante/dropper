const container = document.getElementById("container");

const searchForm = document.getElementById("searchForm");

const urlInput = document.getElementById("urlInput");
const cameraButton = document.getElementById("cameraButton");

const imageFile = document.getElementById("imageFile");

const imageUrlHeader = document.getElementById("imageUrlHeader");
const imageFileHeader = document.getElementById("imageFileHeader");
const imageUrlLoader = document.getElementById("imageUrlLoader");
const imageUrlLoaderForm = document.getElementById("imageUrlLoaderForm");
const imageUrlInput = document.getElementById("imageUrlInput");

const imageFileLoader = document.getElementById("imageFileLoader");

const imageFileClose = document.getElementById("imageFileClose");

const result = document.getElementById("result");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultClose = document.getElementById("resultClose");

// Image load
function drawImageFromRes(res) {
  const img = new Image();
  img.setAttribute("src", window.URL.createObjectURL(res));
  img.addEventListener("load", () => {
    const canvasWidth = result.offsetWidth - 30;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", (canvasWidth / img.width) * img.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  });
}
// Get Screenshot
async function getScreenshot(url) {
  await fetch(`https://apiwayne.herokuapp.com/screenshot?url=${url}`).then(
    (res) =>
      res.blob().then((res) => {
        drawImageFromRes(res);
      })
  );
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let url;
  if (urlInput.value === "") {
    url = urlInput.placeholder;
  } else {
    url = urlInput.value;
  }
  container.classList.add("hide");
  result.classList.remove("hide");
  getScreenshot(url);
});

cameraButton.addEventListener("click", (e) => {
  e.preventDefault();
  imageFile.classList.remove("hide");
});

imageFileClose.addEventListener("click", (e) => {
  e.preventDefault();
  imageFile.classList.add("hide");
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

resultClose.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.reload();
  // container.classList.remove("hide");
  // result.classList.add("hide");
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}
canvas.addEventListener(
  "mousemove",
  function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let coord = "x=" + x + ", y=" + y;
    let c = this.getContext("2d");
    let p = c.getImageData(x, y, 1, 1).data;

    if (p[0] == 0 && p[1] == 0 && p[2] == 0 && p[3] == 0) {
      coord += " (Transparent color detected, cannot be converted to HEX)";
    }

    let hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

    document.getElementById("status").innerHTML = coord;
    document.getElementById("color").style.backgroundColor = hex;
  },
  false
);
