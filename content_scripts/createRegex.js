let suffixes = '{0,2}(ied|ed|es|ies|ing|ings|er|ers|or|ors|ly|ily|ty|ity|ety|ive|al|ally|able|ion|ions|ious|tion|ation|ition|ication|iness|ness|ment|ure|ish|ingly|ary)';

function createRegex(string) {
  let pattern = string.split(' ').map(word => '(\\b' + word + '[sy]?\\b|\\b' + word + suffixes + '\\b)').join(' ');
  return new RegExp(pattern, 'gi');
}
