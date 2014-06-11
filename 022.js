var stream = require('stream');
var readable = new stream.Readable({
    encoding : 'utf-8',
    highWaterMark : 16000,
    objectMode : true
});

