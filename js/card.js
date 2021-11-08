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
    newCard.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₴/ночь`;
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

  const hideCard = () => {
    const mapCard = window.map.element.querySelector(`.map__card`);

    if (mapCard) {
      mapCard.remove();
    }
  };

  const showCard = (cardId) => {
    hideCard();

    const targetOffer = window.data.filteredAds[cardId];
    const card = createCard(targetOffer);

    window.map.element.insertBefore(card, filtersContainer);
  };

  window.map.element.addEventListener(`click`, (evt) => {
    if (evt.target.matches(`.popup__close`)) {
      hideCard();
      window.pin.deactivate();
    }
  });

  document.addEventListener(`keydown`, (evt) => {
    const mapCard = window.map.element.querySelector(`.map__card`);

    if (evt.key === `Escape` && window.map.element.contains(mapCard)) {
      evt.preventDefault();
      hideCard();
      window.pin.deactivate();
    }
  });

  window.card = {
    show: showCard,
    hide: hideCard
  };
})();
