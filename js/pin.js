"use strict";
(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAX_PIN_AMOUNT = 5;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const renderPin = (pin) => {
    const pinElement = pinTemplate.cloneNode(true);
    const img = pinElement.querySelector(`img`);

    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + `px`;
    pinElement.style.top = pin.location.y - PIN_HEIGHT + `px`;
    img.src = pin.author.avatar;
    img.alt = pin.offer.description;
    img.dataset.id = pin.id;
    pinElement.dataset.id = pin.id;

    return pinElement;
  };

  const pins = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  const renderPins = (ads) => {
    window.data.filteredAds = ads;
    const features = window.data.createFeatures(ads);
    const takeNumber = MAX_PIN_AMOUNT < ads.length
      ? MAX_PIN_AMOUNT
      : ads.length;

    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(features[i]));
    }

    pins.appendChild(fragment);
  };

  const deactivatePin = () => {
    const activePin = document.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  const activatePin = (target) => {
    deactivatePin();

    target.classList.add(`map__pin--active`);
  };

  const removePins = () => {
    const currentPins = pins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < currentPins.length; i++) {
      const pin = document.querySelector(`.map__pin:not(.map__pin--main)`);
      pin.parentNode.removeChild(pin);
    }
  };

  pins.addEventListener(`click`, (evt) => {
    const target = evt.target.closest(`.map__pin:not(.map__pin--main)`);

    if (target) {
      activatePin(target);

      const cardId = target.dataset.id;
      window.card.show(cardId);
    }
  });

  pins.addEventListener(`keydown`, (evt) => {
    const target = evt.target.closest(`.map__pin:not(.map__pin--main)`);

    if (target && (evt.key === `Enter` || evt.key === `Space`)) {
      activatePin(target);

      const cardId = target.dataset.id;
      window.card.show(cardId);
    }
  });

  window.pin = {
    render: renderPins,
    deactivate: deactivatePin,
    remove: removePins
  };
})();
