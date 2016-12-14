// Variables for the animated header.
var xoff=0;
var yoff=0;
var xinc=1;
var yinc=1;
var red=0;
var green=0;
var blue=0;
//var count=0;
var width=1100; // ширина
var height=80; // высота
var yMin=0;
var iX=xinc;
var iY=yinc;

function move() {
  // var word=document.all.word.style;
  var word = document.getElementById("word").style;
  /*var width=document.body.clientWidth; // ширина
    var height=document.body.clientHeight; // высота   */
  yoff += yinc;
  xoff += 2 * xinc;

  if (yoff >= height) {
    yinc = -1;
  }

  if (yoff <= yMin) {
    yinc = 1;
  }

  if (xoff >= width) {
    xinc = -1;
  }

  if(xoff <= 0) {
    xinc=1;
  }

  word.top = yoff + "px";
  word.left = xoff + "px";

  /*if(count>=50)
    {
    red=Math.round(Math.random()*255);
    green=Math.round(Math.random()*255);
    blue=Math.round(Math.random()*100+155);
    word.color=MakeColor(red,green,blue);
    count=0;
    }*/

  if (iX != xinc) {
    red = Math.round(Math.random()*255);
    green = Math.round(Math.random()*255);
    blue = Math.round(Math.random()*255);
    word.color = MakeColor(red,green,blue);
    iX = xinc;
  }

  if (iY != yinc) {
    red = Math.round(Math.random()*255);
    green = Math.round(Math.random()*255);
    blue = Math.round(Math.random()*255);
    word.color = MakeColor(red,green,blue);
    iY = yinc;
  }

  window.requestAnimationFrame(move);
  //count++;
}
//---------------------------------------------------------------
function MakeColor(red,green,blue)
  {
  red=red.toString(16);
  if(red.length==1)
    red ='0'+red;

  green=green.toString(16);
  if(green.length==1)
    green='0'+green;

  blue=blue.toString(16);
    if(blue.length==1)
      blue ='0'+blue;

  return "#"+red+green+blue;
  }
//--------------------------------------------------------------------------------
function showBrowVer()
  {
  var data = browserDetectNav();      //вызываем функцию, параметр НЕ передаем,
                          //поэтому в результате получим все знаки версии после запятой
  //alert("Браузер: "+data[0]); //выводим результат
  if(data[0]=="Chrome")
    {
    yoff=-10;
    height=70;
    yMin=-10;
    width=1110;
    }
  else
    {
    if(data[0]=="Safari")
      {
      yoff=-10;
      height=70;
      yMin=-10;
      width=1110;
      }
    else
      {
      if(data[0]=="Firefox")
        {
        yoff=-10;
        height=75;
        yMin=-10;
        width=1140;
        }
      }
    }
  move();
  }

//----------------------------------------------------------------------------------
function browserDetectNav(chrAfterPoint)
  {
  var
    UA=window.navigator.userAgent,       // содержит переданный браузером юзерагент
    //--------------------------------------------------------------------------------
    OperaB = /Opera[ \/]+\w+\.\w+/i,     //
    OperaV = /Version[ \/]+\w+\.\w+/i,   //
    FirefoxB = /Firefox\/\w+\.\w+/i,     // шаблоны для распарсивания юзерагента
    ChromeB = /Chrome\/\w+\.\w+/i,       //
    SafariB = /Version\/\w+\.\w+/i,      //
    IEB = /MSIE *\d+\.\w+/i,             //
    SafariV = /Safari\/\w+\.\w+/i,       //
    //--------------------------------------------------------------------------------
    browser = new Array(),               //массив с данными о браузере
    browserSplit = /[ \/\.]/i,           //шаблон для разбивки данных о браузере из строки
    OperaV = UA.match(OperaV),
    Firefox = UA.match(FirefoxB),
    Chrome = UA.match(ChromeB),
    Safari = UA.match(SafariB),
    SafariV = UA.match(SafariV),
    IE = UA.match(IEB),
    Opera = UA.match(OperaB);

  if ((!Opera=="")&(!OperaV==""))//----- Opera ----
    browser[0]=OperaV[0].replace(/Version/, "Opera");
  else
    if (!Opera=="")
      browser[0]=Opera[0];
    else  //----- IE -----
      if (!IE=="")
        browser[0] = IE[0]
      else  //----- Firefox ----
        if (!Firefox=="")
          browser[0]=Firefox[0]
        else //----- Chrom ----
          if (!Chrome=="")
            browser[0] = Chrome[0]
          else //----- Safari ----
            if ((!Safari=="")&&(!SafariV==""))
              browser[0] = Safari[0].replace("Version", "Safari");

//------------ Разбивка версии -----------
  var
    outputData; // возвращаемый функцией массив значений
          // [0] - имя браузера, [1] - целая часть версии
          // [2] - дробная часть версии
  if (browser[0] != null)
    outputData = browser[0].split(browserSplit);
  if ((chrAfterPoint==null)&&(outputData != null))
    {
    chrAfterPoint=outputData[2].length;
    outputData[2] = outputData[2].substring(0, chrAfterPoint); // берем нужное ко-во знаков
    return(outputData);
    }
  else return(false);
  }
//-------------------------------------------------------------------------------------
