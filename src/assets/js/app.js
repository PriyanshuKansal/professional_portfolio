import gsap from "gsap";
import Swiper, { Pagination, Navigation } from "swiper";
import { reviews } from "./data";
import imagesLoaded from "imagesloaded";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";

class DisableScrollPlugin extends ScrollbarPlugin {
  static pluginName = "disableScroll";

  static defaultOptions = {
    direction: "",
  };

  transformDelta(delta) {
    if (this.options.direction) {
      delta[this.options.direction] = 0;
    }

    return { ...delta };
  }
}

// load the plugin
Scrollbar.use(DisableScrollPlugin);

class AnchorPlugin extends ScrollbarPlugin {
  static pluginName = "anchor";

  onHashChange = () => {
    this.jumpToHash(window.location.hash);
  };

  onClick = (event) => {
    const { target } = event;

    if (target.tagName !== "A") {
      return;
    }

    const hash = target.getAttribute("href");

    if (!hash || hash.charAt(0) !== "#") {
      return;
    }

    this.jumpToHash(hash);
  };

  jumpToHash = (hash) => {
    const { scrollbar } = this;

    if (!hash) {
      return;
    }

    // reset scrollTop
    scrollbar.containerEl.scrollTop = 0;

    scrollbar.scrollIntoView(document.querySelector(hash));
  };

  onInit() {
    this.jumpToHash(window.location.hash);

    window.addEventListener("hashchange", this.onHashChange);

    this.scrollbar.contentEl.addEventListener("click", this.onClick);
  }

  onDestory() {
    window.removeEventListener("hashchange", this.onHashChange);

    this.scrollbar.contentEl.removeEventListener("click", this.onClick);
  }
}

// usage
Scrollbar.use(AnchorPlugin);

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }
// // When the user clicks on the button, scroll to the top of the document
// mybutton.addEventListener("click", backToTop);

// function backToTop() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }

const bar = document.querySelector(".loading__bar--inner");
const counter_num = document.querySelector(".loading__counter--number");

let c = 0;

let barInterval = setInterval(() => {
  bar.style.width = c + "%";
  counter_num.innerText = c + "%";
  ++c;
  if (c === 101) {
    clearInterval(barInterval);
    gsap.to(".loading__bar", {
      duration: 5,
      rotate: "90deg",
      left: "1000%",
    });
    gsap.to(".loading__text, .loading__counter", {
      duration: 0.5,
      opacity: 0,
    });
    gsap.to(".loading__box", {
      duration: 1,
      height: "350px",
      width: "350px",
      borderRadius: "50%",
    });
    gsap.to(".loading__svg", {
      duration: 10,
      opacity: 1,
      rotate: "360deg",
    });
    gsap.to(".loading__box", {
      delay: 2,
      border: "none",
    });
    imagesLoaded(document.querySelectorAll("img"), () => {
      gsap.to(".loading", {
        duration: 2,
        delay: 2,
        zIndex: 1,
        background: "transparent",
        opacity: 0.5,
      });
      gsap.to(".loading__svg", {
        delay: 2,
        duration: 100,
        rotate: "360deg",
      });
      gsap.to(".header", {
        delay: 2,
        duration: 1,
        top: 0,
      });
      gsap.to(".socials", {
        delay: 2.5,
        duration: 1,
        bottom: "9rem",
      });
      gsap.to(".scrollDown", {
        delay: 2.875,
        duration: 1,
        bottom: "2.75rem",
      });
      setTimeout(() => {
        let options = {
          damping: 0.1,
          alwaysShowTracks: true,
          plugins: {
            disableScroll: {
              direction: "x",
            },
          },
        };
        let pageSmoothScroll = Scrollbar.init(document.body, options);
        pageSmoothScroll.track.xAxis.element.remove();
      }, 2000);
    });
  }
}, 25);

// reviews swiper
Swiper.use([Pagination, Navigation]);
var swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    850: {
      slidesPerView: 2,
    },
    1400: {
      slidesPerView: 3,
    },
    2200: {
      slidesPerView: 4,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiper_container = document.querySelector(".swiper-wrapper");
reviews.map((review) => {
  let template = `<div class="swiper-slide"><div class="review"><img src="assets/icons/quote.svg" alt="" class="quoteSvg"><div class="review__card"><div class="review__topborder"></div><div class="review__text"><span>${review.review.substring(
    0,
    1
  )}</span>${review.review.substring(1, review.review.length)}</div><img src=${
    review.image
  } alt="" class="review__img"><div class="review__profile"><span>${
    review.name
  }</span><span>${review.position}</span></div></div></div></div>`;
  //swiper_container.innerHTML += template;
});

const questions = [...document.querySelectorAll(".question")];
questions.map((question) => {
  let q_text = question.querySelector("h3");
  q_text.addEventListener("click", () => {
    questions
      .filter((q) => q !== question)
      .map((q) => q.classList.remove("open"));
    question.classList.toggle("open");
  });
});
