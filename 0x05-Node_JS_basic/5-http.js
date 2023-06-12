const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
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

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const responseParts = ['This is the list of our students'];
    countStudents(db)
      .then((report) => {
        responseParts.push(report);
        res.end(responseParts.join('\n'));
      })
      .catch((err) => {
        responseParts.push(err instanceof Error ? err.message : err.toString());
        res.end(responseParts.join('\n'));
      });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
