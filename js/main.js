'use strict';

const map = document.querySelector(`.map`);
const nearbyAds = [];
const avatars = [];
const QUANTITY_OF_PINS = 8;
const TITLES = [`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`];
const ADDRESSES = [`600, 350`, `700, 350`, `500, 350`, `300, 350`, `800, 350`, `600, 450`, `600, 150`, `600, 950`];
const PRICE_MIN = 500;
const PRICE_MAX = 5000;
const TYPES = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};
const ROOMS_MAX = 5;
const GUESTS_MAX = 5;
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = [`Описание 1`, `Описание 2`, `Описание 3`, `Описание 4`, `Описание 5`, `Описание 6`, `Описание 7`, `Описание 8`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]; // array
const Y_MIN = 130;
const Y_MAX = 630;
// const X_MIN = 0;
const X_MAX = 1200;
const PIN_OFFSET_X = 25;
const PIN_OFFSET_Y = 35;
const SELECT_ROOMS_MAX_VALUE = 100;

const getRandomIntInRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = function (arr) {
  let randomElement = getRandomIntInRange(0, arr.length - 1);
  return arr[randomElement];
};

const getRandomItemNoRepeat = function (arr) {
  let randomElement = getRandomIntInRange(0, arr.length - 1);
  let randomElementItem = arr[randomElement];
  arr.splice(randomElement, 1);
  return randomElementItem;
};

const shuffleArray = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const getRandomArray = function (arr) {
  let newArray = arr.slice(0);
  let randomLength = getRandomIntInRange(1, newArray.length);
  shuffleArray(newArray);
  newArray = newArray.slice(-randomLength);
  return newArray;
};

const getRandomKey = function (obj) {
  let keys = Object.keys(obj);
  return keys[keys.length * Math.random() << 0];
};

const generateArrayNoRepeat = function (arr, min, max, quantity) {
  if (arr.length >= quantity) {
    return;
  }
  let newItem = getRandomIntInRange(min, max);
  if (arr.indexOf(newItem) < 0) {
    arr.push(newItem);
  }
  generateArrayNoRepeat(arr, min, max, quantity);
};

const getRandomAvatarUrl = function () {
  let avatarItem = getRandomItemNoRepeat(avatars);
  return (typeof avatarItem === `undefined`) ? null : `img/avatars/user0${avatarItem}.png`;
};

const getRandomPrice = function (min, max) {
  return getRandomIntInRange(min, max).toFixed(2);
};

const getHide = function (element) {
  element.style.display = `none`;
};

const filterNodesWithFeatureList = function (arr, featureList) {
  for (let i = arr.children.length - 1; i >= 0; i--) {
    let element = arr.children[i];
    let itemClass = element.className;
    let isInFeatureList = featureList.some(function (item) {
      return (itemClass.indexOf(item) > -1);
    });

    if (!isInFeatureList) {
      arr.removeChild(element);
    }
  }
};

generateArrayNoRepeat(avatars, 1, QUANTITY_OF_PINS, QUANTITY_OF_PINS);

const populateNearbyAds = function (arr, quantity) {
  for (let i = 0; i < quantity; i++) {
    arr.push(
        {
          "author": {
            "avatar": getRandomAvatarUrl()
          },
          "offer": {
            "title": getRandomItemNoRepeat(TITLES),
            "address": getRandomItemNoRepeat(ADDRESSES),
            "price": getRandomPrice(PRICE_MIN, PRICE_MAX),
            "type": TYPES[getRandomKey(TYPES)],
            "rooms": getRandomIntInRange(1, ROOMS_MAX),
            "guests": getRandomIntInRange(1, GUESTS_MAX),
            "checkin": getRandomItem(CHECKIN_TIMES),
            "checkout": getRandomItem(CHECKOUT_TIMES),
            "features": getRandomArray(FEATURES),
            "description": getRandomItemNoRepeat(DESCRIPTION),
            "photos": getRandomArray(PHOTOS)
          },
          "location": {
            "x": getRandomIntInRange(0, map.offsetWidth),
            "y": getRandomIntInRange(Y_MIN, Y_MAX)
          }
        }
    );
  }
};

populateNearbyAds(nearbyAds, QUANTITY_OF_PINS);

