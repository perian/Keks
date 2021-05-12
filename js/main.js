"use strict";

(function () {
  const MAIN_CLICK = 0;
  let isPageActive = false;

  const activatePage = () => {
    if (!isPageActive) {
      isPageActive = true;
      window.form.activate();
      window.map.activate();
    }
  };

  const onMainPinClick = (evt) => {
    if (evt.button === MAIN_CLICK) {
      activatePage();
    }
    window.map.mainPin.removeEventListener(`mousedown`, onMainPinClick);
  };

  const onMainPinEnter = (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
    }
    window.map.mainPin.removeEventListener(`keydown`, onMainPinEnter);
  };

  window.map.mainPin.addEventListener(`mousedown`, onMainPinClick);
  window.map.mainPin.addEventListener(`keydown`, onMainPinEnter);
})();
