"use strict";

(function () {
  const MAIN_PIN_POINTER_HEIGHT = 22;
  const map = document.querySelector(`.map`);
  const pins = map.querySelector(`.map__pins`);
  const filterSelects = document.querySelector(`.map__filters`).children;
  const mainPin = pins.querySelector(`.map__pin--main`);
  const fragment = document.createDocumentFragment();
  let mainPinX = mainPin.style.left;
  let mainPinY = mainPin.style.top;

  const updateAddressField = (x, y) => {
    const mainPinHalfHeight = mainPin.offsetHeight / 2;
    const mainPinHalfWidth = mainPin.offsetWidth / 2;

    mainPinX = window.utils.transformToInteger(x) + mainPinHalfWidth;
    mainPinY = window.utils.transformToInteger(y) + mainPinHalfHeight;

    if (!map.classList.contains(`map--faded`)) {
      mainPinY += mainPinHalfHeight + MAIN_PIN_POINTER_HEIGHT;
    }
    window.form.setAddressField(mainPinX, mainPinY);
  };
  updateAddressField(mainPinX, mainPinY);

  // Неактивное состояние страницы
  window.utils.toggleFormElementsState(filterSelects, true);

  // Активное состояние страницы
  const activate = () => {
    window.utils.toggleFormElementsState(filterSelects, false);

    map.classList.remove(`map--faded`);
    updateAddressField(mainPin.style.left, mainPin.style.top);

    for (let i = 0; i < window.data.pinFeatures.length; i++) {
      fragment.appendChild(window.createPin(window.data.pinFeatures[i]));
    }

    pins.appendChild(fragment);
  };

  window.map = {
    element: map,
    activate,
    mainPin,
    pins
  };
})();
