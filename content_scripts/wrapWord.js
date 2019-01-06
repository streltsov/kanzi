function wrapWord(word) {

  let suffixes = '{0,2}(i?ed|i?e?s|ing|er|or|y|i?ly|ally|able|ication|a?t?ion|ness|)';

  search = word.split(' ');
  search.forEach(function(value, index, array) {
    array[index] = value + suffixes;
  });
  search = search.join(' ');

  let nodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let re = new RegExp('(\\b' + search + '\\b)', 'gi');

  let wordAmount = word.split(' ').length;

  while (nodes.nextNode()) {

    if (nodes.currentNode.textContent.trim()) {

      while (nodes.currentNode.textContent.search(re) != -1) {
        let wordStart = nodes.currentNode.textContent.search(re);
        let splitNode = nodes.currentNode.splitText(wordStart);
        nodes.nextNode();
        let wordInText = nodes.currentNode.data.split(' ', wordAmount).join(' ').trim();
        nodes.currentNode.data = nodes.currentNode.data.slice(wordInText.length);
        let span = document.createElement('span');
        span.appendChild(document.createTextNode(wordInText));
        nodes.currentNode.parentElement.insertBefore(span, splitNode);
        span.className = `kz-word kz-${word.replace(/\s/g, '_')}`;

      }
    }
  }
}
