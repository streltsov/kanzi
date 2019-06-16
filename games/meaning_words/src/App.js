class App extends React.Component {
  state = {question: null, correctAnswer: null};

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
      });
  };

  render() {
    return this.state.correctAnswer ? (
      <Field
        question={this.state.question}
        answers={[this.state.correctAnswer]}
      />
    ) : (
      <div>Loading...</div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.querySelector('#root'));
