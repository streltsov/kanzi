const getText = browser.i18n.getMessage;


// Head Title and H1 Title
const H1 = document.createElement('h1');
const headTitle = document.head.getElementsByTagName('title')[0];
const titleAndH1Text = document.createTextNode('Kanzi ' + getText('dictionaryTitle'));
H1.appendChild(titleAndH1Text);
headTitle.appendChild(titleAndH1Text);
document.body.appendChild(H1);

// Panel
const panel = document.createElement('div');
panel.className = 'panel';

// Word Counter
const wordCounter = document.createElement('span');
const wordCounterText = document.createTextNode(getText('wordCounter') + ': ');
wordCounter.appendChild(wordCounterText);
browser.storage.local.get('dictionary').then((d) => {
  wordCounter.appendChild(document.createTextNode(Object.keys(d.dictionary).length));
});
panel.appendChild(wordCounter);

// Word Finder
const wordFinder = document.createElement('input');
wordFinder.type = 'text';
wordFinder.id = 'word-finder-input';
wordFinder.placeholder = getText('wordFinderPlaceholderText');
wordFinder.addEventListener('keyup', function() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("word-finder-input");
  filter = new RegExp('\\b' + input.value, 'i');
  table2 = document.getElementById("dictionary-table");
  tr = table2.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (filter.test(txtValue)) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});
panel.appendChild(wordFinder);

// Space Span
const spaceSpan = document.createElement('span');
spaceSpan.className = 'space';
panel.appendChild(spaceSpan);

// Export Button
const exportButton = document.createElement('button');
exportButton.className = 'export-button';
exportButton.textContent = getText('dictionaryExportButton');
exportButton.addEventListener("click", function() {
  browser.storage.local.get('dictionary').then((d) => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d.dictionary));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute('download', 'Kanzi Dictionary.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });
});
panel.appendChild(exportButton);

// Import Button
const importButton = document.createElement('button');
importButton.className = 'import-button';
importButton.textContent = getText('dictionaryImportButton');
panel.appendChild(importButton);

// Import Input
const importInput = document.createElement('input');
importInput.type = 'file';
importInput.id = 'import-input';
importInput.addEventListener("change", handleFiles, false);

importButton.addEventListener('click', function() {
  importInput.click();
});

function handleFiles() {
  const fileList = this.files;
  printFile(fileList[0]);
}

function printFile(file) {
  var reader = new FileReader();
  reader.onload = function(evt) {
    let json = evt.target.result.replace(/"([^"]+)":/g, function($0, $1) {
      return ('"' + $1.toLowerCase() + '":');
    });
    browser.storage.local.get('dictionary').then((d) => {
      let iDict = JSON.parse(json);
      d.dictionary = Object.assign(d.dictionary, iDict);
      browser.storage.local.set(d);
    })

  };
  browser.tabs.reload();
  reader.readAsText(file);
}

panel.appendChild(importInput);

// Delete All Button
const deleteAllButton = document.createElement('button');
deleteAllButton.className = 'delete-all-button';
deleteAllButton.textContent = getText('dictionaryDeleteAllButton');
deleteAllButton.addEventListener('click', function() {
  const sure = confirm(getText('dictionaryDeleteAllConfirmation'));
  if (sure) {
    browser.storage.local.get().then((storage) => {
      browser.storage.local.set({
        dictionary: {}
      });
    });
    browser.tabs.reload();
  }
});
panel.appendChild(deleteAllButton);

document.body.appendChild(panel);

// Table
const table = document.createElement('table');
table.id = 'dictionary-table';
const tr = document.createElement('tr');

const tableWord = document.createElement('th');
tableWord.textContent = getText('dictionaryTableWord');
tr.appendChild(tableWord);

const tableMeaning = document.createElement('th');
tableMeaning.textContent = getText('dictionaryTableMeaning');
tr.appendChild(tableMeaning);

