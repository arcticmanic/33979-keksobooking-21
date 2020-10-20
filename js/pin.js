'use strict';

(function () {
  const pinMain = document.querySelector(`.map__pin--main`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const pinClickHandler = function (index) {
    return function () {
      window.map.clearCards();
      window.map.insertCard(index);
    };
  };

  const pinMainMousedownHandler = function (evt) {
    if (evt.button === 0) {
      window.main.makeProjectActive();
      window.map.insertPins();
      let {x, y} = window.pin.getPinCoordinates(pinMain, window.data.PIN_MAIN_OFFSET_X, window.data.PIN_MAIN_OFFSET_Y);
      window.form.addressAdForm.value = `${x}, ${y}`;
      pinMain.removeEventListener(`mousedown`, pinMainMousedownHandler, false);
      pinMain.removeEventListener(`keydown`, pinMainKeydownHandler, false);
    }
  };

  const pinMainKeydownHandler = function (evt) {
    if (evt.key === `Enter`) {
      window.main.makeProjectActive();
      window.map.insertPins();
      let {x, y} = window.pin.getPinCoordinates(pinMain, window.data.PIN_MAIN_OFFSET_X, window.data.PIN_MAIN_OFFSET_Y);
      window.form.addressAdForm.value = `${x}, ${y}`;
      pinMain.removeEventListener(`keydown`, pinMainKeydownHandler, false);
      pinMain.removeEventListener(`mousedown`, pinMainMousedownHandler, false);
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
    pinTemplate,
    renderPin(pin, index) {
      let pinElement = window.pin.pinTemplate.cloneNode(true);
      let pinImage = pinElement.querySelector(`img`);
      pinElement.style.left = `${pin.location.x - window.data.PIN_OFFSET_X}px`;
      pinElement.style.top = `${pin.location.y - window.data.PIN_OFFSET_Y}px`;
      pinImage.src = pin.author.avatar;
      pinImage.alt = pin.offer.title;
      pinElement.addEventListener(`click`, pinClickHandler(index));
      return pinElement;
    },
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
