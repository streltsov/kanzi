const Field = ({dictionary, onClick}) => {
  const rightAnswer = dictionary[0][0];
  const shuffled = shuffle(dictionary.slice(1)); //slice the right answer
  const wrongAnswers = shuffled.slice(0, 3).map(el => el[0]);
  const variants = shuffle([rightAnswer, ...wrongAnswers]);

  return (
    <div className="Field">
      <h3 className="question">{dictionary[0][1].meaning}</h3>
      <Answers onClick={onClick} answers={variants} />
    </div>
  );
};

const Answers = ({answers, onClick}) => (
  <div className="Answers">
    {answers.map(answer => (
      <Answer onClick={onClick} answer={answer} />
    ))}
  </div>
);

const Answer = ({answer, onClick}) => (
  <button className="Answer" onClick={onClick}>
    {answer}
  </button>
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
