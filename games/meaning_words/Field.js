var Answer = function Answer(_ref) {
  var answer = _ref.answer,
      onClick = _ref.onClick;
  return React.createElement(
    "button",
    { onClick: onClick },
    answer
  );
};

var Answers = function Answers(_ref2) {
  var answers = _ref2.answers,
      onClick = _ref2.onClick;
  return answers.map(function (answer) {
    return React.createElement(Answer, { onClick: onClick, answer: answer });
  });
};

var Field = function Field(_ref3) {
  var question = _ref3.question,
      answers = _ref3.answers,
      onClick = _ref3.onClick;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h3",
      null,
      question
    ),
    React.createElement(Answers, { onClick: onClick, answers: answers })
  );
};