'use strict';

const pageMain = document.querySelector(`main`);
const adForm = document.querySelector(`.ad-form`);
const addressAdForm = adForm.querySelector(`#address`);
const roomNumberAdForm = adForm.querySelector(`#room_number`);
const capacityAdForm = adForm.querySelector(`#capacity`);
const typeAdForm = adForm.querySelector(`#type`);
const priceAdForm = adForm.querySelector(`#price`);
const timeInAdForm = adForm.querySelector(`#timein`);
const timeOutAdForm = adForm.querySelector(`#timeout`);
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const adFormReset = adForm.querySelector(`.ad-form__reset`);
const avatarUploadAdFrom = adForm.querySelector(`.ad-form-header__input[type=file]`);
const avatarPreviewAdFrom = adForm.querySelector(`.ad-form-header__preview img`);
const photoUploadAdFrom = adForm.querySelector(`.ad-form__input[type=file]`);
const photoPreviewAdFrom = adForm.querySelector(`.ad-form__photo`);

let {x, y} = window.pin.getPinCoordinates(window.pin.pinMain, window.data.PIN_MAIN_OFFSET_X, window.data.PIN_MAIN_OFFSET_Y);
addressAdForm.value = `${x}, ${y}`;

const setRoomCapacityValidity = () => {
  let rooms = Number(roomNumberAdForm.value);
  let capacity = Number(capacityAdForm.value);
  if (rooms < capacity) {
    roomNumberAdForm.setCustomValidity(`Мест для всех не хватит!`);
    capacityAdForm.setCustomValidity(`Мест для всех не хватит!`);
  } else if ((rooms === window.data.SELECT_ROOMS_MAX_VALUE) && (capacity !== 0)) {
    roomNumberAdForm.setCustomValidity(`Не для гостей!`);
    capacityAdForm.setCustomValidity(`Не для гостей!`);
  } else if ((capacity === 0) && (rooms !== window.data.SELECT_ROOMS_MAX_VALUE)) {
    roomNumberAdForm.setCustomValidity(`Нужно больше комнат!`);
    capacityAdForm.setCustomValidity(`Нужно больше комнат!`);
  } else {
    roomNumberAdForm.setCustomValidity(``);
    capacityAdForm.setCustomValidity(``);
  }
};

const setPriceValidity = () => {
  let type = typeAdForm.value;
  let price = Number(priceAdForm.value);
  if (type === `bungalow` && (price < window.data.PRICE_BUNGALOW_MIN)) {
    priceAdForm.setCustomValidity(`Минимальная цена за ночь ${window.data.PRICE_BUNGALOW_MIN}`);
  } else if (type === `flat` && (price < window.data.PRICE_FLAT_MIN)) {
    priceAdForm.setCustomValidity(`Минимальная цена за ночь ${window.data.PRICE_FLAT_MIN}`);
  } else if (type === `house` && (price < window.data.PRICE_HOUSE_MIN)) {
    priceAdForm.setCustomValidity(`Минимальная цена за ночь ${window.data.PRICE_HOUSE_MIN}`);
  } else if (type === `palace` && (price < window.data.PRICE_PALACE_MIN)) {
    priceAdForm.setCustomValidity(`Минимальная цена за ночь ${window.data.PRICE_PALACE_MIN}`);
  } else {
    priceAdForm.setCustomValidity(``);
  }
};

const adFormChangeHandler = (evt) => {
  if (evt.target && (evt.target.matches(`#room_number`) || evt.target.matches(`#capacity`))) {
    setRoomCapacityValidity();
    evt.target.reportValidity();
  } else if (evt.target && (evt.target.matches(`#type`))) {
    setPriceValidity();
    priceAdForm.reportValidity();
  } else if (evt.target && (evt.target.matches(`#timein`))) {
    timeOutAdForm.value = evt.target.value;
  } else if (evt.target && (evt.target.matches(`#timeout`))) {
    timeInAdForm.value = evt.target.value;
  }
};

const adFormPriceHandler = () => {
  setPriceValidity();
  setRoomCapacityValidity();
  priceAdForm.reportValidity();
};

const formMessageClickHandler = (evt) => {
  evt.preventDefault();
  let element = document.querySelector(`.error`) || document.querySelector(`.success`);
  document.removeEventListener(`keydown`, formMessageEscPressHandler, false);
  document.removeEventListener(`click`, formMessageClickHandler, false);
  element.remove();
};

const formMessageEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    let element = document.querySelector(`.error`) || document.querySelector(`.success`);
    document.removeEventListener(`keydown`, formMessageEscPressHandler, false);
    document.removeEventListener(`click`, formMessageClickHandler, false);
    element.remove();
  }
};

const resetData = () => {
  window.map.removePins();
  window.map.removeCards();
  adForm.reset();
  window.filter.filterForm.reset();
};

const successHandler = () => {
  let successElement = successTemplate.cloneNode(true);
  pageMain.appendChild(successElement);
  document.addEventListener(`keydown`, formMessageEscPressHandler);
  document.addEventListener(`click`, formMessageClickHandler);
  resetData();
  window.main.makeProjectDisabled(() => {
    window.pin.pinMain.addEventListener(`mousedown`, window.pin.pinMainMousedownHandler);
    window.pin.pinMain.addEventListener(`keydown`, window.pin.pinMainKeydownHandler);
  });
};

const errorHandler = (errorMessage) => {
  let errorElement = errorTemplate.cloneNode(true);
  let errorMessageElement = errorElement.querySelector(`.error__message`);
  errorMessageElement.textContent = errorMessage;
  pageMain.appendChild(errorElement);
  document.addEventListener(`keydown`, formMessageEscPressHandler);
  document.addEventListener(`click`, formMessageClickHandler);
};

const adFormSubmitHandler = (evt) => {
  evt.preventDefault();
  setPriceValidity();
  setRoomCapacityValidity();
  priceAdForm.reportValidity();
  window.backend.save(new FormData(adForm), successHandler, errorHandler);
};

const adFormResetHandler = (evt) => {
  evt.preventDefault();
  resetData();
  window.main.makeProjectDisabled(() => {
    window.pin.pinMain.addEventListener(`mousedown`, window.pin.pinMainMousedownHandler);
    window.pin.pinMain.addEventListener(`keydown`, window.pin.pinMainKeydownHandler);
  });
};

addressAdForm.addEventListener(`keypress`, (evt) => {
  evt.preventDefault();
});
priceAdForm.addEventListener(`input`, adFormPriceHandler);
adForm.addEventListener(`change`, adFormChangeHandler);
adForm.addEventListener(`submit`, adFormSubmitHandler);
adFormReset.addEventListener(`click`, adFormResetHandler);

avatarUploadAdFrom.addEventListener(`change`, () => {
  let file = avatarUploadAdFrom.files[0];
  let fileName = file.name.toLowerCase();

  let matches = window.data.FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      avatarPreviewAdFrom.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

photoUploadAdFrom.addEventListener(`change`, () => {
  let file = photoUploadAdFrom.files[0];
  let fileName = file.name.toLowerCase();
  let imgNode = document.createElement(`img`);
  imgNode.style = `display: block; margin: 0 auto; max-width: 100%; height: 100%;`;

  let matches = window.data.FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      imgNode.src = reader.result;
      photoPreviewAdFrom.insertAdjacentElement(`afterbegin`, imgNode);
    });

    reader.readAsDataURL(file);
  }
});

window.form = {
  adForm,
  addressAdForm,
  changeFormFieldsStatus(form, isDisabled) {
    let fields = form.children;
    for (let i = 0; i < fields.length; i++) {
      fields[i].disabled = isDisabled;
    }
  }
};
