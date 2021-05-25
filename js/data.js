"use strict";

(function () {
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

  const createFeatures = (ads) => {
    const dataArray = [];

    for (let i = 0; i < ads.length; i++) {
      let dataTemplate = {
        author: {
          avatar: ads[i].author.avatar
        },
        offer: {
          title: ads[i].offer.title,
          address: ads[i].offer.address,
          price: ads[i].offer.price,
          type: ads[i].offer.type,
          rooms: ads[i].offer.rooms,
          guests: ads[i].offer.guests,
          checkin: ads[i].offer.checkin,
          checkout: ads[i].offer.checkout,
          features: ads[i].offer.features,
          description: ads[i].offer.description,
          photos: ads[i].offer.photos
        },
        location: {
          x: ads[i].location.x,
          y: ads[i].location.y
        },
        id: i
      };

      dataArray.push(dataTemplate);
    }
    return dataArray;
  };

  window.data = {
    createFeatures,
    houseTypes: HouseTypes
  };
})();
