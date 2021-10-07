"use strict";

const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const render = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  const img = pinElement.querySelector(`img`);

  pinElement.style.left = pin.location.x + MAP_PIN_WIDTH / 2 + `px`;
  pinElement.style.top = pin.location.y + MAP_PIN_HEIGHT + `px`;
  img.src = pin.author.avatar;
  img.alt = pin.offer.description;
  img.dataset.id = pin.id;
  pinElement.dataset.id = pin.id;

  return pinElement;
};

const deactivate = () => {
  const activePin = window.map.element.querySelector(`.map__pin--active`);
  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
};

const activate = (target) => {
  deactivate();

  target.classList.add(`map__pin--active`);
};

window.map.pins.addEventListener(`click`, (evt) => {
  const target = evt.target.closest(`.map__pin:not(.map__pin--main)`);

  if (target) {
    activate(target);

    const cardId = target.dataset.id;
    window.card.show(cardId);
  }
});

window.map.pins.addEventListener(`keydown`, (evt) => {
  const target = evt.target.closest(`.map__pin:not(.map__pin--main)`);

  if (target && (evt.key === `Enter` || evt.key === `Space`)) {
    activate(target);

    const cardId = target.dataset.id;
    window.card.show(cardId);
  }
});

window.pin = {
  render,
  deactivate
};
