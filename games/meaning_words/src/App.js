class App extends React.Component {
  state = {question: null, correctAnswer: null, dict: null};

  sort = obj =>
    Object.keys(obj)
      .sort((a, b) => obj[a].status - obj[b].status)
      .reverse();

  getAnswers = array => [
    array[0],
    ...Array.from(
      {length: 3},
      () => array[Math.floor(Math.random() * array.length)],
    ),
  ];

  componentDidMount = () => {
    browser.storage.local
      .get()

      .then(storage => storage.dictionary)
      .then(dictionary => {
        this.setState({correctAnswer: this.sort(dictionary)[0]});
        this.setState({question: dictionary[this.state.correctAnswer].meaning});
        this.setState({dict: dictionary});
      });
  };

  onClick = event =>
    this.changeWordStatus(
      event.target.textContent === this.state.correctAnswer ? 1 : -1,
    );

  changeWordStatus = number =>
    this.setState({
      dict: {
        ...this.state.dict,
        [this.state.correctAnswer]: {
          ...this.state.dict[this.state.correctAnswer],
          status:
            this.state.dict[this.state.correctAnswer].status > 0 && number < 0
              ? 0
              : this.state.dict[this.state.correctAnswer].status < 0 &&
                number > 0
              ? 1
              : this.state.dict[this.state.correctAnswer].status + number,
        },
      },
    });

  render() {
    return this.state.dict ? (
      <div>
        <Field
          onClick={this.onClick}
          question={this.state.question}
          answers={[this.state.correctAnswer, 1, 2, 3]}
        />
        <ol>
          {' '}
          {this.sort(this.state.dict).map(el => (
            <li>
              {' '}
              {el} [ {this.state.dict[el].status} ]{' '}
            </li>
          ))}{' '}
        </ol>{' '}
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.querySelector('#root'));
