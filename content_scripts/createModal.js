const createInput = value => {
  const input = document.createElement('input');
  input.value = value;
  return input;
};
const createLabel = text => {
  const label = document.createElement('label');
  label.className = 'kz-label';
  label.textContent = text;
  return label;
};
const createButton = text => {
  const button = document.createElement('button');
  button.textContent = text;
  return button;
};
const doneButton = () => {
  const doneButton = createButton('Done');
  doneButton.className = 'kz-done-button';
  doneButton.addEventListener('click', e => doneAction(e.target));
  return doneButton;
};
const closeButton = () => {
  const closeButton = createButton('X');
  closeButton.className = 'kz-close-button';
  closeButton.addEventListener('click', closeModal);
  return closeButton;
};
const extraField = (labelText, inputText) => {
  const label = createLabel(labelText);
  const input = createInput(inputText);
  input.className = 'kz-extra-field';
  label.appendChild(input);
  return label;
};
const closeModal = () => document.querySelector('.kz-modal-root').remove();
function doneAction(el) {
  const word = el.parentNode
    .querySelectorAll('input')[0]
    .value.trim()
    .toLowerCase();
  const meaning = el.parentNode.querySelectorAll('input')[1].value.trim();
  const example = el.parentNode.querySelectorAll('input')[2].value.trim();

  unwrapWord(word);
  addWordToDictionary(word, meaning, example);
  closeModal();
  wrapWord(word);
  createTooltip(word, meaning, example);
}
const modal = (word, meaning, example) => {
  const root = document.createElement('div');
  root.className = 'kz-modal-root';
  const shadow = root.attachShadow({mode: 'open'});
  const style = document.createElement('style');
  style.textContent = `.kz-overlay{position:fixed;z-index:999999;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(12,12,13,.6)}.kz-modal{display:flex;flex-direction:column;background-color:#f9f9fa;border:2px solid rgba(12,12,13,.2);border-radius:2px;width:540px;max-width:80%;margin:100px auto 0 auto;padding:0 16px;position:relative}.kz-word-field{background:#f9f9fa;border:none;color:#ff0039;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:36px;padding:0;margin-top:8px;text-align:center}.kz-label{color:#0c0c0d;margin-bottom:4px;font-size:.833rem;display:flex;flex-direction:column}.kz-extra-field{padding:8px;width:auto;height:32px;border-radius:2px;resize:none;border:1px solid rgba(12,12,13,.2);color:#0c0c0d;background-color:#fff;box-sizing:content-box}.kz-extra-field::placeholder{color:#737373}.kz-extra-field:focus{border:1px solid #0a84ff;box-shadow:0 0 0 1px #0a84ff,0 0 0 4px rgba(10,132,255,.3)}.kz-extra-field:hover{border:1px solid rgba(12,12,13,.3)}.kz-done-button{align-self:flex-end;background-color:#0060df;border:none;color:#fff;border-radius:2px;font-size:13px;font-weight:400;height:32px;min-width:132px;padding:0 8px;margin:8px 0 12px}.kz-done-button:hover{background-color:#003eaa}.kz-done-button:active{background-color:#002275}.kz-done-button:focus{box-shadow:0 0 0 1px #0a84ff inset,0 0 0 1px #0a84ff,0 0 0 4px rgba(10,132,255,.3)}.kz-done-button:disabled{opacity:.4}.kz-close-button{color:#333;background-color:transparent;border:none;border-radius:2px;position:absolute;right:8px;top:8px;padding:4px;margin:0;height:32px;width:32px}.kz-close-button:hover{background-color:rgba(12,12,13,.1)}.kz-close-button:active{background-color:rgba(12,12,13,.2)}.kz-close-button:focus{box-shadow:0 0 0 1px #0a84ff inset,0 0 0 1px #0a84ff,0 0 0 4px rgba(10,132,255,.3)}`;
  shadow.appendChild(style);
  const overlay = document.createElement('div');
  overlay.className = 'kz-overlay';
  shadow.appendChild(overlay);
  const modal = document.createElement('div');
  modal.className = 'kz-modal';
  overlay.appendChild(modal);
  modal.appendChild(closeButton());
  const wordField = createInput(word);
  wordField.className = 'kz-word-field';
  wordField.addEventListener(
    'input',
    e =>
      (wordField.parentNode.querySelector('.kz-done-button').disabled = !e
        .target.value),
  );
  modal.appendChild(wordField);
  modal.appendChild(extraField('Meaning', meaning));
  modal.appendChild(extraField('Example', example));
  modal.appendChild(doneButton());
  shadow.addEventListener('keydown', e => {
    e.keyCode === 27 && document.querySelector('.kz-modal-root').remove(),
      e.keyCode === 13 &&
        e.target.nodeName == 'INPUT' &&
        doneAction(e.target.parentNode);
  });
  return root;
};

const createModal = (word, meaning = '', example = '') => {
  const body = document.querySelector('body');
  body.appendChild(modal(word, (meaning = ''), (example = '')));
  const wordField = document
    .querySelector('.kz-modal-root')
    .shadowRoot.querySelector('.kz-word-field');
  wordField.focus();
};
