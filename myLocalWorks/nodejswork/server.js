var http = require("http");
var url = require("url");

function startServer(route,handle) {
	function onRequest(request, response) {
		console.log("--> Получен запрос!");
		//console.log("GET "+request.url+"\n")
		
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(handle,pathname);		
		
		response.writeHead(200, {"Content-Type": "text/plain"}); // имя переменной не может содержать -
		response.writeHead(200, {"X-Powered-By": "Node.JS"});
		response.write("Hello, World");
		response.end();
	}
	http.createServer(onRequest).listen(8888);
	console.log("\n~S~ Server has started.\n");
}

/*
function exportedFoo(){
	console.log('Text from exportedFoo');
} */

exports.startServer = startServer;
//exports.exportedFoo = exportedFoo;



/*

var http = require("http");

function onRequest(request, response) {
	console.log("--> Получен запрос!\n");
	console.log("GET "+request.url+"\n")
	var timeStart = new Date();
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.writeHead(200, {"X-Powered-By": "Node.JS"});
	response.write("Hello, World");
	response.end();
	
	var timeEnd = new Date();
	
	
	function requestTime(){
		console.log("~X~ Обработка запроса завершена --- Time elapsed: "+parseFloat(((timeEnd-timeStart)/60).toFixed(3))+" seconds\n")
	}
	
	//setTimeout(requestTime,1000)
	requestTime()
}

http.createServer(onRequest).listen(8888);

console.log("\n~S~ Server has started.\n");

*/


/*
var http = require("http");

var server = http.createServer();
server.listen(8888);
*/