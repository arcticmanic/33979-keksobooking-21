'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const filterForm = document.querySelector(`.map__filters`);
  const addressAdForm = adForm.querySelector(`#address`);
  const roomNumberAdForm = adForm.querySelector(`#room_number`);
  const capacityAdForm = adForm.querySelector(`#capacity`);
  const typeAdForm = adForm.querySelector(`#type`);
  const priceAdForm = adForm.querySelector(`#price`);
  const timeInAdForm = adForm.querySelector(`#timein`);
  const timeOutAdForm = adForm.querySelector(`#timeout`);

  addressAdForm.value = `${window.data.xMax / 2}, ${window.data.yMax / 2}`;

  const setRoomCapacityValidity = function () {
    let rooms = Number(roomNumberAdForm.value);
    let capacity = Number(capacityAdForm.value);
    if (rooms < capacity) {
      roomNumberAdForm.setCustomValidity(`Мест для всех не хватит!`);
      capacityAdForm.setCustomValidity(`Мест для всех не хватит!`);
    } else if ((rooms === window.data.selectRoomsMaxValue) && (capacity !== 0)) {
      roomNumberAdForm.setCustomValidity(`Не для гостей!`);
      capacityAdForm.setCustomValidity(`Не для гостей!`);
    } else if ((capacity === 0) && (rooms !== window.data.selectRoomsMaxValue)) {
      roomNumberAdForm.setCustomValidity(`Нужно больше комнат!`);
      capacityAdForm.setCustomValidity(`Нужно больше комнат!`);
    } else {
      roomNumberAdForm.setCustomValidity(``);
      capacityAdForm.setCustomValidity(``);
    }
  };

  const setPriceValidity = function () {
    let type = typeAdForm.value;
    let price = Number(priceAdForm.value);
    if (type === `bungalow` && (price < window.data.priceBungalowMin)) {
      priceAdForm.setCustomValidity(`Минимальная цена за ночь ${window.data.priceBungalowMin}`);
    } else if (type === `flat` && (price < window.data.priceFlatMin)) {
      priceAdForm.setCustomValidity(`Минимальная цена за ночь ${window.data.priceFlatMin}`);
    } else if (type === `house` && (price < window.data.priceHouseMin)) {
      priceAdForm.setCustomValidity(`Минимальная цена за ночь ${window.data.priceHouseMin}`);
    } else if (type === `palace` && (price < window.data.pricePalaceMin)) {
      priceAdForm.setCustomValidity(`Минимальная цена за ночь ${window.data.pricePalaceMin}`);
    } else {
      priceAdForm.setCustomValidity(``);
    }
  };

  const adFormChangeHandler = function (evt) {
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

  const adFormPriceHandler = function () {
    setPriceValidity();
    priceAdForm.reportValidity();
  };

  priceAdForm.addEventListener(`input`, adFormPriceHandler);
  adForm.addEventListener(`change`, adFormChangeHandler);

  window.form = {
    adForm,
    filterForm,
    addressAdForm,
    changeFormFieldsStatus(form, isDisabled) {
      let fields = form.children;
      for (let i = 0; i < fields.length; i++) {
        fields[i].disabled = isDisabled;
      }
    }
  };
}());
