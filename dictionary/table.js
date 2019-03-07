browser.storage.local.get('dictionary').then((d) => {

  let wordsInTotalSpan = document.getElementsByClassName('words-in-total')[0]
  let wordsInTotalSpanText = document.createTextNode(Object.keys(d.dictionary).length);
  wordsInTotalSpan.appendChild(wordsInTotalSpanText);

  Object.keys(d.dictionary).sort().forEach(word => {

    let row = document.createElement('tr');
    row.id = word.trim().replace(/\s/g, '_');

    let wordColumn = document.createElement('td');
    let wordColumnText = document.createTextNode(word);
    wordColumn.appendChild(wordColumnText);
    row.appendChild(wordColumn);

    let meaningColumn = document.createElement('td');
    let meaningColumnText = document.createTextNode(d.dictionary[word].meaning);
    meaningColumn.appendChild(meaningColumnText);
    row.appendChild(meaningColumn);

    let exampleColumn = document.createElement('td');
    let exampleColumnText = document.createTextNode(d.dictionary[word].example);
    exampleColumn.appendChild(exampleColumnText);
    row.appendChild(exampleColumn);

    let actionButtonsColumn = document.createElement('td');
    actionButtonsColumn.style.whiteSpace = 'nowrap';

    let editButton = document.createElement('button');
    let editButtonText = document.createTextNode('Edit');
    editButton.appendChild(editButtonText);
    actionButtonsColumn.appendChild(editButton);
    editButton.onclick = () => createModal(word,
      document.getElementById(word.replace(/\s/g, '_')).children[1].textContent,
      document.getElementById(word.replace(/\s/g, '_')).children[2].textContent
    );

    let deleteButton = document.createElement('button');
    let deleteButtonText = document.createTextNode('Delete');
    deleteButton.style.marginLeft = '8px';
    deleteButton.appendChild(deleteButtonText);
    deleteButton.onclick = () => {
      delete d.dictionary[word];
      browser.storage.local.set(d);
      let wordRowToDelete = document.getElementById(word.replace(/\s/g, '_'));
      wordRowToDelete.parentNode.removeChild(wordRowToDelete);
      wordsInTotalSpan.textContent = Object.keys(d.dictionary).length;
    }

    actionButtonsColumn.appendChild(deleteButton);
    row.appendChild(actionButtonsColumn);

    document.getElementsByTagName('table')[0].appendChild(row);
  });
});
