var stream = require('stream');
var writable = new stream.Writable( {
    highWaterMark : 16000,
    decodeStrings : true
});
