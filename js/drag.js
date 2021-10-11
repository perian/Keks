"use strict";
(function () {
  const mainPin = window.map.mainPin;
  const mainPinLimits = {
    minX: 0 - mainPin.offsetWidth / 2,
    maxX: window.map.element.offsetWidth - mainPin.offsetWidth / 2,
    minY: 130,
    maxY: 630
  };

  mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMainPinDrag = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let pinX = mainPin.offsetLeft - shift.x;
      let pinY = mainPin.offsetTop - shift.y;

      if (pinY > mainPinLimits.maxY) {
        pinY = mainPinLimits.maxY;
      } else if (pinY < mainPinLimits.minY) {
        pinY = mainPinLimits.minY;
      } else if (pinX > mainPinLimits.maxX) {
        pinX = mainPinLimits.maxX;
      } else if (pinX < mainPinLimits.minX) {
        pinX = mainPinLimits.minX;
      }

      mainPin.style.left = pinX + `px`;
      mainPin.style.top = pinY + `px`;

      window.map.updateAddressField(mainPin.style.left, mainPin.style.top);
    };

    const onMainPinMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMainPinDrag);
      document.removeEventListener(`mouseup`, onMainPinMouseUp);
    };

    document.addEventListener(`mousemove`, onMainPinDrag);
    document.addEventListener(`mouseup`, onMainPinMouseUp);
  });
})();
