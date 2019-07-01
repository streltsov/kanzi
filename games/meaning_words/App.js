var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var App = function App() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dict = _React$useState2[0],
      setDict = _React$useState2[1];

  React.useEffect(function () {
    browser.storage.local.get().then(function (storage) {
      return storage.dictionary;
    }).then(function (dictionary) {
      for (var key in dictionary) {
        if (!dictionary[key].status) {
          dictionary[key].status = 0;
        }
      }
      setDict(sortByStatus(Object.entries(dictionary)));
    });
  }, []);

  var sortByStatus = function sortByStatus(array) {
    var arr = [].concat(_toConsumableArray(array));
    for (i = 1; i < arr.length; i++) {
      for (j = 0; j < i; j++) {
        if (arr[i][1].status - 1 < arr[j][1].status) {
          var el = arr.splice(i, 1);
          arr.splice(j, 0, el[0]);
        }
      }
    }
    return arr;
  };

  var changeWordStatusInStorage = function changeWordStatusInStorage(word, status) {
    return browser.storage.local.get('dictionary').then(function (storage) {
      storage.dictionary[word].status = status;
      browser.storage.local.set({ dictionary: Object.assign({}, storage.dictionary) });
    });
  };

  var changeWordStatus = function changeWordStatus(boolean) {
    var newDict = [].concat(_toConsumableArray(dict));
    boolean ? newDict[0][1].status++ : newDict[0][1].status = 0;
    setDict(newDict);
  };

  var handleClick = function handleClick(event) {
    return event.target.textContent === dict[0][0] ? onRightAnswer() : onWrongAnswer();
  };
  var onRightAnswer = function onRightAnswer() {
    changeWordStatus(1);
    changeWordStatusInStorage(dict[0][0], dict[0][1].status);
    setDict(sortByStatus(dict));
  };
  var onWrongAnswer = function onWrongAnswer() {
    alert('Wrong!');
    changeWordStatus(0);
    changeWordStatusInStorage(dict[0][0], dict[0][1].status);
    setDict(sortByStatus(dict));
  };

  return dict.length ? React.createElement(
    'div',
    { className: 'App' },
    React.createElement(Field, { onClick: handleClick, dictionary: dict })
  ) : React.createElement(
    'div',
    { className: 'loading-screen' },
    React.createElement(
      'span',
      { className: 'loading-screen__title' },
      'Meaning Words'
    ),
    React.createElement(
      'div',
      { 'class': 'lds-ellipsis' },
      React.createElement('div', null),
      React.createElement('div', null),
      React.createElement('div', null),
      React.createElement('div', null)
    )
  );
};

ReactDOM.render(React.createElement(App), document.querySelector('#root'));