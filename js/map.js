'use strict';

(function () {
  const filters = window.data.map.querySelector(`.map__filters-container`);
  const pinList = window.data.map.querySelector(`.map__pins`);

  window.map = {
    closePopup(popup) {
      popup.remove();
      document.removeEventListener(`keydown`, this.popupEscPressHandler);
    },
    popupEscPressHandler(evt) {
      let popup = document.querySelector(`.map__card`);
      if (evt.key === `Escape`) {
        evt.preventDefault();
        window.map.closePopup(popup);
      }
    },
    insertCard(index) {
      const fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.renderCard(window.data.nearbyAds[index]));
      window.data.map.insertBefore(fragment, filters);
    },
    clearCards() {
      let mapCards = window.data.map.querySelectorAll(`.map__card`);
      for (let i = mapCards.length - 1; i >= 0; i--) {
        let mapCard = mapCards[i];
        mapCard.parentNode.removeChild(mapCard);
      }
    },
    insertPins() {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < window.data.nearbyAds.length; i++) {
        fragment.appendChild(window.pin.renderPin(window.data.nearbyAds[i], i));
      }
      pinList.appendChild(fragment);
    }
  };
})();
