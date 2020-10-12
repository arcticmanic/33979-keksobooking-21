'use strict';

(function () {
  window.util = {
    getRandomIntInRange(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomItem(arr) {
      let randomElement = window.util.getRandomIntInRange(0, arr.length - 1);
      return arr[randomElement];
    },
    getRandomItemNoRepeat(arr) {
      let randomElement = window.util.getRandomIntInRange(0, arr.length - 1);
      let randomElementItem = arr[randomElement];
      arr.splice(randomElement, 1);
      return randomElementItem;
    },
    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    },
    getRandomArray(arr) {
      let newArray = arr.slice(0);
      let randomLength = window.util.getRandomIntInRange(1, newArray.length);
      window.util.shuffleArray(newArray);
      newArray = newArray.slice(-randomLength);
      return newArray;
    },
    getRandomKey(obj) {
      let keys = Object.keys(obj);
      return keys[keys.length * Math.random() << 0];
    },
    generateArrayNoRepeat(arr, min, max, quantity) {
      if (arr.length >= quantity) {
        return arr;
      }
      let newItem = window.util.getRandomIntInRange(min, max);
      if (arr.indexOf(newItem) < 0) {
        arr.push(newItem);
      }
      window.util.generateArrayNoRepeat(arr, min, max, quantity);
      return arr;
    },
    getRandomAvatarUrl(arr) {
      let avatarItem = window.util.getRandomItemNoRepeat(arr);
      return (typeof avatarItem === `undefined`) ? null : `img/avatars/user0${avatarItem}.png`;
    },
    getRandomPrice(min, max) {
      return window.util.getRandomIntInRange(min, max).toFixed(2);
    },
    getHide(element) {
      element.style.display = `none`;
    },
    filterNodesWithFeatureList(arr, featureList) {
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
    }
  };
})();
