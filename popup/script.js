document.querySelector(".dictionary-button").addEventListener("click", function() {
  browser.tabs.create({
    url: '/dictionary/dictionary.html'
  });
  window.close();
});
