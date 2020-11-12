'use strict';

(function () {
  let startCoords = window.pin.getPinCoordinates(window.pin.pinMain, window.data.PIN_MAIN_OFFSET_X, window.data.PIN_MAIN_OFFSET_Y);

  window.main = {
    makeProjectActive(callback) {
      window.data.map.classList.remove(`map--faded`);
      window.form.adForm.classList.remove(`ad-form--disabled`);
      window.form.changeFormFieldsStatus(window.form.adForm, false);
      callback();
    },
    makeProjectDisabled(callback) {
      window.pin.setPinCoordinates(window.pin.pinMain, startCoords.x, startCoords.y, window.data.PIN_MAIN_OFFSET_X, window.data.PIN_MAIN_OFFSET_Y);
      window.data.map.classList.add(`map--faded`);
      window.form.adForm.classList.add(`ad-form--disabled`);
      window.form.changeFormFieldsStatus(window.form.adForm, true);
      window.form.changeFormFieldsStatus(window.filter.filterForm, true);
      window.form.addressAdForm.value = `${startCoords.x}, ${startCoords.y}`;
      callback();
    }
  };

  window.main.makeProjectDisabled(function () {});
})();
