const Answer = ({answer}) => <button>{answer}</button>;

const Answers = ({answers}) =>
  answers.map(answer => <Answer answer={answer} />);

const Field = ({question, answers}) => (
  <div>
    <h3>{question}</h3>
    <Answers answers={answers} />
  </div>
);
