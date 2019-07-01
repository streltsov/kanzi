function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Field = function Field(_ref) {
  var dictionary = _ref.dictionary,
      onClick = _ref.onClick;

  var rightAnswer = dictionary[0][0];
  var shuffled = shuffle(dictionary.slice(1)); //slice the right answer
  var wrongAnswers = shuffled.slice(0, 3).map(function (el) {
    return el[0];
  });
  var variants = shuffle([rightAnswer].concat(_toConsumableArray(wrongAnswers)));

  return React.createElement(
    "div",
    null,
    React.createElement(
      "h3",
      null,
      dictionary[0][1].meaning
    ),
    React.createElement(Answers, { onClick: onClick, answers: variants })
  );
};

var Answers = function Answers(_ref2) {
  var answers = _ref2.answers,
      onClick = _ref2.onClick;
  return answers.map(function (answer) {
    return React.createElement(Answer, { onClick: onClick, answer: answer });
  });
};

var Answer = function Answer(_ref3) {
  var answer = _ref3.answer,
      onClick = _ref3.onClick;
  return React.createElement(
    "button",
    { onClick: onClick },
    answer
  );
};

var shuffle = function shuffle(array) {
  var i = void 0;
  var m = array.length;
  var arr = [].concat(_toConsumableArray(array));

  while (m) {
    i = Math.floor(Math.random() * m--);
    var _ref4 = [arr[m], arr[i]];
    arr[i] = _ref4[0];
    arr[m] = _ref4[1];
  }

  return arr;
};