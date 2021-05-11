"use strict";

(function () {
  const MAIN_MOUSE_BUTTON = 0;
  const MAIN_PIN_POINTER_HEIGHT = 22;
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapMainPin = mapPins.querySelector(`.map__pin--main`);
  const filterSelects = document.querySelector(`.map__filters`).children;
  const adForm = document.querySelector(`.ad-form`);
  const adFieldsets = adForm.querySelectorAll(`fieldset`);
  const mainPin = mapPins.querySelector(`.map__pin--main`);
  let mainPinX = mainPin.style.left;
  let mainPinY = mainPin.style.top;
  const fragment = document.createDocumentFragment();

  const updateAddressField = () => {
    mainPinX = parseInt(mainPin.style.left.slice(0, -2), 10) + mainPin.offsetWidth / 2;
    mainPinY = parseInt(mainPin.style.top.slice(0, -2), 10) + mainPin.offsetHeight / 2;

    if (!map.classList.contains(`map--faded`)) {
      mainPinY += mainPin.offsetHeight / 2 + MAIN_PIN_POINTER_HEIGHT;
    }
    window.setAddressField(mainPinX, mainPinY)
  }
  updateAddressField();

  // Неактивное состояние формы обьявления
  const toggleFormElementsState = (domElements, exist) => {
    for (let element of domElements) {
      element.disabled = exist;
    }
  };
  toggleFormElementsState(adFieldsets, true);
  toggleFormElementsState(filterSelects, true);

  // Активное состояние страницы
  const activate = () => {
    toggleFormElementsState(adFieldsets, false);
    toggleFormElementsState(filterSelects, false);

    map.classList.remove(`map--faded`);
    updateAddressField();

    for (let i = 0; i < window.data.pinFeatures.length; i++) {
      fragment.appendChild(window.createPin(window.data.pinFeatures[i]));
    }

    mapPins.appendChild(fragment);

    adForm.classList.remove(`ad-form--disabled`);
  };

  mapMainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === MAIN_MOUSE_BUTTON) {
      activate();
    }
  });

  mapMainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      activate();
    }
  });
})();
