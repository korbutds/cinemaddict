/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/create-cards-mock-data.js":
/*!***************************************!*\
  !*** ./src/create-cards-mock-data.js ***!
  \***************************************/
/*! exports provided: createCardsMockData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCardsMockData", function() { return createCardsMockData; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


const YearsLimit = {
  MIN: 2010,
  MAX: 2019
};

const RatingLimit = {
  MIN: 0.1,
  MAX: 10
};

const HoursLimit = {
  MIN: 1,
  MAX: 5
};

const MinutesLimit = {
  MIN: 0,
  MAX: 59
};

const CommentsLimit = {
  MIN: 0,
  MAX: 15
};

const IMAGES = [
  `./images/posters/three-friends.jpg`,
  `./images/posters/moonrise.jpg`,
  `./images/posters/fuga-da-new-york.jpg`,
  `./images/posters/blue-blazes.jpg`,
  `./images/posters/accused.jpg`,
  `./images/posters/blackmail.jpg`
];

const TITLES = [
  `Lorem ipsum rutrum quisque malesuada donec malesuada`,
  `Lorem ipsum ligula risus sodales commodo sit`,
  `Lorem ipsum sagittis fusce, sodales magna mauris`,
  `Lorem ipsum vivamus ipsum vitae maecenas et`,
  `Lorem ipsum maecenas: ligula justo arcu porta`,
  `Lorem ipsum at: arcu, tempus urna vivamus`,
  `Lorem, ipsum pharetra quam ut pharetra duis`
];

const GENRES = [
  `Comedy`,
  `Adventure`,
  `Musical`,
  `Crime`,
  `Western`,
  `Epic`,
  `Drama`
];

const DESCRIPTIONS = [
  `Lorem ipsum quisque, donec morbi sed pharetra massa et ultricies leo et magna, ipsum sapien, bibendum commodo fusce sagittis quam ipsum risus nulla: et.`,
  `Lorem ipsum mattis justo proin maecenas, morbi sapien massa sapien elementum lorem magna ornare, sapien lorem.`,
  `Lorem ipsum massa in adipiscing mattis nec nibh enim ornare molestie sodales mattis congue leo non magna proin, non tempus maecenas.`,
  `Lorem ipsum malesuada elementum amet ut quisque enim adipiscing gravida eros magna duis ornare rutrum cursus ipsum malesuada.`,
  `Lorem ipsum, nec gravida odio sodales congue nam justo, quisque ligula cursus nibh auctor: porta a arcu cursus fusce porttitor: cursus tempus enim.`,
  `Lorem ipsum quam, cursus lorem orci adipiscing - odio, ut in vivamus nec ligula eros elementum at.`,
  `Lorem ipsum porta porttitor nec odio nec nam, eget fusce lorem ultricies risus lorem, lectus vitae integer gravida ligula porttitor sit curabitur.`
];

const generateRandomRatingValue = function () {
  return (Math.random() * (RatingLimit.MAX - RatingLimit.MIN) + RatingLimit.MIN).toFixed(1);
};

const getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

const createRandomData = () => (
  {
    title: getRandomArrayElement(TITLES),
    rating: generateRandomRatingValue(),
    year: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["generateRandomNumber"])(YearsLimit.MIN, YearsLimit.MAX),
    duration: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["generateRandomNumber"])(HoursLimit.MIN, HoursLimit.MAX) + `h `
      + Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["generateRandomNumber"])(MinutesLimit.MIN, MinutesLimit.MAX) + `m`,
    genre: getRandomArrayElement(GENRES),
    image: getRandomArrayElement(IMAGES),
    description: getRandomArrayElement(DESCRIPTIONS),
    comments: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["generateRandomNumber"])(CommentsLimit.MIN, CommentsLimit.MAX)
  }
);

const createNumberRange = (limit) => (
  Array.from(new Array(limit), (_, i) => i)
);

const createCardsMockData = (limit) => (
  createNumberRange(limit).map(() => createRandomData())
);


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _create_cards_mock_data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-cards-mock-data.js */ "./src/create-cards-mock-data.js");
/* harmony import */ var _templates_cards_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/cards.js */ "./src/templates/cards.js");
/* harmony import */ var _templates_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates/filter.js */ "./src/templates/filter.js");