const tableExample = document.createElement('th');
tableExample.textContent = getText('dictionaryTableExample');
tr.appendChild(tableExample);

const tableActions = document.createElement('th');
tableActions.textContent = getText('dictionaryTableActions');
tr.appendChild(tableActions);

table.appendChild(tr);
document.body.appendChild(table);

browser.storage.local.get('dictionary').then((d) => {

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
    editButton.textContent = getText('dictionaryEditButton');
    actionButtonsColumn.appendChild(editButton);
    editButton.onclick = () => createModal(word,
      document.getElementById(word.replace(/\s/g, '_')).children[1].textContent,
      document.getElementById(word.replace(/\s/g, '_')).children[2].textContent
    );

    let deleteButton = document.createElement('button');
    deleteButton.textContent = getText('dictionaryDeleteButton');
    deleteButton.style.marginLeft = '8px';
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

// Modal Window
function createModal(word, meaning, example) {

  const modal = document.createElement('div');
  modal.className = 'kz-overlay';

  const modalContent = document.createElement('div');
  modalContent.className = 'kz-modal-content';

  const wordField = document.createElement('input');
  wordField.value = word;
  wordField.disabled = 'true';
  wordField.className = 'kz-word-field';

  const meaningLabel = document.createElement('label');
  meaningLabel.className = 'kz-meaning-label';
  meaningLabel.textContent = getText('modalMeaningLabel');
  const meaningField = document.createElement('textarea');
  meaningField.placeholder = getText('modalMeaningPlaceholder');
  meaningField.className = 'kz-meaning-field';
  meaningField.id = 'kz-meaning-field';
  if (meaningField) meaningField.value = meaning;

  const exampleLabel = document.createElement('label');
  exampleLabel.className = 'kz-example-label';
  exampleLabel.textContent = getText('modalExampleLabel');
  const exampleField = document.createElement('textarea');
  exampleField.placeholder = getText('modalExamplePlaceholder');
  exampleField.className = 'kz-example-field';
  exampleField.id = 'kz-example-field';
  if (exampleField) exampleField.value = example;

  const closeButton = document.createElement('button');
  closeButton.className = 'kz-close-button';
  closeButton.onclick = () => modal.remove();
  const closeButtonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  closeButtonIcon.setAttribute('width', '24');
  closeButtonIcon.setAttribute('height', '24');
  closeButtonIcon.setAttribute('viewBox', '0 0 24 24');
  const closeButtonIconPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
  closeButtonIconPath.setAttribute('fill', 'rgba(12, 12, 13, .8)');
  closeButtonIconPath.setAttribute('d', 'M5.293 6.707a1 1 0 1 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707z');
  closeButtonIcon.appendChild(closeButtonIconPath);
  closeButton.appendChild(closeButtonIcon);

  const doneButton = document.createElement('button');
  doneButton.className = 'kz-add-button';
  doneButton.addEventListener('click', function() {

    word = wordField.value.trim().toLowerCase();
    meaning = meaningField.value.trim();
    example = exampleField.value.trim();

    browser.storage.local.get('dictionary').then(d => {
      d.dictionary[word] = {
        meaning: meaning,
        example: example
      };
      browser.storage.local.set(d);

      document.getElementById(word.replace(/\s/g, '_')).children[1].textContent = meaning;
      document.getElementById(word.replace(/\s/g, '_')).children[2].textContent = example;
      modal.remove();

    });
  });
  
  doneButton.textContent = getText('modalDone');

  modalContent.appendChild(wordField);
  modalContent.appendChild(meaningLabel);
  modalContent.appendChild(meaningField);
  modalContent.appendChild(exampleLabel);
  modalContent.appendChild(exampleField);
  modalContent.appendChild(doneButton);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  meaningField.focus();
}

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27 && document.querySelector(".kz-overlay")) {
    evt.preventDefault();
    document.getElementsByClassName('kz-overlay')[0].remove();
  }
});

wordFinder.focus();
