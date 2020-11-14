'use strict';

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
const MAX_SIMILAR_PINS_COUNT = 5;
const TYPES = {
  'any': `any`,
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};
const FILTER_ROOMS = {
  'typeOne': 1,
  'typeTwo': 2,
  'typeThree': 3
};
const FILTER_GUESTS = {
  'typeOne': 0,
  'typeTwo': 1,
  'typeThree': 2
};
const FILTER_PRICES = {
  'typeOne': `low`,
  'typeTwo': `middle`,
  'typeThree': `high`
};
const FILTER_PRICE_STEP_ONE = 10000;
const FILTER_PRICE_STEP_TWO = 50000;
const FILTER_ROOMS_STEP_ONE = 1;
const FILTER_ROOMS_STEP_TWO = 2;
const FILTER_ROOMS_STEP_THREE = 3;
const FILTER_GUESTS_STEP_ONE = 0;
const FILTER_GUESTS_STEP_TWO = 1;
const FILTER_GUESTS_STEP_THREE = 2;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
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
  MAX_SIMILAR_PINS_COUNT,
  TYPES,
  FILTER_PRICE_STEP_ONE,
  FILTER_PRICE_STEP_TWO,
  FILTER_ROOMS_STEP_ONE,
  FILTER_ROOMS_STEP_TWO,
  FILTER_ROOMS_STEP_THREE,
  FILTER_GUESTS_STEP_ONE,
  FILTER_GUESTS_STEP_TWO,
  FILTER_GUESTS_STEP_THREE,
  FILTER_ROOMS,
  FILTER_GUESTS,
  FILTER_PRICES,
  FILE_TYPES,
  map
};
