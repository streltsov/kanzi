browser.storage.local.get().then(storage => {
  let bodyText = document.getElementsByTagName('body')[0].textContent;
  let entriesOnPage = [];

  Object.keys(storage.dictionary).forEach(string => {
    if (createRegex(string).test(bodyText)) {
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
