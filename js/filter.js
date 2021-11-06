"use strict";

(function () {
  const pins = document.querySelector(`.map__pins`);
  const houseType = document.querySelector(`#housing-type`);
  const houseRooms = document.querySelector(`#housing-rooms`);
  // const housePrice = document.querySelector(`#housing-price`);
  // const houseGuests = document.querySelector(`#housing-guests`);
  // const houseFeatures = document.querySelector(`#housing-features`);

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

    let houseTypeFilter = allPins.filter(function (ad) {
      if (houseType.value === `any`) {
        return allPins;
      }
      return ad.offer.type === houseType.value;
    });

    let houseRoomsFilter = houseTypeFilter.filter(function (ad) {
      if (houseRooms.value === `any`) {
        return houseTypeFilter;
      }
      return ad.offer.rooms === Number(houseRooms.value);
    });

    let filteredPins = houseRoomsFilter;

    allPins = filteredPins.filter(function (pin, index) {
      return filteredPins.indexOf(pin) === index;
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

  window.filter = {
    allPins
  };
})();
