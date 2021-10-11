"use strict";
(function () {
  const MAIN_CLICK = 0;
  // let isPageActive = false;

  const activatePage = (boolean) => {
    window.form.isActive(boolean);
    window.map.isActive(boolean);
  };

  const onMainPinClick = (evt) => {
    if (evt.button === MAIN_CLICK) {
      activatePage(true);
    }
    window.map.mainPin.removeEventListener(`mousedown`, onMainPinClick);
    window.map.mainPin.removeEventListener(`keydown`, onMainPinEnter);
  };

  const onMainPinEnter = (evt) => {
    if (evt.key === `Enter`) {
      activatePage(true);
    }
    window.map.mainPin.removeEventListener(`mousedown`, onMainPinClick);
    window.map.mainPin.removeEventListener(`keydown`, onMainPinEnter);
  };

  window.map.mainPin.addEventListener(`mousedown`, onMainPinClick);
  window.map.mainPin.addEventListener(`keydown`, onMainPinEnter);

  window.main = {
    activatePage,
    onMainPinClick,
    onMainPinEnter
  };
})();
