browser.storage.local
  .get()
  .then(storage => storage.dictionary)
  .then(dict => startGame(dict));

const getRandomProperty = obj => {
  const keys = Object.keys(obj);
  const random = Math.floor(Math.random() * keys.length);
  return {word: keys[random], ...obj[keys[random]]};
};

const startGame = dict => {
  const answers = Array.from({length: 4}, el => (el = getRandomProperty(dict)));
  answers.forEach((answer, i) => {
    document.getElementsByClassName('answer')[i].textContent = answer.word;
  });
};

const recorder = (state = {}, action) =>
  action.type === 'RECORD'
    ? {...state, usedWords: [...state.usedWords || undefined, action.word]}
    : state;

const store = Redux.createStore(recorder);

document
  .querySelector('.get-state')
  .addEventListener('click', () => console.log(store.getState()));
document
  .querySelector('.increment')
  .addEventListener('click', () => store.dispatch({type: 'INCREMENT'}));

document.querySelectorAll('.answer').forEach(answer => {
  answer.addEventListener('click', event =>
    store.dispatch({type: 'RECORD', word: event.target.textContent}),
  );
});
