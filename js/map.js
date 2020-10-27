'use strict';

(function () {
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
    insertCards(data) {
      for (let i = 0; i < data.length; i++) {
        window.map.insertCard(data[i]);
      }
    },
    insertPins(pins) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < pins.length; i++) {
        if (pins[i].hasOwnProperty(`offer`)) {
          fragment.appendChild(window.pin.renderPin(pins[i], i));
        }
      }
      pinList.appendChild(fragment);
    },
    removeElements(elements) {
      for (let i = elements.length - 1; i >= 0; i--) {
        elements[i].remove();
      }
    }
  };
})();
