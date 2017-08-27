'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Format = require('./constants/Format');

var _Format2 = _interopRequireDefault(_Format);

var _Dimensions = require('./constants/Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://developers.google.com/doubleclick-gpt/reference
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


function debounce(fn, delay) {
  var timer = null;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = setTimeout(function () {
      return fn.apply(undefined, args);
    }, delay);
  };
}

function prepareDimensions(dimensions) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Format2.default.HORIZONTAL;
  var canBeLower = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!dimensions || !dimensions.length) {
    return _Dimensions2.default[format] || [];
  }

  if (dimensions.length === 1 && canBeLower) {
    var dimension = dimensions[0];
    var key = dimension[0] + 'x' + dimension[1];

    if (_Dimensions2.default[key]) {
      return _Dimensions2.default[key] || [];
    }
  }

  return dimensions;
}

var nextId = 1;
var googletag = null;

function getNextId() {
  nextId += 1;

  return 'rgpt-' + nextId;
}

function loadScript() {
  var gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  gads.src = '//www.googletagservices.com/tag/js/gpt.js';

  var head = document.getElementsByTagName('head')[0];
  head.appendChild(gads);
}

function initGooglePublisherTag(props) {
  var exitAfterAddingCommands = !!googletag;

  if (!googletag) {
    googletag = window.googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];
  }

  var onImpressionViewable = props.onImpressionViewable,
      onSlotRenderEnded = props.onSlotRenderEnded,
      path = props.path;


  var preset_id = props.id || false;

  // Execute callback when the slot is visible in DOM (thrown before 'impressionViewable' )
  if (onSlotRenderEnded) {
    googletag.cmd.push(function () {
      googletag.pubads().addEventListener('slotRenderEnded', function (event) {
        // check if the current slot is the one the callback was added to
        // (as addEventListener is global)
        if (event.slot.getAdUnitPath() === path) {
          onSlotRenderEnded(event, preset_id);
        }
      });
    });
  }

  // Execute callback when ad is completely visible in DOM
  if (onImpressionViewable) {
    googletag.cmd.push(function () {
      googletag.pubads().addEventListener('impressionViewable', function (event) {
        if (event.slot.getAdUnitPath() === path) {
          onImpressionViewable(event, preset_id);
        }
      });
    });
  }

  if (exitAfterAddingCommands) {
    return;
  }

  googletag.cmd.push(function () {
    if (props.enableSingleRequest) {
      // Infinite scroll requires SRA
      googletag.pubads().enableSingleRequest();
    }

    // add support for async loading
    googletag.pubads().enableAsyncRendering();

    // collapse div without ad
    googletag.pubads().collapseEmptyDivs();

    // load ad with slot refresh
    googletag.pubads().disableInitialLoad();

    // enable google publisher tag
    googletag.enableServices();
  });

  loadScript();
}

