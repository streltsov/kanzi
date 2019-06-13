const Answer = props => <button>{props.answer}</button>;
const Answers = props =>
  props.answers.map(answer => <Answer answer={answer} />);

class App extends React.Component {
  state = {words: null, dict: null};

  sort = obj =>
    Object.keys(obj)
      .sort((a, b) => obj[a].status - obj[b].status)
      .reverse();

  componentDidMount = () => {
    browser.storage.local
      .get()
      .then(storage => storage.dictionary)
      .then(dictionary => {
        this.setState({words: this.sort(dictionary)});
        this.setState({dict: dictionary});
      });
  };

  getAnswers = array => [
    array[0],
    ...Array.from(
      {length: 3},
      () => array[Math.floor(Math.random() * array.length)],
    ),
  ];

  render() {
    return this.state.words && this.state.dict ? (
      <div>
        <h3>{this.state.dict[this.state.words[0]].meaning}</h3>
        <Answers answers={this.getAnswers(this.state.words)} />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.querySelector('#root'));
