/*! add version */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/a.js":
/*!******************!*\
  !*** ./src/a.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

console.log("inner a.js");
module.exports = "from a.js";


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ "./src/a.js");
/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_a__WEBPACK_IMPORTED_MODULE_0__);


console.log("inner index.js");

console.log("get a.js " + _a__WEBPACK_IMPORTED_MODULE_0___default.a);


/***/ })

},[["./src/index.js","manifest"]]]);
//# sourceMappingURL=main.js.map