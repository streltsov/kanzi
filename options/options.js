/////////////
//FONT SIZE//
/////////////
let fontSize = document.getElementById('font-size');
let options = browser.storage.local.get('options');

options.then(o => {
  fontSize.value = o.options.fontsize || 12;
});

fontSize.addEventListener('change', function() {
  options.then(o => {
    o.options.fontsize = fontSize.value;
    browser.storage.local.set(o);
  });
});
