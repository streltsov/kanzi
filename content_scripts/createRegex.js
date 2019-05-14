const suffixes =
  '{0,2}(ied|ies|ing|ings|ingly|er|ers|or|ors|ly|ily|ty|ity|ety|ive|al|ally|able|ion|ions|ious|tion|ation|ition|ication|iness|ness|ment|ure|ish|ary)';

const createRegex = (string, flags = 'gi') => {
  const pattern = string
    .split(' ')
    .map(
      word => '(\\b' + word + '([sdy]|(ed))?\\b|\\b' + word + suffixes + '\\b)',
    )
    .join(' ');
  return new RegExp(pattern, flags);
};
