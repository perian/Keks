"use strict";

const OBJECTS_AMOUNT = 8;
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECK_IN_OUT_TIMINGS = [`12:00`, `13:00`, `14:00`];
const HOTELS_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const MAIN_PIN_POINTER_HEIGHT = 22;
const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
// const filtersContainer = map.querySelector(`.map__filters-container`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const popupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

// const houseTypes = {
//   palace: `Дворец`,
//   flat: `Квартира`,
//   house: `Дом`,
//   bungalow: `Бунгало`
// };

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
  for (let i = 1; i <= OBJECTS_AMOUNT; i++) {
    let dataTemplate = {
      author: {
        avatar: `img/avatars/user0${i}.png`
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
      }
    };

    dataArray.push(dataTemplate);
  }

  return dataArray;
};

const pinFeatures = createFeatures();

const createPin = (featuresArray) => {
  let pinElement = pinTemplate.cloneNode(true);
  let img = pinElement.querySelector(`img`);

  pinElement.style.left = featuresArray.location.x + MAP_PIN_WIDTH / 2 + `px`;
  pinElement.style.top = featuresArray.location.y + MAP_PIN_HEIGHT + `px`;
  img.src = featuresArray.author.avatar;
  img.alt = featuresArray.offer.description;

  return pinElement;
};

const fragment = document.createDocumentFragment();

for (let i = 0; i < pinFeatures.length; i++) {
  fragment.appendChild(createPin(pinFeatures[i]));
}

mapPins.appendChild(fragment);


// Создание и отрисовка карточки
/*
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
  popupElement.querySelector(`.popup__type`).textContent = houseTypes[featuresArray.offer.type];
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

  return popupElement;
};

map.insertBefore(createPopup(pinFeatures[0]), filtersContainer);
*/


// Неактивное состояние формы обьявления
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const adFieldsets = adForm.querySelectorAll(`fieldset`);

const disableAllElements = (element, array, boolean) => {
  for (let element of array) {
    element.disabled = boolean;
  }
};

disableAllElements(`fieldset`, adFieldsets, true);
disableAllElements(`select`, mapFilters, true);

// Активное состояние страницы
const mapMainPin = mapPins.querySelector(`.map__pin--main`);
const MAIN_MOUSE_BUTTON = 0;
mapMainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === MAIN_MOUSE_BUTTON) {
    disableAllElements(`fieldset`, adFieldsets, false);
    disableAllElements(`select`, mapFilters, false);

    map.classList.remove(`map--faded`);

    inputAddress.value = mainPinX + `, ` + (mainPinY + mapMainPin.offsetHeight / 2 + MAIN_PIN_POINTER_HEIGHT);
  }
});

// Выбор адреса на карте. Вычисление координат метки
const inputAddress = document.querySelector(`#address`);
const mainPinX = parseInt(mapMainPin.style.left.slice(0, -2), 10) + mapMainPin.offsetWidth / 2;
const mainPinY = parseInt(mapMainPin.style.top.slice(0, -2), 10) + mapMainPin.offsetHeight / 2;

inputAddress.value = mainPinX + `, ` + mainPinY;
