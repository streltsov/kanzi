document.getElementsByClassName('delete-all-button')[0].addEventListener('click', function() {

  let sure = confirm('This action will irrevocably delete all your words and phrases, are you sure?');

  if (sure) {
    browser.storage.local.get().then((storage) => {
      browser.storage.local.set({
        dictionary: {}
      });
    });
    browser.tabs.reload();
  }

});
