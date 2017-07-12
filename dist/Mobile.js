'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Mobile;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GooglePublisherTag = require('./GooglePublisherTag');

var _GooglePublisherTag2 = _interopRequireDefault(_GooglePublisherTag);

var _Format = require('./constants/Format');

var _Format2 = _interopRequireDefault(_Format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Mobile(props) {
  var small = props.small,
      rest = _objectWithoutProperties(props, ['small']);

  return _react2.default.createElement(_GooglePublisherTag2.default, _extends({
    format: small ? _Format2.default.MOBILE : _Format2.default.MOBILE_BIG
  }, rest));
}

Mobile.propTypes = {
  small: _propTypes2.default.bool
};

Mobile.defaultProps = {
  small: undefined
};