const pinList = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const filters = map.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const renderCard = function (card) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardTitle = cardElement.querySelector(`.popup__title`);
  let cardAddress = cardElement.querySelector(`.popup__text--address`);
  let cardPrice = cardElement.querySelector(`.popup__text--price`);
  let cardType = cardElement.querySelector(`.popup__type`);
  let cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
  let cardTime = cardElement.querySelector(`.popup__text--time`);
  let cardFeatures = cardElement.querySelector(`.popup__features`);
  let cardDescription = cardElement.querySelector(`.popup__description`);
  let cardPhotos = cardElement.querySelector(`.popup__photos`);
  let cardPhoto = cardElement.querySelector(`.popup__photo`);
  let cardAvatar = cardElement.querySelector(`.popup__avatar`);
  let cardClose = cardElement.querySelector(`.popup__close`);

  cardTitle.textContent = card.offer.title || getHide(cardTitle);
  cardAddress.textContent = card.offer.address || getHide(cardAddress);
  cardPrice.textContent = (card.offer.price) ? `${card.offer.price}₽/ночь` : getHide(cardPrice);
  cardType.textContent = card.offer.type || getHide(cardType);
  cardCapacity.textContent = (card.offer.rooms && card.offer.guests) ? `${card.offer.rooms} комнаты для ${card.offer.guests} гостей` : getHide(cardCapacity);
  cardTime.textContent = (card.offer.checkin && card.offer.checkout) ? `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}` : getHide(cardTime);

  cardClose.addEventListener(`click`, function () {
    closePopup(cardElement);
  });

  cardClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closePopup(cardElement);
    }
  });

  document.addEventListener(`keydown`, popupEscPressHandler);

  if (card.offer.features) {
    filterNodesWithFeatureList(cardFeatures, card.offer.features);
  } else {
    getHide(cardFeatures);
  }

  cardDescription.textContent = card.offer.description || getHide(cardDescription);

  if (card.offer.photos) {
    cardPhoto.src = card.offer.photos[0];

    for (let i = 1; i < card.offer.photos.length; i++) {
      let copyPhoto = cardPhoto.cloneNode(true);
      copyPhoto.src = card.offer.photos[i];
      cardPhotos.appendChild(copyPhoto);
    }
  } else {
    getHide(cardPhotos);
  }

  cardAvatar.src = card.author.avatar || getHide(cardAvatar);

  return cardElement;
};

const clearCards = function () {
  let mapCards = map.querySelectorAll(`.map__card`);
  for (let i = mapCards.length - 1; i >= 0; i--) {
    let mapCard = mapCards[i];
    mapCard.parentNode.removeChild(mapCard);
  }
};

const insertCard = function (index) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard(nearbyAds[index]));
  map.insertBefore(fragment, filters);
};

const pinClickHandler = function (index) {
  return function () {
    clearCards();
    insertCard(index);
  };
};

const renderPin = function (pin, index) {
  let pinElement = pinTemplate.cloneNode(true);
  let pinImage = pinElement.querySelector(`img`);
  pinElement.style.left = `${pin.location.x - PIN_OFFSET_X}px`;
  pinElement.style.top = `${pin.location.y - PIN_OFFSET_Y}px`;
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;
  pinElement.addEventListener(`click`, pinClickHandler(index));
  return pinElement;
};

const insertPins = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < nearbyAds.length; i++) {
    fragment.appendChild(renderPin(nearbyAds[i], i));
  }
  pinList.appendChild(fragment);
};

const adForm = document.querySelector(`.ad-form`);
const filterForm = document.querySelector(`.map__filters`);
const addressAdForm = adForm.querySelector(`#address`);
const roomNumberAdForm = adForm.querySelector(`#room_number`);
const capacityAdForm = adForm.querySelector(`#capacity`);
const typeAdForm = adForm.querySelector(`#type`);
const priceAdForm = adForm.querySelector(`#price`);
const timeInAdForm = adForm.querySelector(`#timein`);
const timeOutAdForm = adForm.querySelector(`#timeout`);

const changeFormFieldsStatus = function (form, isDisabled) {
  let fields = form.children;
  for (let i = 0; i < fields.length; i++) {
    fields[i].disabled = isDisabled;
  }
};

const makeProjectActive = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  changeFormFieldsStatus(adForm, false);
  changeFormFieldsStatus(filterForm, false);
};

const makeProjectDisabled = function () {
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  changeFormFieldsStatus(adForm, true);
  changeFormFieldsStatus(filterForm, true);
};

