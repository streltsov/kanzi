let suffixes = '{0,2}(ied|ed|s|es|ies|ing|ings|er|ers|or|ors|y|ly|ily|ty|ity|ety|ive|al|ally|able|ion|ions|ious|tion|ation|ition|ication|iness|ness|ment|ure|ish|ingly|ary)';

function createRegex(string) {
  let pattern;
  if (/\s/.test(string)) {
    pattern = string.split(' ');
    pattern.forEach(function(value, i, array) {
      array[i] = value + suffixes;
    });
    pattern = pattern.join(' ');
  } else {
    pattern = string + 's?\\b|\\b' + string + suffixes + '\\b';
  }
  return new RegExp('\\b' + pattern, 'gi');
}
