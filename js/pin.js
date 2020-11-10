'use strict';

(function () {
  const pinMain = document.querySelector(`.map__pin--main`);

  const pinClickHandler = function (pin, index) {
    return function () {
      let cardList = window.data.map.querySelectorAll(`.map__card`);
      let pinList = window.data.map.querySelectorAll(`.map__pin`);
      window.map.hideCards();
      removeAllPinsActive(pinList);
      window.map.openPopup(cardList[index]);
      makePinActive(pin);
    };
  };

  const makePinActive = function (pin) {
    pin.classList.add(`map__pin--active`);
  };

  const removeAllPinsActive = function (pinList) {
    for (let i = 0; i < pinList.length; i++) {
      pinList[i].classList.remove(`map__pin--active`);
    }
  };

  const pinMainMousedownHandler = function (evt) {
    if (evt.button === 0) {
      window.main.makeProjectActive(function () {
        window.backend.load(window.pins.successHandler, window.pins.errorHandler);
      });
    }
  };

  const pinMainKeydownHandler = function (evt) {
    if (evt.key === `Enter`) {
      window.main.makeProjectActive(function () {
        window.backend.load(window.pins.successHandler, window.pins.errorHandler);
      });
    }
  };

  const pinMainMoveHandler = function (evt) {
    window.move.mouseDownHandler(pinMain, evt);
  };

  pinMain.addEventListener(`mousedown`, pinMainMousedownHandler);
  pinMain.addEventListener(`keydown`, pinMainKeydownHandler);
  pinMain.addEventListener(`mousedown`, pinMainMoveHandler);

  window.pin = {
    pinMain,
    pinClickHandler,
    pinMainKeydownHandler,
    pinMainMousedownHandler,
    getPinCoordinates(pin, offsetX, offsetY) {
      let x = pin.offsetLeft + offsetX;
      let y = pin.offsetTop + offsetY;
      return {
        x,
        y
      };
    }
  };
}());
