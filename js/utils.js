"use strict";

(function () {
  window.utils = {
    getRandomInt: (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
    },
    getRandomArrayElement: (array) => {
      return array[window.utils.getRandomInt(0, array.length)];
    },
    getRandomArrayLength: (array) => {
      const newArrayLength = window.utils.getRandomInt(0, array.length);
      return array.slice(0, newArrayLength);
    }
  }
})();
