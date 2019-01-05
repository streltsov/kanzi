browser.storage.local.get().then((dict) => {
  let t0 = performance.now();
  Object.keys(dict).forEach(word => wrapWord(word));
  let t1 = performance.now();
  console.log('Performance: ' + (t1 - t0) + 'milliseconds.')
  console.log('Total words: ' + Object.keys(dict).length);
  Object.keys(dict).forEach(word => createTooltip(word, dict[word].meaning, dict[word].example));
});

browser.runtime.onMessage.addListener(request => createModal(request.selectedText));

function wrapWord(word) {
  let nodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let re = new RegExp('(\\b' + word + '\\b|\\b' + word + '{0,2}(i?ed|i?e?s|ing|er|or|y|i?ly|ally|able|ication|a?t?ion|ness)\\b)' + '(?![^<]*>|[^<>]*</)', 'gi');

  while (nodes.nextNode()) {

    if (nodes.currentNode.textContent.trim()) {

      if (nodes.currentNode.textContent.search(re) != -1) {

        let wordStart = nodes.currentNode.textContent.search(re);
        let wordLength;

        for (i = wordStart + 1; /\w/.test(nodes.currentNode.textContent.charAt(i)); i++) {
          wordLength = (i + 1) - wordStart;
        }

        let splitNode = nodes.currentNode.splitText(wordStart);
        nodes.nextNode();
        let wordInText = nodes.currentNode.data.slice(0, wordLength);
        nodes.currentNode.data = nodes.currentNode.data.slice(wordLength)
        let span = document.createElement('span');
        span.appendChild(document.createTextNode(wordInText));
        nodes.currentNode.parentElement.insertBefore(span, splitNode);
        span.className = `kz-word kz-${word}`

      }
    }
  }
}

function unwrapWord(word) {
  word = word.trim().toLowerCase();
  document.querySelectorAll(`.kz-${word.replace(/\s/g, '_')}`).forEach(wrapper => {
    wrapper.outerHTML = wrapper.outerHTML.replace(wrapper.outerHTML, wrapper.innerText)
  });
}
