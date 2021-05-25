"use strict";

(function () {
  window.load = (requestMethod, url, onLoad, onError, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;


    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;
        case 408:
          error = `Вышло время ожидания запроса`;
          break;
        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.timeout = `10000`;
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не выполнился за ` + xhr.timeout + `мс`);
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(requestMethod, url);

    if (requestMethod === `GET`) {
      xhr.send();
    } else if (requestMethod === `POST`) {
      xhr.send(data);
    }
  };
})();
