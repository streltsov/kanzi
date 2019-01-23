browser.storage.local.get('dictionary').then((d) => {
  let t0 = performance.now();
  Object.keys(d.dictionary).forEach(word => wrapWord(word));
  let t1 = performance.now();
  console.log('Performance: ' + (t1 - t0) + 'milliseconds.');
  Object.keys(d.dictionary).forEach(word => createTooltip(word, d.dictionary[word].meaning, d.dictionary[word].example));
});

browser.runtime.onMessage.addListener(request => createModal(request.selectedText));

function unwrapWord(word) {
  word = word.trim().toLowerCase();
  document.querySelectorAll(`.kz-${word.replace(/\s/g, '_')}`).forEach(wrapper => {
    wrapper.outerHTML = wrapper.outerHTML.replace(wrapper.outerHTML, wrapper.innerText);
  });
}
