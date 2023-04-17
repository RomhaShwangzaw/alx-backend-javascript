export default function createIteratorObject(report) {
  const empList = Object.values(report.allEmployees);
  const empIter = [];
  for (const x of empList) {
    for (const y of x) {
      empIter.push(y);
    }
  }
  return empIter;
}
