const App = () => {
  const [dict, setDict] = React.useState([]);

  React.useEffect(() => {
    browser.storage.local
      .get()
      .then(storage => storage.dictionary)
      .then(dictionary => {
        for (let key in dictionary) {
          if (!dictionary[key].status) {
            dictionary[key].status = 0;
          }
        }
        setDict(sortByStatus(Object.entries(dictionary)));
      });
  }, []);

  const sortByStatus = array => {
    let arr = [...array];
    for (i = 1; i < arr.length; i++) {
      for (j = 0; j < i; j++) {
        if (arr[i][1].status - 1 < arr[j][1].status) {
          let el = arr.splice(i, 1);
          arr.splice(j, 0, el[0]);
        }
      }
    }
    return arr;
  };

  const changeWordStatusInStorage = (word, status) =>
    browser.storage.local.get('dictionary').then(storage => {
      storage.dictionary[word].status = status;
      browser.storage.local.set({dictionary: {...storage.dictionary}});
    });

  const changeWordStatus = boolean => {
    const newDict = [...dict];
    boolean ? newDict[0][1].status++ : (newDict[0][1].status = 0);
    setDict(newDict);
  };

  const handleClick = event =>
    event.target.textContent === dict[0][0] ? onRightAnswer() : onWrongAnswer();
  const onRightAnswer = () => {
    changeWordStatus(1);
    changeWordStatusInStorage(dict[0][0], dict[0][1].status);
    setDict(sortByStatus(dict));
  };
  const onWrongAnswer = () => {
    alert('Wrong!');
    changeWordStatus(0);
    changeWordStatusInStorage(dict[0][0], dict[0][1].status);
    setDict(sortByStatus(dict));
  };

  return dict.length ? (
    <div className="App">
      <Field onClick={handleClick} dictionary={dict} />
    </div>
  ) : (
    <span>Loading...</span>
  );
};

ReactDOM.render(React.createElement(App), document.querySelector('#root'));
