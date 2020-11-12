'use strict';

(function () {
  let filter = {
    data: {},
    filterFormChangeHandler() {}
  };

  const filterForm = document.querySelector(`.map__filters`);

  const filterFormChangeHandler = function () {
    const featuresList = filterForm.querySelectorAll(`.map__checkbox`);

    filter.data.type = filterForm.querySelector(`#housing-type`).value;
    filter.data.price = filterForm.querySelector(`#housing-price`).value;
    filter.data.rooms = filterForm.querySelector(`#housing-rooms`).value;
    filter.data.guests = filterForm.querySelector(`#housing-guests`).value;
    filter.data.features = Array.from(featuresList).filter(function (feature) {
      return feature.checked;
    }).map(function (feature) {
      return feature.value;
    });

    filter.filterFormChangeHandler(filter.data);
  };

  filterForm.addEventListener(`change`, filterFormChangeHandler);

  window.filter = {
    filterForm,
    setFormChangeHandler(cb) {
      filter.filterFormChangeHandler = cb;
    }
  };
}());
