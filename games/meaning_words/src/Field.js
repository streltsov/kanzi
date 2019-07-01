const Field = ({dictionary, onClick}) => {
  const rightAnswer = dictionary[0][0];
  const shuffled = shuffle(dictionary.slice(1)); //slice the right answer
  const wrongAnswers = shuffled.slice(0, 3).map(el => el[0]);
  const variants = shuffle([rightAnswer, ...wrongAnswers]);

  return (
    <div>
      <h3>{dictionary[0][1].meaning}</h3>
      <Answers onClick={onClick} answers={variants} />
    </div>
  );
};

const Answers = ({answers, onClick}) =>
  answers.map(answer => <Answer onClick={onClick} answer={answer} />);

const Answer = ({answer, onClick}) => (
  <button onClick={onClick}>{answer}</button>
);

const shuffle = array => {
  let i;
  let m = array.length;
  const arr = [...array];

  while (m) {
    i = Math.floor(Math.random() * m--);
    [arr[i], arr[m]] = [arr[m], arr[i]];
  }

  return arr;
};
