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
