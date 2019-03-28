module.exports =
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export toDate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return isDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return isDateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return parseDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getDayCountOfMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getDayCountOfYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getFirstDayOfMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return prevDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return nextDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getStartDateOfMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getWeekNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return modifyDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return modifyTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return modifyWithTimeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return clearTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return transformTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getTimeMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return limitTimeRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return timeWithinRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeYearMonthAndClampDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return prevMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return nextMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return prevYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return nextYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return extractDateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return extractTimeFormat; });
/* harmony import */ var element_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var element_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(element_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var element_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var element_ui_src_locale__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(element_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__);



var weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
var getI18nSettings = function getI18nSettings() {
  return {
    dayNamesShort: weeks.map(function (week) {
      return Object(element_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.weeks.' + week);
    }),
    dayNames: weeks.map(function (week) {
      return Object(element_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.weeks.' + week);
    }),
    monthNamesShort: months.map(function (month) {
      return Object(element_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.months.' + month);
    }),
    monthNames: months.map(function (month, index) {
      return Object(element_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.month' + (index + 1));
    }),
    amPm: ['am', 'pm']
  };
};

var toDate = function toDate(date) {
  return isDate(date) ? new Date(date) : null;
};

var isDate = function isDate(date) {
  if (date === null || date === undefined) return false;
  if (isNaN(new Date(date).getTime())) return false;
  if (Array.isArray(date)) return false; // deal with `new Date([ new Date() ]) -> new Date()`
  return true;
};

var isDateObject = function isDateObject(val) {
  return val instanceof Date;
};

var formatDate = function formatDate(date, format) {
  date = toDate(date);
  if (!date) return '';
  return element_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.format(date, format || 'yyyy-MM-dd', getI18nSettings());
};

var parseDate = function parseDate(string, format) {
  return element_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.parse(string, format || 'yyyy-MM-dd', getI18nSettings());
};

var getDayCountOfMonth = function getDayCountOfMonth(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

var getDayCountOfYear = function getDayCountOfYear(year) {
  var isLeapYear = year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
  return isLeapYear ? 366 : 365;
};

var getFirstDayOfMonth = function getFirstDayOfMonth(date) {
  var temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

// see: https://stackoverflow.com/questions/3674539/incrementing-a-date-in-javascript
// {prev, next} Date should work for Daylight Saving Time
// Adding 24 * 60 * 60 * 1000 does not work in the above scenario
var prevDate = function prevDate(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};

var nextDate = function nextDate(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

var getStartDateOfMonth = function getStartDateOfMonth(year, month) {
  var result = new Date(year, month, 1);
  var day = result.getDay();

  if (day === 0) {
    return prevDate(result, 7);
  } else {
    return prevDate(result, day);
  }
};

var getWeekNumber = function getWeekNumber(src) {
  if (!isDate(src)) return null;
  var date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

var range = function range(n) {
  // see https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
  return Array.apply(null, { length: n }).map(function (_, n) {
    return n;
  });
};

var modifyDate = function modifyDate(date, y, m, d) {
  return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};

var modifyTime = function modifyTime(date, h, m, s, ms) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, s, ms);
};

var modifyWithTimeString = function modifyWithTimeString(date, time) {
  if (date == null || !time) {
    return date;
  }
  time = parseDate(time, 'HH:mm:ss');
  return modifyTime(date, time.getHours(), time.getMinutes(), time.getSeconds());
};

var clearTime = function clearTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

var transformTime = function transformTime(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HH:mm:ss';

  return parseDate(formatDate(date, format), format);
};

var getTimeMapping = function getTimeMapping() {
  var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'HH:mm:ss';
  var date = arguments[1];

  var result = element_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.getMapping(format);
  var delta = 0;
  var types = ['hour', 'minute', 'second', 'millisecond'];
  var order = result.order.filter(function (type) {
    if (date) {
      var pos = result[type];
      pos[0] += delta;
      pos[1] += delta;

      if (pos[1] - pos[0] === 1) {
        var val = -1;
        switch (type) {
          case 'hour':
            val = date.getHours();break;
          case 'minute':
            val = date.getMinutes();break;
          case 'second':
            val = date.getSeconds();break;
        }
        if (val > 9) {
          pos[1] += 1;
          delta += 1;
        }
      }
      result[type] = pos;
    }
    return types.indexOf(type) > -1;
  });
  result.order = order;
  return result;
};

var limitTimeRange = function limitTimeRange(date, ranges) {
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'HH:mm:ss';

  // TODO: refactory a more elegant solution
  var normalizeDate = function normalizeDate(date) {
    return element_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.parse(element_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.format(date, format), format);
  };
  if (!ranges || ranges.length === 0) return normalizeDate(date);
  var ndate = normalizeDate(date);
  var nranges = ranges.map(function (range) {
    return range.map(normalizeDate);
  });
  if (nranges.some(function (nrange) {
    return ndate >= nrange[0] && ndate <= nrange[1];
  })) return date;

  var minDate = nranges[0][0];
  var maxDate = nranges[0][0];

  nranges.forEach(function (nrange) {
    minDate = new Date(Math.min(nrange[0], minDate));
    maxDate = new Date(Math.max(nrange[1], maxDate));
  });

  var ret = ndate < minDate ? minDate : maxDate;
  // preserve Year/Month/Date
  return modifyDate(ret, date.getFullYear(), date.getMonth(), date.getDate());
};

var timeWithinRange = function timeWithinRange(date, selectableRange, format) {
  var limitedDate = limitTimeRange(date, selectableRange, format);
  return limitedDate.getTime() === date.getTime();
};

var changeYearMonthAndClampDate = function changeYearMonthAndClampDate(date, year, month) {
  // clamp date to the number of days in `year`, `month`
  // eg: (2010-1-31, 2010, 2) => 2010-2-28
  var monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
  return modifyDate(date, year, month, monthDate);
};

var prevMonth = function prevMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  return month === 0 ? changeYearMonthAndClampDate(date, year - 1, 11) : changeYearMonthAndClampDate(date, year, month - 1);
};

var nextMonth = function nextMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  return month === 11 ? changeYearMonthAndClampDate(date, year + 1, 0) : changeYearMonthAndClampDate(date, year, month + 1);
};

var prevYear = function prevYear(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = date.getFullYear();
  var month = date.getMonth();
  return changeYearMonthAndClampDate(date, year - amount, month);
};

var nextYear = function nextYear(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = date.getFullYear();
  var month = date.getMonth();
  return changeYearMonthAndClampDate(date, year + amount, month);
};

var extractDateFormat = function extractDateFormat(format) {
  return format.replace(/\W?m{1,2}|\W?ZZ/g, '').replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '').trim();
};

var extractTimeFormat = function extractTimeFormat(format) {
  return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, '').trim();
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/mixins/emitter");

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/vue-popper");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/mixins/locale");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/merge");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/input");

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/clickoutside");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/locale");

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/date");

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/scrollbar");

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time.vue?vue&type=template&id=3d939089&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "el-zoom-in-top" },
      on: {
        "after-leave": function($event) {
          _vm.$emit("dodestroy")
        }
      }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-time-panel el-popper",
          class: _vm.popperClass
        },
        [
          _c(
            "div",
            { staticClass: "el-time-panel__content", class: _vm.columns },
            [
              _c("time-spinner", {
                ref: "spinner",
                attrs: {
                  mapping: _vm.mapping,
                  format: _vm.format,
                  "arrow-control": _vm.useArrow,
                  steps: _vm.parsedSteps,
                  "selectable-range": _vm.selectableRange,
                  date: _vm.date
                },
                on: {
                  change: _vm.handleChange,
                  "select-range": _vm.setSelectionRange
                }
              })
            ],
            1
          ),
          _c("div", { staticClass: "el-time-panel__footer" }, [
            _c(
              "button",
              {
                staticClass: "el-time-panel__btn cancel",
                attrs: { type: "button" },
                on: { click: _vm.handleCancel }
              },
              [_vm._v(_vm._s(_vm.t("el.datepicker.cancel")))]
            ),
            _c(
              "button",
              {
                staticClass: "el-time-panel__btn",
                class: { confirm: !_vm.disabled },
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    _vm.handleConfirm()
                  }
                }
              },
              [_vm._v(_vm._s(_vm.t("el.datepicker.confirm")))]
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/panel/time.vue?vue&type=template&id=3d939089&

// EXTERNAL MODULE: ./packages/date-picker/src/util/index.js
var util = __webpack_require__(1);

// EXTERNAL MODULE: external "element-ui/lib/mixins/locale"
var locale_ = __webpack_require__(7);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: ./packages/date-picker/src/basic/time-spinner.vue + 4 modules
var time_spinner = __webpack_require__(31);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var timevue_type_script_lang_js_ = ({
  mixins: [locale_default.a],

  components: {
    TimeSpinner: time_spinner["a" /* default */]
  },

  props: {
    visible: Boolean,
    timeArrowControl: Boolean
  },

  watch: {
    visible: function visible(val) {
      var _this = this;

      if (val) {
        this.oldValue = this.value;
        this.$nextTick(function () {
          return _this.$refs.spinner.emitSelectRange(_this.mapping.order[0]);
        });
      } else {
        this.needInitAdjust = true;
      }
    },
    format: function format(val) {
      if (val !== this.format) this.handleChange(this.date, true);
    },
    value: function value(newVal) {
      var _this2 = this;

      var date = void 0;
      if (newVal instanceof Date) {
        date = Object(util["n" /* limitTimeRange */])(newVal, this.selectableRange, this.format);
      } else if (!newVal) {
        date = this.defaultValue ? new Date(this.defaultValue) : new Date();
      }

      this.date = this.transform(date);
      if (this.visible && this.needInitAdjust) {
        this.$nextTick(function (_) {
          return _this2.adjustSpinners();
        });
        this.needInitAdjust = false;
      }
    },
    defaultValue: function defaultValue(val) {
      if (!Object(util["l" /* isDate */])(this.value)) {
        this.date = val ? new Date(val) : new Date();
      }
    }
  },

  data: function data() {
    return {
      popperClass: '',
      format: 'HH:mm:ss',
      value: '',
      defaultValue: null,
      date: new Date(),
      oldValue: new Date(),
      selectableRange: [],
      selectionRange: [0, 2],
      disabled: false,
      arrowControl: false,
      needInitAdjust: true,
      steps: ''
    };
  },


  computed: {
    useArrow: function useArrow() {
      return this.arrowControl || this.timeArrowControl || false;
    },
    mapping: function mapping() {
      return Object(util["j" /* getTimeMapping */])(this.format, this.date);
    },
    columns: function columns() {
      var val = {};
      val['columns' + this.mapping.order.length] = true;
      return val;
    },
    parsedSteps: function parsedSteps() {
      return this.steps ? Object(util["u" /* parseDate */])(this.steps, this.format) : null;
    }
  },
  methods: {
    transform: function transform(date) {
      return Object(util["A" /* transformTime */])(date, this.format);
    },
    handleCancel: function handleCancel() {
      this.$emit('pick', this.oldValue, false);
    },
    handleChange: function handleChange(date, force) {
      // this.visible avoids edge cases, when use scrolls during panel closing animation
      if (this.visible || force) {
        this.date = this.transform(date);
        // if date is out of range, do not emit
        if (this.isValidValue(this.date)) {
          this.$emit('pick', this.date, true);
        }
      }
    },
    setSelectionRange: function setSelectionRange(start, end) {
      this.$emit('select-range', start, end);
      this.selectionRange = [start, end];
    },
    handleConfirm: function handleConfirm() {
      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var first = arguments[1];

      if (first) return;
      var date = Object(util["n" /* limitTimeRange */])(this.date, this.selectableRange, this.format);
      this.$emit('pick', this.transform(date), visible, first);
    },
    handleKeydown: function handleKeydown(event) {
      var keyCode = event.keyCode;
      var mapping = { 38: -1, 40: 1, 37: -1, 39: 1 };

      // Left or Right
      if (keyCode === 37 || keyCode === 39) {
        var step = mapping[keyCode];
        this.changeSelectionRange(step);
        event.preventDefault();
        return;
      }

      // Up or Down
      if (keyCode === 38 || keyCode === 40) {
        var _step = mapping[keyCode];
        this.$refs.spinner.scrollDown(_step);
        event.preventDefault();
        return;
      }
    },
    isValidValue: function isValidValue(date) {
      return Object(util["z" /* timeWithinRange */])(date, this.selectableRange, this.format);
    },
    adjustSpinners: function adjustSpinners() {
      return this.$refs.spinner.adjustSpinners();
    },
    changeSelectionRange: function changeSelectionRange(step) {
      var _this3 = this;

      var list = this.mapping.order.map(function (type) {
        return _this3.mapping[type][0];
      });
      var index = list.indexOf(this.selectionRange[0]);
      var next = (index + step + list.length) % list.length;
      this.$refs.spinner.emitSelectRange(this.mapping.order[next]);
    }
  },

  mounted: function mounted() {
    var _this4 = this;

    this.$nextTick(function () {
      return _this4.handleConfirm(true, true);
    });
    this.$emit('mounted');
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/panel/time.vue?vue&type=script&lang=js&
 /* harmony default export */ var panel_timevue_type_script_lang_js_ = (timevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/date-picker/src/panel/time.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  panel_timevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/panel/time.vue"
/* harmony default export */ var time = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var element_ui_src_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var element_ui_src_utils_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(element_ui_src_utils_dom__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding, vnode) {
    var interval = null;
    var startTime = void 0;
    var handler = function handler() {
      return vnode.context[binding.expression].apply();
    };
    var clear = function clear() {
      if (new Date() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };

    Object(element_ui_src_utils_dom__WEBPACK_IMPORTED_MODULE_0__["on"])(el, 'mousedown', function (e) {
      if (e.button !== 0) return;
      startTime = new Date();
      Object(element_ui_src_utils_dom__WEBPACK_IMPORTED_MODULE_0__["once"])(document, 'mouseup', clear);
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  }
});

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports) {

module.exports = require("normalize-wheel");

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/picker.vue?vue&type=template&id=79ae069f&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.ranged
    ? _c(
        "el-input",
        _vm._b(
          {
            directives: [
              {
                name: "clickoutside",
                rawName: "v-clickoutside",
                value: _vm.handleClose,
                expression: "handleClose"
              }
            ],
            ref: "reference",
            staticClass: "el-date-editor",
            class: "el-date-editor--" + _vm.type,
            attrs: {
              readonly: !_vm.editable || _vm.readonly || _vm.type === "dates",
              disabled: _vm.pickerDisabled,
              size: _vm.pickerSize,
              name: _vm.name,
              placeholder: _vm.placeholder,
              value: _vm.displayValue,
              validateEvent: false
            },
            on: {
              focus: _vm.handleFocus,
              input: function(value) {
                return (_vm.userInput = value)
              },
              change: _vm.handleChange
            },
            nativeOn: {
              keydown: function($event) {
                return _vm.handleKeydown($event)
              },
              mouseenter: function($event) {
                return _vm.handleMouseEnter($event)
              },
              mouseleave: function($event) {
                _vm.showClose = false
              }
            }
          },
          "el-input",
          _vm.firstInputId,
          false
        ),
        [
          _c("i", {
            staticClass: "el-input__icon",
            class: _vm.triggerClass,
            attrs: { slot: "prefix" },
            on: { click: _vm.handleClickPrefixIcon },
            slot: "prefix"
          }),
          _vm.haveTrigger
            ? _c("i", {
                staticClass: "el-input__icon",
                class: [_vm.showClose ? "" + _vm.clearIcon : ""],
                attrs: { slot: "suffix" },
                on: { click: _vm.handleClickIcon },
                slot: "suffix"
              })
            : _vm._e()
        ]
      )
    : _c(
        "div",
        {
          directives: [
            {
              name: "clickoutside",
              rawName: "v-clickoutside",
              value: _vm.handleClose,
              expression: "handleClose"
            }
          ],
          ref: "reference",
          staticClass: "el-date-editor el-range-editor el-input__inner",
          class: [
            "el-date-editor--" + _vm.type,
            _vm.pickerSize ? "el-range-editor--" + _vm.pickerSize : "",
            _vm.pickerDisabled ? "is-disabled" : "",
            _vm.pickerVisible ? "is-active" : ""
          ],
          on: {
            click: _vm.handleRangeClick,
            mouseenter: _vm.handleMouseEnter,
            mouseleave: function($event) {
              _vm.showClose = false
            },
            keydown: _vm.handleKeydown
          }
        },
        [
          _c("i", {
            class: ["el-input__icon", "el-range__icon", _vm.triggerClass]
          }),
          _c(
            "input",
            _vm._b(
              {
                staticClass: "el-range-input",
                attrs: {
                  autocomplete: "off",
                  placeholder: _vm.startPlaceholder,
                  disabled: _vm.pickerDisabled,
                  readonly: !_vm.editable || _vm.readonly,
                  name: _vm.name && _vm.name[0]
                },
                domProps: { value: _vm.displayValue && _vm.displayValue[0] },
                on: {
                  input: _vm.handleStartInput,
                  change: _vm.handleStartChange,
                  focus: _vm.handleFocus
                }
              },
              "input",
              _vm.firstInputId,
              false
            )
          ),
          _vm._t("range-separator", [
            _c("span", { staticClass: "el-range-separator" }, [
              _vm._v(_vm._s(_vm.rangeSeparator))
            ])
          ]),
          _c(
            "input",
            _vm._b(
              {
                staticClass: "el-range-input",
                attrs: {
                  autocomplete: "off",
                  placeholder: _vm.endPlaceholder,
                  disabled: _vm.pickerDisabled,
                  readonly: !_vm.editable || _vm.readonly,
                  name: _vm.name && _vm.name[1]
                },
                domProps: { value: _vm.displayValue && _vm.displayValue[1] },
                on: {
                  input: _vm.handleEndInput,
                  change: _vm.handleEndChange,
                  focus: _vm.handleFocus
                }
              },
              "input",
              _vm.secondInputId,
              false
            )
          ),
          _vm.haveTrigger
            ? _c("i", {
                staticClass: "el-input__icon el-range__close-icon",
                class: [_vm.showClose ? "" + _vm.clearIcon : ""],
                on: { click: _vm.handleClickIcon }
              })
            : _vm._e()
        ],
        2
      )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/picker.vue?vue&type=template&id=79ae069f&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(6);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: external "element-ui/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(11);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// EXTERNAL MODULE: ./packages/date-picker/src/util/index.js
var util = __webpack_require__(1);

// EXTERNAL MODULE: external "element-ui/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(5);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// EXTERNAL MODULE: external "element-ui/lib/mixins/emitter"
var emitter_ = __webpack_require__(3);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "element-ui/lib/input"
var input_ = __webpack_require__(9);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "element-ui/lib/utils/merge"
var merge_ = __webpack_require__(8);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/picker.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









var NewPopper = {
  props: {
    appendToBody: vue_popper_default.a.props.appendToBody,
    offset: vue_popper_default.a.props.offset,
    boundariesPadding: vue_popper_default.a.props.boundariesPadding,
    arrowOffset: vue_popper_default.a.props.arrowOffset
  },
  methods: vue_popper_default.a.methods,
  data: function data() {
    return merge_default()({ visibleArrow: true }, vue_popper_default.a.data);
  },

  beforeDestroy: vue_popper_default.a.beforeDestroy
};

var DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  time: 'HH:mm:ss',
  week: 'yyyywWW',
  timerange: 'HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss',
  year: 'yyyy'
};
var HAVE_TRIGGER_TYPES = ['date', 'datetime', 'time', 'time-select', 'week', 'month', 'year', 'daterange', 'timerange', 'datetimerange', 'dates'];
var pickervue_type_script_lang_js_DATE_FORMATTER = function DATE_FORMATTER(value, format) {
  if (format === 'timestamp') return value.getTime();
  return Object(util["e" /* formatDate */])(value, format);
};
var pickervue_type_script_lang_js_DATE_PARSER = function DATE_PARSER(text, format) {
  if (format === 'timestamp') return new Date(Number(text));
  return Object(util["u" /* parseDate */])(text, format);
};
var RANGE_FORMATTER = function RANGE_FORMATTER(value, format) {
  if (Array.isArray(value) && value.length === 2) {
    var start = value[0];
    var end = value[1];

    if (start && end) {
      return [pickervue_type_script_lang_js_DATE_FORMATTER(start, format), pickervue_type_script_lang_js_DATE_FORMATTER(end, format)];
    }
  }
  return '';
};
var RANGE_PARSER = function RANGE_PARSER(array, format, separator) {
  if (!Array.isArray(array)) {
    array = array.split(separator);
  }
  if (array.length === 2) {
    var range1 = array[0];
    var range2 = array[1];

    return [pickervue_type_script_lang_js_DATE_PARSER(range1, format), pickervue_type_script_lang_js_DATE_PARSER(range2, format)];
  }
  return [];
};
var TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      if (text === undefined || text === '') return null;
      return text;
    }
  },
  week: {
    formatter: function formatter(value, format) {
      var week = Object(util["k" /* getWeekNumber */])(value);
      var month = value.getMonth();
      var trueDate = new Date(value);
      if (week === 1 && month === 11) {
        trueDate.setHours(0, 0, 0, 0);
        trueDate.setDate(trueDate.getDate() + 3 - (trueDate.getDay() + 6) % 7);
      }
      var date = Object(util["e" /* formatDate */])(trueDate, format);

      date = /WW/.test(date) ? date.replace(/WW/, week < 10 ? '0' + week : week) : date.replace(/W/, week);
      return date;
    },
    parser: function parser(text) {
      var array = (text || '').split('w');
      if (array.length === 2) {
        var year = Number(array[0]);
        var month = Number(array[1]);

        if (!isNaN(year) && !isNaN(month) && month < 54) {
          return text;
        }
      }
      return null;
    }
  },
  date: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  datetime: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  time: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  month: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  year: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  number: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      var result = Number(text);

      if (!isNaN(text)) {
        return result;
      } else {
        return null;
      }
    }
  },
  dates: {
    formatter: function formatter(value, format) {
      return value.map(function (date) {
        return pickervue_type_script_lang_js_DATE_FORMATTER(date, format);
      });
    },
    parser: function parser(value, format) {
      return (typeof value === 'string' ? value.split(', ') : value).map(function (date) {
        return date instanceof Date ? date : pickervue_type_script_lang_js_DATE_PARSER(date, format);
      });
    }
  }
};
var PLACEMENT_MAP = {
  left: 'bottom-start',
  center: 'bottom',
  right: 'bottom-end'
};

var parseAsFormatAndType = function parseAsFormatAndType(value, customFormat, type) {
  var rangeSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '-';

  if (!value) return null;
  var parser = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).parser;
  var format = customFormat || DEFAULT_FORMATS[type];
  return parser(value, format, rangeSeparator);
};

