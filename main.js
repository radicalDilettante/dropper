//DOM elements for Layout
const container = document.getElementById("container");
const searchForm = document.getElementById("searchForm");

const urlInput = document.getElementById("urlInput");
const cameraButton = document.getElementById("cameraButton");

const imageFile = document.getElementById("imageFile");
const imageFileClose = document.getElementById("imageFileClose");

const imageUrlHeader = document.getElementById("imageUrlHeader");
const imageFileHeader = document.getElementById("imageFileHeader");
const imageUrlLoader = document.getElementById("imageUrlLoader");
const imageUrlLoaderForm = document.getElementById("imageUrlLoaderForm");
const imageUrlInput = document.getElementById("imageUrlInput");

const imageFileLoader = document.getElementById("imageFileLoader");
const imageFileInput = document.getElementById("imageFileInput");

const result = document.getElementById("result");
const resultClose = document.getElementById("resultClose");

//DOM elements for image
const spinner = document.getElementById("spinner");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const circle = document.getElementById("circle");
const color = document.getElementById("color");
const currentColor = document.getElementById("currentColor");
const hex = document.getElementById("hex");
const rgb = document.getElementById("rgb");
const hexCopy = document.getElementById("hexCopy");
const rgbCopy = document.getElementById("rgbCopy");

// Alert
function alertMessage(txt, isError) {
  const alertElement = document.createElement("div");
  alertElement.innerHTML = txt;
  alertElement.classList.add("alert");
  if (isError) {
    alertElement.style.background = "#fe3a3a";
  }
  document.body.appendChild(alertElement);
  setTimeout(() => {
    alertElement.remove();
  }, 5000);
}

// Load image to canvas
function drawImage(src) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  spinner.style.display = "none";
  img.setAttribute("src", src);

  img.onerror = () => {
    alertMessage(
      "An error has occurred! Please check your url or try again later.",
      true
    );
    img.setAttribute("src", "img/error.png");
  };
  img.addEventListener("load", () => {
    const canvasWidth = result.offsetWidth - 40;
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

// Search Form
async function fetchImage(apiUrl) {
  const response = await fetch(apiUrl);
  let imgURL;
  if (response.status >= 400) {
    imgURL = "img/error.png";
    alertMessage(
      "An error has occurred! Please check your url or try again later.",
      true
    );
  } else {
    const myBlob = await response.blob();
    imgURL = URL.createObjectURL(myBlob);
  }
  drawImage(imgURL);
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let url;
  if (!urlInput.value) {
    url = urlInput.placeholder;
  } else {
    url = urlInput.value;
  }
  container.style.display = "none";
  result.style.display = "flex";
  fetchImage(`https://apiwayne.herokuapp.com/screenshot?url=${url}`);
});
cameraButton.addEventListener("click", (e) => {
  e.preventDefault();
  imageFile.style.display = "flex";
});
imageFileClose.addEventListener("click", (e) => {
  e.preventDefault();
  imageFile.style.display = "none";
});

// Image File
imageUrlLoaderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!imageUrlInput.value) {
    alertMessage(
      "An error has occurred! Please check your url or try again later.",
      true
    );
  } else {
    container.style.display = "none";
    result.style.display = "flex";
    fetchImage(
      `https://apiwayne.herokuapp.com/image?url=${imageUrlInput.value}`
    );
  }
}); // Get image from URL

imageFileInput.addEventListener("change", function () {
  if (this.files[0].type.indexOf("image") < 0) {
    alertMessage("An error has occurred! Please check your file.", true);
  } else {
    container.style.display = "none";
    result.style.display = "flex";
    drawImage(window.URL.createObjectURL(this.files[0]));
  }
}); // Get image from local file

function toggleHeader(curr, prev) {
  curr.classList.remove("white-bg");
  curr.classList.add("grey-bg");
  prev.classList.remove("grey-bg");
  prev.classList.add("white-bg");
}
imageUrlHeader.addEventListener("click", (e) => {
  e.preventDefault();
  toggleHeader(imageUrlHeader, imageFileHeader);
  imageUrlLoader.style.display = "flex";
  imageFileLoader.style.display = "none";
});
imageFileHeader.addEventListener("click", (e) => {
  e.preventDefault();
  toggleHeader(imageFileHeader, imageUrlHeader);
  imageFileLoader.style.display = "flex";
  imageUrlLoader.style.display = "none";
});

// Result
resultClose.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.reload();
});

function getHexCode(imgData) {
  const rgbToHex = (r, g, b) => ((r << 16) | (g << 8) | b).toString(16);
  return (
    "#" + ("000000" + rgbToHex(imgData[0], imgData[1], imgData[2])).slice(-6)
  );
}
canvas.addEventListener("mousemove", (e) => {
  const imgData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const hexCode = getHexCode(imgData);

  if (
    !/Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    circle.style.backgroundColor = hexCode;
    circle.style.left = e.pageX + "px";
    circle.style.top = e.pageY + "px";
  }
  currentColor.style.backgroundColor = hexCode;
});
canvas.addEventListener("click", (e) => {
  const imgData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const hexCode = getHexCode(imgData);
  const rgbCode = `(${imgData[0]},${imgData[1]},${imgData[2]})`;
  color.style.backgroundColor = hexCode;
  hex.innerText = hexCode;
  rgb.innerText = rgbCode;
});
canvas.addEventListener("mouseout", () => {
  circle.style.backgroundColor = "transparent";
}); // Get data from image and  Manipulation

function clipboard(txt) {
  navigator.clipboard.writeText(txt);
  alertMessage(`Copied the text: ${txt}`);
}
hexCopy.addEventListener("click", () => {
  e.preventDefault();
  clipboard(hex.innerText);
});
rgbCopy.addEventListener("click", () => {
  e.preventDefault();
  clipboard(rgb.innerText);
}); // Copy color code
