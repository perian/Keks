"use strict";
(function () {
  const MAIN_CLICK = 0;
  const mainPin = window.map.mainPin;
  // let isPageActive = false;

  const activatePage = (boolean) => {
    window.form.isActive(boolean);
    window.map.isActive(boolean);
  };

  const onMainPinClick = (evt) => {
    if (evt.button === MAIN_CLICK) {
      activatePage(true);
    }
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinEnter);
  };

  const onMainPinEnter = (evt) => {
    if (evt.key === `Enter`) {
      activatePage(true);
    }
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinEnter);
  };

  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinEnter);

  window.main = {
    activatePage,
    onMainPinClick,
    onMainPinEnter
  };
})();
