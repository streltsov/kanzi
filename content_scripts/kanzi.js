browser.storage.local.get().then((dict) => {
  Object.keys(dict).forEach(word => wrapWord(word));
  Object.keys(dict).forEach(word => createTooltip(word, dict[word].meaning, dict[word].example));
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

function wrapWord(word) {
  word = word.trim().toLowerCase();

  let tag = document.getElementsByTagName('body')[0];

  let re = new RegExp('(\\b' + word + '\\b|\\b' + word + '{0,2}(i?ed|i?e?s|ing|er|or|i?ly|ication|ion|ness)\\b)' + '(?![^<]*>|[^<>]*<\/)', 'gi');
  tag.innerHTML = tag.innerHTML.replace(re, `<span class="kz-word kz-${word.replace(/\s/g, '_')}">$&</span>`);
}
