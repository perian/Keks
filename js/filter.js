"use strict";

(function () {
  const pins = document.querySelector(`.map__pins`);
  const houseType = document.querySelector(`#housing-type`);
  const housePrice = document.querySelector(`#housing-price`);
  const houseRooms = document.querySelector(`#housing-rooms`);
  const houseGuests = document.querySelector(`#housing-guests`);
  const houseFeatures = document.querySelector(`#housing-features`);

  const HousePrice = {
    low: {
      min: 0,
      max: 9999
    },
    middle: {
      min: 10000,
      max: 49999
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  const deletePins = () => {
    const currentPins = pins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < currentPins.length; i++) {
      const pin = document.querySelector(`.map__pin:not(.map__pin--main)`);
      pin.parentNode.removeChild(pin);
    }
  };

  let allPins = [];
  const updatePins = () => {
    allPins = window.data.ads;

    let filteredAds = allPins.filter(function (ad) {
      if (houseType.value === `any`) {
        return allPins;
      }

      return ad.offer.type === houseType.value;
    }).
    filter(function (ad) {
      if (housePrice.value === `any`) {
        return allPins;
      }

      return ad.offer.price >= HousePrice[housePrice.value].min && ad.offer.price <= HousePrice[housePrice.value].max;
    }).
    filter(function (ad) {
      if (houseRooms.value === `any`) {
        return allPins;
      }

      return ad.offer.rooms === Number(houseRooms.value);
    }).
    filter(function (ad) {
      if (houseGuests.value === `any`) {
        return allPins;
      }

      return ad.offer.guests === Number(houseGuests.value);
    });

    allPins = filteredAds.filter(function (pin, index) {
      return filteredAds.indexOf(pin) === index;
    });

    deletePins();

    window.pin.render(allPins);
  };

  houseType.addEventListener(`change`, function () {
    window.card.hide();
    updatePins();
  });

  houseRooms.addEventListener(`change`, function () {
    window.card.hide();
    updatePins();
  });

  housePrice.addEventListener(`change`, function () {
    window.card.hide();
    updatePins();
  });

  houseGuests.addEventListener(`change`, function () {
    window.card.hide();
    updatePins();
  });

  window.filter = {
    allPins
  };
})();
