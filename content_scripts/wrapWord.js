function wrapWord(string) {

  let re = makeRegex(string);

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

    if (XRegExp('\\PL').test(stringOnPage[wordAmount - 1])) {
      stringOnPage[wordAmount - 1] = stringOnPage[wordAmount - 1].replace(XRegExp('\\PL.*', 'g'), '');
    }

    stringOnPage = stringOnPage.join(' ');
    nodes.currentNode.nextSibling.data = nodes.currentNode.nextSibling.data.slice(stringOnPage.length);

    let span = document.createElement('span');
    span.appendChild(document.createTextNode(stringOnPage));
    nodes.currentNode.parentElement.insertBefore(span, splitNode);
    span.style.borderBottom = '2px solid #45a1ff';
    span.style.display = 'inline';
    span.className = `kz-${string.replace(/\s/g, '_')}`;

  }
}
