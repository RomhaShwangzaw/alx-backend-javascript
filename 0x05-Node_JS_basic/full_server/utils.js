import fs from 'fs';

const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const fileLines = data
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
      resolve(studentGroups);
    }
  });
});

export default readDatabase;
