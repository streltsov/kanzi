/* Add word */
let addWordButton = document.getElementsByClassName("add-word")[0];
let addWordButtonText = document.createTextNode(browser.i18n.getMessage('popupAddAWord'));
addWordButton.appendChild(addWordButtonText);
addWordButton.addEventListener("click", function() {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(tab => {
    browser.tabs.sendMessage(tab[0].id, {
      selectedText: ''
    })
    window.close();
  });
});


/* Dictionary */
let dictionaryButton = document.getElementsByClassName("dictionary")[0];
let dictionaryButtonText = document.createTextNode(browser.i18n.getMessage('popupDictionary'));
dictionaryButton.appendChild(dictionaryButtonText);
document.getElementsByClassName("dictionary")[0].addEventListener("click", function() {
  browser.tabs.create({
    url: '/dictionary/dictionary.html'
  });
  window.close();
});

/* The Game*/
const games = document.getElementsByClassName("games")[0];
const back = document.getElementsByClassName("back")[0];
const gamesList = document.getElementsByClassName("games-list")[0];
const meaningWords = document.getElementsByClassName("meaning-words")[0];
games.appendChild(document.createTextNode(browser.i18n.getMessage('popupGames')));
games.addEventListener("click", function() {
  gamesList.classList.toggle('hide');
});

back.addEventListener("click", function() {
  gamesList.classList.toggle('hide');
});
meaningWords.appendChild(document.createTextNode(browser.i18n.getMessage('gamesMeaningWords')));
meaningWords.addEventListener("click", function() {
  browser.tabs.create({
    url: '/games/meaning_words/index.html'
  });
  window.close();
});


/* Preferences */
let preferencesButton = document.getElementsByClassName("preferences")[0];
let preferencesButtonText = document.createTextNode(browser.i18n.getMessage('popupPreferences'));
preferencesButton.appendChild(preferencesButtonText);
document.getElementsByClassName("preferences")[0].addEventListener("click", function() {
  browser.runtime.openOptionsPage()
  window.close();
});
