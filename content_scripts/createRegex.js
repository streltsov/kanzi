let suffixes = '{0,2}(a?i?t?ion|(o|e)r|(i|e)s|i?ed|i?e?ty|i?l?y|i?ness|ing|al|able|ment|ious|ive){1,2}(s)?';

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
