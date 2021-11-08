const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');

fs.readdir(folderPath, {withFileTypes: true}, async (err, files) => {
  if (err) {
    console.log(err);
  }
  else {
    files.forEach((file, index)  => {
      let filePath = path.join(folderPath, file.name);
      if (file.isFile() && file.name.split('.')[1] === 'css') {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if(err) {
            console.log(err);
          } else if (index === 0) {
            fs.writeFile(path.join(distPath, 'bundle.css'), data, err => {
              if(err)
                console.log(err);
            });
          } else {
            fs.appendFile(path.join(distPath, 'bundle.css'), data, err => {
              if(err)
                console.log(err);
            });
          }
        });
      }
    }); 
  }
});
