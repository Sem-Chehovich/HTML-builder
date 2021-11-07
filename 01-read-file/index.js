const {stdout} = process;
const fs = require('fs');
const path = require('path');

fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
).on('data', (data) => stdout.write(data));