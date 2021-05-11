"use strict";

(function () {
  const ADS_AMOUNT = 8;
  const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const CHECK_IN_OUT_TIMINGS = [`12:00`, `13:00`, `14:00`];
  const HOTELS_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];

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
          type: window.utils.getRandomArrayElement(HOUSE_TYPES),
          rooms: window.utils.getRandomInt(1, 3),
          guests: window.utils.getRandomInt(1, 3),
          checkin: window.utils.getRandomArrayElement(CHECK_IN_OUT_TIMINGS),
          checkout: window.utils.getRandomArrayElement(CHECK_IN_OUT_TIMINGS),
          features: window.utils.getRandomArrayLength(OFFER_FEATURES),
          description: `Описание`,
          photos: window.utils.getRandomArrayLength(HOTELS_PHOTOS)
        },
        location: {
          x: window.utils.getRandomInt(130, 1200),
          y: window.utils.getRandomInt(130, 630)
        },
        id: i
      };

      dataArray.push(dataTemplate);
    }

    return dataArray;
  };

  const pinFeatures = createFeatures(ADS_AMOUNT);

  window.data = {
    pinFeatures,
    houseTypes: HouseTypes
  };
})();
