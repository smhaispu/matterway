/**
 * @typedef {{isDirectory: boolean, name: string, files?: File[]}} File
 *
 * @param {File[]} files
 * @param {string[]} ignorePatterns
 * @returns {string[]}
 */
const getAllFilesExcept = (files, ignorePatterns) => {
  let filesList = [];
  let fileMapper = {};
  let results = [];
  populateFiles(files, "", filesList);
  filesList.forEach(file => {
    fileMapper[file] = true;
  })
  for (let i = 0; i < ignorePatterns.length; i++) {
    if (ignorePatterns[i].startsWith("!")) {
      Object.keys(fileMapper).forEach(fileKey => {
        if (fileKey.startsWith(ignorePatterns[i].slice(1) + "/") || fileKey === ignorePatterns[i].slice(1)) {
          fileMapper[fileKey] = true;
        }
      })
    } else {
      Object.keys(fileMapper).forEach(fileKey => {
        if (fileKey.startsWith(ignorePatterns[i] + "/") || fileKey === ignorePatterns[i]) {
          fileMapper[fileKey] = false;
        }
      })
    }
  }

  Object.entries(fileMapper).forEach(filesData => {
    if (filesData[1]) {
      results.push(filesData[0]);
    }
  })

  return results;
};


const populateFiles = (files, parent, filesList) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].isDirectory) {
      populateFiles(files[i].files, parent + "/" + files[i].name, filesList)
    } else {
      filesList.push(parent + "/" + files[i].name);
    }
  }
}
module.exports.getAllFilesExcept = getAllFilesExcept;
