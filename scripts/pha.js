// Variables for the animated header.
var xOff = 0,
yOff = 0,
xInc = 1,
yInc = 1,
red = 0,
green = 0,
blue = 0,
width = 1100, // ширина
height = 80, // высота
yMin = 0,
iX = xInc,
iY = yInc,
slogan;
//var count = 0;

function move() {
  yOff += yInc;
  xOff += 2 * xInc;

  if (yOff >= height) {
    yInc = -1;
  }

  if (yOff <= yMin) {
    yInc = 1;
  }

  if (xOff >= width) {
    xInc = -1;
  }

  if (xOff <= 0) {
    xInc = 1;
  }

  slogan.style.top = yOff + "px";
  slogan.style.left = xOff + "px";

  /*if (count >= 50) {
    red = Math.round(Math.random() * 255);
    green = Math.round(Math.random() * 255);
    blue = Math.round(Math.random() * 100 + 155);
    slogan.color = MakeColor(red, green, blue);
    count = 0;
  }*/

  if (iX != xInc) {
    red = Math.round(Math.random() * 255);
    green = Math.round(Math.random() * 255);
    blue = Math.round(Math.random() * 255);
    slogan.color = MakeColor(red, green, blue);
    iX = xInc;
  }

  if (iY != yInc) {
    red = Math.round(Math.random() * 255);
    green = Math.round(Math.random() * 255);
    blue = Math.round(Math.random() * 255);
    slogan.color = MakeColor(red, green, blue);
    iY = yInc;
  }

  window.requestAnimationFrame(move);
  //count++;
}
//---------------------------------------------------------------
function MakeColor(red, green, blue) {
  red = red.toString(16);
  green = green.toString(16);
  blue = blue.toString(16);

  if (red.length == 1) {
    red = '0' + red;
  }

  if (green.length == 1) {
    green = '0' + green;
  }

  if (blue.length == 1) {
    blue = '0' + blue;
  }
  return "#" + red + green + blue;
}

//--------------------------------------------------------------------------------
function showBrowVer() {

  //вызываем функцию, параметр НЕ передаем,
  //поэтому в результате получим все знаки версии после запятой
  //alert("Браузер: "+data[0]); //выводим результат
  var data = browserDetectNav();

  if (data[0] == "Chrome") {
    yOff = -10;
    height = 70;
    yMin =- 10;
    width = 110;
  } else {

    if (data[0] == "Safari") {
      yOff =- 10;
      height = 70;
      yMin =- 10;
      width = 1110;
    } else {

      if (data[0] == "Firefox") {
        yOff =- 10;
        height = 75;
        yMin =- 10;
        width = 1140;
      }
    }
  }

  slogan = document.getElementById("slogan");
  move();
}

//----------------------------------------------------------------------------------
function browserDetectNav(chrAfterPoint) {

  // содержит переданный браузером юзерагент
  var UA = window.navigator.userAgent,

  //--------------------------------------------------------------------------------
  // шаблоны для распарсивания юзерагента
  OperaB = /Opera[ \/]+\w+\.\w+/i,
  OperaV = /Version[ \/]+\w+\.\w+/i,
  FirefoxB = /Firefox\/\w+\.\w+/i,
  ChromeB = /Chrome\/\w+\.\w+/i,
  SafariB = /Version\/\w+\.\w+/i,
  IEB = /MSIE *\d+\.\w+/i,
  SafariV = /Safari\/\w+\.\w+/i,

  //--------------------------------------------------------------------------------
  //массив с данными о браузере
  browser = new Array(),

  //шаблон для разбивки данных о браузере из строки
  browserSplit = /[ \/\.]/i,
  OperaV = UA.match(OperaV),
  Firefox = UA.match(FirefoxB),
  Chrome = UA.match(ChromeB),
  Safari = UA.match(SafariB),
  SafariV = UA.match(SafariV),
  IE = UA.match(IEB),
  Opera = UA.match(OperaB);

  //----- Opera ----
  if ((!Opera == "") & (!OperaV == "")) {
    browser[0] = OperaV[0].replace(/Version/, "Opera");
  } else {

    if (!Opera == "") {
      browser[0] = Opera[0];
    } else {

      //----- IE -----
      if (!IE == "") {
        browser[0] = IE[0];
      } else {

        //----- Firefox ----
        if (!Firefox == "") {
          browser[0] = Firefox[0];
        } else {

          //----- Chrome ----
          if (!Chrome == "") {
            browser[0] = Chrome[0];
          } else {

            //----- Safari ----
            if ((!Safari == "") && (!SafariV == "")) {
              browser[0] = Safari[0].replace("Version", "Safari");
            }
          }
        }
      }
    }
  }

//------------ Разбивка версии -----------
// возвращаемый функцией массив значений
// [0] - имя браузера, [1] - целая часть версии
// [2] - дробная часть версии
  var outputData;

  if (browser[0] != null) {
    outputData = browser[0].split(browserSplit);
  }

  if ((chrAfterPoint == null) && (outputData != null)) {
    chrAfterPoint = outputData[2].length;

    // берем нужное ко-во знаков
    outputData[2] = outputData[2].substring(0, chrAfterPoint);
    return outputData;

  } else return false;
}
//-------------------------------------------------------------------------------------