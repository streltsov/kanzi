browser.storage.local.get().then((dict) => {
  let wordsInTotal = document.createTextNode(Object.keys(dict).length);
  document.getElementsByClassName('words-in-total')[0].appendChild(wordsInTotal);

  Object.keys(dict).sort().forEach(word => {

    let row = document.createElement('tr');

    let wordColumn = document.createElement('td');
    let wordColumnText = document.createTextNode(word);
    wordColumn.appendChild(wordColumnText);
    row.appendChild(wordColumn);

    let meaningColumn = document.createElement('td');
    let meaningColumnText = document.createTextNode(dict[word].meaning);
    meaningColumn.appendChild(meaningColumnText);
    row.appendChild(meaningColumn);

    let exampleColumn = document.createElement('td');
    let exampleColumnText = document.createTextNode(dict[word].example);
    exampleColumn.appendChild(exampleColumnText);
    row.appendChild(exampleColumn);

    document.getElementsByTagName('table')[0].appendChild(row);
  });
});

document.getElementsByClassName("export-button")[0].addEventListener("click", function() {
  browser.storage.local.get().then((dict) => {
    downloadObjectAsJson(dict, "Kanzi Dictionary")
  })
})

function downloadObjectAsJson(exportObj, exportName) {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  const fileList = this.files;
  printFile(fileList[0]);
}

function printFile(file) {
  var reader = new FileReader();
  reader.onload = function(evt) {
    browser.storage.local.get().then((dict) => {
      let iDict = JSON.parse(evt.target.result);
      Object.keys(iDict).forEach(word => {
        if (!dict.hasOwnProperty(word)) {
          browser.storage.local.set({
            [word]: {
              meaning: iDict[word].meaning,
              example: iDict[word].example
            }
          });
        }
      })
    })
  };
  browser.tabs.reload();
  reader.readAsText(file);
}
