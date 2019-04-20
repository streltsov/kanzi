const createTooltip = (word, meaning, example) => {
  tippy(`.kz-${word.trim().replace(/\s/g, '_')}`, {
    content: function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'kz-tooltip';

      const editButton = document.createElement('button');
      editButton.className = 'kz-tooltip__edit-button';
      editButton.onclick = () => createModal(word, meaning, example);
      const editButtonIcon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      );
      const editButtonIconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      editButtonIconPath.setAttribute(
        'd',
        'M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z',
      );
      editButtonIconPath.setAttribute('fill', 'rgba(12, 12, 13, 0.8)');
      editButtonIcon.setAttribute('viewBox', '0 1 13 15');
      editButtonIcon.setAttribute('width', '16');
      editButtonIcon.setAttribute('height', '16');
      editButtonIcon.appendChild(editButtonIconPath);
      editButton.appendChild(editButtonIcon);
      tooltip.appendChild(editButton);

      const trashButton = document.createElement('button');
      trashButton.className = 'kz-tooltip__trash-button';
      trashButton.onclick = () => {
        unwrapWord(word);

        browser.storage.local.get('dictionary').then(d => {
          delete d.dictionary[word];
          browser.storage.local.set(d);
        });
      };
      const trashButtonIcon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      );
      const trashButtonIconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      trashButtonIconPath.setAttribute(
        'd',
        'M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z',
      );
      trashButtonIconPath.setAttribute('fill', 'rgba(12, 12, 13, 0.8)');
      trashButtonIconPath.setAttribute('fill-rule', 'evenodd');
      trashButtonIconPath.setAttribute('clip-rule', 'evenodd');
      trashButtonIcon.setAttribute('viewBox', '0 0 14 16');
      trashButtonIcon.setAttribute('width', '16');
      trashButtonIcon.setAttribute('height', '16');
      trashButtonIcon.appendChild(trashButtonIconPath);
      trashButton.appendChild(trashButtonIcon);
      tooltip.appendChild(trashButton);

      const wordSpan = document.createElement('span');
      wordSpan.className = 'kz-tooltip__word-span';
      const wordSpanText = document.createTextNode(word);
      wordSpan.appendChild(wordSpanText);
      tooltip.appendChild(wordSpan);

      if (meaning.replace(/\s/g, '').length) {
        meaning = meaning.trim();
        const meaningSpan = document.createElement('span');
        meaningSpan.className = 'kz-tooltip__meaning-span';
        const meaningSpanText = document.createTextNode(': ' + meaning);
        meaningSpan.appendChild(meaningSpanText);
        tooltip.appendChild(meaningSpan);
      }

      if (example.replace(/\s/g, '').length) {
        example = example.trim();
        const exampleSpan = document.createElement('span');
        exampleSpan.className = 'kz-tooltip__example-span';
        const exampleSpanText = document.createTextNode(
          browser.i18n.getMessage('tooltipForExampleText') +
            ': «' +
            example +
            '»',
        );
        exampleSpan.appendChild(exampleSpanText);
        tooltip.appendChild(exampleSpan);
      }

      const shadowDomRoot = document.createElement('div');

      browser.storage.local.get('options').then(o => {
        if (o.options.fontsize) {
          shadowDomRoot.style.fontSize = o.options.fontsize + 'px';
        } else {
          shadowDomRoot.style.fontSize = '12px';
        }
      });

      const shadow = shadowDomRoot.attachShadow({
        mode: 'open',
      });
      const style = document.createElement('style');

      style.textContent = `:host{font-family:Fira Sans,Segoi UI,San Francisco,Ubuntu,sans-serif}.kz-tooltip{display:flex;flex-direction:column;font-weight:400}.kz-tooltip__word-span{font-size:2em;color:red;font-family:'Cormorant Garamond', serif;padding:0 60px}.kz-tooltip__meaning-span{font-size:1empx;color:#535455;margin-top:4px}.kz-tooltip__example-span{font-size:1em;font-style:italic;color:#535455;margin-top:4px;margin-bottom:4px}.kz-tooltip__edit-button{height:24px;width:24px;right:34px;border:none;background:transparent}.kz-tooltip__trash-button{height:24px;width:24px;right:8px;border:none;background:transparent}.kz-tooltip__edit-button,.kz-tooltip__trash-button{position:absolute;top:8px;border-radius:2px;padding:4px}.kz-tooltip__edit-button:hover,.kz-tooltip__trash-button:hover{background-color:rgba(12, 12, 13, 0.1)}.kz-tooltip__edit-button:active,.kz-tooltip__trash-button:active{background-color:rgba(12, 12, 13, 0.2)}.kz-tooltip__edit-button:focus,.kz-tooltip__trash-button:focus{box-shadow:0 0 0 1px #0a84ff inset, 0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)}`;

      shadow.appendChild(style);
      shadow.appendChild(tooltip);
      return shadowDomRoot;
    },

    duration: [0, 400],
    interactive: true,
    placement: 'top',
    arrow: true,
    arrowTransform: 'scaleX(2)',
    theme: 'light',
    touch: true,
  });
};
