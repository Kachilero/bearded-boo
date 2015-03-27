/**
 * Created by alejandrocerro on 3/27/15.
 * MEAN stack from Learnable.com
 */

var http = require('http');

http.createServer(function (req,res) {
  //A parsed url to work in case there are parameters
  var _url;

  //In case the client uses lower case for methods
  req.method = req.method.toUpperCase();
  console.log(req.method + ' ' + req.url);
  res.end('The current time is ' + Date.now())
}).listen(1337, '127.0.0.1');

console.log("Server running at http://127.0.0.1:1337");
