browser.storage.local.get().then((dict) => {
  let wordsInTotal = document.createTextNode(Object.keys(dict).length);
  document.getElementsByClassName('words-in-total')[0].appendChild(wordsInTotal);

  Object.keys(dict).sort().forEach(word => {

    let row = document.createElement('tr');

    let wordColumn = document.createElement('td');
    wordColumn.contentEditable = "true"; 
    let wordColumnText = document.createTextNode(word);
    wordColumn.appendChild(wordColumnText);
    row.appendChild(wordColumn);

    let meaningColumn = document.createElement('td');
    meaningColumn.contentEditable = "true"; 
    let meaningColumnText = document.createTextNode(dict[word].meaning);
    meaningColumn.appendChild(meaningColumnText);
    row.appendChild(meaningColumn);

    let exampleColumn = document.createElement('td');
    exampleColumn.contentEditable = "true"; 
    let exampleColumnText = document.createTextNode(dict[word].example);
    exampleColumn.appendChild(exampleColumnText);
    row.appendChild(exampleColumn);

    document.getElementsByTagName('table')[0].appendChild(row);
  });
});
