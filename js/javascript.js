var imageLoader = document.getElementById("imageLoader");
var canvas = document.getElementById("imageCanvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.crossOrigin = "anonymous";
var elid = 0;

var def = {
  "name": {
    "fieldID": "store",
    "style": "white",
    "baseline": "middle",
    "font": "50px 'Tangerine'",
    "text": "Name Text",
    "xcoord": 50,
    "ycoord": 50
  },
  "store": {
    "fieldID": "store",
    "style": "white",
    "baseline": "middle",
    "font": "50px 'Tangerine'",
    "text": "Store Text",
    "xcoord": 50,
    "ycoord": 100
  },
  "district": {
    "fieldID": "district",
    "style": "white",
    "baseline": "middle",
    "font": "50px 'Tangerine'",
    "text": "District Text",
    "xcoord": 100,
    "ycoord": 200
  }
};

window.addEventListener("load", DrawPlaceholder);

function DrawPlaceholder() {
  img.onload = function () {
    DrawOverlay();
  };
  img.src = "https://unsplash.it/400/400/?random";
}

function DrawOverlay() {
  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = "rgba(30, 144, 255, 0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  DrawText();
}

function DrawThis(_elid) {
  elid = _elid;
  ctx.fillStyle = def[elid].style;
  ctx.textBaseline = def[elid].baseline;
  ctx.font = def[elid].font;
  ctx.fillText(def[elid].text, def[elid].xcoord, def[elid].ycoord);
} 

function DrawText() {
  for (const key in def) {
    DrawThis(key);
  }
}

function DynamicText(_elid = 0) {
  elid = _elid;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  def[elid].text = document.getElementById(elid).value;
  ctx.fillText(def[elid].text, def[elid].xcoord, def[elid].ycoord);
  DrawOverlay();
}

function handleImage(e) {
  var reader = new FileReader();
  var img = "";
  var src = "";
  reader.onload = function (event) {
    img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
    src = event.target.result;
    canvas.classList.add("show");
    DrawOverlay();
  };
  reader.readAsDataURL(e.target.files[0]);
}

// ----> GENERATES IMG FROM CANVAS
function generateCanvas() {
  var canvasImg = canvas.toDataURL("image/png");
  document.getElementById("generateCanvas").innerHTML =
    "<img src='" + canvasImg + "'/>";
}

document.getElementById("download").onclick = function download() {
  generateCanvas();
};
