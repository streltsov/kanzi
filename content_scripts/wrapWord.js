function wrapWord(string) {

  let suffixes = '{0,2}(i?ed|i?e?s|ings?|in\'|er|or|y|i?ly|i?e?ty|ive|ally|able|ion|tion|ation|ition|ication|ness|)';

  let regexPattern = string.split(' ');
  regexPattern.forEach(function(value, index, array) {
    array[index] = value + suffixes;
  });
  regexPattern = '(\\b' + regexPattern.join(' ') + '\\b)';
  let re = new RegExp(regexPattern, 'gi');

  let nodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (re.test(node.textContent) && !/^(STYLE|SCRIPT)$/i.test(node.parentNode.nodeName))
          return NodeFilter.FILTER_ACCEPT;
      }
    },
    false);

  let wordAmount = string.split(' ').length;

  while (nodes.nextNode()) {

    let wordStart = nodes.currentNode.textContent.search(re);
    let splitNode = nodes.currentNode.splitText(wordStart);

    let stringOnPage = splitNode.textContent.split(' ', wordAmount);

    if (/\W|_/.test(stringOnPage[wordAmount - 1])) {
      stringOnPage[wordAmount - 1] = stringOnPage[wordAmount - 1].replace(/\W.*/g, '');
    }

    stringOnPage = stringOnPage.join(' ');
    nodes.currentNode.nextSibling.data = nodes.currentNode.nextSibling.data.slice(stringOnPage.length);

    let span = document.createElement('span');
    span.appendChild(document.createTextNode(stringOnPage));
    nodes.currentNode.parentElement.insertBefore(span, splitNode);
    span.style.borderBottom = '2px solid #45a1ff';
    span.className = `kz-${string.replace(/\s/g, '_')}`;

  }
}
