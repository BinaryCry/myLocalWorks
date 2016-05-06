var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = new Object();

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/hello"] = requestHandlers.sayHello;

server.startServer(router.route,handle);

{
	
	let foo = () => {
		console.log('short foo declaration')
	}
	foo()
	
}

//server.exportedFoo();