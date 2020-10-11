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
      window.form.addressAdForm.value = window.pin.getPinCoordinates();
      pinMain.removeEventListener(`mousedown`, pinMainMousedownHandler, false);
      pinMain.removeEventListener(`keydown`, pinMainKeydownHandler, false);
    }
  };

  const pinMainKeydownHandler = function (evt) {
    if (evt.keyCode === 13) {
      window.main.makeProjectActive();
      window.map.insertPins();
      window.form.addressAdForm.value = window.pin.getPinCoordinates();
      pinMain.removeEventListener(`keydown`, pinMainKeydownHandler, false);
      pinMain.removeEventListener(`mousedown`, pinMainMousedownHandler, false);
    }
  };

  pinMain.addEventListener(`mousedown`, pinMainMousedownHandler);
  pinMain.addEventListener(`keydown`, pinMainKeydownHandler);

  window.pin = {
    pinTemplate,
    renderPin(pin, index) {
      let pinElement = window.pin.pinTemplate.cloneNode(true);
      let pinImage = pinElement.querySelector(`img`);
      pinElement.style.left = `${pin.location.x - window.data.pinOffsetX}px`;
      pinElement.style.top = `${pin.location.y - window.data.pinOffsetY}px`;
      pinImage.src = pin.author.avatar;
      pinImage.alt = pin.offer.title;
      pinElement.addEventListener(`click`, pinClickHandler(index));
      return pinElement;
    },
    getPinCoordinates() {
      const offsetX = 31;
      const offsetY = 80;
      let x = pinMain.offsetLeft - offsetX;
      let y = pinMain.offsetTop - offsetY;
      return `${x}, ${y}`;
    }
  };
}());
