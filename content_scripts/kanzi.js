browser.storage.local.get().then((dict) => {
  for (let word in dict) {
    wrapWord(word, dict[word].meaning, dict[word].example);
    createTooltip(word, dict[word].meaning, dict[word].example);
  }
});

browser.runtime.onMessage.addListener(request => createModal(request.selectedText));

function addWord(word, meaning, example) {
  word = word.trim().toLowerCase();
  meaning = meaning.trim();
  example = example.trim();

  browser.storage.local.set({
    [word]: {
      meaning: meaning,
      example: example
    }
  });
}

function unwrapWord(word) {
  word = word.trim().toLowerCase();
  let span = document.getElementsByClassName(`kz-${word.replace(/\s/g, '_')}`);
  while (span[0]) {
    let allTextInSpan = span[0].innerText;
    let arr = allTextInSpan.split('\n', 1);
    let wordInText = arr[0];
    span[0].parentNode.replaceChild(document.createTextNode(wordInText), span[0]);
  }
}

function wrapWord(word, meaning, example) {
  word = word.trim().toLowerCase();

  let re = new RegExp('\\b' + word + '\\b|\\b' +
    word + '{0,2}ing\\b|\\b' +
    word + '{0,2}e?d\\b|\\b' +
    word + 'e?s\\b|\\b' +
    word + '{0,2}e?r\\b', 'gi');

  findAndReplaceDOMText(document.getElementsByTagName('body')[0], {
    preset: 'prose',
    find: re,
    wrap: 'span',
    wrapClass: `kz-word kz-${word.replace(/\s/g, '_')}`
  });
}
