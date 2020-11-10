'use strict';

(function () {
  let filter = {
    filterTypeChangeHandler() {}
  };

  const filterForm = document.querySelector(`.map__filters`);

  const filterFormChangeHandler = function (evt) {
    if (evt.target && (evt.target.matches(`#housing-type`))) {
      filter.filterTypeChangeHandler(evt.target.value);
    }
  };

  filterForm.addEventListener(`change`, filterFormChangeHandler);

  window.filter = {
    filterForm,
    setTypeChangeHandler(cb) {
      filter.filterTypeChangeHandler = cb;
    }
  };
}());
