window.onload = browser.storage.local.get().then(storage => {
  options(storage);
  Object.keys(storage.dictionary).forEach(word => wrapWord(word));
  Object.keys(storage.dictionary).forEach(word => createTooltip(word, storage.dictionary[word].meaning, storage.dictionary[word].example));
});

function options(storage) {

  switch (storage.options.suffixes) {
    case 'english':
    default:
      suffixes = '{0,2}(ied|ed|s|es|ies|ing|ings|er|ers|or|ors|y|ly|ily|ty|ity|ety|ive|al|ally|able|ion|tion|ation|ition|ication|ness)';
      break;
    case 'custom':
      suffixes = storage.options.custom_suffixes || 'Nothing'
      break;
  }

}

browser.runtime.onMessage.addListener(request => createModal(request.selectedText));

function unwrapWord(word) {
  word = word.trim().toLowerCase();
  document.querySelectorAll(`.kz-${word.replace(/\s/g, '_')}`).forEach(wrapper => {
    wrapper.outerHTML = wrapper.outerHTML.replace(wrapper.outerHTML, wrapper.innerText);
  });
}
