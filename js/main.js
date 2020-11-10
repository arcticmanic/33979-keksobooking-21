'use strict';

(function () {
  window.main = {
    makeProjectActive(callback) {
      window.data.map.classList.remove(`map--faded`);
      window.form.adForm.classList.remove(`ad-form--disabled`);
      window.form.changeFormFieldsStatus(window.form.adForm, false);
      callback();
    },
    makeProjectDisabled(callback) {
      window.data.map.classList.add(`map--faded`);
      window.form.adForm.classList.add(`ad-form--disabled`);
      window.form.changeFormFieldsStatus(window.form.adForm, true);
      window.form.changeFormFieldsStatus(window.filter.filterForm, true);
      callback();
    }
  };

  window.main.makeProjectDisabled(function () {});
})();
