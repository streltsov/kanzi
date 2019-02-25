browser.runtime.sendMessage({
  loading: 'complete'
}).then(message => {

  if (message.response = 'Article') {

    browser.storage.local.get().then(storage => {
      let t0 = performance.now();
      suffixes = '{0,2}(ied|ed|s|es|ies|ing|ings|er|ers|or|ors|y|ly|ily|ty|ity|ety|ive|al|ally|able|ion|ions|ious|tion|ation|ition|ication|iness|ness|ment|ure|ish|ingly|ary)';
      Object.keys(storage.dictionary).forEach(word => wrapWord(word));
      Object.keys(storage.dictionary).forEach(word => createTooltip(word, storage.dictionary[word].meaning, storage.dictionary[word].example));
      let t1 = performance.now();
      console.log(document.getElementsByClassName('kz-word').length + ' words processed in ' + (t1 - t0) + ' milliseconds')
    });

  }

});

browser.runtime.onMessage.addListener(request => {
  if (request.selectedText) {
    createModal(request.selectedText);
  }
});

function unwrapWord(word) {
  word = word.trim().toLowerCase();
  document.querySelectorAll(`.kz-${word.replace(/\s/g, '_')}`).forEach(wrapper => {
    wrapper.outerHTML = wrapper.outerHTML.replace(wrapper.outerHTML, wrapper.innerText);
  });
}
