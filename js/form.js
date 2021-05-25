"use strict";

(function () {
  const HUNDREAD_ROOMS = 100;
  const NOT_FOR_GUESTS = 0;
  const MAX_HOUSE_PRICE = 1000000;
  const adForm = document.querySelector(`.ad-form`);
  const inputAddress = document.querySelector(`#address`);
  const adFieldsets = adForm.querySelectorAll(`fieldset`);

  // Выбор адреса на карте. Вычисление координат метки
  const setAddressField = (x, y) => {
    inputAddress.value = x + `, ` + y;
  };

  // Неактивное состояние страницы
  window.utils.toggleFormElementsState(adFieldsets, true);

  // Активное состояние страницы
  const activate = () => {
    window.utils.toggleFormElementsState(adFieldsets, false);

    adForm.classList.remove(`ad-form--disabled`);
  };

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

  roomNumber.addEventListener(`change`, onRoomSelectChange);
  roomCapacity.addEventListener(`change`, onRoomSelectChange);
  onRoomSelectChange();

  // Валидация. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
  const houseType = adForm.querySelector(`#type`);
  const housePrice = adForm.querySelector(`#price`);
  const setHouseMinPrice = () => {
    const minPrice = window.data.houseTypes[houseType.value].minPrice;

    housePrice.setAttribute(`min`, minPrice);
    housePrice.setAttribute(`placeholder`, minPrice);
  };
  setHouseMinPrice();

  const onHouseSelectChange = () => {
    setHouseMinPrice();

    const housePriceValue = parseInt(housePrice.value, 10);
    const minPrice = window.data.houseTypes[houseType.value].minPrice;

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

  window.form = {
    setAddressField,
    activate
  };
})();
