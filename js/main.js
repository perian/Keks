"use strict";

const ADS_AMOUNT = 8;
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECK_IN_OUT_TIMINGS = [`12:00`, `13:00`, `14:00`];
const HOTELS_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const MAIN_PIN_POINTER_HEIGHT = 22;
const HUNDREAD_ROOMS = 100;
const NOT_FOR_GUESTS = 0;
const MAX_HOUSE_PRICE = 1000000;
const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const filtersContainer = map.querySelector(`.map__filters-container`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const popupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
const fragment = document.createDocumentFragment();

const HouseTypes = {
  bungalow: {
    name: `Бунгало`,
    minPrice: 0
  },
  flat: {
    name: `Квартира`,
    minPrice: 1000
  },
  house: {
    name: `Дом`,
    minPrice: 5000
  },
  palace: {
    name: `Дворец`,
    minPrice: 10000
  }
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
};

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length)];
};

const getRandomArrayLength = (array) => {
  const newArrayLength = getRandomInt(0, array.length);
  return array.slice(0, newArrayLength);
};

const createFeatures = (amount) => {
  const dataArray = [];
  for (let i = 0; i < amount; i++) {
    let dataTemplate = {
      author: {
        avatar: `img/avatars/user0` + (i + 1) + `.png`
      },
      offer: {
        title: `Заголовок предложения`,
        address: `600, 350`,
        price: 100,
        type: getRandomArrayElement(HOUSE_TYPES),
        rooms: getRandomInt(1, 3),
        guests: getRandomInt(1, 3),
        checkin: getRandomArrayElement(CHECK_IN_OUT_TIMINGS),
        checkout: getRandomArrayElement(CHECK_IN_OUT_TIMINGS),
        features: getRandomArrayLength(OFFER_FEATURES),
        description: `Описание`,
        photos: getRandomArrayLength(HOTELS_PHOTOS)
      },
      location: {
        x: getRandomInt(130, 1200),
        y: getRandomInt(130, 640)
      },
      id: i
    };

    dataArray.push(dataTemplate);
  }

  return dataArray;
};

const pinFeatures = createFeatures(ADS_AMOUNT);

const createPin = (pin) => {
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

// Создание и отрисовка карточки
const createCard = (card) => {
  const newCard = popupTemplate.cloneNode(true);

  const popupAvatar = newCard.querySelector(`.popup__avatar`);
  const popupDescription = newCard.querySelector(`.popup__description`);
  const featuresList = newCard.querySelector(`.popup__features`);
  const photoList = newCard.querySelector(`.popup__photos`);

  newCard.querySelector(`.popup__title`).textContent = card.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = card.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = HouseTypes[card.offer.type].name;
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


// Создаем и добавляем карточку обьявления на основе элемента из массива обьявлений

const closeCard = () => {
  map.querySelector(`.map__card`).remove();
};

const openCard = (cardId) => {
  if (map.querySelector(`.map__card`)) {
    closeCard();
  }

  map.insertBefore(createCard(pinFeatures[cardId]), filtersContainer);
};

map.addEventListener(`click`, (evt) => {
  if (evt.target.matches(`.popup__close`)) {
    closeCard();
  }
});

document.addEventListener(`keydown`, (evt) => {
  const mapCard = map.querySelector(`.map__card`);

  if (evt.key === `Escape` && map.contains(mapCard)) {
    evt.preventDefault();
    closeCard();
  }
});

mapPins.addEventListener(`click`, (evt) => {
  const target = evt.target.closest(`.map__pin:not(.map__pin--main)`);
  if (target) {
    const cardId = target.dataset.id;
    openCard(cardId);
  }
});

mapPins.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openCard(evt);
  }
});

// Активное состояние страницы
const mapMainPin = mapPins.querySelector(`.map__pin--main`);
const MAIN_MOUSE_BUTTON = 0;

const activateMap = () => {
  toggleFormElementsState(adFieldsets, false);
  toggleFormElementsState(filterSelects, false);

  map.classList.remove(`map--faded`);
  setAddressField();

  for (let i = 0; i < pinFeatures.length; i++) {
    fragment.appendChild(createPin(pinFeatures[i]));
  }

  mapPins.appendChild(fragment);

  adForm.classList.remove(`ad-form--disabled`);
};

mapMainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === MAIN_MOUSE_BUTTON) {
    activateMap();
  }
});

mapMainPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activateMap();
  }
});

// Неактивное состояние формы обьявления
const filterSelects = document.querySelector(`.map__filters`).children;
const adForm = document.querySelector(`.ad-form`);
const adFieldsets = adForm.querySelectorAll(`fieldset`);

const toggleFormElementsState = (domElements, exist) => {
  for (let element of domElements) {
    element.disabled = exist;
  }
};

toggleFormElementsState(adFieldsets, true);
toggleFormElementsState(filterSelects, true);

// Выбор адреса на карте. Вычисление координат метки
const setAddressField = () => {
  const inputAddress = document.querySelector(`#address`);
  let mainPinX = parseInt(mapMainPin.style.left.slice(0, -2), 10) + mapMainPin.offsetWidth / 2;
  let mainPinY = parseInt(mapMainPin.style.top.slice(0, -2), 10) + mapMainPin.offsetHeight / 2;

  if (!map.classList.contains(`map--faded`)) {
    mainPinY += mapMainPin.offsetHeight / 2 + MAIN_PIN_POINTER_HEIGHT;
  }
  inputAddress.value = mainPinX + `, ` + mainPinY;
};
setAddressField();

// Валидация Количество комнат - Количество мест
const roomNumber = adForm.querySelector(`#room_number`);
const roomCapacity = adForm.querySelector(`#capacity`);

const onRoomSelectChange = () => {
  const roomNumbersAmount = parseInt(roomNumber.value, 10);
  const roomCapacityAmount = parseInt(roomCapacity.value, 10);

  if (roomNumbersAmount < roomCapacityAmount) {
    roomCapacity.invalid = true;
    roomCapacity.setCustomValidity(`Максимум гостей ${roomNumbersAmount}`);
  } else if (roomNumbersAmount === HUNDREAD_ROOMS && roomCapacityAmount !== NOT_FOR_GUESTS) {
    roomCapacity.setCustomValidity(`Не для гостей`);
    roomCapacity.invalid = true;
  } else if (roomNumbersAmount < HUNDREAD_ROOMS && roomCapacityAmount === NOT_FOR_GUESTS) {
    roomCapacity.invalid = true;
    roomCapacity.setCustomValidity(`Поселите хоть кого-нибудь!`);
  } else {
    roomCapacity.valid = true;
    roomCapacity.setCustomValidity(``);
  }
  roomCapacity.reportValidity();
};

roomNumber.addEventListener(`change`, onRoomSelectChange); // когда удалять обработчик?
roomCapacity.addEventListener(`change`, () => {
  onRoomSelectChange(0);
}); // когда удалять обработчик?
onRoomSelectChange();

// Валидация. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const houseType = adForm.querySelector(`#type`);
const housePrice = adForm.querySelector(`#price`);
const setHouseMinPrice = () => {
  const minPrice = HouseTypes[houseType.value].minPrice;

  housePrice.setAttribute(`min`, minPrice);
  housePrice.setAttribute(`placeholder`, minPrice);
};
setHouseMinPrice();

const onHouseSelectChange = () => {
  setHouseMinPrice();

  const housePriceValue = parseInt(housePrice.value, 10);
  const minPrice = HouseTypes[houseType.value].minPrice;

  if (housePriceValue < minPrice) {
    housePrice.invalid = true;
    housePrice.setCustomValidity(`Значение должно быть больше или ровно ` + `${minPrice}`);
  } else if (housePriceValue > MAX_HOUSE_PRICE) {
    housePrice.invalid = true;
    housePrice.setCustomValidity(`Значение должно быть меньше или ровно ` + MAX_HOUSE_PRICE);
  } else {
    housePrice.valid = true;
    housePrice.setCustomValidity(``);
  }
  housePrice.reportValidity();
};

houseType.addEventListener(`change`, onHouseSelectChange);
housePrice.addEventListener(`change`, onHouseSelectChange);

// Валидация. Поля «Время заезда» и «Время выезда» синхронизированы
const moveInTime = adForm.querySelector(`#timein`);
const moveOutTime = adForm.querySelector(`#timeout`);

moveInTime.addEventListener(`change`, () => {
  moveOutTime.value = moveInTime.value;
});

moveOutTime.addEventListener(`change`, () => {
  moveInTime.value = moveOutTime.value;
});
