'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = SmartMobile;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Mobile = require('./Mobile');

var _Mobile2 = _interopRequireDefault(_Mobile);

var _Horizontal = require('./Horizontal');

var _Horizontal2 = _interopRequireDefault(_Horizontal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function SmartMobile(props) {
  var small = props.small,
      mobileMaxWindowWidth = props.mobileMaxWindowWidth,
      className = props.className,
      rest = _objectWithoutProperties(props, ['small', 'mobileMaxWindowWidth', 'className']);

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(_Horizontal2.default, _extends({ minWindowWidth: mobileMaxWindowWidth + 1 }, rest)),
    _react2.default.createElement(_Mobile2.default, _extends({ maxWindowWidth: mobileMaxWindowWidth }, rest))
  );
}

SmartMobile.propTypes = {
  className: _propTypes2.default.string,
  small: _propTypes2.default.bool,
  mobileMaxWindowWidth: _propTypes2.default.number
};

SmartMobile.defaultProps = {
  className: undefined,
  small: undefined,
  mobileMaxWindowWidth: 576
};