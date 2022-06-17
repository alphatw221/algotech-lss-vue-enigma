import Toastify from "toastify-js";
import dom from "@left4code/tw-starter/dist/js/dom";
import { clone } from "lodash";

const toastifyClass = "_" + Math.random().toString(36).substr(2, 9);

const init = (el, props) => {
  el.showToast = () => {
    const clonedEl = dom(el).clone().removeClass("hidden")[0];
    dom(clonedEl).addClass(toastifyClass);
    clonedEl.toastify = Toastify({
      duration: -1,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      ...props.options,
      node: clonedEl,
    }).showToast();

    dom(clonedEl).on("click", "[data-dismiss='notification']", function () {
      clonedEl.toastify.hideToast();
    });
  };

  el.showMessageToast = message => {
    const clonedEl = dom(el).clone().removeClass("hidden")[0];
    dom(clonedEl).addClass(toastifyClass);
    dom(clonedEl).find('#message')[0].innerHTML=message
    // dom(clonedEl).find('div')[0].text(message);
    clonedEl.toastify = Toastify({
      className: "info",
      text:message,
      duration: -1,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      ...props.options,
      node: clonedEl,
    }).showToast();

    dom(clonedEl).on("click", "[data-dismiss='notification']", function () {
      clonedEl.toastify.hideToast();
    });
  };

  el.buttonToast = (message,leftBTN,rightBTN,fun) => {
    const clonedEl = dom(el).clone().removeClass("hidden")[0];
    dom(clonedEl).addClass(toastifyClass);
    dom(clonedEl).find('#message')[0].innerHTML=message
    dom(clonedEl).find('#leftBTN')[0].innerHTML=leftBTN
    dom(clonedEl).find('#rightBTN')[0].innerHTML=rightBTN
    // dom(clonedEl).find('div')[0].text(message);
    clonedEl.toastify = Toastify({
      text:message,
      text:leftBTN,
      text:rightBTN,
      duration: -1,
      newWindow: false,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      ...props.options,
      node: clonedEl,
    }).showToast();

    dom(clonedEl).on("click", "[data-dismiss='notification']", function () {
      clonedEl.toastify.hideToast();
    });
    dom(clonedEl).on("click", "[data-dismiss='function']", function () {
      console.log('Here')
      fun()
      clonedEl.toastify.hideToast();
    });
  };


  el.hideToast = () => {
    dom(`.${toastifyClass}`).each(function () {
      dom(this)[0].toastify.hideToast();
    });
  };
};

const reInit = (el) => {
  dom(`.${toastifyClass}`).html(dom(el).html());
};

export { init, reInit };
