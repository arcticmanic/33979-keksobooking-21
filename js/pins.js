'use strict';

(function () {
  const pinMain = document.querySelector(`.map__pin--main`);
  const filterForm = document.querySelector(`.map__filters`);

  let pins = [];

  const updatePins = function (data) {
    window.render(data);
  };

  window.filter.setFormChangeHandler(window.debounce(function (data) {
    let updatedPins = pins;

    if (data.type !== `any`) {
      updatedPins = pins.filter(function (pin) {
        return pin.offer.type === data.type;
      });
    }

    switch (data.price) {
      case `middle`:
        updatedPins = updatedPins.filter(function (pin) {
          return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
        });
        break;
      case `low`:
        updatedPins = updatedPins.filter(function (pin) {
          return pin.offer.price < 10000;
        });
        break;
      case `high`:
        updatedPins = updatedPins.filter(function (pin) {
          return pin.offer.price > 50000;
        });
        break;
    }

    switch (data.rooms) {
      case `1`:
        updatedPins = updatedPins.filter(function (pin) {
          return (pin.offer.rooms === 1);
        });
        break;
      case `2`:
        updatedPins = updatedPins.filter(function (pin) {
          return (pin.offer.rooms === 2);
        });
        break;
      case `3`:
        updatedPins = updatedPins.filter(function (pin) {
          return (pin.offer.rooms === 3);
        });
        break;
    }

    switch (data.guests) {
      case `0`:
        updatedPins = updatedPins.filter(function (pin) {
          return (pin.offer.guests === 0);
        });
        break;
      case `1`:
        updatedPins = updatedPins.filter(function (pin) {
          return (pin.offer.guests === 1);
        });
        break;
      case `2`:
        updatedPins = updatedPins.filter(function (pin) {
          return (pin.offer.guests === 2);
        });
        break;
    }

    updatedPins = updatedPins.filter(function (pin) {
      return data.features.every(function (feature) {
        return pin.offer.features.includes(feature);
      });
    });

    updatePins(updatedPins);
  }));

  const successHandler = function (data) {
    pins = data;
    window.render(pins);
    let {x, y} = window.pin.getPinCoordinates(pinMain, window.data.PIN_MAIN_OFFSET_X, window.data.PIN_MAIN_OFFSET_Y);
    window.form.addressAdForm.value = `${x}, ${y}`;
    pinMain.removeEventListener(`mousedown`, window.pin.pinMainMousedownHandler, false);
    pinMain.removeEventListener(`keydown`, window.pin.pinMainKeydownHandler, false);
    window.form.changeFormFieldsStatus(filterForm, false);
  };

  const errorHandler = function (errorMessage) {
    window.error.showErrorMessage(errorMessage);
  };

  window.pins = {
    successHandler,
    errorHandler,
    updatePins
  };
}());
