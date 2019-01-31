function makeRegex(string) {

  let regexPattern = string.split(' ');
  regexPattern.forEach(function(value, index, array) {
    array[index] = value + suffixes;
  });

  regexPattern = '\\b' + string + '\\b|\\b' + regexPattern.join(' ') + '\\b';
  return new RegExp(regexPattern, 'gi');
}
