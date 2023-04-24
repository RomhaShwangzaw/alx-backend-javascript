export default function cleanSet(set, startString) {
  if (startString === '') {
    return '';
  }

  const result = [];
  for (const string of set) {
    if (string.startsWith(startString)) {
      result.push(string.replace(startString, ''));
    }
  }
  return result.join('-');
}
