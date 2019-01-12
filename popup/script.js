document.querySelector(".dictionary-button").addEventListener("click", function() {
  browser.tabs.create({
    url: '/dictionary/index.html'
  });
  window.close();
});
