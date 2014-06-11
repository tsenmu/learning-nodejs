// Set up a watcher for the file itself.

var fs = require('fs');

fs.watch(__filename, { persistent : false }, function(event, filename) {
    console.log(event);
    console.log(filename);
})

setImmediate(function() {
    fs.rename(__filename, __filename + '.new', function() {} );
});
