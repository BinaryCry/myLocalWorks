function start() {
  console.log("Request handler 'start' was called.");
}

function upload() {
  console.log("Request handler 'upload' was called.");
}

function sayHello() {
  console.log("Hello, World!");
}

exports.start = start;
exports.upload = upload;
exports.sayHello = sayHello;