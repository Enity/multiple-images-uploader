const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const path = require('path');

/* 'host/testupload' */

router.post('/', async(req, res) => {
  const formParser = new formidable.IncomingForm();
  formParser.uploadDir = path.resolve(__dirname, 'uploaded');
  formParser.multiples = true;
  formParser.parse(req, async (err, fields, files) => {
     if (err) res.send(err);
     if (files.files == undefined) res.send('NO FILES');
     debugger;
     res.send('OK');
  }); 
});

module.exports = router;
