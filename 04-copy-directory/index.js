const fs = require('fs');
const path = require('path');
const folderPathCopy = path.join(__dirname, 'files-copy');
const folderPath = path.join(__dirname, 'files');


function copyFile() {fs.readdir(folderPath, (err, files) => {
  if (err)
    console.log(err);
  else {

    files.forEach(file => {
      console.log(file);
      fs.copyFile(`${folderPath}/${file}`, `${folderPathCopy}/${file}`, err =>{
        if (err) throw err;
      });
    });
  }
});
}

fs.stat (folderPathCopy, (err) => {
  if (err) {
    fs.mkdir(folderPathCopy, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });
    copyFile();
  } else {
    fs.readdir(folderPathCopy, (err, files) => {
      if (err)
        console.log(err);
      else {
    
        files.forEach(file => {
          fs.unlink(path.join(__dirname, 'files-copy', file), err =>{
            if (err) throw err;
          });
        });
      }
    });
    copyFile();
  }
});