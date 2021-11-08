const fs = require('fs');
const path = require('path');
const folderPathCopy = path.join(__dirname, 'project-dist');
const folderPathStyles = path.join(__dirname, 'styles');
const folderPathAssetsCopy = path.join(folderPathCopy, 'assets');
const folderPathAssets = path.join(__dirname, 'assets');
const folderPathComp = path.join(__dirname, 'components');

fs.readdir(folderPathStyles, {withFileTypes: true}, async (err, files) => {
  if (err) {
    console.log(err);
  }
  else {
    files.forEach((file, index) => {
      let filePath = path.join(folderPathStyles, file.name);
      if (file.isFile() && file.name.split('.')[1] === 'css') {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if(err) {
            console.log(err);
          } else if (index === 0) {
            fs.writeFile(path.join(folderPathCopy, 'style.css'), data, err => {
              if(err)
                console.log(err);
            });
          }  else {
            fs.appendFile(path.join(folderPathCopy, 'style.css'), data, err => {
              if(err)
                console.log(err);
            });
          }
        });
      }
    }); 
  }
});

function recurceCopy(dir, exit) {
  fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (!file.isFile()) {
        fs.stat(path.join(exit, file.name), (err) => {
          if (err) {
            fs.mkdir(path.join(exit, file.name), (err) => {
              if (err) {
                return console.error(err);
              }
              console.log('Directory created successfully!');
            });
            recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
          } else {
            recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
          }
        });
      } else {
        fs.copyFile(`${dir}\\${file.name}`, `${exit}\\${file.name}`, err =>{
          if (err) throw err;
        });
      }
    });
  });
} 

// recurceCopy(folderPathAssets, folderPathAssetsCopy);

fs.stat (folderPathCopy, (err) => {
  if (err) {
    fs.mkdir(folderPathCopy, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });
    createTemplate();
  } else {  fs.readdir(folderPathCopy, (err) => {
    if (err)
      console.log(err);
    else {
      // fs.unlink(path.join(__dirname, 'project-dist', 'index.html'), err =>{
      //   if (err) throw err;
      // });
      createTemplate();
    }
  });
  }
});

fs.stat (folderPathAssetsCopy, (err) => {
  if (err) {
    fs.mkdir(folderPathAssetsCopy, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });
    recurceCopy(folderPathAssets, folderPathAssetsCopy);
  } else {
    recurceCopy(folderPathAssets, folderPathAssetsCopy);
  }
});

function createTemplate() {
  fs.copyFile(`${__dirname}\\template.html`, `${folderPathCopy}\\index.html`, err =>{
    if (err) throw err;
    fs.readFile(`${folderPathCopy}\\index.html`, 'utf8', (err, data) => {
      if(err) throw err; 
      fs.readdir(folderPathComp, {withFileTypes: true}, (err, files) => {
        if (err) throw err;
  
        files.forEach(file => {
          fs.readFile(`${folderPathComp}\\${file.name}`, 'utf8', (err, dataFile) => {
            if(err) throw err; 
            let tagName = `{{${file.name.split('.')[0]}}}`;
            data = data.replace(tagName, dataFile);
            fs.writeFile(`${folderPathCopy}\\index.html`, data, err => {
              if(err)
                console.log(err);});
          });
        });
      });
    });
  }); 
}

