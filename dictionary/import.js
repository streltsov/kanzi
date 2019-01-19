const inputElement = document.getElementById("import-input");
inputElement.addEventListener("change", handleFiles, false);

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

document.getElementsByClassName('import-button')[0].addEventListener('click', function() {
  document.getElementById('import-input').click();
});
