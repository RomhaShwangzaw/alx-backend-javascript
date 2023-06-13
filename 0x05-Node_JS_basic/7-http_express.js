const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const db = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const fileLines = data
        .trim()
        .split('\n');
      const reportParts = [];
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
      reportParts.push(`Number of students: ${totalStudents}`);
      for (const [field, names] of Object.entries(studentGroups)) {
        const studentNames = names.join(', ');
        reportParts.push(`Number of students in ${field}: ${names.length}. List: ${studentNames}`);
      }
      resolve(reportParts.join('\n'));
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const responseParts = ['This is the list of our students'];
  countStudents(db)
    .then((report) => {
      responseParts.push(report);
      res.send(responseParts.join('\n'));
    })
    .catch((err) => {
      responseParts.push(err instanceof Error ? err.message : err.toString());
      res.send(responseParts.join('\n'));
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
