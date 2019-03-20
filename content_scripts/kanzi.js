browser.storage.local.get().then(storage => {
  let bodyText = document.getElementsByTagName('body')[0].textContent;
  let entriesOnPage = Object.keys(storage.dictionary).filter(string => createRegex(string).test(bodyText));

  entriesOnPage.forEach(word => {
    wrapWord(word);
    createTooltip(word, storage.dictionary[word].meaning, storage.dictionary[word].example)
  });
  getStatistics(storage.dictionary);
});

browser.runtime.onMessage.addListener(request => createModal(request.selectedText));

function unwrapWord(word) {
  word = word.trim().toLowerCase();
  document.querySelectorAll(`.kz-${word.replace(/\s/g, '_')}`).forEach(wrapper => {
    wrapper.outerHTML = wrapper.outerHTML.replace(wrapper.outerHTML, wrapper.innerText);
  });
}

function getStatistics(dict) {
  const spans = [].slice.call(document.querySelectorAll('.kz-word'));
  const words = spans.map(span => span.className.slice(11).replace(/_/g, ' '));
  const uniq = Array.from(new Set(words));

  uniq.forEach(word => {
    browser.storage.local.get('dictionary').then(d => {
      if (d.dictionary[word].frequency == undefined) {
        d.dictionary[word].frequency = 1;
        browser.storage.local.set(d);
        console.log(word + ' ' + d.dictionary[word].frequency);
      } else {
        d.dictionary[word].frequency += 1;
        browser.storage.local.set(d);
        console.log(word + ' ' + d.dictionary[word].frequency);
      }
    });
  });
}
