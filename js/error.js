'use strict';

(function () {
  window.error = {
    showErrorMessage(msg) {
      let node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;
      node.textContent = msg;
      document.body.insertAdjacentElement(`afterbegin`, node);
    }
  };
}());
