document.querySelector(".dictionary-button").addEventListener("click", function() {
  browser.tabs.create({
    url: '/kanzi_dictionary/dictionary.html'
  });
  window.close();
});
