"use strict";

(function () {
  const createCard = (card) => {
    const popupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
    const newCard = popupTemplate.cloneNode(true);
    const popupAvatar = newCard.querySelector(`.popup__avatar`);
    const popupDescription = newCard.querySelector(`.popup__description`);
    const featuresList = newCard.querySelector(`.popup__features`);
    const photoList = newCard.querySelector(`.popup__photos`);

    newCard.querySelector(`.popup__title`).textContent = card.offer.title;
    newCard.querySelector(`.popup__text--address`).textContent = card.offer.address;
    newCard.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₽/ночь`;
    newCard.querySelector(`.popup__type`).textContent = window.data.houseTypes[card.offer.type].name;
    newCard.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + card.offer.checkin + `, выезд до ` + card.offer.checkout;

    popupDescription.textContent = card.offer.description;
    if (card.offer.description === (undefined || ``)) {
      popupDescription.remove();
    }

    popupAvatar.src = card.author.avatar;
    if (card.author.avatar === (undefined || ``)) {
      popupAvatar.remove();
    }
    // Для доступных услуг, создаем и добавляем элементы в список попапа
    if (card.offer.features.length) {
      featuresList.innerHTML = ``; // Удаляем элементы, скопированые из шаблона.

      card.offer.features.forEach((element) => {
        const featureElement = document.createElement(`li`);
        featureElement.classList.add(`popup__feature`, `popup__feature--${element}`);
        featuresList.appendChild(featureElement);
      });
    } else {
      featuresList.remove();
    }

    if (card.offer.photos.length) {
      photoList.innerHTML = ``; // Удаляем элементы, скопированые из шаблона.

      card.offer.photos.forEach((element) => {
        const photoElement = popupTemplate.querySelector(`.popup__photo`).cloneNode(true);
        photoElement.src = element;
        photoList.appendChild(photoElement);
      });
    } else {
      photoList.remove();
    }

    return newCard;
  };

  // Создаем и добавляем на страницу карточку обьявления на основе элемента из массива обьявлений
  const filtersContainer = window.map.element.querySelector(`.map__filters-container`);

  const deactivatePin = () => {
    const activePin = window.map.element.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  const activatePin = (target) => {
    deactivatePin();

    target.classList.add(`map__pin--active`);
  };

  const closeCard = () => {
    window.map.element.querySelector(`.map__card`).remove();
  };

  const openCard = (cardId) => {
    if (window.map.element.querySelector(`.map__card`)) {
      closeCard();
    }

    const targetOffer = window.data.ads[cardId];
    const card = createCard(targetOffer);

    window.map.element.insertBefore(card, filtersContainer);
  };

  window.map.element.addEventListener(`click`, (evt) => {
    if (evt.target.matches(`.popup__close`)) {
      closeCard();
      deactivatePin();
    }
  });

  document.addEventListener(`keydown`, (evt) => {
    const mapCard = window.map.element.querySelector(`.map__card`);

    if (evt.key === `Escape` && window.map.element.contains(mapCard)) {
      evt.preventDefault();
      closeCard();
      deactivatePin();
    }
  });

  window.map.pins.addEventListener(`click`, (evt) => {
    const target = evt.target.closest(`.map__pin:not(.map__pin--main)`);

    if (target) {
      activatePin(target);

      const cardId = target.dataset.id;
      openCard(cardId);
    }
  });

  window.map.pins.addEventListener(`keydown`, (evt) => {
    const target = evt.target.closest(`.map__pin:not(.map__pin--main)`);

    if (target && (evt.key === `Enter` || evt.key === `Space`)) {
      activatePin(target);

      const cardId = target.dataset.id;
      openCard(cardId);
    }
  });
})();