var formatAsFormatAndType = function formatAsFormatAndType(value, customFormat, type) {
  if (!value) return null;
  var formatter = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).formatter;
  var format = customFormat || DEFAULT_FORMATS[type];
  return formatter(value, format);
};

/*
 * Considers:
 *   1. Date object
 *   2. date string
 *   3. array of 1 or 2
 */
var valueEquals = function valueEquals(a, b) {
  // considers Date object and string
  var dateEquals = function dateEquals(a, b) {
    var aIsDate = a instanceof Date;
    var bIsDate = b instanceof Date;
    if (aIsDate && bIsDate) {
      return a.getTime() === b.getTime();
    }
    if (!aIsDate && !bIsDate) {
      return a === b;
    }
    return false;
  };

  var aIsArray = a instanceof Array;
  var bIsArray = b instanceof Array;
  if (aIsArray && bIsArray) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every(function (item, index) {
      return dateEquals(item, b[index]);
    });
  }
  if (!aIsArray && !bIsArray) {
    return dateEquals(a, b);
  }
  return false;
};

var isString = function isString(val) {
  return typeof val === 'string' || val instanceof String;
};

var validator = function validator(val) {
  // either: String, Array of String, null / undefined
  return val === null || val === undefined || isString(val) || Array.isArray(val) && val.length === 2 && val.every(isString);
};

