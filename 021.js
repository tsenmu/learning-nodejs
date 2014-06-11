var fs = require('fs');
var http = require('http');

var theUser = null;
var userPos = 0;
var tweetFile = "tweets.txt";

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type' : 'text/event-stream',
        'Cache-Control' : 'no-cache',
        'Access-Control-Allow-Origin' : '*'
    });
    theUser = response;

    response.write(': ' + Array(2049).join(' ') + '\n');
    response.write('retry: 2000\n');

    response.socket.on('close', function() {
        theUser = null;
    });
}).listen(8080);

var sendNext = function(fd) {
    var buffer = new Buffer(140);
    fs.read(fd, buffer, 0, 140, userPos * 140, function(err, num) {
        if (!err && num > 0 && theUser) {
            ++userPos;
            theUser.write('data: ' + buffer.toString('utf-8', 0, num) + '\n\n');
            return process.nextTick(function() {
                sendNext(fd);
            });
        }
    });
};

function start() {
    fs.open(tweetFile, 'r', function(err, fd) {
        if(err) {
            return setTimeout(start, 1000);
        }
        fs.watch(tweetFile, function(event, filename) {
            if (event == 'change') {
                sendNext(fd);
            }
        });
    });
};

start();

// Get tweets
var fs = require('fs');
var Twit = require('twit');

var twit = new Twit({
    consumer_key: 'your key',
    consumer_secret: 'your secret',
    access_token: 'your token',
    access_token_secret: 'your secret token'
})

var tweetFile = "tweets.txt";
var writeStream = fs.createWriteStream(tweetFile, {
    flags : 'a'
});

var cleanBuffer = function(len) {
    var buf = new Buffer(len);
    buf.fill('\0');
    return buf;
}
var check = function() {
    twit.get('search/tweets', {
        q: '#nodejs since:2013-01-01'
    }, function(err, reply) {
        var buffer = cleanBuffer(reply.statuses.length * 140);
        reply.statueses.forEach(function(obj, idx) {
            buffer.write(obj.text, idex*140, 140);
        });
        writeStream.write(buffer);
    })
    setTimeout(check, 1000);
};
check();
