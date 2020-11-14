(()=>{"use strict";window.util={getHide(e){e.style.display="none"},filterNodesWithFeatureList(e,t){for(let o=e.children.length-1;o>=0;o--){let n=e.children[o],a=n.className;t.some((e=>a.indexOf(e)>-1))||e.removeChild(n)}}},(()=>{const e=(e,t)=>{let o=new XMLHttpRequest;return o.responseType="json",o.timeout=1e4,o.addEventListener("load",(()=>{200===o.status?e(o.response):t("Статус ответа: "+o.status+" "+o.statusText)})),o.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{t("Запрос не успел выполниться за "+o.timeout+"мс")})),o};window.backend={save(t,o,n){let a=e(o,n);a.open("POST","https://21.javascript.pages.academy/keksobooking"),a.send(t)},load(t,o){let n=e(t,o);n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()}}})(),window.error={showErrorMessage(e){let t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}},(()=>{const e=document.querySelector(".map");window.data={Y_MIN:130,Y_MAX:630,X_MIN:0,X_MAX:1200,PIN_OFFSET_X:25,PIN_OFFSET_Y:35,PIN_MAIN_OFFSET_X:32,PIN_MAIN_OFFSET_Y:81,SELECT_ROOMS_MAX_VALUE:100,PRICE_BUNGALOW_MIN:0,PRICE_FLAT_MIN:1e3,PRICE_HOUSE_MIN:5e3,PRICE_PALACE_MIN:1e4,MAX_SIMILAR_PINS_COUNT:5,TYPES:{any:"any",palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},FILTER_PRICE_STEP_ONE:1e4,FILTER_PRICE_STEP_TWO:5e4,FILTER_ROOMS_STEP_ONE:1,FILTER_ROOMS_STEP_TWO:2,FILTER_ROOMS_STEP_THREE:3,FILTER_GUESTS_STEP_ONE:0,FILTER_GUESTS_STEP_TWO:1,FILTER_GUESTS_STEP_THREE:2,FILTER_ROOMS:{typeOne:1,typeTwo:2,typeThree:3},FILTER_GUESTS:{typeOne:0,typeTwo:1,typeThree:2},FILTER_PRICES:{typeOne:"low",typeTwo:"middle",typeThree:"high"},FILE_TYPES:["gif","jpg","jpeg","png"],map:e}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=window.data.map.querySelector(".map__pins"),t=document.querySelector("#pin").content.querySelector(".map__pin"),o=(e,o)=>{let n=t.cloneNode(!0),a=n.querySelector("img");return n.style.left=e.location.x-window.data.PIN_OFFSET_X+"px",n.style.top=e.location.y-window.data.PIN_OFFSET_Y+"px",a.src=e.author.avatar,a.alt=e.offer.title,n.addEventListener("click",window.pin.pinClickHandler(n,o)),n};window.render=t=>{const n=document.createDocumentFragment(),a=t.length>window.data.MAX_SIMILAR_PINS_COUNT?window.data.MAX_SIMILAR_PINS_COUNT:t.length;window.map.removePins(),window.map.removeCards();for(let e=0;e<a;e++)t[e].hasOwnProperty("offer")&&(n.appendChild(o(t[e],e)),window.map.insertCard(t[e]));e.appendChild(n)}})(),window.move={mouseDownHandler(e,t){if(t.preventDefault(),!window.data.map.classList.contains("map--faded")){let o={x:t.clientX,y:t.clientY},n=!1,a=t=>{t.preventDefault(),n=!0;let a=o.x-t.clientX,d=o.y-t.clientY;o={x:t.clientX,y:t.clientY};let r=e.offsetLeft-a;e.offsetLeft-a<0?r=0:e.offsetLeft+e.offsetWidth-a>window.data.X_MAX&&(r=window.data.X_MAX-e.offsetWidth);let i=e.offsetTop-d;e.offsetTop-d<window.data.Y_MIN-window.data.PIN_MAIN_OFFSET_Y?i=window.data.Y_MIN-window.data.PIN_MAIN_OFFSET_Y:e.offsetTop+window.data.PIN_MAIN_OFFSET_Y-d>window.data.Y_MAX&&(i=window.data.Y_MAX-window.data.PIN_MAIN_OFFSET_Y),e.style.left=r+"px",e.style.top=i+"px";let{x:s,y:w}=window.pin.getPinCoordinates(window.pin.pinMain,window.data.PIN_MAIN_OFFSET_X,window.data.PIN_MAIN_OFFSET_Y);window.form.addressAdForm.value=`${s}, ${w}`},d=t=>{if(t.preventDefault(),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",d),window.data.map.removeEventListener("mouseleave",r),n){let t=o=>{o.preventDefault(),e.removeEventListener("click",t)};e.addEventListener("click",t)}},r=e=>{e.preventDefault(),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",d),window.data.map.removeEventListener("mouseleave",r)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",d),window.data.map.addEventListener("mouseleave",r)}}},(()=>{const e=document.querySelector("#card").content.querySelector(".map__card");window.card={renderCard(t){let o=e.cloneNode(!0),n=o.querySelector(".popup__title"),a=o.querySelector(".popup__text--address"),d=o.querySelector(".popup__text--price"),r=o.querySelector(".popup__type"),i=o.querySelector(".popup__text--capacity"),s=o.querySelector(".popup__text--time"),w=o.querySelector(".popup__features"),l=o.querySelector(".popup__description"),p=o.querySelector(".popup__photos"),c=o.querySelector(".popup__photo"),u=o.querySelector(".popup__avatar"),m=o.querySelector(".popup__close");if(n.textContent=t.offer.title||window.util.getHide(n),a.textContent=t.offer.address||window.util.getHide(a),d.textContent=t.offer.price?t.offer.price+" ₽/ночь":window.util.getHide(d),r.textContent=window.data.TYPES[t.offer.type]||window.util.getHide(r),i.textContent=t.offer.rooms&&t.offer.guests?`${t.offer.rooms} комнаты для ${t.offer.guests} гостей`:window.util.getHide(i),s.textContent=t.offer.checkin&&t.offer.checkout?`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`:window.util.getHide(s),m.addEventListener("click",(()=>{window.map.closePopup(o)})),m.addEventListener("keydown",(e=>{"Enter"===e.key&&window.map.closePopup(o)})),document.addEventListener("keydown",window.map.popupEscPressHandler),t.offer.features?window.util.filterNodesWithFeatureList(w,t.offer.features):window.util.getHide(w),l.textContent=t.offer.description||window.util.getHide(l),t.offer.photos.length){c.src=t.offer.photos[0];for(let e=1;e<t.offer.photos.length;e++){let o=c.cloneNode(!0);o.src=t.offer.photos[e],p.appendChild(o)}}else window.util.getHide(p);return u.src=t.author.avatar||window.util.getHide(u),o}}})(),(()=>{let e={data:{},filterFormChangeHandler(){}};const t=document.querySelector(".map__filters");t.addEventListener("change",(()=>{const o=t.querySelectorAll(".map__checkbox");e.data.type=t.querySelector("#housing-type").value,e.data.price=t.querySelector("#housing-price").value,e.data.rooms=t.querySelector("#housing-rooms").value,e.data.guests=t.querySelector("#housing-guests").value,e.data.features=Array.from(o).filter((e=>e.checked)).map((e=>e.value)),e.filterFormChangeHandler(e.data)})),window.filter={filterForm:t,setFormChangeHandler(t){e.filterFormChangeHandler=t}}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=e=>{0===e.button&&window.main.makeProjectActive((()=>{window.backend.load(window.pins.successHandler,window.pins.errorHandler)}))},o=e=>{"Enter"===e.key&&window.main.makeProjectActive((()=>{window.backend.load(window.pins.successHandler,window.pins.errorHandler)}))};e.addEventListener("mousedown",t),e.addEventListener("keydown",o),e.addEventListener("mousedown",(t=>{window.move.mouseDownHandler(e,t)})),window.pin={pinMain:e,pinClickHandler:(e,t)=>()=>{let o=window.data.map.querySelectorAll(".map__card"),n=window.data.map.querySelectorAll(".map__pin");window.map.hideCards(),(e=>{for(let t=0;t<e.length;t++)e[t].classList.remove("map__pin--active")})(n),window.map.openPopup(o[t]),(e=>{e.classList.add("map__pin--active")})(e)},pinMainKeydownHandler:o,pinMainMousedownHandler:t,getPinCoordinates:(e,t,o)=>({x:e.offsetLeft+t,y:e.offsetTop+o}),setPinCoordinates(e,t,o,n,a){e.style.left=t-n+"px",e.style.top=o-a+"px"}}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelector(".map__filters");let o=[];const n=e=>{window.render(e)};window.filter.setFormChangeHandler(window.debounce((e=>{let t=o;switch(e.type!==window.data.TYPES.any&&(t=o.filter((t=>t.offer.type===e.type))),e.price){case window.data.FILTER_PRICES.typeTwo:t=t.filter((e=>e.offer.price>=window.data.FILTER_PRICE_STEP_ONE&&e.offer.price<=window.data.FILTER_PRICE_STEP_TWO));break;case window.data.FILTER_PRICES.typeOne:t=t.filter((e=>e.offer.price<window.data.FILTER_PRICE_STEP_ONE));break;case window.data.FILTER_PRICES.typeThree:t=t.filter((e=>e.offer.price>window.data.FILTER_PRICE_STEP_TWO))}switch(Number(e.rooms)){case window.data.FILTER_ROOMS.typeOne:t=t.filter((e=>e.offer.rooms===window.data.FILTER_ROOMS_STEP_ONE));break;case window.data.FILTER_ROOMS.typeTwo:t=t.filter((e=>e.offer.rooms===window.data.FILTER_ROOMS_STEP_TWO));break;case window.data.FILTER_ROOMS.typeThree:t=t.filter((e=>e.offer.rooms===window.data.FILTER_ROOMS_STEP_THREE))}switch(Number(e.guests)){case window.data.FILTER_GUESTS.typeOne:t=t.filter((e=>e.offer.guests===window.data.FILTER_GUESTS_STEP_ONE));break;case window.data.FILTER_GUESTS.typeTwo:t=t.filter((e=>e.offer.guests===window.data.FILTER_GUESTS_STEP_TWO));break;case window.data.FILTER_GUESTS.typeThree:t=t.filter((e=>e.offer.guests===window.data.FILTER_GUESTS_STEP_THREE))}t=t.filter((t=>e.features.every((e=>t.offer.features.includes(e))))),n(t)}))),window.pins={successHandler:n=>{o=n,window.render(o);let{x:a,y:d}=window.pin.getPinCoordinates(e,window.data.PIN_MAIN_OFFSET_X,window.data.PIN_MAIN_OFFSET_Y);window.form.addressAdForm.value=`${a}, ${d}`,e.removeEventListener("mousedown",window.pin.pinMainMousedownHandler,!1),e.removeEventListener("keydown",window.pin.pinMainKeydownHandler,!1),window.form.changeFormFieldsStatus(t,!1)},errorHandler:e=>{window.error.showErrorMessage(e)},updatePins:n}})(),(()=>{const e=window.data.map.querySelector(".map__filters-container"),t=window.data.map.querySelector(".map__pins");window.map={openPopup(e){e.classList.add("popup--show"),document.addEventListener("keydown",this.popupEscPressHandler)},closePopup(e){e.classList.remove("popup--show"),document.removeEventListener("keydown",this.popupEscPressHandler)},popupEscPressHandler(e){let t=document.querySelectorAll(".popup");if("Escape"===e.key){e.preventDefault();for(let e=0;e<t.length;e++)window.map.closePopup(t[e])}},insertCard(t){const o=document.createDocumentFragment();o.appendChild(window.card.renderCard(t)),window.data.map.insertBefore(o,e)},hideCards(){let e=window.data.map.querySelectorAll(".map__card");for(let t=e.length-1;t>=0;t--)e[t].classList.remove("popup--show")},removeCards(){let e=window.data.map.querySelectorAll(".map__card");for(let t=e.length-1;t>=0;t--)e[t].remove()},removePins(){let e=t.querySelectorAll(".map__pin:not(.map__pin--main)");if(e)for(let t=e.length-1;t>=0;t--)e[t].remove()}}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector(".ad-form"),o=t.querySelector("#address"),n=t.querySelector("#room_number"),a=t.querySelector("#capacity"),d=t.querySelector("#type"),r=t.querySelector("#price"),i=t.querySelector("#timein"),s=t.querySelector("#timeout"),w=document.querySelector("#success").content.querySelector(".success"),l=document.querySelector("#error").content.querySelector(".error"),p=t.querySelector(".ad-form__reset"),c=t.querySelector(".ad-form-header__input[type=file]"),u=t.querySelector(".ad-form-header__preview img"),m=t.querySelector(".ad-form__input[type=file]"),_=t.querySelector(".ad-form__photo");let{x:E,y:f}=window.pin.getPinCoordinates(window.pin.pinMain,window.data.PIN_MAIN_OFFSET_X,window.data.PIN_MAIN_OFFSET_Y);o.value=`${E}, ${f}`;const y=()=>{let e=Number(n.value),t=Number(a.value);e<t?(n.setCustomValidity("Мест для всех не хватит!"),a.setCustomValidity("Мест для всех не хватит!")):e===window.data.SELECT_ROOMS_MAX_VALUE&&0!==t?(n.setCustomValidity("Не для гостей!"),a.setCustomValidity("Не для гостей!")):0===t&&e!==window.data.SELECT_ROOMS_MAX_VALUE?(n.setCustomValidity("Нужно больше комнат!"),a.setCustomValidity("Нужно больше комнат!")):(n.setCustomValidity(""),a.setCustomValidity(""))},S=()=>{let e=d.value,t=Number(r.value);"bungalow"===e&&t<window.data.PRICE_BUNGALOW_MIN?r.setCustomValidity("Минимальная цена за ночь "+window.data.PRICE_BUNGALOW_MIN):"flat"===e&&t<window.data.PRICE_FLAT_MIN?r.setCustomValidity("Минимальная цена за ночь "+window.data.PRICE_FLAT_MIN):"house"===e&&t<window.data.PRICE_HOUSE_MIN?r.setCustomValidity("Минимальная цена за ночь "+window.data.PRICE_HOUSE_MIN):"palace"===e&&t<window.data.PRICE_PALACE_MIN?r.setCustomValidity("Минимальная цена за ночь "+window.data.PRICE_PALACE_MIN):r.setCustomValidity("")},v=e=>{e.preventDefault();let t=document.querySelector(".error")||document.querySelector(".success");document.removeEventListener("keydown",T,!1),document.removeEventListener("click",v,!1),t.remove()},T=e=>{if("Escape"===e.key){e.preventDefault();let t=document.querySelector(".error")||document.querySelector(".success");document.removeEventListener("keydown",T,!1),document.removeEventListener("click",v,!1),t.remove()}},L=()=>{window.map.removePins(),window.map.removeCards(),t.reset(),window.filter.filterForm.reset()},I=()=>{let t=w.cloneNode(!0);e.appendChild(t),document.addEventListener("keydown",T),document.addEventListener("click",v),L(),window.main.makeProjectDisabled((()=>{window.pin.pinMain.addEventListener("mousedown",window.pin.pinMainMousedownHandler),window.pin.pinMain.addEventListener("keydown",window.pin.pinMainKeydownHandler)}))},F=t=>{let o=l.cloneNode(!0);o.querySelector(".error__message").textContent=t,e.appendChild(o),document.addEventListener("keydown",T),document.addEventListener("click",v)};o.addEventListener("keypress",(e=>{e.preventDefault()})),r.addEventListener("input",(()=>{S(),y(),r.reportValidity()})),t.addEventListener("change",(e=>{e.target&&(e.target.matches("#room_number")||e.target.matches("#capacity"))?(y(),e.target.reportValidity()):e.target&&e.target.matches("#type")?(S(),r.reportValidity()):e.target&&e.target.matches("#timein")?s.value=e.target.value:e.target&&e.target.matches("#timeout")&&(i.value=e.target.value)})),t.addEventListener("submit",(e=>{e.preventDefault(),S(),y(),r.reportValidity(),window.backend.save(new FormData(t),I,F)})),p.addEventListener("click",(e=>{e.preventDefault(),L(),window.main.makeProjectDisabled((()=>{window.pin.pinMain.addEventListener("mousedown",window.pin.pinMainMousedownHandler),window.pin.pinMain.addEventListener("keydown",window.pin.pinMainKeydownHandler)}))})),c.addEventListener("change",(()=>{let e=c.files[0],t=e.name.toLowerCase();if(window.data.FILE_TYPES.some((e=>t.endsWith(e)))){const t=new FileReader;t.addEventListener("load",(()=>{u.src=t.result})),t.readAsDataURL(e)}})),m.addEventListener("change",(()=>{let e=m.files[0],t=e.name.toLowerCase(),o=document.createElement("img");if(o.style="display: block; margin: 0 auto; max-width: 100%; height: 100%;",window.data.FILE_TYPES.some((e=>t.endsWith(e)))){const t=new FileReader;t.addEventListener("load",(()=>{o.src=t.result,_.insertAdjacentElement("afterbegin",o)})),t.readAsDataURL(e)}})),window.form={adForm:t,addressAdForm:o,changeFormFieldsStatus(e,t){let o=e.children;for(let e=0;e<o.length;e++)o[e].disabled=t}}})(),(()=>{let e=window.pin.getPinCoordinates(window.pin.pinMain,window.data.PIN_MAIN_OFFSET_X,window.data.PIN_MAIN_OFFSET_Y);window.main={makeProjectActive(e){window.data.map.classList.remove("map--faded"),window.form.adForm.classList.remove("ad-form--disabled"),window.form.changeFormFieldsStatus(window.form.adForm,!1),e()},makeProjectDisabled(t){window.pin.setPinCoordinates(window.pin.pinMain,e.x,e.y,window.data.PIN_MAIN_OFFSET_X,window.data.PIN_MAIN_OFFSET_Y),window.data.map.classList.add("map--faded"),window.form.adForm.classList.add("ad-form--disabled"),window.form.changeFormFieldsStatus(window.form.adForm,!0),window.form.changeFormFieldsStatus(window.filter.filterForm,!0),window.form.addressAdForm.value=`${e.x}, ${e.y}`,t()}},window.main.makeProjectDisabled((()=>{}))})()})();