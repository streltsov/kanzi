browser.storage.local.get().then((dict) => {
  let wordsInTotal = document.createTextNode(Object.keys(dict).length);
  document.getElementsByClassName('words-in-total')[0].appendChild(wordsInTotal);

  Object.keys(dict).sort().forEach(word => {

    let row = document.createElement('tr');
    row.id = word.trim().replace(/\s/g, '_');

    let wordColumn = document.createElement('td');
    wordColumn.contentEditable = "true";
    wordColumn.onblur = function() {

      let oldWord = wordColumn.parentNode.id.replace(/_/g, ' ');
      let newWord = wordColumn.innerText.trim().toLowerCase();

      console.log(oldWord);
      console.log(newWord);

    };
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
