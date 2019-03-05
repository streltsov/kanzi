browser.storage.local.get().then(storage => {
  let bodyText = document.getElementsByTagName('body')[0].textContent;
  let entriesOnPage = [];

  Object.keys(storage.dictionary).forEach(string => {
    let re = makeRegex(string);
    if (re.test(bodyText)) {
      entriesOnPage.push(string);
    }
  });

  entriesOnPage.forEach(word => {
    wrapWord(word);
    createTooltip(word, storage.dictionary[word].meaning, storage.dictionary[word].example)
  });

});

browser.runtime.onMessage.addListener(request => createModal(request.selectedText));

function unwrapWord(word) {
  word = word.trim().toLowerCase();
  document.querySelectorAll(`.kz-${word.replace(/\s/g, '_')}`).forEach(wrapper => {
    wrapper.outerHTML = wrapper.outerHTML.replace(wrapper.outerHTML, wrapper.innerText);
  });
}

let suffixes = '{0,2}(ied|ed|s|es|ies|ing|ings|er|ers|or|ors|y|ly|ily|ty|ity|ety|ive|al|ally|able|ion|ions|ious|tion|ation|ition|ication|iness|ness|ment|ure|ish|ingly|ary)';

function makeRegex(string) {
  let pattern;
  if (/\s/.test(string)) {
    pattern = string.split(' ');
    pattern.forEach(function(value, i, array) {
      array[i] = value + suffixes;
    });
    pattern = pattern.join(' ');
  } else {
    pattern = string + '\\b|\\b' + string + suffixes + '\\b';
  }
  return new RegExp('\\b' + pattern, 'gi');
}