const AmountLimit = {
  MIN: 2,
  MAX: 7
};

const filmsMainElement = document.querySelector(`.films-list .films-list__container`);
const filmsTopRatedElement = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const filmsMostCommentedElement = document.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);
const filterElement = document.querySelector(`.main-navigation`);

const addFilterClickEventListener = () => {
  document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`).forEach((element) => {
    element.addEventListener(`click`, () => {
      filmsMainElement.innerHTML = Object(_templates_cards_js__WEBPACK_IMPORTED_MODULE_2__["createCardsTemplate"])(Object(_create_cards_mock_data_js__WEBPACK_IMPORTED_MODULE_1__["createCardsMockData"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["generateRandomNumber"])(AmountLimit.MIN, AmountLimit.MAX)));
    });
  });
};

filmsMainElement.innerHTML = Object(_templates_cards_js__WEBPACK_IMPORTED_MODULE_2__["createCardsTemplate"])(Object(_create_cards_mock_data_js__WEBPACK_IMPORTED_MODULE_1__["createCardsMockData"])(AmountLimit.MAX));
filmsTopRatedElement.innerHTML = Object(_templates_cards_js__WEBPACK_IMPORTED_MODULE_2__["createCardsNoControlsTemplate"])(Object(_create_cards_mock_data_js__WEBPACK_IMPORTED_MODULE_1__["createCardsMockData"])(AmountLimit.MIN));
filmsMostCommentedElement.innerHTML = Object(_templates_cards_js__WEBPACK_IMPORTED_MODULE_2__["createCardsNoControlsTemplate"])(Object(_create_cards_mock_data_js__WEBPACK_IMPORTED_MODULE_1__["createCardsMockData"])(AmountLimit.MIN));
filterElement.innerHTML = Object(_templates_filter_js__WEBPACK_IMPORTED_MODULE_3__["createFilterTemplate"])();

addFilterClickEventListener();


/***/ }),

/***/ "./src/templates/cards.js":
/*!********************************!*\
  !*** ./src/templates/cards.js ***!
  \********************************/
/*! exports provided: createCardsNoControlsTemplate, createCardsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCardsNoControlsTemplate", function() { return createCardsNoControlsTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCardsTemplate", function() { return createCardsTemplate; });
const createCardsNoControlsTemplate = (array) => (
  array.map((card) => (
    `<article class="film-card film-card--no-controls">
      <h3 class="film-card__title">${card.title}</h3>
      <p class="film-card__rating">${card.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${card.year}</span>
        <span class="film-card__duration">${card.duration}</span>
        <span class="film-card__genre">${card.genre}</span>
      </p>
      <img src="${card.image}" alt="" class="film-card__poster">
      <button class="film-card__comments">${card.comments} comments</button>
    </article>`
  )).join(``)
);

const createCardsTemplate = (array) => (
  array.map((card) => (
    `<article class="film-card">
      <h3 class="film-card__title">${card.title}</h3>
      <p class="film-card__rating">${card.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${card.year}</span>
        <span class="film-card__duration">${card.duration}</span>
        <span class="film-card__genre">${card.genre}</span>
      </p>
      <img src="${card.image}" alt="" class="film-card__poster">
      <p class="film-card__description">${card.description}</p>
      <button class="film-card__comments">${card.comments} comments</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`
  )).join(``)
);


/***/ }),

/***/ "./src/templates/filter.js":
/*!*********************************!*\
  !*** ./src/templates/filter.js ***!
  \*********************************/
/*! exports provided: createFilterTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilterTemplate", function() { return createFilterTemplate; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const AmountLimit = {
  MIN: 0,
  MAX: 100
};

const createFilterTemplate = () => (
  `<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["generateRandomNumber"])(AmountLimit.MIN, AmountLimit.MAX)}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["generateRandomNumber"])(AmountLimit.MIN, AmountLimit.MAX)}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["generateRandomNumber"])(AmountLimit.MIN, AmountLimit.MAX)}</span></a>
  <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>`
);


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: generateRandomNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRandomNumber", function() { return generateRandomNumber; });
const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map