/* Add word */
const addWordLi = document.querySelector('.add-word');
const addWordLiSpanText= document.querySelector('.add-word span');
addWordLiSpanText.textContent = browser.i18n.getMessage('popupAddAWord');
addWordLi.addEventListener("click", function() {
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
const dictionaryLi = document.querySelector('.dictionary');
const dictionaryLiSpanText = document.querySelector('.dictionary span');
dictionaryLiSpanText.textContent = browser.i18n.getMessage('popupDictionary');
dictionaryLi.addEventListener("click", function() {
  browser.tabs.create({
    url: '/dictionary/dictionary.html'
  });
  window.close();
});

/* The Game*/
const gamesLi = document.querySelector('.games');
const gamesLiSpanText = document.querySelector('.games span');
gamesLiSpanText.textContent = browser.i18n.getMessage('popupGames');
const gamesListDiv = document.querySelector(".games-list-div");
const backIcon = document.querySelector('.back-icon');
const meaningWordsLi = document.querySelector('.meaning-words');
const meaningWordsLiSpanText = document.querySelector('.meaning-words span');
meaningWordsLiSpanText.textContent = browser.i18n.getMessage('gamesMeaningWords');

gamesLi.addEventListener("click", function() {
  gamesListDiv.classList.toggle('hide');
});

backIcon.addEventListener("click", function() {
  gamesListDiv.classList.toggle('hide');
});

meaningWordsLi.addEventListener("click", function() {
  browser.tabs.create({
    url: '/games/meaning_words/index.html'
  });
  window.close();
});

/* Preferences */
const preferencesLi = document.querySelector('.preferences');
const preferencesLiSpanText = document.querySelector('.preferences span');
preferencesLiSpanText.textContent = browser.i18n.getMessage('popupPreferences');
preferencesLi.addEventListener("click", function() {
  browser.runtime.openOptionsPage()
  window.close();
});
