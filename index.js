(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-json-edit"] = factory(require("react"));
	else
		root["react-json-edit"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _JsonEditor = __webpack_require__(8);

	Object.defineProperty(exports, 'JsonEditor', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_JsonEditor).default;
	  }
	});

	var _Helpers = __webpack_require__(2);

	Object.defineProperty(exports, 'parse', {
	  enumerable: true,
	  get: function get() {
	    return _Helpers.parse;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (false) {
	  Object.defineProperty(exports, 'default', {
	    get: function get() {
	      console.error("Default export is not provided. You should use: import {Json} from 'react-json-edit''");
	    }
	  });
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render_item = render_item;
	exports.get_options = get_options;
	exports.is_container = is_container;
	exports.text2value = text2value;
	exports.capitalize = capitalize;
	exports.add2text = add2text;
	exports.parse = parse;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ArrayItem = __webpack_require__(7);

	var _ArrayItem2 = _interopRequireDefault(_ArrayItem);

	var _ObjectItem = __webpack_require__(10);

	var _ObjectItem2 = _interopRequireDefault(_ObjectItem);

	var _ValueItem = __webpack_require__(6);

	var _ValueItem2 = _interopRequireDefault(_ValueItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// how to import:
	// import { render_item, get_options, is_container, text2value } from 'Helpers';


	function render_item(key, jkey, value, propagateChanges, isLast, level) {
	  if (value instanceof Array) {
	    return _react2.default.createElement(_ArrayItem2.default, { key: key, jkey: jkey, doc: value, level: level + 1, propagateChanges: propagateChanges });
	  } else if (value instanceof Object) {
	    return _react2.default.createElement(_ObjectItem2.default, { key: key, jkey: jkey, doc: value, level: level + 1, propagateChanges: propagateChanges });
	  } else {
	    return _react2.default.createElement(_ValueItem2.default, { key: key, index: jkey, value: value, isLast: isLast, propagateChanges: propagateChanges });
	  }
	}

	function get_options(structure, level) {
	  if (typeof structure.levels === 'undefined' || level < structure.levels) {
	    return ['string', 'number', 'boolean', 'object', 'array', 'whitespace', 'null'];
	  }

	  return ['string', 'number', 'boolean', 'whitespace', 'null'];
	}

	function is_container(type) {
	  switch (type) {
	    case 'array':
	    case 'object':
	    case 'null':
	    case 'whitespace':
	      return true;
	    default:
	      return false;
	  }
	}

	function text2value(type, value) {
	  switch (type) {
	    case 'boolean':
	      var indexOf = ['true', '1', 'yes', 'on'].indexOf(value.toLowerCase());
	      return Boolean(0 <= indexOf);
	    case 'number':
	      return Number(value);
	    case 'array':
	      return [];
	    case 'object':
	      return {};
	    case 'null':
	      return null;
	    case 'whitespace':
	      return ' ';
	    case 'string':
	    default:
	      return value;
	  }
	}

	function capitalize(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function add2text(text, index, add) {
	  return text.substr(0, index) + add + text.substr(index);
	}

	function showError(error, text) {
	  if (typeof text !== 'undefined') {
	    var start = error.indexOf(' at line ');
	    var middle = error.indexOf(' column ');
	    var end = error.indexOf(' of the JSON data');

	    var at = parseInt(error.substr(start + 9, middle)) - 1;
	    var column = parseInt(error.substr(middle + 8, end)) - 1;

	    var lines = text.split('\n');
	    for (var line = 0; line < lines.length; line++) {
	      if (at == line) {
	        return add2text(lines[line], column, '\u02F0');
	      }
	    }
	  }
	}

	function isJson(text) {
	  return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))
	  );
	}

	function parse(text) {
	  try {
	    return { json: JSON.parse(text) };
	  } catch (error) {
	    var errorString = error.toString();
	    var errorMessage = 'Pasted text is not valid json. Error: ' + errorString + ' - ' + showError(errorString, text);

	    return { json: undefined, errorText: errorMessage };
	  }
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _AddInput = __webpack_require__(5);

	var _AddInput2 = _interopRequireDefault(_AddInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AddButton = function (_Component) {
	  _inherits(AddButton, _Component);

	  function AddButton(props) {
	    _classCallCheck(this, AddButton);

	    var _this = _possibleConstructorReturn(this, (AddButton.__proto__ || Object.getPrototypeOf(AddButton)).call(this, props));

	    _this.add = function () {
	      _this.setState({ adding: true });
	    };

	    _this.next = function (index) {
	      /* TODO
	       var child = this.refs['child' + index];
	       if (!child) return;
	       var input = child.refs.input;
	       ReactDOM.findDOMNode(child).input.focus();
	       */
	    };

	    _this.onDone = function (index, value) {
	      _this.onChange(index, value);

	      if (index < _this.props.setup.length - 1) {
	        _this.next(index + 1);
	      } else {
	        _this.save();
	      }
	    };

	    _this.onChange = function (index, value) {
	      var values = _this.state.values;
	      values[index] = value;
	      _this.setState({ values: values });
	    };

	    _this.cancel = function () {
	      _this.setState({ adding: false });
	    };

	    _this.save = function () {
	      _this.setState({ adding: false });
	      _this.props.onDone(_this.state.values);
	    };

	    _this.state = {
	      adding: false,
	      values: []
	    };
	    return _this;
	  }

	  _createClass(AddButton, [{
	    key: 'getStyle',
	    value: function getStyle() {
	      return this.context.styling['add-group'];
	    }
	  }, {
	    key: 'getButtonStyle',
	    value: function getButtonStyle(style) {
	      return this.context.styling[style];
	    }
	  }, {
	    key: 'input',
	    value: function input() {
	      var setup = this.props.setup;

	      var inputs = setup.map(function (settings, index) {
	        return _react2.default.createElement(_AddInput2.default, _extends({ key: 'ab' + index, index: index, onChange: this.onChange, onDone: this.onDone }, settings));
	      }, this);

	      return _react2.default.createElement(
	        'div',
	        { className: 'AddButton', style: this.getStyle() },
	        inputs,
	        _react2.default.createElement(
	          'button',
	          { className: 'save-button', style: this.getButtonStyle('save-button'), onClick: this.save },
	          'Save'
	        ),
	        _react2.default.createElement(
	          'button',
	          { className: 'cancel-button', style: this.getButtonStyle('cancel-button'), onClick: this.cancel },
	          'Cancel'
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.adding) {
	        return this.input();
	      } else {
	        return _react2.default.createElement(
	          'button',
	          { className: 'add-button', style: this.getButtonStyle('add-button'), onClick: this.add },
	          '+'
	        );
	      }
	    }
	  }]);

	  return AddButton;
	}(_react.Component);

	AddButton.propTypes = {
	  onDone: _react.PropTypes.func.isRequired,
	  setup: _react.PropTypes.array.isRequired
	};
	AddButton.contextTypes = {
	  styling: _react.PropTypes.object
	};
	exports.default = AddButton;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * @name JavaScript/NodeJS Merge v1.2.0
	 * @author yeikos
	 * @repository https://github.com/yeikos/js.merge

	 * Copyright 2014 yeikos - MIT license
	 * https://raw.github.com/yeikos/js.merge/master/LICENSE
	 */

	;(function(isNode) {

		/**
		 * Merge one or more objects 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */

		var Public = function(clone) {

			return merge(clone === true, false, arguments);

		}, publicName = 'merge';

		/**
		 * Merge two or more objects recursively 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */

		Public.recursive = function(clone) {

			return merge(clone === true, true, arguments);

		};

		/**
		 * Clone the input removing any reference
		 * @param mixed input
		 * @return mixed
		 */

		Public.clone = function(input) {

			var output = input,
				type = typeOf(input),
				index, size;

			if (type === 'array') {

				output = [];
				size = input.length;

				for (index=0;index<size;++index)

					output[index] = Public.clone(input[index]);

			} else if (type === 'object') {

				output = {};

				for (index in input)

					output[index] = Public.clone(input[index]);

			}

			return output;

		};

		/**
		 * Merge two objects recursively
		 * @param mixed input
		 * @param mixed extend
		 * @return mixed
		 */

		function merge_recursive(base, extend) {

			if (typeOf(base) !== 'object')

				return extend;

			for (var key in extend) {

				if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

					base[key] = merge_recursive(base[key], extend[key]);

				} else {

					base[key] = extend[key];

				}

			}

			return base;

		}

		/**
		 * Merge two or more objects
		 * @param bool clone
		 * @param bool recursive
		 * @param array argv
		 * @return object
		 */

		function merge(clone, recursive, argv) {

			var result = argv[0],
				size = argv.length;

			if (clone || typeOf(result) !== 'object')

				result = {};

			for (var index=0;index<size;++index) {

				var item = argv[index],

					type = typeOf(item);

				if (type !== 'object') continue;

				for (var key in item) {

					var sitem = clone ? Public.clone(item[key]) : item[key];

					if (recursive) {

						result[key] = merge_recursive(result[key], sitem);

					} else {

						result[key] = sitem;

					}

				}

			}

			return result;

		}

		/**
		 * Get type of variable
		 * @param mixed input
		 * @return string
		 *
		 * @see http://jsperf.com/typeofvar
		 */

		function typeOf(input) {

			return ({}).toString.call(input).slice(8, -1).toLowerCase();

		}

		if (isNode) {

			module.exports = Public;

		} else {

			window[publicName] = Public;

		}

	})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Helpers = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AddInput = function (_Component) {
	  _inherits(AddInput, _Component);

	  function AddInput(props) {
	    _classCallCheck(this, AddInput);

	    var _this = _possibleConstructorReturn(this, (AddInput.__proto__ || Object.getPrototypeOf(AddInput)).call(this, props));

	    _initialiseProps.call(_this);

	    var type = props.type || 'string';
	    _this.state = {
	      type: type,
	      value: props.value,
	      show: !(0, _Helpers.is_container)(type)
	    };
	    return _this;
	  }

	  _createClass(AddInput, [{
	    key: 'select',
	    value: function select(setup) {
	      if (setup.length > 0) {
	        var input = setup.map(function (option) {
	          return _react2.default.createElement(
	            'option',
	            { key: option, value: option },
	            option
	          );
	        }, this);
	        return _react2.default.createElement(
	          'select',
	          { onChange: this.handleSelectChange,
	            defaultValue: this.state.type },
	          input
	        );
	      }
	      return null;
	    }
	  }, {
	    key: 'input',
	    value: function input() {
	      var _props = this.props,
	          defaultValue = _props.defaultValue,
	          placeholder = _props.placeholder;

	      return _react2.default.createElement('input', { className: 'add-input',
	        style: this.getStyle(),
	        type: 'text',
	        autoFocus: false,
	        defaultValue: defaultValue,
	        placeholder: placeholder,
	        onBlur: this.finishEdit,
	        onChange: this.handleInputChange,
	        onKeyPress: this.checkEnter });
	    }
	  }, {
	    key: 'doneButton',
	    value: function doneButton() {
	      return _react2.default.createElement(
	        'button',
	        { className: 'add-button', style: this.getButtonStyle(), onClick: this.onDone },
	        '\u221A'
	      );
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      return this.context.styling['add-input'];
	    }
	  }, {
	    key: 'getButtonStyle',
	    value: function getButtonStyle() {
	      return this.context.styling['add-button'];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var multiple = this.props.multiple;


	      return _react2.default.createElement(
	        'div',
	        { className: 'AddInput' },
	        this.select(multiple),
	        this.state.show ? this.input() : this.doneButton()
	      );
	    }
	  }]);

	  return AddInput;
	}(_react.Component);

	AddInput.propTypes = {
	  type: _react.PropTypes.string,
	  multiple: _react.PropTypes.bool.isRequired,
	  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool]),
	  placeholder: _react.PropTypes.string,
	  onChange: _react.PropTypes.func.isRequired,
	  onDone: _react.PropTypes.func.isRequired
	};
	AddInput.contextTypes = {
	  styling: _react.PropTypes.object
	};

	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;

	  this.handleInputChange = function (event) {
	    var value = (0, _Helpers.text2value)(_this2.state.type, event.target.value);
	    _this2.props.onChange(_this2.props.index, value);
	    _this2.setState({ value: value });
	  };

	  this.handleSelectChange = function (event) {
	    var options = event.target.options;
	    var type = [];
	    for (var i = 0; i < options.length; i++) {
	      if (options[i].selected) {
	        type = options[i].value;
	        break;
	      }
	    }
	    var isContainer = (0, _Helpers.is_container)(type);
	    var value = isContainer ? (0, _Helpers.text2value)(type, _this2.state.value) : _this2.state.value;

	    _this2.setState({ type: type, show: !isContainer });
	    _this2.props.onChange(_this2.props.index, value);
	  };

	  this.checkEnter = function (event) {
	    if (event.key === 'Enter') {
	      _this2.finishEdit(event);
	    }
	  };

	  this.finishEdit = function (event) {
	    var value = (0, _Helpers.text2value)(_this2.state.type, event.target.value);
	    _this2.props.onDone(_this2.props.index, value);
	  };

	  this.onDone = function () {
	    var value = (0, _Helpers.text2value)(_this2.state.type, _this2.state.value);
	    _this2.props.onDone(_this2.props.index, value);
	  };
	};

	exports.default = AddInput;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _merge = __webpack_require__(4);

	var _merge2 = _interopRequireDefault(_merge);

	var _Helpers = __webpack_require__(2);

	var _AddInput = __webpack_require__(5);

	var _AddInput2 = _interopRequireDefault(_AddInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ValueItem = function (_Component) {
	  _inherits(ValueItem, _Component);

	  function ValueItem(props) {
	    _classCallCheck(this, ValueItem);

	    var _this = _possibleConstructorReturn(this, (ValueItem.__proto__ || Object.getPrototypeOf(ValueItem)).call(this, props));

	    _this.mouseOver = function () {
	      _this.setState({ hover: true });
	    };

	    _this.mouseOut = function () {
	      _this.setState({ hover: false });
	    };

	    _this.onChange = function (index, value) {
	      // ignore
	    };

	    _this.onDone = function (index, value) {
	      _this.propagateChanges(value);
	    };

	    _this.onDelete = function (event) {
	      event.stopPropagation();
	      _this.propagateDelete();
	    };

	    _this.activateEdit = function (event) {
	      _this.setState({ editing: true });
	    };

	    _this.state = {
	      editing: false,
	      hover: false
	    };
	    return _this;
	  }

	  _createClass(ValueItem, [{
	    key: 'propagateChanges',
	    value: function propagateChanges(value) {
	      this.setState({ editing: false });

	      if (this.props.propagateChanges && this.props.value != value) {
	        this.props.propagateChanges('update', this.props.index, value);
	      }
	    }
	  }, {
	    key: 'propagateDelete',
	    value: function propagateDelete() {
	      if (this.props.propagateChanges) {
	        this.props.propagateChanges('delete', this.props.index);
	      }
	    }
	  }, {
	    key: 'value',
	    value: function value() {
	      return String(this.props.value);
	    }
	  }, {
	    key: 'getClass',
	    value: function getClass() {
	      if (this.props.value === null) {
	        return 'null';
	      }
	      return _typeof(this.props.value);
	    }
	  }, {
	    key: 'getClassName',
	    value: function getClassName() {
	      return (0, _Helpers.capitalize)(this.getClass()) + 'Item';
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      if (this.context.styling.hasOwnProperty(this.getClass())) {
	        var classStyling = this.context.styling[this.getClass()];
	        return (0, _merge2.default)(true, this.context.styling['value'], classStyling);
	      }
	      return this.context.styling['value'];
	    }
	  }, {
	    key: 'getSuffix',
	    value: function getSuffix() {
	      return this.props.isLast ? null : ',';
	    }
	  }, {
	    key: 'editSettings',
	    value: function editSettings() {
	      return {
	        type: this.getClass(),
	        defaultValue: this.props.value,
	        multiple: true
	      };
	    }
	  }, {
	    key: 'renderEdit',
	    value: function renderEdit() {
	      var settings = this.editSettings();
	      return _react2.default.createElement(_AddInput2.default, _extends({ index: 0, autoFocus: false, onChange: this.onChange, onDone: this.onDone }, settings));
	    }
	  }, {
	    key: 'renderInnerValue',
	    value: function renderInnerValue() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.value(),
	        this.context.setup.tableLike ? null : this.getSuffix()
	      );
	    }
	  }, {
	    key: 'renderValue',
	    value: function renderValue() {
	      return _react2.default.createElement(
	        'div',
	        { className: this.getClassName(), style: this.getStyle(), onClick: this.activateEdit,
	          onMouseOver: this.mouseOver, onMouseOut: this.mouseOut },
	        this.renderInnerValue(),
	        this.renderDelete()
	      );
	    }
	  }, {
	    key: 'renderDelete',
	    value: function renderDelete() {
	      var visible = { 'visibility': this.state.hover ? 'visible' : 'hidden' };
	      var style = (0, _merge2.default)(true, this.context.styling['delete-button'], visible);
	      return _react2.default.createElement(
	        'button',
	        { className: 'delete-button', onClick: this.onDelete, style: style },
	        '\u232B'
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.state.editing ? this.renderEdit() : this.renderValue();
	    }
	  }]);

	  return ValueItem;
	}(_react.Component);

	ValueItem.propTypes = {
	  index: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
	  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool]),
	  isLast: _react.PropTypes.bool,
	  propagateChanges: _react.PropTypes.func.isRequired
	};
	ValueItem.contextTypes = {
	  styling: _react.PropTypes.object,
	  setup: _react.PropTypes.object
	};
	exports.default = ValueItem;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Helpers = __webpack_require__(2);

	var _AddButton = __webpack_require__(3);

	var _AddButton2 = _interopRequireDefault(_AddButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ArrayItem = function (_Component) {
	  _inherits(ArrayItem, _Component);

	  function ArrayItem() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, ArrayItem);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArrayItem.__proto__ || Object.getPrototypeOf(ArrayItem)).call.apply(_ref, [this].concat(args))), _this), _this.addItem = function (values) {
	      var doc = _this.props.doc;
	      doc.push(values[0]);
	      _this.props.propagateChanges('add', _this.props.jkey, doc);
	    }, _this.propagateChanges = function (change, index, value) {
	      var doc = _this.props.doc;
	      switch (change) {
	        case 'delete':
	          doc.splice(index, 1);
	          break;
	        case 'add':
	        case 'update':
	        default:
	          doc[index] = value;
	      }

	      _this.props.propagateChanges('update', _this.props.jkey, doc);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(ArrayItem, [{
	    key: 'addButtonSetup',
	    value: function addButtonSetup() {
	      return [{
	        type: 'String',
	        placeholder: 'value',
	        multiple: (0, _Helpers.get_options)(this.context.setup.structure, this.props.level)
	      }];
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      return this.context.styling['array'];
	    }
	  }, {
	    key: 'getRowStyle',
	    value: function getRowStyle() {
	      return this.context.styling['array-row'];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var lastIndex = this.props.doc.length - 1;
	      var items = this.props.doc.map(function (item, index) {
	        var key = this.props.jkey + index;
	        var isLast = index == lastIndex;

	        return _react2.default.createElement(
	          'div',
	          { className: 'ArrayRow', style: this.getRowStyle() },
	          (0, _Helpers.render_item)(key, index, item, this.propagateChanges, isLast, this.props.level)
	        );
	      }, this);

	      return _react2.default.createElement(
	        'div',
	        { className: 'ArrayItem', style: this.getStyle() },
	        this.context.setup.tableLike ? null : '[',
	        items,
	        _react2.default.createElement(
	          'div',
	          { className: 'ArrayRow', style: this.getRowStyle() },
	          _react2.default.createElement(_AddButton2.default, { onDone: this.addItem, setup: this.addButtonSetup() })
	        ),
	        this.context.setup.tableLike ? null : ']'
	      );
	    }
	  }]);

	  return ArrayItem;
	}(_react.Component);

	ArrayItem.contextTypes = {
	  styling: _react.PropTypes.object,
	  setup: _react.PropTypes.object
	};
	ArrayItem.propTypes = {
	  jkey: _react.PropTypes.string.isRequired,
	  doc: _react.PropTypes.array.isRequired,
	  level: _react.PropTypes.number.isRequired,
	  propagateChanges: _react.PropTypes.func.isRequired
	};
	exports.default = ArrayItem;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _merge = __webpack_require__(4);

	var _merge2 = _interopRequireDefault(_merge);

	var _Helpers = __webpack_require__(2);

	var _AddButton = __webpack_require__(3);

	var _AddButton2 = _interopRequireDefault(_AddButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var styling = {
	  root: {
	    clear: 'left'
	  },
	  array: {
	    display: 'inline-table'
	  },
	  object: {
	    display: 'inline-table'
	  },
	  'object-row': {
	    display: 'block',
	    marginLeft: 1
	  },
	  'array-row': {
	    display: 'block',
	    marginLeft: 1
	  },
	  value: {
	    display: 'inline-block',
	    minWidth: 10,
	    marginLeft: 0.1
	  },
	  key: {
	    fontWeight: 'bold'
	  },
	  string: {
	    color: 'green'
	  },
	  number: {
	    color: 'blue'
	  },
	  'undefined': {
	    color: 'violet'
	  },
	  boolean: {
	    color: 'red'
	  },
	  'null': {
	    color: 'firebrick'
	  },
	  'add-button': {
	    display: 'inline-block'
	  },
	  'save-button': {
	    display: 'inline-block'
	  },
	  'cancel-button': {
	    display: 'inline-block'
	  },
	  'delete-button': {
	    float: 'right',
	    marginLeft: 0.5,
	    display: 'inline-block'
	  },
	  'add-group': {
	    display: 'inline-flex'
	  },
	  'add-input': {
	    display: 'inline-block'
	  }
	};

	function setupStyle(props) {
	  var border = props.border || '1px solid #414141';
	  var changes = props.tableLike ? {
	    root: {
	      display: 'table',
	      border: border,
	      borderCollapse: 'collapse'
	    },
	    array: {
	      display: 'table-cell',
	      border: border
	    },
	    object: {
	      display: 'table-cell',
	      border: border
	    },
	    'array-row': {
	      display: 'table-cell',
	      border: border,
	      marginLeft: 0
	    },
	    'object-row': {
	      display: 'table-row',
	      border: border,
	      marginLeft: 0
	    },
	    key: {
	      display: 'table-cell',
	      border: border
	    },
	    value: {
	      display: 'table-cell',
	      marginLeft: 0
	    },
	    'add-button': {
	      display: 'table-cell'
	    }
	  } : {};

	  return (0, _merge2.default)((0, _merge2.default)(styling, changes), props.styling);
	}

	var JsonEditor = function (_Component) {
	  _inherits(JsonEditor, _Component);

	  function JsonEditor(props) {
	    _classCallCheck(this, JsonEditor);

	    var _this = _possibleConstructorReturn(this, (JsonEditor.__proto__ || Object.getPrototypeOf(JsonEditor)).call(this, props));

	    _this.propagateChanges = function (change, key, value) {
	      _this.setState({ value: value });
	      if (_this.props.propagateChanges) {
	        _this.props.propagateChanges(value);
	      }
	    };

	    _this.state = {
	      defaultKey: props.defaultKey || 'json.',
	      defaultJsonKey: props.defaultJsonKey || 'root',
	      styling: setupStyle(props)
	    };
	    return _this;
	  }

	  _createClass(JsonEditor, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        styling: this.state.styling,
	        setup: { tableLike: this.props.tableLike, structure: this.props.structure || {} }
	      };
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      return this.state.styling['root'];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var value = this.props.value || this.props.defaultValue || {};
	      var children = (0, _Helpers.render_item)(this.state.defaultKey, this.state.defaultJsonKey, value, this.propagateChanges, false, 0);
	      return _react2.default.createElement(
	        'div',
	        { className: 'JsonEditor', style: this.getStyle() },
	        children
	      );
	    }
	  }]);

	  return JsonEditor;
	}(_react.Component);

	JsonEditor.propTypes = {
	  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
	  value: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
	  structure: _react.PropTypes.object,
	  defaultKey: _react.PropTypes.string,
	  defaultJsonKey: _react.PropTypes.string,
	  propagateChanges: _react.PropTypes.func.isRequired
	};
	JsonEditor.childContextTypes = {
	  styling: _react.PropTypes.object,
	  setup: _react.PropTypes.object
	};
	exports.default = JsonEditor;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _merge = __webpack_require__(4);

	var _merge2 = _interopRequireDefault(_merge);

	var _ValueItem2 = __webpack_require__(6);

	var _ValueItem3 = _interopRequireDefault(_ValueItem2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var KeyItem = function (_ValueItem) {
	  _inherits(KeyItem, _ValueItem);

	  function KeyItem() {
	    _classCallCheck(this, KeyItem);

	    return _possibleConstructorReturn(this, (KeyItem.__proto__ || Object.getPrototypeOf(KeyItem)).apply(this, arguments));
	  }

	  _createClass(KeyItem, [{
	    key: 'value',
	    value: function value() {
	      return this.props.jkey;
	    }
	  }, {
	    key: 'getClass',
	    value: function getClass() {
	      return 'key';
	    }
	  }, {
	    key: 'getSuffix',
	    value: function getSuffix() {
	      return ':';
	    }
	  }, {
	    key: 'editSettings',
	    value: function editSettings() {
	      return {
	        type: 'string',
	        defaultValue: this.props.jkey,
	        multiple: false
	      };
	    }
	  }, {
	    key: 'propagateChanges',
	    value: function propagateChanges(jkey) {
	      this.setState({ editing: false });

	      if (this.props.propagateKeyChange && this.props.jkey != jkey) {
	        this.props.propagateKeyChange('update', this.props.jkey, jkey);
	      }
	    }
	  }, {
	    key: 'propagateDelete',
	    value: function propagateDelete() {
	      if (this.props.propagateKeyChange) {
	        this.props.propagateKeyChange('delete', this.props.jkey);
	      }
	    }
	  }]);

	  return KeyItem;
	}(_ValueItem3.default);

	KeyItem.propTypes = {
	  jkey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
	  propagateKeyChange: _react.PropTypes.func.isRequired
	};
	exports.default = KeyItem;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Helpers = __webpack_require__(2);

	var _AddButton = __webpack_require__(3);

	var _AddButton2 = _interopRequireDefault(_AddButton);

	var _KeyItem = __webpack_require__(9);

	var _KeyItem2 = _interopRequireDefault(_KeyItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ObjectItem = function (_Component) {
	  _inherits(ObjectItem, _Component);

	  function ObjectItem() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, ObjectItem);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ObjectItem.__proto__ || Object.getPrototypeOf(ObjectItem)).call.apply(_ref, [this].concat(args))), _this), _this.addItem = function (values) {
	      var doc = _this.props.doc;
	      doc[values[0]] = values[1];
	      _this.props.propagateChanges('add', _this.props.jkey, doc);
	    }, _this.propagateChanges = function (change, key, value) {
	      var doc = _this.props.doc;
	      switch (change) {
	        case 'delete':
	          delete doc[key];
	          break;
	        case 'add':
	        case 'update':
	        default:
	          doc[key] = value;
	      }
	      _this.props.propagateChanges('update', _this.props.jkey, doc);
	    }, _this.propagateKeyChange = function (change, oldKey, key) {
	      var entry = _this.props.doc[oldKey];
	      var doc = _this.props.doc;
	      switch (change) {
	        case 'delete':
	          break;
	        case 'add':
	        case 'update':
	        default:
	          doc[key] = entry;
	      }
	      delete doc[oldKey];

	      _this.props.propagateChanges('update', _this.props.jkey, doc);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(ObjectItem, [{
	    key: 'addButtonSetup',
	    value: function addButtonSetup() {
	      return [{
	        type: 'text',
	        placeholder: 'key',
	        multiple: []
	      }, {
	        type: 'text',
	        placeholder: 'value',
	        multiple: (0, _Helpers.get_options)(this.context.setup.structure, this.props.level)
	      }];
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle() {
	      return this.context.styling['object'];
	    }
	  }, {
	    key: 'getRowStyle',
	    value: function getRowStyle() {
	      return this.context.styling['object-row'];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var keys = Object.keys(this.props.doc);
	      var rows = keys.map(function (jkey, i) {
	        var key = this.props.jkey + '.' + jkey + i;
	        var isLast = i == keys.length - 1;

	        return _react2.default.createElement(
	          'div',
	          { key: this.props.jkey + '.r' + i, className: 'ObjectRow', style: this.getRowStyle() },
	          _react2.default.createElement(_KeyItem2.default, { key: this.props.jkey + '.k' + i, jkey: jkey, propagateKeyChange: this.propagateKeyChange }),
	          (0, _Helpers.render_item)(key, jkey, this.props.doc[jkey], this.propagateChanges, isLast, this.props.level)
	        );
	      }, this);

	      return _react2.default.createElement(
	        'div',
	        { className: 'ObjectItem', style: this.getStyle() },
	        this.context.setup.tableLike ? null : '{',
	        rows,
	        _react2.default.createElement(_AddButton2.default, { onDone: this.addItem, setup: this.addButtonSetup() }),
	        this.context.setup.tableLike ? null : '}'
	      );
	    }
	  }]);

	  return ObjectItem;
	}(_react.Component);

	ObjectItem.contextTypes = {
	  styling: _react.PropTypes.object,
	  setup: _react.PropTypes.object
	};
	ObjectItem.propTypes = {
	  jkey: _react.PropTypes.string.isRequired,
	  doc: _react.PropTypes.object.isRequired,
	  level: _react.PropTypes.number.isRequired,
	  propagateChanges: _react.PropTypes.func.isRequired
	};
	exports.default = ObjectItem;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ })
/******/ ])
});
;