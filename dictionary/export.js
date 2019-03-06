document.getElementsByClassName("export-button")[0].addEventListener("click", function() {
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
