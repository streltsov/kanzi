document.getElementsByClassName("add-word")[0].addEventListener("click", function() {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(tab => {
    browser.tabs.sendMessage(tab[0].id, {
      selectedText: ''
    })
    window.close();
  });
});

document.getElementsByClassName("dictionary")[0].addEventListener("click", function() {
  browser.tabs.create({
    url: '/dictionary/dictionary.html'
  });
  window.close();
});

document.getElementsByClassName("preferences")[0].addEventListener("click", function() {
  browser.runtime.openOptionsPage()
  window.close();
});
