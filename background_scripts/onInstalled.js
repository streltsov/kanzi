browser.runtime.onInstalled.addListener(function(details) {
  browser.storage.local.get().then(storage => {
    if (!storage.hasOwnProperty('dictionary')) {
      browser.storage.local.set({
        dictionary: {}
      });
    }
  });
});
