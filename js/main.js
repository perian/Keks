"use strict";

const OBJECTS_AMOUNT = 8;
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECK_IN_OUT_TIMINGS = [`12:00`, `13:00`, `14:00`];
const HOTELS_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const MAIN_PIN_POINTER_HEIGHT = 22;
const HUNDREAD_ROOMS = 100;
const NOT_FOR_GUEST = 0;
const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const filtersContainer = map.querySelector(`.map__filters-container`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const popupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
const fragment = document.createDocumentFragment();

const HouseTypes = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
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

const createFeatures = () => {
  const dataArray = [];
  for (let i = 0; i < OBJECTS_AMOUNT; i++) {
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
      index: i
    };

    dataArray.push(dataTemplate);
  }

  return dataArray;
};

const pinFeatures = createFeatures();
const createPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  const img = pinElement.querySelector(`img`);

  pinElement.style.left = pin.location.x + MAP_PIN_WIDTH / 2 + `px`;
  pinElement.style.top = pin.location.y + MAP_PIN_HEIGHT + `px`;
  img.src = pin.author.avatar;
  img.alt = pin.offer.description;
  img.dataset.index = pin.index;

  return pinElement;
};

// Создание и отрисовка карточки
const createPopupFeature = (featuresArray) => {
  const element = document.createElement(`li`);

  const popupClassModificator = `popup__feature--` + featuresArray;
  element.classList.add(`popup__feature`, popupClassModificator);

  return element;
};

const createPopupPhoto = (src) => {
  const photoElement = popupTemplate.querySelector(`.popup__photo`).cloneNode(true);

  photoElement.src = src;

  return photoElement;
};

const createPopup = (featuresArray) => {
  const popupElement = popupTemplate.cloneNode(true);

  const popupAvatar = popupElement.querySelector(`.popup__avatar`);
  const popupDescription = popupElement.querySelector(`.popup__description`);
  const featuresList = popupElement.querySelector(`.popup__features`);
  const photoList = popupElement.querySelector(`.popup__photos`);

  popupElement.querySelector(`.popup__title`).textContent = featuresArray.offer.title;
  popupElement.querySelector(`.popup__text--address`).textContent = featuresArray.offer.address;
  popupElement.querySelector(`.popup__text--price`).innerHTML = featuresArray.offer.price + `&#x20bd;<span>/ночь</span>`;
  popupElement.querySelector(`.popup__type`).textContent = HouseTypes[featuresArray.offer.type];
  popupElement.querySelector(`.popup__text--capacity`).textContent = featuresArray.offer.rooms + ` комнаты для ` + featuresArray.offer.guests + ` гостей`;
  popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + featuresArray.offer.checkin + `, выезд до ` + featuresArray.offer.checkout;

  popupDescription.textContent = featuresArray.offer.description;
  if (featuresArray.offer.description === (undefined || ``)) {
    popupDescription.remove();
  }

  popupAvatar.src = featuresArray.author.avatar;
  if (featuresArray.author.avatar === (undefined || ``)) {
    popupAvatar.remove();
  }

  if (featuresArray.offer.features.length > 0) {
    for (let i = 0; i < featuresArray.offer.features.length; i++) {
      fragment.appendChild(createPopupFeature(featuresArray.offer.features[i]));
    }
    featuresList.innerHTML = ``;
    featuresList.appendChild(fragment);
  } else {
    featuresList.remove();
  }

  if (featuresArray.offer.photos.length > 0) {
    for (let i = 0; i < featuresArray.offer.photos.length; i++) {
      fragment.appendChild(createPopupPhoto(featuresArray.offer.photos[i]));
    }
    photoList.innerHTML = ``;
    photoList.appendChild(fragment);
  } else {
    photoList.remove();
  }

  const popupClose = popupElement.querySelector(`.popup__close`);
  popupClose.addEventListener(`click`, closePopup);
  map.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      closePopup();
    }
  });

  return popupElement;
};

const closePopup = () => {
  map.querySelector(`.popup__close`).removeEventListener(`click`, closePopup);
  map.removeEventListener(`keydown`, closePopup);
  map.querySelector(`.map__card`).remove();
};

const onPinClickShowAd = (evt) => {
  const adPopup = map.querySelector(`.map__card`);

  if (adPopup) {
    closePopup();
  }

  map.insertBefore(createPopup(pinFeatures[evt.target.dataset.index]), filtersContainer);
};

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

const onMainPinMouseClick = (evt) => {
  if (evt.button === MAIN_MOUSE_BUTTON || evt.key === `Enter`) {
    activateMap();

    const allPins = mapPins.querySelectorAll(`.map__pin`);

    for (let i = 0; i <= pinFeatures.length; i++) {
      if (!allPins[i].classList.contains(`map__pin--main`)) {
        allPins[i].addEventListener(`click`, onPinClickShowAd);
      }
    }

    mapMainPin.removeEventListener(`mousedown`, onMainPinMouseClick);
    mapMainPin.removeEventListener(`keydown`, onMainPinMouseClick);
  }
};

mapMainPin.addEventListener(`mousedown`, onMainPinMouseClick);
mapMainPin.addEventListener(`keydown`, onMainPinMouseClick);

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
  let roomNumbersAmount = parseInt(roomNumber.value, 10);
  let roomCapacityAmount = parseInt(roomCapacity.value, 10);

  if (roomNumbersAmount < roomCapacityAmount) {
    roomCapacity.invalid = true;
    roomCapacity.setCustomValidity(`Максимум гостей ${roomNumbersAmount}`);
  } else if (roomNumbersAmount === HUNDREAD_ROOMS && roomCapacityAmount !== NOT_FOR_GUEST) {
    roomCapacity.setCustomValidity(`Не для гостей`);
    roomCapacity.invalid = true;
  } else if (roomNumbersAmount < HUNDREAD_ROOMS && roomCapacityAmount === NOT_FOR_GUEST) {
    roomCapacity.invalid = true;
    roomCapacity.setCustomValidity(`Поселите хоть кого-нибудь!`);
  } else {
    roomCapacity.valid = true;
    roomCapacity.setCustomValidity(``);
  }
  roomCapacity.reportValidity();
};

roomNumber.addEventListener(`change`, onRoomSelectChange); // когда удалять обработчик?
roomCapacity.addEventListener(`change`, onRoomSelectChange); // когда удалять обработчик?
onRoomSelectChange();
