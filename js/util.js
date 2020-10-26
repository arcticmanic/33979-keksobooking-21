'use strict';

(function () {
  window.util = {
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
