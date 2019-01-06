browser.storage.local.get().then((dict) => {
  let t0 = performance.now();
  Object.keys(dict).forEach(word => wrapWord(word));
  let t1 = performance.now();
  console.log('Performance: ' + (t1 - t0) + 'milliseconds.')
  console.log('Total words: ' + Object.keys(dict).length);
  Object.keys(dict).forEach(word => createTooltip(word, dict[word].meaning, dict[word].example));
});

browser.runtime.onMessage.addListener(request => createModal(request.selectedText));

function unwrapWord(word) {
  word = word.trim().toLowerCase();
  document.querySelectorAll(`.kz-${word.replace(/\s/g, '_')}`).forEach(wrapper => {
    wrapper.outerHTML = wrapper.outerHTML.replace(wrapper.outerHTML, wrapper.innerText)
  });
}