makeProjectDisabled();

const pinMain = document.querySelector(`.map__pin--main`);

const getPinCoordinates = function () {
  const offsetX = 31;
  const offsetY = 80;
  let x = pinMain.offsetLeft - offsetX;
  let y = pinMain.offsetTop - offsetY;
  return `${x}, ${y}`;
};

addressAdForm.value = `${X_MAX / 2}, ${Y_MAX / 2}`;

const pinMainMousedownHandler = function (evt) {
  if (evt.button === 0) {
    makeProjectActive();
    insertPins();
    addressAdForm.value = getPinCoordinates();
    pinMain.removeEventListener(`mousedown`, pinMainMousedownHandler, false);
    pinMain.removeEventListener(`keydown`, pinMainKeydownHandler, false);
  }
};

const pinMainKeydownHandler = function (evt) {
  if (evt.keyCode === 13) {
    makeProjectActive();
    insertPins();
    addressAdForm.value = getPinCoordinates();
    pinMain.removeEventListener(`keydown`, pinMainKeydownHandler, false);
    pinMain.removeEventListener(`mousedown`, pinMainMousedownHandler, false);
  }
};

pinMain.addEventListener(`mousedown`, pinMainMousedownHandler);
pinMain.addEventListener(`keydown`, pinMainKeydownHandler);

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

const adFormSubmitHandler = function (evt) {
  setRoomCapacityValidity();
  setPriceValidity();
  if (!adForm.checkValidity()) {
    evt.preventDefault();
    adForm.reportValidity();
  }
};

const adFormPriceHandler = function () {
  setPriceValidity();
  priceAdForm.reportValidity();
};

// Validation

const setRoomCapacityValidity = function () {
  let rooms = Number(roomNumberAdForm.value);
  let capacity = Number(capacityAdForm.value);
  if (rooms < capacity) {
    roomNumberAdForm.setCustomValidity(`Мест для всех не хватит!`);
    capacityAdForm.setCustomValidity(`Мест для всех не хватит!`);
  } else if ((rooms === SELECT_ROOMS_MAX_VALUE) && (capacity !== 0)) {
    roomNumberAdForm.setCustomValidity(`Не для гостей!`);
    capacityAdForm.setCustomValidity(`Не для гостей!`);
  } else if ((capacity === 0) && (rooms !== SELECT_ROOMS_MAX_VALUE)) {
    roomNumberAdForm.setCustomValidity(`Нужно больше комнат!`);
    capacityAdForm.setCustomValidity(`Нужно больше комнат!`);
  } else {
    roomNumberAdForm.setCustomValidity(``);
    capacityAdForm.setCustomValidity(``);
  }
};

const setPriceValidity = function () {
  const PRICE_BUNGALOW_MIN = 0;
  const PRICE_FLAT_MIN = 1000;
  const PRICE_HOUSE_MIN = 5000;
  const PRICE_PALACE_MIN = 10000;
  let type = typeAdForm.value;
  let price = Number(priceAdForm.value);
  if (type === `bungalow` && (price < PRICE_BUNGALOW_MIN)) {
    priceAdForm.setCustomValidity(`Минимальная цена за ночь ${PRICE_BUNGALOW_MIN}`);
  } else if (type === `flat` && (price < PRICE_FLAT_MIN)) {
    priceAdForm.setCustomValidity(`Минимальная цена за ночь ${PRICE_FLAT_MIN}`);
  } else if (type === `house` && (price < PRICE_HOUSE_MIN)) {
    priceAdForm.setCustomValidity(`Минимальная цена за ночь ${PRICE_HOUSE_MIN}`);
  } else if (type === `palace` && (price < PRICE_PALACE_MIN)) {
    priceAdForm.setCustomValidity(`Минимальная цена за ночь ${PRICE_PALACE_MIN}`);
  } else {
    priceAdForm.setCustomValidity(``);
  }
};

priceAdForm.addEventListener(`input`, adFormPriceHandler);
adForm.addEventListener(`change`, adFormChangeHandler);
adForm.addEventListener(`submit`, adFormSubmitHandler);

// Popup Events

const closePopup = function (popup) {
  popup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, popupEscPressHandler);
};

const popupEscPressHandler = function (evt) {
  let popup = document.querySelector(`.map__card`); // TODO: как передать параметр в хэндлер, а потом удалить его?
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup(popup);
  }
};
