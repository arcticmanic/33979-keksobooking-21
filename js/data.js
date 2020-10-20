'use strict';

(function () {
  const PIN_QUANTITY = 8;
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
  const DESCRIPTIONS = [`Описание 1`, `Описание 2`, `Описание 3`, `Описание 4`, `Описание 5`, `Описание 6`, `Описание 7`, `Описание 8`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]; // array
  const Y_MIN = 130;
  const Y_MAX = 630;
  const X_MIN = 0;
  const X_MAX = 1200;
  const PIN_OFFSET_X = 25;
  const PIN_OFFSET_Y = 35;
  const PIN_MAIN_OFFSET_X = 32;
  const PIN_MAIN_OFFSET_Y = 81;
  const SELECT_ROOMS_MAX_VALUE = 100;
  const PRICE_BUNGALOW_MIN = 0;
  const PRICE_FLAT_MIN = 1000;
  const PRICE_HOUSE_MIN = 5000;
  const PRICE_PALACE_MIN = 10000;
  const map = document.querySelector(`.map`);
  const avatars = window.util.generateArrayNoRepeat([], 1, PIN_QUANTITY, PIN_QUANTITY);
  const populateNearbyAds = function (arr, quantity) {
    for (let i = 0; i < quantity; i++) {
      arr.push(
          {
            "author": {
              "avatar": window.util.getRandomAvatarUrl(avatars)
            },
            "offer": {
              "title": window.util.getRandomItemNoRepeat(TITLES),
              "address": window.util.getRandomItemNoRepeat(ADDRESSES),
              "price": window.util.getRandomPrice(PRICE_MIN, PRICE_MAX),
              "type": TYPES[window.util.getRandomKey(TYPES)],
              "rooms": window.util.getRandomIntInRange(1, ROOMS_MAX),
              "guests": window.util.getRandomIntInRange(1, GUESTS_MAX),
              "checkin": window.util.getRandomItem(CHECKIN_TIMES),
              "checkout": window.util.getRandomItem(CHECKOUT_TIMES),
              "features": window.util.getRandomArray(FEATURES),
              "description": window.util.getRandomItemNoRepeat(DESCRIPTIONS),
              "photos": window.util.getRandomArray(PHOTOS)
            },
            "location": {
              "x": window.util.getRandomIntInRange(0, map.offsetWidth),
              "y": window.util.getRandomIntInRange(Y_MIN, Y_MAX)
            }
          }
      );
    }
    return arr;
  };

  window.data = {
    PIN_QUANTITY,
    TITLES,
    ADDRESSES,
    PRICE_MIN,
    PRICE_MAX,
    TYPES,
    ROOMS_MAX,
    GUESTS_MAX,
    CHECKIN_TIMES,
    CHECKOUT_TIMES,
    FEATURES,
    DESCRIPTIONS,
    PHOTOS,
    Y_MIN,
    Y_MAX,
    X_MIN,
    X_MAX,
    PIN_OFFSET_X,
    PIN_OFFSET_Y,
    PIN_MAIN_OFFSET_X,
    PIN_MAIN_OFFSET_Y,
    SELECT_ROOMS_MAX_VALUE,
    PRICE_BUNGALOW_MIN,
    PRICE_FLAT_MIN,
    PRICE_HOUSE_MIN,
    pricePalaceMin: PRICE_PALACE_MIN,
    nearbyAds: populateNearbyAds([], PIN_QUANTITY),
    map
  };
})();
