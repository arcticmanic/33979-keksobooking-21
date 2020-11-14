'use strict';

const filters = window.data.map.querySelector(`.map__filters-container`);
const pinList = window.data.map.querySelector(`.map__pins`);

window.map = {
  openPopup(popup) {
    popup.classList.add(`popup--show`);
    document.addEventListener(`keydown`, this.popupEscPressHandler);
  },
  closePopup(popup) {
    popup.classList.remove(`popup--show`);
    document.removeEventListener(`keydown`, this.popupEscPressHandler);
  },
  popupEscPressHandler(evt) {
    let popupList = document.querySelectorAll(`.popup`);
    if (evt.key === `Escape`) {
      evt.preventDefault();
      for (let i = 0; i < popupList.length; i++) {
        window.map.closePopup(popupList[i]);
      }
    }
  },
  insertCard(data) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.renderCard(data));
    window.data.map.insertBefore(fragment, filters);
  },
  hideCards() {
    let mapCards = window.data.map.querySelectorAll(`.map__card`);
    for (let i = mapCards.length - 1; i >= 0; i--) {
      let mapCard = mapCards[i];
      mapCard.classList.remove(`popup--show`);
    }
  },
  removeCards() {
    let mapCards = window.data.map.querySelectorAll(`.map__card`);
    for (let i = mapCards.length - 1; i >= 0; i--) {
      mapCards[i].remove();
    }
  },
  removePins() {
    let mapPins = pinList.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (mapPins) {
      for (let i = mapPins.length - 1; i >= 0; i--) {
        mapPins[i].remove();
      }
    }
  }
};
