const wrapWord = string => {
  const nodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (
          createRegex(string).test(node.textContent) &&
          !/^(STYLE|SCRIPT)$/i.test(node.parentNode.nodeName)
        )
          return NodeFilter.FILTER_ACCEPT;
      },
    },
    false,
  );

  while (nodes.nextNode()) {
    const ex = createRegex(string, 'i').exec(nodes.currentNode.textContent);
    const splitNode = nodes.currentNode.splitText(ex.index);
    const stringOnPage = ex[0];
    nodes.currentNode.nextSibling.data = nodes.currentNode.nextSibling.data.slice(
      stringOnPage.length,
    );

    const span = document.createElement('span');
    span.appendChild(document.createTextNode(stringOnPage));
    span.className = `kz-word kz-${string.replace(/\s/g, '_')}`;
    span.style.borderBottom = '2px solid #45a1ff';
    span.style.display = 'inline';
    nodes.currentNode.parentElement.insertBefore(span, splitNode);
  }
};
