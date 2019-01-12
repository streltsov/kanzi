document.getElementsByClassName('delete-all-button')[0].addEventListener('click', function() {

  let sure = confirm('This action will irrevocably delete all your words and phrases, are you sure?');

  if (sure) {
    browser.storage.local.get().then((dict) => {
      Object.keys(dict).forEach(word => browser.storage.local.remove(word));
    });
    browser.tabs.reload();
  }
});
