import fs from 'fs';
import path from 'path';

export default (pathToDir, depth) => {
  console.log(__dirname, '===dirname');
  console.log(pathToDir, 'pathToDIr');
  const fullPath = path.join(__dirname, pathToDir);
  console.log(fullPath, 'fullPath');
  fs.readdir(fullPath, (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach(file => {
        console.log(file);
      })
    }
  })

};