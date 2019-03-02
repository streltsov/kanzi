let bodyText = document.getElementsByTagName('body')[0].textContent;
let entriesOnPage = [];

browser.storage.local.get().then(storage => {
  let t0 = performance.now();

  Object.keys(storage.dictionary).forEach(key => {
    let regex = new RegExp('\\b' + key + '([^\\s]{0,3})\\b', 'gi');
    if (regex.test(bodyText)) {
      entriesOnPage.push(key);
    }
  });

  entriesOnPage.forEach(word => wrapWord(word));
  Object.keys(storage.dictionary).forEach(word => createTooltip(word, storage.dictionary[word].meaning, storage.dictionary[word].example));

  let t1 = performance.now();
  console.log(document.getElementsByClassName('kz-word').length + ' words processed in ' + (t1 - t0) + ' milliseconds')
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
