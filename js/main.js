"use strict";

const OBJECTS_AMOUNT = 8;
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECK_IN_OUT_TIMINGS = [`12:00`, `13:00`, `14:00`];
const HOTELS_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const filtersContainer = map.querySelector(`.map__filters-container`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const popupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

const houseTypes = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;   // Максимум не включается, минимум включается
};

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length)];
};

const setRandomArrayLength = (array) => {
  const randomLengthNum = getRandomInt(0, array.length);
  let randomLengthArray = [];

  for (let i = 0; i <= randomLengthNum; i++) {
    randomLengthArray.push(array[i]);
  }

  return randomLengthArray;
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
        features: setRandomArrayLength(OFFER_FEATURES),
        description: `Описание`,
        photos: setRandomArrayLength(HOTELS_PHOTOS)
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

map.classList.remove(`map--faded`);

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

const createPopupFeature = (featuresArray) => {
  const element = document.createElement(`li`);

  let popupClassModificator = `popup__feature--` + featuresArray;
  element.classList.add(`popup__feature`, popupClassModificator);

  return element;
};

const createPopup = (featuresArray) => {
  let popupElement = popupTemplate.cloneNode(true);
  popupElement.querySelector(`.popup__title`).textContent = featuresArray.offer.title;
  popupElement.querySelector(`.popup__text--address`).textContent = featuresArray.offer.address;
  popupElement.querySelector(`.popup__text--price`).innerHTML = featuresArray.offer.price + `&#x20bd;<span>/ночь</span>`;
  popupElement.querySelector(`.popup__type`).textContent = houseTypes[featuresArray.offer.type];
  popupElement.querySelector(`.popup__text--capacity`).textContent = featuresArray.offer.rooms + ` комнаты для ` + featuresArray.offer.guests + ` гостей`;
  popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + featuresArray.offer.checkin + `, выезд до ` + featuresArray.offer.checkout;
  popupElement.querySelector(`.popup__description`).textContent = featuresArray.offer.description;
  popupElement.querySelector(`.popup__photos`).textContent = featuresArray.offer.description;
  popupElement.querySelector(`.popup__avatar`).src = featuresArray.author.avatar;


  for (let i = 0; i < featuresArray.offer.features.length; i++) {
    fragment.appendChild(createPopupFeature(featuresArray.offer.features[i]));
  }
  let popupFeatures = popupElement.querySelector(`.popup__features`);
  popupFeatures.innerHTML = ``;
  popupFeatures.appendChild(fragment);

  return popupElement;
};

map.insertBefore(createPopup(pinFeatures[0]), filtersContainer);
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
