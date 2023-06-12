const fs = require('fs');

const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const fileLines = fs
    .readFileSync(dataPath, 'utf-8')
    .trim()
    .split('\n');
  const studentGroups = {};

  for (const line of fileLines.slice(1)) {
    const studentRecord = line.split(',');
    const field = studentRecord[studentRecord.length - 1];
    const firstName = studentRecord[0];
    if (!Object.keys(studentGroups).includes(field)) {
      studentGroups[field] = [];
    }
    studentGroups[field].push(firstName);
  }

  const totalStudents = Object
    .values(studentGroups)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, names] of Object.entries(studentGroups)) {
    const studentNames = names.join(', ');
    console.log(`Number of students in ${field}: ${names.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
