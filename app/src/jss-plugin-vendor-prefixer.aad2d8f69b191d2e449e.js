"use strict";
(self["webpackChunkmarket"] = self["webpackChunkmarket"] || []).push([[52],{

/***/ 9414:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var css_vendor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5730);
/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4013);



/**
 * Add vendor prefix to a property name when needed.
 */

function jssVendorPrefixer() {
  function onProcessRule(rule) {
    if (rule.type === 'keyframes') {
      var atRule = rule;
      atRule.at = (0,css_vendor__WEBPACK_IMPORTED_MODULE_0__/* .supportedKeyframes */ ["if"])(atRule.at);
    }
  }

  function prefixStyle(style) {
    for (var prop in style) {
      var value = style[prop];

      if (prop === 'fallbacks' && Array.isArray(value)) {
        style[prop] = value.map(prefixStyle);
        continue;
      }

      var changeProp = false;
      var supportedProp = (0,css_vendor__WEBPACK_IMPORTED_MODULE_0__/* .supportedProperty */ .wR)(prop);
      if (supportedProp && supportedProp !== prop) changeProp = true;
      var changeValue = false;
      var supportedValue$1 = (0,css_vendor__WEBPACK_IMPORTED_MODULE_0__/* .supportedValue */ .HO)(supportedProp, (0,jss__WEBPACK_IMPORTED_MODULE_1__/* .toCssValue */ .EK)(value));
      if (supportedValue$1 && supportedValue$1 !== value) changeValue = true;

      if (changeProp || changeValue) {
        if (changeProp) delete style[prop];
        style[supportedProp || prop] = supportedValue$1 || value;
      }
    }

    return style;
  }

  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style;
    return prefixStyle(style);
  }

  function onChangeValue(value, prop) {
    return (0,css_vendor__WEBPACK_IMPORTED_MODULE_0__/* .supportedValue */ .HO)(prop, (0,jss__WEBPACK_IMPORTED_MODULE_1__/* .toCssValue */ .EK)(value)) || value;
  }

  return {
    onProcessRule: onProcessRule,
    onProcessStyle: onProcessStyle,
    onChangeValue: onChangeValue
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (jssVendorPrefixer);


/***/ })

}]);