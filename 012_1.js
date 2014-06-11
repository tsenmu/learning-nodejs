var child = require('child_process').fork('./012_2.js');
var server = require('net').createServer();
server.on('connection', function(socket) {
    socket.end('Parent handled connection');
});
server.listen(8080, function() {
    child.send("The parent message", server);
});

