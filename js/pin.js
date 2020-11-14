'use strict';

const pinMain = document.querySelector(`.map__pin--main`);

const pinClickHandler = (pin, index) => {
  return () => {
    let cardList = window.data.map.querySelectorAll(`.map__card`);
    let pinList = window.data.map.querySelectorAll(`.map__pin`);
    window.map.hideCards();
    removeAllPinsActive(pinList);
    window.map.openPopup(cardList[index]);
    makePinActive(pin);
  };
};

const makePinActive = (pin) => {
  pin.classList.add(`map__pin--active`);
};

const removeAllPinsActive = (pinList) => {
  for (let i = 0; i < pinList.length; i++) {
    pinList[i].classList.remove(`map__pin--active`);
  }
};

const pinMainMousedownHandler = (evt) => {
  if (evt.button === 0) {
    window.main.makeProjectActive(() => {
      window.backend.load(window.pins.successHandler, window.pins.errorHandler);
    });
  }
};

const pinMainKeydownHandler = (evt) => {
  if (evt.key === `Enter`) {
    window.main.makeProjectActive(() => {
      window.backend.load(window.pins.successHandler, window.pins.errorHandler);
    });
  }
};

const pinMainMoveHandler = (evt) => {
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
  },
  setPinCoordinates(pin, x, y, offsetX, offsetY) {
    pin.style.left = `${x - offsetX}px`;
    pin.style.top = `${y - offsetY}px`;
  }
};
