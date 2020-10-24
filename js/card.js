'use strict';

(function () {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  window.card = {
    renderCard(card) {
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

      cardTitle.textContent = card.offer.title || window.util.getHide(cardTitle);
      cardAddress.textContent = card.offer.address || window.util.getHide(cardAddress);
      cardPrice.textContent = (card.offer.price) ? `${card.offer.price} ₽/ночь` : window.util.getHide(cardPrice);
      cardType.textContent = card.offer.type || window.util.getHide(cardType);
      cardCapacity.textContent = (card.offer.rooms && card.offer.guests) ? `${card.offer.rooms} комнаты для ${card.offer.guests} гостей` : window.util.getHide(cardCapacity);
      cardTime.textContent = (card.offer.checkin && card.offer.checkout) ? `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}` : window.util.getHide(cardTime);

      cardClose.addEventListener(`click`, function () {
        window.map.closePopup(cardElement);
      });

      cardClose.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          window.map.closePopup(cardElement);
        }
      });

      document.addEventListener(`keydown`, window.map.popupEscPressHandler);

      if (card.offer.features) {
        window.util.filterNodesWithFeatureList(cardFeatures, card.offer.features);
      } else {
        window.util.getHide(cardFeatures);
      }

      cardDescription.textContent = card.offer.description || window.util.getHide(cardDescription);

      if (card.offer.photos.length) {
        cardPhoto.src = card.offer.photos[0];

        for (let i = 1; i < card.offer.photos.length; i++) {
          let copyPhoto = cardPhoto.cloneNode(true);
          copyPhoto.src = card.offer.photos[i];
          cardPhotos.appendChild(copyPhoto);
        }
      } else {
        window.util.getHide(cardPhotos);
      }

      cardAvatar.src = card.author.avatar || window.util.getHide(cardAvatar);

      return cardElement;
    }
  };
})();
