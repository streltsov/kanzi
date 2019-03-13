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

let dictionaryButton = document.getElementsByClassName("dictionary")[0];
let dictionaryButtonText = document.createTextNode(browser.i18n.getMessage('popupDictionary'));
dictionaryButton.appendChild(dictionaryButtonText);
document.getElementsByClassName("dictionary")[0].addEventListener("click", function() {
  browser.tabs.create({
    url: '/dictionary/dictionary.html'
  });
  window.close();
});

let preferencesButton = document.getElementsByClassName("preferences")[0];
let preferencesButtonText = document.createTextNode(browser.i18n.getMessage('popupPreferences'));
preferencesButton.appendChild(preferencesButtonText);
document.getElementsByClassName("preferences")[0].addEventListener("click", function() {
  browser.runtime.openOptionsPage()
  window.close();
});
