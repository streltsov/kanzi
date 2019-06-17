const Answer = ({answer, onClick}) => <button onClick={onClick}>{answer}</button>;

const Answers = ({answers, onClick}) =>
  answers.map(answer => <Answer onClick={onClick} answer={answer} />);

const Field = ({question, answers, onClick}) => (
  <div>
    <h3>{question}</h3>
    <Answers  onClick={onClick} answers={answers} />
  </div>
);
