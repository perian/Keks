"use strict";

(function () {
  const PRICE_MIN = 0;
  const PRICE_MIDDLE_MIN = 10000;
  const PRICE_MIDDLE_MAX = 50000;
  const PRICE_MAX = Infinity;
  const houseType = document.querySelector(`#housing-type`);
  const housePrice = document.querySelector(`#housing-price`);
  const houseRooms = document.querySelector(`#housing-rooms`);
  const houseGuests = document.querySelector(`#housing-guests`);
  const houseFeatures = document.querySelector(`#housing-features`);

  const HousePrice = {
    low: {
      min: PRICE_MIN,
      max: PRICE_MIDDLE_MIN
    },
    middle: {
      min: PRICE_MIDDLE_MIN,
      max: PRICE_MIDDLE_MAX
    },
    high: {
      min: PRICE_MIDDLE_MAX,
      max: PRICE_MAX
    }
  };

  const filterAds = () => {
    let filteredAds = window.data.ads.filter(function (ad) {
      if (houseType.value === `any`) {
        return ad;
      }

      return ad.offer.type === houseType.value;
    }).
    filter(function (ad) {
      if (housePrice.value === `any`) {
        return ad;
      }

      return ad.offer.price >= HousePrice[housePrice.value].min && ad.offer.price < HousePrice[housePrice.value].max;
    }).
    filter(function (ad) {
      if (houseRooms.value === `any`) {
        return ad;
      }

      return ad.offer.rooms === Number(houseRooms.value);
    }).
    filter(function (ad) {
      if (houseGuests.value === `any`) {
        return ad;
      }

      return ad.offer.guests === Number(houseGuests.value);
    }).
    filter(function (ad) {
      const chosenFeatures = houseFeatures.querySelectorAll(`input[name=features]:checked`);

      for (let i = 0; i < chosenFeatures.length; i++) {
        if (!ad.offer.features.includes(chosenFeatures[i].value)) {
          return false;
        }
      }

      return true;
    });

    return filteredAds;
  };

  const onChangeFilter = function () {
    window.card.hide();
    window.pin.remove();
    window.pin.render(filterAds());
  };

  const mapFilters = document.querySelector(`.map__filters`);
  mapFilters.addEventListener(`change`, window.utils.debounce(onChangeFilter));
})();
