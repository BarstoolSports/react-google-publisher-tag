'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Horizontal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GooglePublisherTag = require('./GooglePublisherTag');

var _GooglePublisherTag2 = _interopRequireDefault(_GooglePublisherTag);

var _Format = require('./constants/Format');

var _Format2 = _interopRequireDefault(_Format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Horizontal(props) {
  return _react2.default.createElement(_GooglePublisherTag2.default, _extends({}, props, {
    format: _Format2.default.HORIZONTAL
  }));
}