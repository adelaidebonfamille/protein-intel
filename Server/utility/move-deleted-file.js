var fs = require('fs');

const moveDeletedFile = (filename) => {
    const oldPath = `problem-data/files/${filename.slice(16)}`;
    const newPath = `problem-data/deleted/${filename.slice(16)}`;

    fs.rename(oldPath, newPath, (error) => error)
}

module.exports = moveDeletedFile;