const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');
let dataArray = [];

fs.readdir(folderPath, {withFileTypes: true}, async (err, files) => {
  if (err) {
    console.log(err);
  }
  else {
    files.forEach(file => {
      let filePath = path.join(folderPath, file.name);
      if (file.isFile() && file.name.split('.')[1] === 'css') {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if(err) {
            console.log(err);
          } else {
            dataArray.push(data);
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
