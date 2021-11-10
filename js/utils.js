"use strict";

(function () {
  const DEBOUNCE_INTERVAL = 300; // ms

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
    },
    transformToInteger: (property) => {
      return parseInt(property.replace(`px`, ``), 10);
    },
    toggleFormElementsState: (domElements, exist) => {
      for (let element of domElements) {
        element.disabled = exist;
      }
    },
    debounce: (cb) => {
      let lastTimeout = null;

      return function () {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb();
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
