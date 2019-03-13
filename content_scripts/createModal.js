function createModal(word, meaning, example) {

  word = word.trim().toLowerCase();
  meaning = meaning || '';
  example = example || '';

  let modal = document.createElement('div');
  modal.className = 'kz-overlay';

  let modalContent = document.createElement('div');
  modalContent.className = 'kz-modal-content';

  let wordField = document.createElement('input');
  wordField.value = word;
  wordField.className = 'kz-word-field';

  let meaningLabel = document.createElement('label');
  meaningLabel.className = 'kz-meaning-label';
  meaningLabel.setAttribute('for', 'kz-meaning-field');
  let meaningLabelText = document.createTextNode(browser.i18n.getMessage('modalMeaningLabel'));
  meaningLabel.appendChild(meaningLabelText);

  let meaningField = document.createElement('textarea');
  meaningField.placeholder = browser.i18n.getMessage('modalMeaningPlaceholder');
  meaningField.maxLength = '5000';
  meaningField.className = 'kz-meaning-field';
  meaningField.id = 'kz-meaning-field';
  if (meaningField) meaningField.value = meaning;

  let exampleLabel = document.createElement('label');
  exampleLabel.className = 'kz-example-label';
  exampleLabel.setAttribute('for', 'kz-example-field');
  let exampleLabelText = document.createTextNode(browser.i18n.getMessage('modalExampleLabel'));
  exampleLabel.appendChild(exampleLabelText);

  let exampleField = document.createElement('textarea');
  exampleField.placeholder = browser.i18n.getMessage('modalExamplePlaceholder');
  exampleField.maxLength = '5000';
  exampleField.className = 'kz-example-field';
  exampleField.id = 'kz-example-field';
  if (exampleField) exampleField.value = example;

  let closeButton = document.createElement('button');
  closeButton.className = 'kz-close-button';
  closeButton.onclick = () => modal.remove();

  let closeButtonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  closeButtonIcon.setAttribute('width', '24');
  closeButtonIcon.setAttribute('height', '24');
  closeButtonIcon.setAttribute('viewBox', '0 0 24 24');

  let closeButtonIconPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
  closeButtonIconPath.setAttribute('fill', 'rgba(12, 12, 13, .8)');
  closeButtonIconPath.setAttribute('d', 'M5.293 6.707a1 1 0 1 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707z');
  closeButtonIcon.appendChild(closeButtonIconPath);
  closeButton.appendChild(closeButtonIcon);

  let addButton = document.createElement('button');
  addButton.className = 'kz-add-button';
  addButton.onclick = function() {

    word = wordField.value.trim().toLowerCase();
    meaning = meaningField.value.trim();
    example = exampleField.value.trim();

    if (wordField.value) {

      unwrapWord(word);

      browser.storage.local.get('dictionary').then(d => {
        d.dictionary[word] = {
          meaning: meaning,
          example: example
        };
        browser.storage.local.set(d);
      });

      modal.remove();
      wrapWord(word);
      createTooltip(word, meaning, example);

    } else {
      alert("Word field couldn't be empty!");
    }
  };

  let addButtonText = document.createTextNode(browser.i18n.getMessage('modalDone'));
  addButton.appendChild(addButtonText);
  modalContent.appendChild(wordField);
  modalContent.appendChild(meaningLabel);
  modalContent.appendChild(meaningField);
  modalContent.appendChild(exampleLabel);
  modalContent.appendChild(exampleField);
  modalContent.appendChild(addButton);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  let shadowDomRoot = document.createElement('div');
  shadowDomRoot.className = 'shadow-dom-root-modal';
  let shadow = shadowDomRoot.attachShadow({
    mode: 'open'
  });
  let style = document.createElement('style');

  style.textContent = `.kz-overlay{position:fixed;z-index:999999;padding-top:150px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(12, 12, 13, 0.6)}.kz-modal-content{display:flex;flex-direction:column;background-color:#f9f9fa;border:2px solid rgba(12, 12, 13, 0.2);border-radius:2px;max-width:40%;margin:0 auto;padding:0 16px;position:relative}.kz-word-field{background:#f9f9fa;border:none;color:#ff0039;font-family:'Cormorant Garamond', serif;font-weight:300;font-size:36px;padding:0;margin-top:8px;text-align:center}.kz-example-label,.kz-meaning-label{color:#0c0c0d;margin-bottom:4px;font-size:0.833rem}.kz-example-label{margin-top:8px}.kz-example-field,.kz-meaning-field{padding:8px;width:auto;height:32px;border-radius:2px;resize:none;border:1px solid rgba(12, 12, 13, 0.2);color:#0c0c0d;background-color:white;box-sizing:content-box}.kz-example-field::placeholder,.kz-meaning-field::placeholder{color:#737373}.kz-example-field:focus,.kz-meaning-field:focus{border:1px solid #0a84ff;box-shadow:0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)}.kz-example-field:hover,.kz-meaning-field:hover{border:1px solid rgba(12, 12, 13, 0.3)}.kz-add-button{align-self:flex-end;background-color:#0060df;border:none;color:#fff;border-radius:2px;font-size:13px;font-weight:400;height:32px;min-width:132px;padding:0 8px;margin:8px 0 12px}.kz-add-button:hover{background-color:#003eaa}.kz-add-button:active{background-color:#002275}.kz-add-button:focus{box-shadow:0 0 0 1px #0a84ff inset, 0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)}.kz-close-button{background-color:transparent;border:none;border-radius:2px;position:absolute;right:8px;top:8px;padding:4px;margin:0;height:32px;width:32px}svg{display:block}.kz-close-button:hover{background-color:rgba(12, 12, 13, 0.1)}.kz-close-button:active{background-color:rgba(12, 12, 13, 0.2)}.kz-close-button:focus{box-shadow:0 0 0 1px #0a84ff inset, 0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)}.kz-close-button,.kz-word-field{z-index:2}`;

  let script = document.createElement('script');
  script.textContent = `
  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27 && document.querySelector(".shadow-dom-root-modal")) {
      evt.preventDefault();
      document.querySelector(".shadow-dom-root-modal").remove();
    }
  });`;

  shadow.appendChild(style);
  shadow.appendChild(script);
  shadow.appendChild(modal);
  document.body.appendChild(shadowDomRoot);

  wordField.focus();
}
