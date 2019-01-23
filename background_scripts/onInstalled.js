browser.runtime.onInstalled.addListener(function(details) {
  browser.storage.local.get().then(storage => {

    if (!storage.hasOwnProperty('dictionary')) {
      browser.storage.local.set({
        dictionary: {}
      });
    }

    if (!storage.hasOwnProperty('options')) {
      browser.storage.local.set({
        options: {
          fontsize: '12'
        }
      });
    }

  });
});
