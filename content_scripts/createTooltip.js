function createTooltip(word, meaning, example) {
  tippy(`.kz-${word.trim().replace(/\s/g, '_')}`, {
    content: function() {

      let tooltip = document.createElement('div');
      tooltip.className = 'kz-tooltip';

      let editButton = document.createElement('button');
      editButton.className = 'kz-tooltip__edit-button';
      editButton.onclick = () => createModal(word, meaning, example);
      let editButtonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      let editButtonIconPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      editButtonIconPath.setAttribute("d", "M4 10a1.994 1.994 0 0 0-1.911 1.44c0 .01-.014.015-.017.025-.362 1.135-.705 2.11-1.759 2.573l-.023.012-.024.012A.5.5 0 0 0 0 14.5a.5.5 0 0 0 .5.5 6.974 6.974 0 0 0 4.825-1.5c.006-.006.007-.013.013-.019A1.993 1.993 0 0 0 4 10zM15.693.307a.984.984 0 0 0-1.338-.046l-8.031 7a.982.982 0 0 0-.049 1.433l1.032 1.031a.983.983 0 0 0 .693.287h.033a.982.982 0 0 0 .706-.335l7-8.031a.982.982 0 0 0-.046-1.339z");
      editButtonIconPath.setAttribute("fill", "rgba(12, 12, 13, 0.8)");
      editButtonIcon.setAttribute("viewBox", "0 0 16 16");
      editButtonIcon.setAttribute("width", "16");
      editButtonIcon.setAttribute("height", "16");
      editButtonIcon.appendChild(editButtonIconPath);
      editButton.appendChild(editButtonIcon);
      tooltip.appendChild(editButton)

      let trashButton = document.createElement('button');
      trashButton.className = 'kz-tooltip__trash-button';
      trashButton.onclick = () => {
        unwrapWord(word);
        browser.storage.local.remove(word);
      }
      let trashButtonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      let trashButtonIconPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      trashButtonIconPath.setAttribute("d", "M20 5h-5a3 3 0 1 0-6 0H4a1 1 0 0 0 0 2h1v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7h1a1 1 0 1 0 0-2zm-8-2a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2zM7 7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7H7zm2.539 2.002a.5.5 0 0 0-.503.498l-.034 8a.5.5 0 0 0 1 .004l.034-8a.5.5 0 0 0-.497-.502zm4.497.498a.5.5 0 0 1 1 .004l-.034 8a.5.5 0 0 1-1-.004l.034-8zM12 9.002a.5.5 0 0 0-.502.498l-.034 8a.5.5 0 0 0 1 .004l.034-8A.5.5 0 0 0 12 9.002z");
      trashButtonIconPath.setAttribute("fill", "rgba(12, 12, 13, 0.8)");
      trashButtonIconPath.setAttribute("fill-rule", "evenodd");
      trashButtonIconPath.setAttribute("clip-rule", "evenodd");
      trashButtonIcon.setAttribute("viewBox", "0 0 24 24");
      trashButtonIcon.setAttribute("width", "16");
      trashButtonIcon.setAttribute("height", "16");
      trashButtonIcon.appendChild(trashButtonIconPath);
      trashButton.appendChild(trashButtonIcon);
      tooltip.appendChild(trashButton)

      let wordSpan = document.createElement('span');
      wordSpan.className = 'kz-tooltip__word-span';
      let wordSpanText = document.createTextNode(word);
      wordSpan.appendChild(wordSpanText);
      tooltip.appendChild(wordSpan);

      if (meaning.replace(/\s/g, '').length) {
        meaning = meaning.trim();
        let meaningSpan = document.createElement('span');
        meaningSpan.className = 'kz-tooltip__meaning-span';
        let meaningSpanText = document.createTextNode(': ' + meaning);
        meaningSpan.appendChild(meaningSpanText);
        tooltip.appendChild(meaningSpan)
      }

      if (example.replace(/\s/g, '').length) {
        example = example.trim();
        let exampleSpan = document.createElement('span');
        exampleSpan.className = 'kz-tooltip__example-span';
        let exampleSpanText = document.createTextNode('For example: «' + example + '»');
        exampleSpan.appendChild(exampleSpanText);
        tooltip.appendChild(exampleSpan)
      }

      return tooltip;

    },

    duration: [0, 400],
    interactive: true,
    placement: "right",
    arrow: true,
    arrowTransform: "scaleX(2)",
    theme: "light",
    touch: true

  });
}
