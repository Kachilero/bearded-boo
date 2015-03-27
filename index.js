/**
 * Created by alejandrocerro on 3/27/15.
 * MEAN stack from Learnable.com
 */

var http              = require('http'),
    employeeService   = require('./lib/employees'),
    responder         = require('./lib/responseGenerator'),
    staticFile        = responder.staticFile('/public');

http.createServer(function (req,res) {
  //A parsed url to work in case there are parameters
  var _url;

  //In case the client uses lower case for methods
  req.method = req.method.toUpperCase();
  console.log(req.method + ' ' + req.url);

  if(req.method !== 'GET'){
    res.writeHead(501, {
      "Content-Type": "text/plain"
    });
    return res.end(req.method + ' is not implemented by this server');
  }

  if(_url = /^\/employees$/i.exec(req.url)){
    //return list of employees
    employeeService.getEmployees(function (error,data) {
      if(error){
        return responder.send500(error, res);
      }
      return responder.sendJson(data,res);
    })
  }else if(_url = /^\/employees\/(\d+)$/i.exec(req.url)){
    //find the employee by the id in the route
    employeeService.getSingleEmployee(_url[1], function (error,data) {
      if(error){
        return responder.send500(error, res);
      }
      if(!data){
        return responder.send404(res);
      }
      return responder.sendJson(data,res);
    });
  }else{
    //try to send the static file, if it exists
    //if not send 404
    /**I added this, it wasn't in the book*/
    responder.staticFile(staticFile);
  }

}).listen(1337, '127.0.0.1');

console.log("Server running at http://127.0.0.1:1337");