/* harmony default export */ var pickervue_type_script_lang_js_ = ({
  mixins: [emitter_default.a, NewPopper],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    size: String,
    format: String,
    valueFormat: String,
    readonly: Boolean,
    placeholder: String,
    startPlaceholder: String,
    endPlaceholder: String,
    prefixIcon: String,
    prefixIconClickable: Boolean,
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close'
    },
    name: {
      default: '',
      validator: validator
    },
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    id: {
      default: '',
      validator: validator
    },
    popperClass: String,
    editable: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'left'
    },
    value: {},
    defaultValue: {},
    defaultTime: {},
    rangeSeparator: {
      default: '-'
    },
    pickerOptions: {},
    unlinkPanels: Boolean,
    validateEvent: {
      type: Boolean,
      default: true
    }
  },

  components: { ElInput: input_default.a },

  directives: { Clickoutside: clickoutside_default.a },

  data: function data() {
    return {
      pickerVisible: false,
      showClose: false,
      userInput: null,
      valueOnOpen: null, // value when picker opens, used to determine whether to emit change
      unwatchPickerOptions: null,
      selectedInput: {}
    };
  },


  watch: {
    pickerVisible: function pickerVisible(val) {
      if (this.readonly || this.pickerDisabled) return;
      if (val) {
        this.showPicker();
        this.valueOnOpen = Array.isArray(this.value) ? [].concat(this.value) : this.value;
      } else {
        this.selectedInput = null;
        this.hidePicker();
        this.emitChange(this.value);
        this.userInput = null;
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.blur');
        }
        this.$emit('blur', this);
        this.blur();
      }
    },

    parsedValue: {
      immediate: true,
      handler: function handler(val) {
        if (this.picker) {
          this.picker.value = val;
        }
      }
    },
    defaultValue: function defaultValue(val) {
      // NOTE: should eventually move to jsx style picker + panel ?
      if (this.picker) {
        this.picker.defaultValue = val;
      }
    },
    value: function value(val, oldVal) {
      if (!valueEquals(val, oldVal) && !this.pickerVisible && this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    }
  },

  computed: {
    ranged: function ranged() {
      return this.type.indexOf('range') > -1;
    },
    reference: function reference() {
      var reference = this.$refs.reference;
      return reference.$el || reference;
    },
    refInput: function refInput() {
      if (this.reference) {
        return [].slice.call(this.reference.querySelectorAll('input'));
      }
      return [];
    },
    valueIsEmpty: function valueIsEmpty() {
      var val = this.value;
      if (Array.isArray(val)) {
        for (var i = 0, len = val.length; i < len; i++) {
          if (val[i]) {
            return false;
          }
        }
      } else {
        if (val) {
          return false;
        }
      }
      return true;
    },
    triggerClass: function triggerClass() {
      return this.prefixIcon || (this.type.indexOf('time') !== -1 ? 'el-icon-time' : 'el-icon-date');
    },
    selectionMode: function selectionMode() {
      if (this.type === 'week') {
        return 'week';
      } else if (this.type === 'month') {
        return 'month';
      } else if (this.type === 'year') {
        return 'year';
      } else if (this.type === 'dates') {
        return 'dates';
      }

      return 'day';
    },
    haveTrigger: function haveTrigger() {
      if (typeof this.showTrigger !== 'undefined') {
        return this.showTrigger;
      }
      return HAVE_TRIGGER_TYPES.indexOf(this.type) !== -1;
    },
    displayValue: function displayValue() {
      var formattedValue = formatAsFormatAndType(this.parsedValue, this.format, this.type, this.rangeSeparator);
      if (Array.isArray(this.userInput)) {
        return [this.userInput[0] || formattedValue && formattedValue[0] || '', this.userInput[1] || formattedValue && formattedValue[1] || ''];
      } else if (this.userInput !== null) {
        return this.userInput;
      } else if (formattedValue) {
        return this.type === 'dates' ? formattedValue.join(', ') : formattedValue;
      } else {
        return '';
      }
    },
    parsedValue: function parsedValue() {
      if (!this.value) return this.value; // component value is not set
      if (this.type === 'time-select') return this.value; // time-select does not require parsing, this might change in next major version

      var valueIsDateObject = Object(util["m" /* isDateObject */])(this.value) || Array.isArray(this.value) && this.value.every(util["m" /* isDateObject */]);
      if (valueIsDateObject) {
        return this.value;
      }

      if (this.valueFormat) {
        return parseAsFormatAndType(this.value, this.valueFormat, this.type, this.rangeSeparator) || this.value;
      }

      // NOTE: deal with common but incorrect usage, should remove in next major version
      // user might provide string / timestamp without value-format, coerce them into date (or array of date)
      return Array.isArray(this.value) ? this.value.map(function (val) {
        return new Date(val);
      }) : new Date(this.value);
    },
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    pickerSize: function pickerSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    pickerDisabled: function pickerDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    firstInputId: function firstInputId() {
      var obj = {};
      var id = void 0;
      if (this.ranged) {
        id = this.id && this.id[0];
      } else {
        id = this.id;
      }
      if (id) obj.id = id;
      return obj;
    },
    secondInputId: function secondInputId() {
      var obj = {};
      var id = void 0;
      if (this.ranged) {
        id = this.id && this.id[1];
      }
      if (id) obj.id = id;
      return obj;
    }
  },

  created: function created() {
    // vue-popper
    this.popperOptions = {
      boundariesPadding: 0,
      gpuAcceleration: false
    };
    this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left;

    this.$on('fieldReset', this.handleFieldReset);
  },


  methods: {
    focus: function focus() {
      if (!this.ranged) {
        this.$refs.reference.focus();
      } else {
        this.handleFocus();
      }
    },
    blur: function blur() {
      this.refInput.forEach(function (input) {
        return input.blur();
      });
    },


    // {parse, formatTo} Value deals maps component value with internal Date
    parseValue: function parseValue(value) {
      var isParsed = Object(util["m" /* isDateObject */])(value) || Array.isArray(value) && value.every(util["m" /* isDateObject */]);
      if (this.valueFormat && !isParsed) {
        return parseAsFormatAndType(value, this.valueFormat, this.type, this.rangeSeparator) || value;
      } else {
        return value;
      }
    },
    formatToValue: function formatToValue(date) {
      var isFormattable = Object(util["m" /* isDateObject */])(date) || Array.isArray(date) && date.every(util["m" /* isDateObject */]);
      if (this.valueFormat && isFormattable) {
        return formatAsFormatAndType(date, this.valueFormat, this.type, this.rangeSeparator);
      } else {
        return date;
      }
    },


    // {parse, formatTo} String deals with user input
    parseString: function parseString(value) {
      var type = Array.isArray(value) ? this.type : this.type.replace('range', '');
      return parseAsFormatAndType(value, this.format, type);
    },
    formatToString: function formatToString(value) {
      var type = Array.isArray(value) ? this.type : this.type.replace('range', '');
      return formatAsFormatAndType(value, this.format, type);
    },
    handleMouseEnter: function handleMouseEnter() {
      if (this.readonly || this.pickerDisabled) return;
      if (!this.valueIsEmpty && this.clearable) {
        this.showClose = true;
      }
    },
    handleChange: function handleChange() {
      if (this.userInput) {
        var value = this.parseString(this.displayValue);
        if (value) {
          this.picker.value = value;
          if (this.isValidValue(value)) {
            this.emitInput(value);
            this.userInput = null;
          }
        }
      }
      if (this.userInput === '') {
        this.emitInput(null);
        this.emitChange(null);
        this.userInput = null;
      }
    },
    handleStartInput: function handleStartInput(event) {
      if (this.userInput) {
        this.userInput = [event.target.value, this.userInput[1]];
      } else {
        this.userInput = [event.target.value, null];
      }
    },
    handleEndInput: function handleEndInput(event) {
      if (this.userInput) {
        this.userInput = [this.userInput[0], event.target.value];
      } else {
        this.userInput = [null, event.target.value];
      }
    },
    handleStartChange: function handleStartChange(event) {
      var value = this.parseString(this.userInput && this.userInput[0]);
      if (value) {
        this.userInput = [this.formatToString(value), this.displayValue[1]];
        var newValue = [value, this.picker.value && this.picker.value[1]];
        this.picker.value = newValue;
        if (this.isValidValue(newValue)) {
          this.emitInput(newValue);
          this.userInput = null;
        }
      }
    },
    handleEndChange: function handleEndChange(event) {
      var value = this.parseString(this.userInput && this.userInput[1]);
      if (value) {
        this.userInput = [this.displayValue[0], this.formatToString(value)];
        var newValue = [this.picker.value && this.picker.value[0], value];
        this.picker.value = newValue;
        if (this.isValidValue(newValue)) {
          this.emitInput(newValue);
          this.userInput = null;
        }
      }
    },
    handleClickPrefixIcon: function handleClickPrefixIcon(event) {
      if (this.readonly || this.pickerDisabled) return;
      if (this.prefixIconClickable) {
        this.$emit('icon-click');
      } else {
        this.handleFocus();
      }
    },
    handleClickIcon: function handleClickIcon(event) {
      if (this.readonly || this.pickerDisabled) return;
      if (this.showClose) {
        this.valueOnOpen = this.value;
        event.stopPropagation();
        this.emitInput(null);
        this.emitChange(null);
        this.showClose = false;
        if (this.picker && typeof this.picker.handleClear === 'function') {
          this.picker.handleClear();
        }
      } else {
        this.pickerVisible = !this.pickerVisible;
      }
    },
    handleClose: function handleClose() {
      if (!this.pickerVisible) return;
      this.pickerVisible = false;

      if (this.type === 'dates') {
        // restore to former value
        var oldValue = parseAsFormatAndType(this.valueOnOpen, this.valueFormat, this.type, this.rangeSeparator) || this.valueOnOpen;
        this.emitInput(oldValue);
      }
    },
    handleFieldReset: function handleFieldReset(initialValue) {
      this.userInput = initialValue === '' ? null : initialValue;
    },
    handleFocus: function handleFocus() {
      var type = this.type;

      if (HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
        this.pickerVisible = true;
      }
      this.$emit('focus', this);
    },
    handleKeydown: function handleKeydown(event) {
      var _this = this;

      var keyCode = event.keyCode;

      // ESC
      if (keyCode === 27) {
        this.pickerVisible = false;
        event.stopPropagation();
        return;
      }

      // Tab
      if (keyCode === 9) {
        if (!this.ranged) {
          this.handleChange();
          this.pickerVisible = this.picker.visible = false;
          this.blur();
          event.stopPropagation();
        } else {
          // user may change focus between two input
          setTimeout(function () {
            if (_this.refInput.indexOf(document.activeElement) === -1) {
              _this.pickerVisible = false;
              _this.blur();
              event.stopPropagation();
            }
          }, 0);
        }
        return;
      }

      // Enter
      if (keyCode === 13) {
        if (this.userInput === '' || this.isValidValue(this.parseString(this.displayValue))) {
          this.handleChange();
          this.pickerVisible = this.picker.visible = false;
          this.blur();
        }
        event.stopPropagation();
        return;
      }

      // if user is typing, do not let picker handle key input
      if (this.userInput) {
        event.stopPropagation();
        return;
      }

      // delegate other keys to panel
      if (this.picker && this.picker.handleKeydown) {
        this.picker.handleKeydown(event);
      }
    },
    handleRangeClick: function handleRangeClick() {
      var type = this.type;

      if (HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
        this.pickerVisible = true;
      }
      this.$emit('focus', this);
    },
    hidePicker: function hidePicker() {
      if (this.picker) {
        this.picker.resetView && this.picker.resetView();
        this.pickerVisible = this.picker.visible = false;
        this.destroyPopper();
      }
    },
    showPicker: function showPicker() {
      var _this2 = this;

      if (this.$isServer) return;
      if (!this.picker) {
        this.mountPicker();
      }
      this.pickerVisible = this.picker.visible = true;

      this.updatePopper();

      this.picker.value = this.parsedValue;
      this.picker.resetView && this.picker.resetView();

      this.$nextTick(function () {
        _this2.picker.adjustSpinners && _this2.picker.adjustSpinners();
      });
    },
    mountPicker: function mountPicker() {
      var _this3 = this;

      this.picker = new external_vue_default.a(this.panel).$mount();
      this.picker.defaultValue = this.defaultValue;
      this.picker.defaultTime = this.defaultTime;
      this.picker.popperClass = this.popperClass;
      this.popperElm = this.picker.$el;
      this.picker.width = this.reference.getBoundingClientRect().width;
      this.picker.showTime = this.type === 'datetime' || this.type === 'datetimerange';
      this.picker.selectionMode = this.selectionMode;
      this.picker.unlinkPanels = this.unlinkPanels;
      this.picker.arrowControl = this.arrowControl || this.timeArrowControl || false;
      this.$watch('format', function (format) {
        _this3.picker.format = format;
      });

      var updateOptions = function updateOptions() {
        var options = _this3.pickerOptions;

        if (options && options.selectableRange) {
          var ranges = options.selectableRange;
          var parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
          var format = _this3.format || DEFAULT_FORMATS.timerange;

          ranges = Array.isArray(ranges) ? ranges : [ranges];
          _this3.picker.selectableRange = ranges.map(function (range) {
            return parser(range, format, '-');
          }); // this.rangeSeparator used for display, not for options
        }

        for (var option in options) {
          if (options.hasOwnProperty(option) &&
          // 忽略 time-picker 的该配置项
          option !== 'selectableRange') {
            _this3.picker[option] = options[option];
          }
        }

        // main format must prevail over undocumented pickerOptions.format
        if (_this3.format) {
          _this3.picker.format = _this3.format;
        }
      };
      updateOptions();
      this.unwatchPickerOptions = this.$watch('pickerOptions', function () {
        return updateOptions();
      }, { deep: true });
      this.$el.appendChild(this.picker.$el);
      this.picker.resetView && this.picker.resetView();

      this.picker.$on('dodestroy', this.doDestroy);
      this.picker.$on('pick', function () {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var visible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _this3.userInput = null;
        _this3.pickerVisible = _this3.picker.visible = visible;
        _this3.emitInput(date);
        _this3.picker.resetView && _this3.picker.resetView();
      });

      this.picker.$on('select-range', function (start, end, pos) {
        if (_this3.refInput.length === 0) return;
        var el = !pos || pos === 'min' ? _this3.refInput[0] : pos === 'max' ? _this3.refInput[1] : null;
        if (el) {
          el.setSelectionRange(start, end);
          el.focus();
          _this3.selectedInput = { el: el, start: start, end: end };
        } else {
          _this3.selectedInput = null;
        }
      });
    },
    unmountPicker: function unmountPicker() {
      if (this.picker) {
        this.picker.$destroy();
        this.picker.$off();
        if (typeof this.unwatchPickerOptions === 'function') {
          this.unwatchPickerOptions();
        }
        this.picker.$el.parentNode.removeChild(this.picker.$el);
      }
    },
    emitChange: function emitChange(val) {
      // determine user real change only
      if (!valueEquals(val, this.valueOnOpen)) {
        this.$emit('change', val);
        this.valueOnOpen = val;
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', val);
        }
      }
    },
    emitInput: function emitInput(val) {
      var _this4 = this;

      var formatted = this.formatToValue(val);
      if (!valueEquals(this.value, formatted)) {
        this.$emit('input', formatted);
        if (this.selectedInput) {
          this.$nextTick(function () {
            var s = _this4.selectedInput;
            if (s && s.el) {
              s.el.setSelectionRange(s.start, s.end);
              s.el.focus();
            }
          });
        }
      }
    },
    isValidValue: function isValidValue(value) {
      if (!this.picker) {
        this.mountPicker();
      }
      if (this.picker.isValidValue) {
        return value && this.picker.isValidValue(value);
      } else {
        return true;
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/picker.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_pickervue_type_script_lang_js_ = (pickervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/date-picker/src/picker.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_pickervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/picker.vue"
/* harmony default export */ var picker = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 30 */,
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/time-spinner.vue?vue&type=template&id=1facadeb&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "el-time-spinner", class: _vm.columns },
    [
      !_vm.arrowControl
        ? _vm._l(_vm.mapping.order, function(type, k) {
            return _c(
              "el-scrollbar",
              {
                key: k,
                ref: "scroll",
                refInFor: true,
                staticClass: "el-time-spinner__wrapper",
                attrs: {
                  "wrap-style": "max-height: inherit;",
                  "view-class": "el-time-spinner__list",
                  noresize: "",
                  tag: "ul"
                },
                nativeOn: {
                  mouseenter: function($event) {
                    _vm.emitSelectRange(type)
                  },
                  mousemove: function($event) {
                    _vm.adjustSpinner(type)
                  }
                }
              },
              _vm._l(_vm.disabledList[type], function(disabled, val) {
                return _c(
                  "li",
                  {
                    key: val,
                    staticClass: "el-time-spinner__item",
                    class: {
                      active: val === _vm.currVal(type),
                      disabled: disabled
                    },
                    on: {
                      click: function($event) {
                        _vm.handleClick(type, {
                          value: val,
                          disabled: disabled
                        })
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n          " +
                        _vm._s(_vm.valToStr(type, val)) +
                        "\n      "
                    )
                  ]
                )
              }),
              0
            )
          })
        : _vm._e(),
      _vm.arrowControl
        ? _vm._l(_vm.mapping.order, function(type, k) {
            return _c(
              "div",
              {
                key: k,
                ref: "scroll",
                refInFor: true,
                staticClass: "el-time-spinner__wrapper is-arrow",
                on: {
                  mouseenter: function($event) {
                    _vm.emitSelectRange(type)
                  }
                }
              },
              [
                _c("i", {
                  directives: [
                    {
                      name: "repeat-click",
                      rawName: "v-repeat-click",
                      value: _vm.decrease,
                      expression: "decrease"
                    }
                  ],
                  staticClass: "el-time-spinner__arrow el-icon-arrow-up"
                }),
                _c("i", {
                  directives: [
                    {
                      name: "repeat-click",
                      rawName: "v-repeat-click",
                      value: _vm.increase,
                      expression: "increase"
                    }
                  ],
                  staticClass: "el-time-spinner__arrow el-icon-arrow-down"
                }),
                _c(
                  "ul",
                  {
                    ref: "type",
                    refInFor: true,
                    staticClass: "el-time-spinner__list"
                  },
                  _vm._l(_vm.arrowList[type], function(val, key) {
                    return _c(
                      "li",
                      {
                        key: key,
                        staticClass: "el-time-spinner__item",
                        class: {
                          active: val === _vm.currVal(type),
                          disabled: _vm.disabled(type, val)
                        }
                      },
                      [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.valToStr(type, val)) +
                            "\n        "
                        )
                      ]
                    )
                  }),
                  0
                )
              ]
            )
          })
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/basic/time-spinner.vue?vue&type=template&id=1facadeb&

// EXTERNAL MODULE: ./packages/date-picker/src/util/index.js
var util = __webpack_require__(1);

// EXTERNAL MODULE: external "element-ui/lib/scrollbar"
var scrollbar_ = __webpack_require__(19);
var scrollbar_default = /*#__PURE__*/__webpack_require__.n(scrollbar_);

// EXTERNAL MODULE: ./src/directives/repeat-click.js
var repeat_click = __webpack_require__(25);

// EXTERNAL MODULE: external "normalize-wheel"
var external_normalize_wheel_ = __webpack_require__(28);
var external_normalize_wheel_default = /*#__PURE__*/__webpack_require__.n(external_normalize_wheel_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/time-spinner.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var time_spinnervue_type_script_lang_js_ = ({
  components: { ElScrollbar: scrollbar_default.a },

  directives: {
    repeatClick: repeat_click["a" /* default */]
  },

  props: {
    mapping: {
      type: Object,
      required: true
    },
    date: {},
    defaultValue: {}, // reserved for future use
    steps: {
      type: Date,
      default: null
    },
    selectableRange: {
      type: Array,
      defaultValue: []
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    arrowControl: Boolean
  },

  computed: {
    hour: function hour() {
      return this.date.getHours();
    },
    minute: function minute() {
      return this.date.getMinutes();
    },
    second: function second() {
      return this.date.getSeconds();
    },
    millisecond: function millisecond() {
      return this.getConvertedMs(this.date.getMilliseconds(), this.maxMillisecs);
    },
    maxMillisecs: function maxMillisecs() {
      var len = this.mapping.millisecond;
      if (!len) return 1000;
      return Math.round(Math.pow(10, len[1] - len[0]));
    },
    arrowList: function arrowList() {
      var _this = this;

      var result = {};
      this.mapping.order.forEach(function (type) {
        var val = _this[type];
        var step = _this.numbSteps[type];
        result[type] = [val - step >= 0 ? val - step : undefined, val, val + step < _this.maxOfType(type) ? val + step : undefined];
      });
      return result;
    },
    disabledList: function disabledList() {
      return {
        hour: this.getTypesList('hour', this.selectableRange),
        minute: this.getTypesList('minute', this.selectableRange),
        second: this.getTypesList('second', this.selectableRange),
        millisecond: this.getTypesList('millisecond', this.selectableRange)
      };
    },
    el: function el() {
      var _this2 = this;

      var result = {};
      this.mapping.order.forEach(function (type, idx) {
        result[type] = _this2.$refs.scroll[idx];
      });
      return result;
    },
    columns: function columns() {
      var val = {};
      val['columns' + this.mapping.order.length] = true;
      return val;
    },
    numbSteps: function numbSteps() {
      var _this3 = this;

      var result = {};
      var steps = this.steps;
      this.mapping.order.forEach(function (type) {
        var val = 0;
        if (steps) {
          switch (type) {
            case 'hour':
              val = steps.getHours();break;
            case 'minute':
              val = steps.getMinutes();break;
            case 'second':
              val = steps.getSeconds();break;
            case 'millisecond':
              val = _this3.getConvertedMs(steps.getMilliseconds());break;
          }
        }
        if (!val) val = 1;
        result[type] = val;
      });
      return result;
    }
  },

  data: function data() {
    return {
      currentScrollbar: null
    };
  },


  watch: {
    mapping: function mapping() {
      var _this4 = this;

      this.$nextTick(function () {
        _this4.bindScrollEvent();
      });
    }
  },

  mounted: function mounted() {
    var _this5 = this;

    this.$nextTick(function () {
      _this5.bindScrollEvent();
    });
  },


  methods: {
    disabled: function disabled(type, val) {
      var list = this.disabledList[type];
      return list ? list[val] : false;
    },
    currVal: function currVal(type) {
      return this[type];
    },
    maxOfType: function maxOfType(type) {
      return type === 'hour' ? 24 : type === 'millisecond' ? this.maxMillisecs : 60;
    },
    valToStr: function valToStr(type, value) {
      if (value === undefined) return '';
      var result = type === 'hour' && this.mapping.isPm ? (value = value % 12 || 12) + '' : value + '';
      var len = this.mapping[type][1] - this.mapping[type][0];
      while (result.length < len) {
        result = '0' + result;
      }if (type === 'hour') result += this.amPm(value);
      return result;
    },
    increase: function increase() {
      this.scrollDown(1);
    },
    decrease: function decrease() {
      this.scrollDown(-1);
    },
    getModifedDate: function getModifedDate(type, value) {
      var _this6 = this;

      var modTime = function modTime(hours, mins, secs, millis) {
        return Object(util["p" /* modifyTime */])(_this6.date, hours, mins, secs, Math.round(millis * 1000 / _this6.maxMillisecs));
      };
      switch (type) {
        case 'hour':
          return modTime(value, this.minute, this.second, this.millisecond);
        case 'minute':
          return modTime(this.hour, value, this.second, this.millisecond);
        case 'second':
          return modTime(this.hour, this.minute, value, this.millisecond);
        case 'millisecond':
          return modTime(this.hour, this.minute, this.second, value);
      }
    },
    modifyDateField: function modifyDateField(type, value) {
      var _this7 = this;

      this.$emit('change', this.getModifedDate(type, value));
      this.$nextTick(function (_) {
        _this7.emitSelectRange(type);
      });
    },
    getConvertedMs: function getConvertedMs(millisecond, max) {
      return Math.round(millisecond / 1000 * (max || this.maxMillisecs));
    },
    getTypesList: function getTypesList(type, ranges) {
      var _this8 = this;

      var getVal = function getVal(rDate, idx) {
        var r_h = rDate.getHours();
        var r_m = rDate.getMinutes();
        var r_s = rDate.getSeconds();
        switch (type) {
          case 'hour':
            return r_h;
          case 'minute':
            return r_h === _this8.hour ? r_m : idx ? 59 : 0;
          case 'second':
            return r_h === _this8.hour && r_m === _this8.minute ? r_s : idx ? 59 : 0;
          case 'millisecond':
            var r_ms = _this8.getConvertedMs(rDate.getMilliseconds());
            var val = r_h === _this8.hour && r_m === _this8.minute && r_s === _this8.second ? r_ms : idx ? _this8.getConvertedMs(999) : 0;
            return val;
        };
      };

      var newArray = function newArray(start, end) {
        var result = [];
        for (var i = start; i <= end; i++) {
          result.push(i);
        }
        return result;
      };

      var list = [];
      var enabled = [];

      (ranges || []).forEach(function (range) {
        var value = range.map(getVal);
        enabled = enabled.concat(newArray(value[0], value[1]));
      });
      if (enabled.length) {
        for (var i = 0; i < this.maxOfType(type); i++) {
          list[i] = enabled.indexOf(i) === -1;
        }
        return list;
      } else {
        if (this.arrowControl) return null;
        for (var _i = 0; _i < this.maxOfType(type); _i++) {
          list.push(false);
        }
        return list;
      }
    },
    handleClick: function handleClick(type, _ref) {
      var value = _ref.value,
          disabled = _ref.disabled;

      if (!disabled) {
        this.modifyDateField(type, value);
        this.adjustSpinner(type, value);
      }
    },
    emitSelectRange: function emitSelectRange(type) {
      var map = this.mapping[type];
      if (map) {
        this.$emit('select-range', map[0], map[1]);
        this.currentScrollbar = type;
      }
    },
    bindScrollEvent: function bindScrollEvent() {
      var _this9 = this;

      if (this.arrowControl) {
        var isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var eventName = isFirefox ? 'DOMMouseScroll' : 'mousewheel';
        this.mapping.order.forEach(function (type, idx) {
          _this9.el[type].addEventListener(eventName, _this9.handleMouseWheel, { passive: true });
        });
      } else {
        this.mapping.order.forEach(function (type, idx) {
          _this9.el[type].wrap.onscroll = function (e) {
            // TODO: scroll is emitted when set scrollTop programatically
            // should find better solutions in the future!
            _this9.handleScroll(type, e);
          };
        });
      }
    },
    handleMouseWheel: function handleMouseWheel(ev) {
      this.scrollDown(external_normalize_wheel_default()(ev).spinY);
    },
    handleScroll: function handleScroll(type) {
      var value = Math.min(Math.floor((this.el[type].wrap.scrollTop - (this.scrollBarHeight(type) * 0.5 - 10) / this.typeItemHeight(type) + 3) / this.typeItemHeight(type)), this.maxOfType(type) - 1);
      this.modifyDateField(type, value);
    },


    // NOTE: used by datetime / date-range panel
    //       renamed from adjustScrollTop
    //       should try to refactory it
    adjustSpinners: function adjustSpinners() {
      var _this10 = this;

      this.mapping.order.forEach(function (type) {
        _this10.adjustSpinner(type, _this10[type]);
      });
    },
    adjustSpinner: function adjustSpinner(type, value) {
      if (!value) value = this[type];
      if (this.arrowControl) return;
      var el = this.el[type].wrap;
      if (el) {
        el.scrollTop = Math.max(0, value * this.typeItemHeight(type));
      }
    },
    scrollDown: function scrollDown(step) {
      var _this11 = this;

      var nextVal = function nextVal(type, val, step) {
        var list = _this11.disabledList[type];
        var max = _this11.maxOfType(type);
        var len = max;
        var total = Math.abs(step);
        step = step > 0 ? _this11.numbSteps[type] : -_this11.numbSteps[type];
        while (len-- && total) {
          val = (val + step + max) % max;
          if (!list || !list[val]) {
            total--;
          }
        }
        return { val: val, disabled: list && list[val] };
      };

      var getNextDate = function getNextDate(type) {
        var delta = step > 0 ? _this11.numbSteps[type] : -_this11.numbSteps[type];
        switch (type) {
          case 'hour':
            delta = delta * 60 * 60 * 1000;break;
          case 'minute':
            delta = delta * 60 * 1000;break;
          case 'second':
            delta = delta * 1000;break;
          case 'millisecond':
            delta = Math.round(delta * 1000 / _this11.maxMillisecs);
        }
        var day = _this11.date.getDate();
        var result = new Date(_this11.date.getTime() + delta);
        return result.getDate() === day ? result : step > 0 ? Object(util["u" /* parseDate */])('23:59:59.999', 'HH:mm:ss:SSS') : Object(util["u" /* parseDate */])('0', 'H');
      };

      if (!this.currentScrollbar) {
        this.emitSelectRange(this.mapping.order[0]);
      }
      var type = this.currentScrollbar;
      var prev = this[type];
      var now = nextVal(type, prev, step);

      if (step > 0 && now.val < prev || step < 0 && now.val > prev || prev === now.val) {
        var nextDate = Object(util["n" /* limitTimeRange */])(getNextDate(type), this.selectableRange, this.format);
        if (nextDate.getTime() !== this.date.getTime()) {
          this.$emit('change', nextDate);
          this.$nextTick(function (_) {
            _this11.emitSelectRange(type);
            _this11.adjustSpinners();
          });
        }
      } else {
        if (now.disabled) return;
        this.modifyDateField(type, now.val);
        this.adjustSpinner(type, now.val);
      }
    },
    amPm: function amPm(hour) {
      var isPm = this.mapping.isPm;
      if (!isPm) return '';
      var content = hour < 12 ? ' am' : ' pm';
      if (isPm[2] === 'A') content = content.toUpperCase();
      return content;
    },
    typeItemHeight: function typeItemHeight(type) {
      return this.el[type].$el.querySelector('li').offsetHeight;
    },
    scrollBarHeight: function scrollBarHeight(type) {
      return this.el[type].$el.offsetHeight;
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/basic/time-spinner.vue?vue&type=script&lang=js&
 /* harmony default export */ var basic_time_spinnervue_type_script_lang_js_ = (time_spinnervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/date-picker/src/basic/time-spinner.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  basic_time_spinnervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/basic/time-spinner.vue"
/* harmony default export */ var time_spinner = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./packages/date-picker/src/picker.vue + 4 modules
var picker = __webpack_require__(29);

// EXTERNAL MODULE: ./packages/date-picker/src/panel/time.vue + 4 modules
var time = __webpack_require__(22);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time-range.vue?vue&type=template&id=fb28660e&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "el-zoom-in-top" },
      on: {
        "after-leave": function($event) {
          _vm.$emit("dodestroy")
        }
      }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-time-range-picker el-picker-panel el-popper",
          class: _vm.popperClass
        },
        [
          _c("div", { staticClass: "el-time-range-picker__content" }, [
            _c("div", { staticClass: "el-time-range-picker__cell" }, [
              _c("div", { staticClass: "el-time-range-picker__header" }, [
                _vm._v(_vm._s(_vm.t("el.datepicker.startTime")))
              ]),
              _c(
                "div",
                {
                  staticClass:
                    "el-time-range-picker__body el-time-panel__content",
                  class: { columns: _vm.columns, "is-arrow": _vm.arrowControl }
                },
                [
                  _c("time-spinner", {
                    ref: "minSpinner",
                    attrs: {
                      mapping: _vm.minMapping,
                      format: _vm.format,
                      steps: _vm.parsedSteps,
                      "arrow-control": _vm.arrowControl,
                      "selectable-range": _vm.minSelectableRange,
                      date: _vm.minDate
                    },
                    on: {
                      change: _vm.handleMinChange,
                      "select-range": _vm.setMinSelectionRange
                    }
                  })
                ],
                1
              )
            ]),
            _c("div", { staticClass: "el-time-range-picker__cell" }, [
              _c("div", { staticClass: "el-time-range-picker__header" }, [
                _vm._v(_vm._s(_vm.t("el.datepicker.endTime")))
              ]),
              _c(
                "div",
                {
                  staticClass:
                    "el-time-range-picker__body el-time-panel__content",
                  class: { columns: _vm.columns, "is-arrow": _vm.arrowControl }
                },
                [
                  _c("time-spinner", {
                    ref: "maxSpinner",
                    attrs: {
                      mapping: _vm.maxMapping,
                      format: _vm.format,
                      steps: _vm.parsedSteps,
                      "arrow-control": _vm.arrowControl,
                      "selectable-range": _vm.maxSelectableRange,
                      date: _vm.maxDate
                    },
                    on: {
                      change: _vm.handleMaxChange,
                      "select-range": _vm.setMaxSelectionRange
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _c("div", { staticClass: "el-time-panel__footer" }, [
            _c(
              "button",
              {
                staticClass: "el-time-panel__btn cancel",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    _vm.handleCancel()
                  }
                }
              },
              [_vm._v(_vm._s(_vm.t("el.datepicker.cancel")))]
            ),
            _c(
              "button",
              {
                staticClass: "el-time-panel__btn confirm",
                attrs: { type: "button", disabled: _vm.btnDisabled },
                on: {
                  click: function($event) {
                    _vm.handleConfirm()
                  }
                }
              },
              [_vm._v(_vm._s(_vm.t("el.datepicker.confirm")))]
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/panel/time-range.vue?vue&type=template&id=fb28660e&

// EXTERNAL MODULE: ./packages/date-picker/src/util/index.js
var util = __webpack_require__(1);

// EXTERNAL MODULE: external "element-ui/lib/mixins/locale"
var locale_ = __webpack_require__(7);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: ./packages/date-picker/src/basic/time-spinner.vue + 4 modules
var time_spinner = __webpack_require__(31);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time-range.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var time_rangevue_type_script_lang_js_ = ({
  mixins: [locale_default.a],

  components: { TimeSpinner: time_spinner["a" /* default */] },

  computed: {
    offset: function offset() {
      var order = this.minMapping.order;
      return this.minMapping[order[order.length - 1]][1] + 3;
    },
    spinner: function spinner() {
      return this.selectionRange[0] < this.offset ? this.$refs.minSpinner : this.$refs.maxSpinner;
    },
    btnDisabled: function btnDisabled() {
      return this.minDate.getTime() > this.maxDate.getTime();
    },
    MIN_TIME: function MIN_TIME() {
      return Object(util["n" /* limitTimeRange */])(Object(util["u" /* parseDate */])('00:00', 'HH:mm'), this.selectableRange, this.format);
    },
    MAX_TIME: function MAX_TIME() {
      return Object(util["n" /* limitTimeRange */])(Object(util["u" /* parseDate */])('23:59:59.999', 'HH:mm:ss.SSS'), this.selectableRange, this.format);
    },
    minMapping: function minMapping() {
      return Object(util["j" /* getTimeMapping */])(this.format, this.minDate);
    },
    maxMapping: function maxMapping() {
      return Object(util["j" /* getTimeMapping */])(this.format, this.maxDate);
    },
    columns: function columns() {
      var val = {};
      val['columns' + this.minMapping.order.length] = true;
      return val;
    },
    minSelectableRange: function minSelectableRange() {
      return [[this.MIN_TIME, this.maxDate]];
    },
    maxSelectableRange: function maxSelectableRange() {
      return [[this.minDate, this.MAX_TIME]];
    },
    parsedSteps: function parsedSteps() {
      return this.steps ? Object(util["u" /* parseDate */])(this.steps, this.format) : null;
    }
  },

  data: function data() {
    return {
      popperClass: '',
      minDate: new Date(),
      maxDate: new Date(),
      value: [],
      oldValue: [new Date(), new Date()],
      selectableRange: [],
      defaultValue: null,
      format: 'HH:mm:ss',
      visible: false,
      selectionRange: [0, 2],
      arrowControl: false,
      steps: ''
    };
  },


  watch: {
    value: function value(_value) {
      var minDate;
      var maxDate;
      if (Array.isArray(_value)) {
        minDate = new Date(_value[0]);
        maxDate = new Date(_value[1]);
      } else {
        if (Array.isArray(this.defaultValue)) {
          minDate = new Date(this.defaultValue[0]);
          maxDate = new Date(this.defaultValue[1]);
        } else if (this.defaultValue) {
          minDate = new Date(this.defaultValue);
          maxDate = this.advanceTime(new Date(this.defaultValue), 60 * 60 * 1000);
        } else {
          minDate = new Date();
          maxDate = this.advanceTime(new Date(), 60 * 60 * 1000);
        }
      }
      this.minDate = this.transform(minDate);
      this.maxDate = this.transform(maxDate);
    },
    format: function format() {
      this.minDate = this.transform(this.minDate);
      this.maxDate = this.transform(this.maxDate);
      this.handleChange();
    },
    visible: function visible(val) {
      var _this = this;

      if (val) {
        this.oldValue = this.value;
        this.$nextTick(function () {
          return _this.$refs.minSpinner.emitSelectRange(_this.minMapping.order[0]);
        });
      }
    }
  },

  methods: {
    transform: function transform(date) {
      return Object(util["A" /* transformTime */])(date, this.format);
    },
    advanceTime: function advanceTime(date, amount) {
      return new Date(Math.min(this.transform(date).getTime() + amount, this.MAX_TIME.getTime()));
    },
    handleClear: function handleClear() {
      this.$emit('pick', null);
    },
    handleCancel: function handleCancel() {
      this.$emit('pick', this.oldValue);
    },
    handleMinChange: function handleMinChange(date) {
      this.minDate = this.transform(date);
      this.handleChange();
    },
    handleMaxChange: function handleMaxChange(date) {
      this.maxDate = this.transform(date);
      this.handleChange();
    },
    handleChange: function handleChange() {
      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$emit('pick', [this.minDate, this.maxDate], true);
      }
    },
    setMinSelectionRange: function setMinSelectionRange(start, end) {
      this.$emit('select-range', start, end, 'min');
      this.selectionRange = [start, end];
    },
    setMaxSelectionRange: function setMaxSelectionRange(start, end) {
      this.$emit('select-range', start, end, 'max');
      this.selectionRange = [start + this.offset, end + this.offset];
    },
    handleConfirm: function handleConfirm() {
      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.minDate = Object(util["n" /* limitTimeRange */])(this.minDate, this.minSelectableRange, this.format);
      this.maxDate = Object(util["n" /* limitTimeRange */])(this.maxDate, this.maxSelectableRange, this.format);
      this.$emit('pick', [this.minDate, this.maxDate], visible);
    },
    adjustSpinners: function adjustSpinners() {
      this.$refs.minSpinner.adjustSpinners();
      this.$refs.maxSpinner.adjustSpinners();
    },
    changeSelectionRange: function changeSelectionRange(step) {
      var order = this.minMapping.order;

      var getList = function getList(mapping, delta) {
        return order.map(function (type) {
          return mapping[type][0] + delta;
        });
      };

      var list = getList(this.minMapping, 0).concat(getList(this.maxMapping, this.offset));
      var index = list.indexOf(this.selectionRange[0]);
      var next = (index + step + list.length) % list.length;
      var half = list.length / 2;
      if (next < half) {
        this.$refs.minSpinner.emitSelectRange(order[next]);
      } else {
        this.$refs.maxSpinner.emitSelectRange(order[next - half]);
      }
    },
    isValidValue: function isValidValue(date) {
      return date.length === 2 && Object(util["z" /* timeWithinRange */])(date[0], this.minSelectableRange, this.format) && Object(util["z" /* timeWithinRange */])(date[1], this.maxSelectableRange, this.format);
    },
    handleKeydown: function handleKeydown(event) {
      var keyCode = event.keyCode;
      var mapping = { 38: -1, 40: 1, 37: -1, 39: 1 };

      // Left or Right
      if (keyCode === 37 || keyCode === 39) {
        var step = mapping[keyCode];
        this.changeSelectionRange(step);
        event.preventDefault();
        return;
      }

      // Up or Down
      if (keyCode === 38 || keyCode === 40) {
        var _step = mapping[keyCode];
        this.spinner.scrollDown(_step);
        event.preventDefault();
        return;
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/panel/time-range.vue?vue&type=script&lang=js&
 /* harmony default export */ var panel_time_rangevue_type_script_lang_js_ = (time_rangevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/date-picker/src/panel/time-range.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  panel_time_rangevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/panel/time-range.vue"
/* harmony default export */ var time_range = (component.exports);
// CONCATENATED MODULE: ./packages/date-picker/src/picker/time-picker.js




/* harmony default export */ var time_picker = ({
  mixins: [picker["a" /* default */]],

  name: 'ElTimePicker',

  props: {
    isRange: Boolean,
    arrowControl: Boolean
  },

  data: function data() {
    return {
      type: ''
    };
  },


  watch: {
    isRange: function isRange(_isRange) {
      if (this.picker) {
        this.unmountPicker();
        this.type = _isRange ? 'timerange' : 'time';
        this.panel = _isRange ? time_range : time["a" /* default */];
        this.mountPicker();
      } else {
        this.type = _isRange ? 'timerange' : 'time';
        this.panel = _isRange ? time_range : time["a" /* default */];
      }
    }
  },

  created: function created() {
    this.type = this.isRange ? 'timerange' : 'time';
    this.panel = this.isRange ? time_range : time["a" /* default */];
  }
});
// CONCATENATED MODULE: ./packages/time-picker/index.js


/* istanbul ignore next */
time_picker.install = function (Vue) {
  Vue.component(time_picker.name, time_picker);
};

/* harmony default export */ var packages_time_picker = __webpack_exports__["default"] = (time_picker);

/***/ })
/******/ ]);