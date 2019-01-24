let suffixes;
browser.storage.local.get('options').then(o => {
  switch (o.options.suffixes) {
    case 'english':
      suffixes = '{0,2}(ied|ed|s|es|ies|ing|ings|er|ers|or|ors|y|ly|ily|ty|ity|ety|ive|ally|able|ion|tion|ation|ition|ication|ness)';
      break;
    case 'none':
      suffixes = '';
      break;
  }
});

function makeRegex(string, suffixes) {
  console.log(suffixes);
  let regexPattern = string.split(' ');
  regexPattern.forEach(function(value, index, array) {
    array[index] = value + suffixes;
  });

  regexPattern = '\\b' + string + '\\b|\\b' + regexPattern.join(' ') + '\\b';
  return new RegExp(regexPattern, 'gi');
}
