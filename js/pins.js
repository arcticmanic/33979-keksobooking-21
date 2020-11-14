'use strict';

const pinMain = document.querySelector(`.map__pin--main`);
const filterForm = document.querySelector(`.map__filters`);

let pins = [];

const updatePins = (data) => {
  window.render(data);
};

window.filter.setFormChangeHandler(window.debounce((data) => {
  let updatedPins = pins;

  if (data.type !== window.data.TYPES.any) {
    updatedPins = pins.filter((pin) => {
      return pin.offer.type === data.type;
    });
  }

  switch (data.price) {
    case window.data.FILTER_PRICES.typeTwo:
      updatedPins = updatedPins.filter((pin) => {
        return (pin.offer.price >= window.data.FILTER_PRICE_STEP_ONE) && (pin.offer.price <= window.data.FILTER_PRICE_STEP_TWO);
      });
      break;
    case window.data.FILTER_PRICES.typeOne:
      updatedPins = updatedPins.filter((pin) => {
        return pin.offer.price < window.data.FILTER_PRICE_STEP_ONE;
      });
      break;
    case window.data.FILTER_PRICES.typeThree:
      updatedPins = updatedPins.filter((pin) => {
        return pin.offer.price > window.data.FILTER_PRICE_STEP_TWO;
      });
      break;
  }

  switch (Number(data.rooms)) {
    case window.data.FILTER_ROOMS.typeOne:
      updatedPins = updatedPins.filter((pin) => {
        return (pin.offer.rooms === window.data.FILTER_ROOMS_STEP_ONE);
      });
      break;
    case window.data.FILTER_ROOMS.typeTwo:
      updatedPins = updatedPins.filter((pin) => {
        return (pin.offer.rooms === window.data.FILTER_ROOMS_STEP_TWO);
      });
      break;
    case window.data.FILTER_ROOMS.typeThree:
      updatedPins = updatedPins.filter((pin) => {
        return (pin.offer.rooms === window.data.FILTER_ROOMS_STEP_THREE);
      });
      break;
  }

  switch (Number(data.guests)) {
    case window.data.FILTER_GUESTS.typeOne:
      updatedPins = updatedPins.filter((pin) => {
        return (pin.offer.guests === window.data.FILTER_GUESTS_STEP_ONE);
      });
      break;
    case window.data.FILTER_GUESTS.typeTwo:
      updatedPins = updatedPins.filter((pin) => {
        return (pin.offer.guests === window.data.FILTER_GUESTS_STEP_TWO);
      });
      break;
    case window.data.FILTER_GUESTS.typeThree:
      updatedPins = updatedPins.filter((pin) => {
        return (pin.offer.guests === window.data.FILTER_GUESTS_STEP_THREE);
      });
      break;
  }

  updatedPins = updatedPins.filter((pin) => {
    return data.features.every((feature) => {
      return pin.offer.features.includes(feature);
    });
  });

  updatePins(updatedPins);
}));

const successHandler = (data) => {
  pins = data;
  window.render(pins);
  let {x, y} = window.pin.getPinCoordinates(pinMain, window.data.PIN_MAIN_OFFSET_X, window.data.PIN_MAIN_OFFSET_Y);
  window.form.addressAdForm.value = `${x}, ${y}`;
  pinMain.removeEventListener(`mousedown`, window.pin.pinMainMousedownHandler, false);
  pinMain.removeEventListener(`keydown`, window.pin.pinMainKeydownHandler, false);
  window.form.changeFormFieldsStatus(filterForm, false);
};

const errorHandler = (errorMessage) => {
  window.error.showErrorMessage(errorMessage);
};

window.pins = {
  successHandler,
  errorHandler,
  updatePins
};
