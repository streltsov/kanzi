function wrapWord(word) {
  let nodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let re = new RegExp('(\\b' + word + '\\b|\\b' + word + '{0,2}(i?ed|i?e?s|ing|er|or|y|i?ly|ally|able|ication|a?t?ion|ness)\\b)', 'gi');

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

