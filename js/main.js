'use strict';

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
const PIN_OFFSET_X = 25;
const PIN_OFFSET_Y = 35;

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

const hide = function (element) {
  element.style.display = `none`;
};

generateArrayNoRepeat(avatars, 1, QUANTITY_OF_PINS, QUANTITY_OF_PINS);

let map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

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

const renderPin = function (pin) {
  let pinElement = pinTemplate.cloneNode(true);
  let pinImage = pinElement.querySelector(`img`);
  pinElement.style.left = `${pin.location.x - PIN_OFFSET_X}px`;
  pinElement.style.top = `${pin.location.y - PIN_OFFSET_Y}px`;
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;
  return pinElement;
};

const insertPins = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < nearbyAds.length; i++) {
    fragment.appendChild(renderPin(nearbyAds[i]));
  }
  pinList.appendChild(fragment);
};

insertPins();

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

  cardTitle.textContent = card.offer.title || hide(cardTitle);
  cardAddress.textContent = card.offer.address || hide(cardAddress);
  cardPrice.textContent = (card.offer.price) ? `${card.offer.price}₽/ночь` : hide(cardPrice);
  cardType.textContent = card.offer.type || hide(cardType);
  cardCapacity.textContent = (card.offer.rooms && card.offer.guests) ? `${card.offer.rooms} комнаты для ${card.offer.guests} гостей` : hide(cardCapacity);
  cardTime.textContent = (card.offer.checkin && card.offer.checkout) ? `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}` : hide(cardTime);

  if (card.offer.features) {
    for (let i = cardFeatures.children.length - 1; i >= 0; i--) {
      let cardFeature = cardFeatures.children[i];
      let cardClass = cardFeature.className;
      let features = card.offer.features;
      let isInFeatureList = features.some(function (item) {
        return (cardClass.indexOf(item) > -1);
      });

      if (!isInFeatureList) {
        cardFeature.parentNode.removeChild(cardFeature);
      }
    }
  } else {
    hide(cardFeatures);
  }

  cardDescription.textContent = card.offer.description || hide(cardDescription);

  if (card.offer.photos) {
    cardPhoto.src = card.offer.photos[0];

    for (let i = 1; i < card.offer.photos.length; i++) {
      let copyPhoto = cardPhoto.cloneNode(true);
      copyPhoto.src = card.offer.photos[i];
      cardPhotos.appendChild(copyPhoto);
    }
  } else {
    hide(cardPhotos);
  }

  cardAvatar.src = card.author.avatar || hide(cardAvatar);

  return cardElement;
};

const insertCard = function () {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard(nearbyAds[0]));
  map.insertBefore(fragment, filters);
};

insertCard();
