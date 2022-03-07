const fs = require("fs");
const path = require("path")

const getFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath)

  files.forEach(file => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) arrayOfFiles = bot.getFiles(dirPath + "/" + file, arrayOfFiles);
    else arrayOfFiles.push(path.join(dirPath, "/", file));
  });
  
  return arrayOfFiles; 
}

module.exports = getFiles
