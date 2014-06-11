var cp = require('child_process');
var child = cp.fork(__dirname + '/011_2.js');

child.on('message', function(msg) {
    console.log('child said: ', msg);
});
child.send("I love you");
