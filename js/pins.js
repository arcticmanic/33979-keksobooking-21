'use strict';

(function () {
  const pinMain = document.querySelector(`.map__pin--main`);
  const filterForm = document.querySelector(`.map__filters`);

  let pins = [];

  const updatePins = function (data) {
    window.render(data);
  };

  window.filter.setTypeChangeHandler(function (type) {
    if (type !== `any`) {
      updatePins(pins.filter(function (pin) {
        return pin.offer.type === type;
      }));
    } else {
      updatePins(pins);
    }
  });

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