var GooglePublisherTag = function (_Component) {
  _inherits(GooglePublisherTag, _Component);

  function GooglePublisherTag() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GooglePublisherTag);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GooglePublisherTag.__proto__ || Object.getPrototypeOf(GooglePublisherTag)).call.apply(_ref, [this].concat(args))), _this), _this.handleResize = function () {
      var resizeDebounce = _this.props.resizeDebounce;


      if (!_this.resizeDebounce) {
        _this.resizeDebounce = debounce(function () {
          return _this.update(_this.props);
        }, resizeDebounce);
      }

      _this.resizeDebounce();
    }, _this.handleNode = function (node) {
      _this.node = node;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GooglePublisherTag, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      initGooglePublisherTag(this.props);

      if (this.props.responsive) {
        window.addEventListener('resize', this.handleResize);
      }

      googletag.cmd.push(function () {
        _this2.initialized = true;
        _this2.update(_this2.props);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.update(props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // TODO sometimes can props changed
      if (this.props.responsive) {
        window.removeEventListener('resize', this.handleResize);
      }

      this.removeSlot();
    }
  }, {
    key: 'update',
    value: function update(props) {
      if (!this.initialized) {
        return;
      }

      var node = this.node;

      if (!node) {
        return;
      }

      var preset_id = props.id || false;

      var componentWidth = node.offsetWidth;
      var availableDimensions = prepareDimensions(props.dimensions, props.format, props.canBeLower);

      // filter by available node space
      var dimensions = props.responsive ? availableDimensions.filter(function (dimension) {
        return dimension[0] <= componentWidth;
      }) : availableDimensions;

      // filter by min and max width
      var windowWidth = window.innerWidth;
      var minWindowWidth = props.minWindowWidth,
          maxWindowWidth = props.maxWindowWidth,
          collapseEmptyDiv = props.collapseEmptyDiv;

      var targeting = props.targeting || false,
          forceRebuild = props.forceRebuild;

      if (minWindowWidth !== undefined && windowWidth < minWindowWidth) {
        dimensions = [];
      } else if (maxWindowWidth !== undefined && windowWidth > maxWindowWidth) {
        dimensions = [];
      }

      if (JSON.stringify(targeting) !== JSON.stringify(this.currentTargeting)) {
        forceRebuild = true;
      }

      // do nothink
      if (JSON.stringify(dimensions) === JSON.stringify(this.currentDimensions) && !forceRebuild) {
        return;
      }

      this.currentDimensions = dimensions;

      if (this.slot) {
        // remove current slot because dimensions is changed and current slot is old
        this.removeSlot();
      }

      // there is nothink to display
      if (!dimensions || !dimensions.length) {
        return;
      }

      // prepare new node content
      var id = preset_id ? preset_id : getNextId();
      node.innerHTML = '<div id="' + id + '"></div>';

      // prepare new slot
      var slot = googletag.defineSlot(props.path, dimensions, id);
      this.slot = slot;

      // set targeting
      if (targeting) {
        Object.keys(targeting).forEach(function (key) {
          slot.setTargeting(key, targeting[key]);
        });
      } else {
        googletag.pubads().clearTargeting();
      }

      this.currentTargeting = targeting;

      // set collapsing
      if (typeof collapseEmptyDiv !== 'undefined') {
        var args = Array.isArray(collapseEmptyDiv) ? collapseEmptyDiv : [collapseEmptyDiv];

        slot.setCollapseEmptyDiv.apply(slot, _toConsumableArray(args));
      }

      slot.addService(googletag.pubads());

      // display new slot
      googletag.display(id);
      googletag.pubads().refresh([slot]);
    }
  }, {
    key: 'removeSlot',
    value: function removeSlot() {
      if (!this.slot) {
        return;
      }

      googletag.destroySlots([this.slot]);

      googletag.pubads().clear([this.slot]);
      this.slot = null;

      if (this.node) {
        this.node.innerHTML = null;
      }
    }
  }, {
    key: 'refreshSlot',
    value: function refreshSlot() {
      if (this.slot) {
        googletag.pubads().refresh([this.slot]);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: this.props.className, ref: this.handleNode });
    }
  }]);

  return GooglePublisherTag;
}(_react.Component);

GooglePublisherTag.propTypes = {
  className: _propTypes2.default.string,
  path: _propTypes2.default.string.isRequired,
  format: _propTypes2.default.string.isRequired,
  responsive: _propTypes2.default.bool.isRequired,
  canBeLower: _propTypes2.default.bool.isRequired, // can be ad lower than original size,
  enableSingleRequest: _propTypes2.default.bool.isRequired,
  dimensions: _propTypes2.default.array, // [[300, 600], [160, 600]]
  minWindowWidth: _propTypes2.default.number,
  maxWindowWidth: _propTypes2.default.number,
  targeting: _propTypes2.default.object,
  resizeDebounce: _propTypes2.default.number.isRequired,
  onSlotRenderEnded: _propTypes2.default.func
};
GooglePublisherTag.defaultProps = {
  format: _Format2.default.HORIZONTAL,
  responsive: true,
  canBeLower: true,
  enableSingleRequest: false,
  dimensions: null,
  resizeDebounce: 100
};
exports.default = GooglePublisherTag;