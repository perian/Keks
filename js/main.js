`use strict`;

const OBJECTS_AMOUNT = 8;
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const HOTELS_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const mapPin = map.querySelector(`.map__pin`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length)];
}

const setRandomArrayLength = (array) => {
  const randomLengthNum = getRandomInt(0, array.length);
  let randomLengthArray = [];

  for (let i = 0; i <= randomLengthNum; i++) {
    randomLengthArray.push(array[i]);
  }

  return randomLengthArray;
}

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
        type: `bungalow`,
        rooms: 3,
        guests: 4,
        checkin: `12:00`,
        checkout: `12:00`,
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
}

const pinFeatures = createFeatures();

map.classList.remove(`map--faded`);

const createPin = (features) => {
  let pinElement = pinTemplate.cloneNode(true);
  let img = pinElement.querySelector(`img`);

  pinElement.style.left = features.location.x + MAP_PIN_WIDTH / 2 + `px`;
  pinElement.style.top = features.location.y + MAP_PIN_HEIGHT + `px`;
  img.src = features.author.avatar;
  img.alt = features.offer.description;

  return pinElement;
};

const fragment = document.createDocumentFragment();

for (let i = 0; i < pinFeatures.length; i++) {
  fragment.appendChild(createPin(pinFeatures[i]));
}

mapPins.appendChild(fragment);
