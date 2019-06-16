var Answer = function Answer(_ref) {
  var answer = _ref.answer;
  return React.createElement(
    "button",
    null,
    answer
  );
};

var Answers = function Answers(_ref2) {
  var answers = _ref2.answers;
  return answers.map(function (answer) {
    return React.createElement(Answer, { answer: answer });
  });
};

var Field = function Field(_ref3) {
  var question = _ref3.question,
      answers = _ref3.answers;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h3",
      null,
      question
    ),
    React.createElement(Answers, { answers: answers })
  );
};