"use strict";

const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

window.createPin = (pin) => {
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
