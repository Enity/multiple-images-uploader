const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const util = require('util');

const unlink = util.promisify(fs.unlink);

/* 'host/testupload' */

router.post('/', async (req, res) => {
  const formParser = new formidable.IncomingForm();
  formParser.uploadDir = path.resolve(__dirname, 'uploaded');
  formParser.multiples = true;
  formParser.parse(req, async (err, fields, files) => {
    if (err) res.send(err);
    files = files.files;
    if (!Array.isArray(files)) files = [files];
    if (files == undefined) res.send('NO FILES');
    console.log(getTestResponse(files, fields));
    deleteTmpFiles(files);
    res.send('OK');
  });
});

function getTestResponse(files, fields) {
  const filesSize = files
    .map(i => i.size)
    .reduce((prev, curr) => prev + curr);
  return {
    totalFiles: files.length,
    filesSize: filesSize,
    fields
  }
}

async function deleteTmpFiles(files) {
  for (file of files) {
    await unlink(file.path);
  }
}

module.exports = router;
