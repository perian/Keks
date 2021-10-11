"use strict";
(function () {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
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
  const isActive = (boolean) => {
    if (boolean) {
      window.utils.toggleFormElementsState(filterSelects, false);

      map.classList.remove(`map--faded`);
      updateAddressField(mainPin.style.left, mainPin.style.top);

      window.load(`GET`, LOAD_URL, onLoad, onError);
    } else {
      window.utils.toggleFormElementsState(filterSelects, true);

      map.classList.add(`map--faded`);
      updateAddressField(mainPin.style.left, mainPin.style.top);
    }
  };

  const onLoad = (ads) => {
    window.data.ads = ads;
    const features = window.data.createFeatures(ads);

    for (let i = 0; i < ads.length; i++) {
      fragment.appendChild(window.pin.render(features[i]));
    }

    pins.appendChild(fragment);
  };

  const onError = function (errorMessage) {
    window.utils.toggleFormElementsState(filterSelects, true);

    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.map = {
    updateAddressField,
    element: map,
    isActive,
    mainPin,
    pins
  };
})();
