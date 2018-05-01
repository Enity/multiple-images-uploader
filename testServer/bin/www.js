const app = require('../app');
const http = require('http');

/**
 * Get port
 */

const port = 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function() {
   console.log('Listening on ' + port);
});
server.on('error', onError);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
   if (error.syscall !== 'listen') {
      throw error;
   }

   var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
      case 'EACCES':
         console.error(bind + ' requires elevated privileges');
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(bind + ' is already in use');
         process.exit(1);
         break;
      default:
         throw error;
   }
}
