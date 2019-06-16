var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = { question: null, correctAnswer: null }, _this.sort = function (obj) {
      return Object.keys(obj).sort(function (a, b) {
        return obj[a].status - obj[b].status;
      }).reverse();
    }, _this.getAnswers = function (array) {
      return [array[0]].concat(_toConsumableArray(Array.from({ length: 3 }, function () {
        return array[Math.floor(Math.random() * array.length)];
      })));
    }, _this.componentDidMount = function () {
      browser.storage.local.get().then(function (storage) {
        return storage.dictionary;
      }).then(function (dictionary) {
        _this.setState({ correctAnswer: _this.sort(dictionary)[0] });
        _this.setState({ question: dictionary[_this.state.correctAnswer].meaning });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return this.state.correctAnswer ? React.createElement(Field, {
        question: this.state.question,
        answers: [this.state.correctAnswer]
      }) : React.createElement(
        'div',
        null,
        'Loading...'
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App), document.querySelector('#root'));