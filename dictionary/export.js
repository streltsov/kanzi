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
