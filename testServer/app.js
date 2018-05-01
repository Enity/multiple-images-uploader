const express = require('express');
const app = express();

const uploader = require('./uploaderRoute');

/* ALLOW-ORIGIN */
app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

/* Routes */
app.use('/testupload', uploader);

/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
   next(createError(404));
});

/* Error handler */
app.use(function(err, req, res, next) {
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   res.status(err.status || 500);
   res.render('error');
});

module.exports = app;
