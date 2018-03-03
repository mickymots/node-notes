var http= require("http");

var requestHandlerFn = (request, response) =>{
    response.writeHead(200, {'contetn-type':'text/plain'});
    response.end('hello world');
}

http.createServer(requestHandlerFn).listen(7001);

console.log("server running at 7001");