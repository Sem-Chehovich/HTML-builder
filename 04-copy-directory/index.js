const fs = require('fs');
const path = require('path');
const folderPathCopy = path.join(__dirname, 'files-copy');
const folderPath = path.join(__dirname, 'files');

fs.mkdir(folderPathCopy, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

fs.readdir(folderPath, (err, files) => {
  if (err)
    console.log(err);
  else {

    files.forEach(file => {
    //   let filePath = path.join(folderPath, file.name);
      console.log(file);
      fs.copyFile(`${folderPath}/${file}`, `${folderPathCopy}/${file}`, err =>{
        if (err) throw err;
      });
    });
  }
});