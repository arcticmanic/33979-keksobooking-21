'use strict';

(function () {
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT = 10000;
  const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const SEND_URL = `https://21.javascript.pages.academy/keksobooking`;

  const getData = function (onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    return xhr;
  };

  window.backend = {
    save(data, onLoad, onError) {
      let xhr = getData(onLoad, onError);
      xhr.open(`POST`, SEND_URL);
      xhr.send(data);
    },
    load(onLoad, onError) {
      let xhr = getData(onLoad, onError);
      xhr.open(`GET`, DATA_URL);
      xhr.send();
    }
  };
}());
