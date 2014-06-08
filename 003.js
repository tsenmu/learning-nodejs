var Readable = require('stream').Readable;
var readable = new Readable;
var count = 0;
readable._read = function() {
    if(++count > 10) {
        return readable.push(null);
    }
    setTimeout(function() {
        readable.push(count + '\n');
    }, 500);
};
var fs = require('fs');
var writeStream = fs.createWriteStream("./counter", {
    flags : 'w',
    mode : 0666
});

readable.pipe(writeStream);
