function animateHeader() {
  'use strict';

  // Variables for the animated header.
  var slogan = document.getElementById("slogan"),
  xOff = 0, // offset
  yOff = 0,
  xInc = 1, // increment
  yInc = 1,
  width,
  height;

  // Header dimensions detection for the purposes of animating the slogan.
  function headerSizeDetect() {
    var oldWidth, oldHeight;

    width = document.getElementById("header").clientWidth - slogan.clientWidth - 2;
    height = document.getElementById("header").clientHeight - slogan.clientHeight;

    // This condition checks whether the actual sizes of the header are changed
    // in some scenarios (zooming, orientation change etc.).
    if (width == oldWidth && height == oldHeight) {
      return;

    } else {
      oldWidth = width;
      oldHeight = height;

      window.requestAnimationFrame(headerSizeDetect);
    }
  }

  headerSizeDetect();

  // This makes slogan drift.
  function makeMove() {
    yOff += yInc;
    xOff += 2 * xInc;

    // Checks whether the slogan reached the border of his parent node.
    if (yOff >= height || yOff <= 0 || xOff >= width || xOff <= 0) {
      slogan.style.color = makeColor();

      // Switching the increment.
      (yOff == height || yOff == 0) ? yInc = -yInc : xInc = -xInc;

      // This catches the slogan overshooting when viewport is resizing.
      if (yOff > height || yOff < 0 || xOff > width + 1 || xOff < 0) {
        xOff = 2;
        yOff = 1;
      }
    }

    slogan.style.top = yOff + "px";
    slogan.style.left = xOff + "px";

    window.requestAnimationFrame(makeMove);
  }

  // This makes slogan color change.
  function makeColor() {
    var color,
    finalColor = "#";

    for (var i = 0; i < 3; i++) {
      color = Math.round(Math.random() * 255);
      color = color.toString(16);

      if (color.length == 1) {
        color = '0' + color;
      }

      finalColor = finalColor + color;
    }

    return finalColor;
  }

  window.requestAnimationFrame(makeMove);

  window.addEventListener("resize", function() {
    window.requestAnimationFrame(headerSizeDetect);
  });

  window.addEventListener('orientationchange', headerSizeDetect);
}