let tags = ['p'];
browser.storage.local.get().then((dict) => {

  tags.forEach(tag => {

    inView(tag).on('enter', tag => {

      if (!tag.classList.contains('kz-done')) {

        let t0 = performance.now();

        Object.keys(dict).forEach(word => {
          let re = new RegExp('(\\b' + word + '\\b|\\b' + word + '{0,2}(i?ed|i?e?s|ing|er|or|i?ly|ication|ion|ness)\\b)' + '(?![^<]*>|[^<>]*<\/)', 'gi');
          tag.innerHTML = tag.innerHTML.replace(re, `<span class="kz-word kz-${word.replace(/\s/g, '_')}">$&</span>`);
          createTooltip(word, dict[word].meaning, dict[word].example);
        });

        tag.classList.add('kz-done');

        let t1 = performance.now();
        console.log('Tag ' + '<' + tag.tagName + '> took: ' + (t1 - t0) + ' milliseconds');

      } // if contains
    }); // inView
  }); // forEach tag in array
});

browser.runtime.onMessage.addListener(request => createModal(request.selectedText));

function unwrapWord(word) {
  word = word.trim().toLowerCase().replace(/\s/g, '_');
  document.querySelectorAll(`.kz-${word}`).forEach(wrapper => {
    wrapper.outerHTML = wrapper.outerHTML.replace(wrapper.outerHTML, wrapper.innerText)
  });
}

function wrapWord(word, meaning, example) {
  word = word.trim().toLowerCase();

  let re = new RegExp('\\b' + word + '\\b|\\b' + word + '{0,2}(i?ed|i?e?s|ing|er|or|i?ly|ication|ion|ness)\\b', 'gi');

  findAndReplaceDOMText(document.getElementsByTagName('body')[0], {
    preset: 'prose',
    find: re,
    wrap: 'span',
    wrapClass: `kz-word kz-${word.replace(/\s/g, '_')}`
  });
}

function addWord(word, meaning, example) {
  word = word.trim().toLowerCase();
  meaning = meaning.trim();
  example = example.trim();

  browser.storage.local.set({
    [word]: {
      meaning: meaning,
      example: example
    }
  });
}
