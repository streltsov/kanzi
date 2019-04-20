browser.storage.local.get().then(storage => {
  const bodyText = document.getElementsByTagName('body')[0].textContent;
  const entriesOnPage = Object.keys(storage.dictionary).filter(string =>
    createRegex(string).test(bodyText),
  );

  entriesOnPage.forEach(word => {
    wrapWord(word);
    createTooltip(
      word,
      storage.dictionary[word].meaning,
      storage.dictionary[word].example,
    );
  });
});

browser.runtime.onMessage.addListener(request =>
  createModal(request.selectedText),
);

const unwrapWord = word => {
  word = word.trim().toLowerCase();
  document
    .querySelectorAll(`.kz-${word.replace(/\s/g, '_')}`)
    .forEach(wrapper => {
      wrapper.outerHTML = wrapper.outerHTML.replace(
        wrapper.outerHTML,
        wrapper.innerText,
      );
    });
};
