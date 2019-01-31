let options = browser.storage.local.get('options');

//FONT SIZE
let fontSize = document.getElementById('font-size');

options.then(o => {
  fontSize.value = o.options.fontsize || 12;
});

fontSize.addEventListener('change', function() {
  options.then(o => {
    o.options.fontsize = fontSize.value;
    browser.storage.local.set(o);
  });
});

//SUFFIXES
options.then(o => {

  if (o.options.suffixes) {
    document.querySelector('input[value="' + o.options.suffixes + '"]').checked = true;
  } else {
    document.querySelector('input[value="english"]').checked = true;
  }

  document.querySelector('#custom-suffixes').value = o.options.custom_suffixes;

});

document.querySelector('#suffixes').addEventListener('click', function() {
  options.then(o => {
    o.options.suffixes = document.querySelector('input[name="suffixes"]:checked').value;
    browser.storage.local.set(o);
  });
});

document.querySelector('#custom-suffixes').addEventListener('change', function() {
  options.then(o => {
    let usersInput = document.querySelector('#custom-suffixes').value;
    customSuffixes = '{0,2}(' + usersInput.replace(/\s+/g, '|') + ')';
    o.options.custom_suffixes = customSuffixes;
    browser.storage.local.set(o);
  });
});

