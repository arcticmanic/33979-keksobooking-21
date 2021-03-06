'use strict';

window.move = {
  mouseDownHandler(target, evt) {
    evt.preventDefault();

    let isProjectActive = !window.data.map.classList.contains(`map--faded`);

    if (isProjectActive) {
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let dragged = false;

      let mouseMoveHandler = (moveEvt) => {
        moveEvt.preventDefault();

        dragged = true;

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let left = target.offsetLeft - shift.x;
        if (target.offsetLeft - shift.x < 0) {
          left = 0;
        } else if (target.offsetLeft + target.offsetWidth - shift.x > window.data.X_MAX) {
          left = window.data.X_MAX - target.offsetWidth;
        }

        let top = target.offsetTop - shift.y;
        if (target.offsetTop - shift.y < window.data.Y_MIN - window.data.PIN_MAIN_OFFSET_Y) {
          top = window.data.Y_MIN - window.data.PIN_MAIN_OFFSET_Y;
        } else if (target.offsetTop + window.data.PIN_MAIN_OFFSET_Y - shift.y > window.data.Y_MAX) {
          top = window.data.Y_MAX - window.data.PIN_MAIN_OFFSET_Y;
        }

        target.style.left = left + `px`;
        target.style.top = top + `px`;

        let {x, y} = window.pin.getPinCoordinates(window.pin.pinMain, window.data.PIN_MAIN_OFFSET_X, window.data.PIN_MAIN_OFFSET_Y);
        window.form.addressAdForm.value = `${x}, ${y}`;
      };

      let mouseUpHandler = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, mouseMoveHandler);
        document.removeEventListener(`mouseup`, mouseUpHandler);
        window.data.map.removeEventListener(`mouseleave`, mouseLeaveHandler);

        if (dragged) {
          let clickPreventDefaultHandler = (clickEvt) => {
            clickEvt.preventDefault();
            target.removeEventListener(`click`, clickPreventDefaultHandler);
          };
          target.addEventListener(`click`, clickPreventDefaultHandler);
        }
      };

      let mouseLeaveHandler = (outEvt) => {
        outEvt.preventDefault();
        document.removeEventListener(`mousemove`, mouseMoveHandler);
        document.removeEventListener(`mouseup`, mouseUpHandler);
        window.data.map.removeEventListener(`mouseleave`, mouseLeaveHandler);
      };

      document.addEventListener(`mousemove`, mouseMoveHandler);
      document.addEventListener(`mouseup`, mouseUpHandler);
      window.data.map.addEventListener(`mouseleave`, mouseLeaveHandler);
    }
  }
};
