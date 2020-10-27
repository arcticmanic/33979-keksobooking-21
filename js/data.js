'use strict';

(function () {
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
  const TYPES = {
    'palace': `Дворец`,
    'flat': `Квартира`,
    'house': `Дом`,
    'bungalow': `Бунгало`
  };
  const map = document.querySelector(`.map`);

  window.data = {
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
    PRICE_PALACE_MIN,
    TYPES,
    map
  };
})();
