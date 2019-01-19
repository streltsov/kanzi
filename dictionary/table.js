browser.storage.local.get('dictionary').then((d) => {
  let wordsInTotal = document.createTextNode(Object.keys(d.dictionary).length);
  document.getElementsByClassName('words-in-total')[0].appendChild(wordsInTotal);

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

    document.getElementsByTagName('table')[0].appendChild(row);
  });
});
