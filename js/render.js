'use strict';

const pinList = window.data.map.querySelector(`.map__pins`);
const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderPin = (pin, index) => {
  let pinElement = similarPinTemplate.cloneNode(true);
  let pinImage = pinElement.querySelector(`img`);
  pinElement.style.left = `${pin.location.x - window.data.PIN_OFFSET_X}px`;
  pinElement.style.top = `${pin.location.y - window.data.PIN_OFFSET_Y}px`;
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;
  pinElement.addEventListener(`click`, window.pin.pinClickHandler(pinElement, index));
  return pinElement;
};

window.render = (pins) => {
  const fragment = document.createDocumentFragment();
  const takeNumber = pins.length > window.data.MAX_SIMILAR_PINS_COUNT
    ? window.data.MAX_SIMILAR_PINS_COUNT
    : pins.length;

  window.map.removePins();
  window.map.removeCards();

  for (let i = 0; i < takeNumber; i++) {
    if (pins[i].hasOwnProperty(`offer`)) {
      fragment.appendChild(renderPin(pins[i], i));
      window.map.insertCard(pins[i]);
    }

  }
  pinList.appendChild(fragment);
};
