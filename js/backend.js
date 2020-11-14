'use strict';

const StatusCode = {
  OK: 200
};
const TIMEOUT = 10000;
const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const SEND_URL = `https://21.javascript.pages.academy/keksobooking`;

const getData = (onLoad, onError) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
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
