const fs = require('fs');
const { nextTick } = require('process');

const moveDeletedFile = (filename) => {
    const oldPath = `problem-data/files/${filename.slice(16)}`;
    const newPath = `problem-data/deleted/${filename.slice(16)}`;

    fs.rename(oldPath, newPath, (error) => {
        if (error) {
            throw error
        }
    })
}

module.exports = moveDeletedFile;