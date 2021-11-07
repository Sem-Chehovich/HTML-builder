
const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');


fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log('\nName - Extension - Size');
    files.forEach(file => {
      let filePath = path.join(folderPath, file.name);
      if (file.isFile()) {
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size / 1000}kb`);
        });
      }
    });
  }
});
