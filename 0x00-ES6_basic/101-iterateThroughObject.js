export default function iterateThroughObject(reportWithIterator) {
  let names = '';
  for (const name of reportWithIterator) {
    names += `${name} | `;
  }
  return names.substring(0, names.length - 3);
}
