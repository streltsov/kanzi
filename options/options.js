const options = browser.storage.local.get('options');
const getText = browser.i18n.getMessage;

const title = document.createElement('h1');
const titleText = document.createTextNode(getText('optionsTitle'));
title.appendChild(titleText);
document.body.appendChild(title);

//FONT SIZE
const tooltipFontSizeWrapper= document.createElement('span');
const tooltipFontSizeText = document.createTextNode(getText('optionsTooltipFontSizeText'));
const tooltipFontSizeInput = document.createElement('input');
tooltipFontSizeInput.type = 'number';

options.then(o => {
  tooltipFontSizeInput.value = o.options.fontsize || 12;
});

tooltipFontSizeInput.addEventListener('change', function() {
  options.then(o => {
    o.options.fontsize = tooltipFontSizeInput.value;
    browser.storage.local.set(o);
  });
});

tooltipFontSizeWrapper.appendChild(tooltipFontSizeText);
tooltipFontSizeWrapper.appendChild(tooltipFontSizeInput);
document.body.appendChild(tooltipFontSizeWrapper);
