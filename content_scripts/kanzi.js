browser.runtime.onMessage.addListener(message => {
  if (message.isArticle) {
    browser.storage.local.get().then(storage => {
      suffixes = '{0,2}(ied|ed|s|es|ies|ing|ings|er|ers|or|ors|y|ly|ily|ty|ity|ety|ive|al|ally|able|ion|ions|ious|tion|ation|ition|ication|iness|ness|ment|ure|ish|ingly)';
      Object.keys(storage.dictionary).forEach(word => wrapWord(word));
      Object.keys(storage.dictionary).forEach(word => createTooltip(word, storage.dictionary[word].meaning, storage.dictionary[word].example));
    });
  }
});

browser.runtime.onMessage.addListener(request => createModal(request.selectedText));

function unwrapWord(word) {
  word = word.trim().toLowerCase();
  document.querySelectorAll(`.kz-${word.replace(/\s/g, '_')}`).forEach(wrapper => {
    wrapper.outerHTML = wrapper.outerHTML.replace(wrapper.outerHTML, wrapper.innerText);
  });
}
