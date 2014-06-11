var Feed = function(channel) {
    var readable = new require('stream').Readable({
        encoding: 'utf-8'
    });
    var news = [
        "Big Win!",
        "Stocks Down!",
        "Actor Sad!"
    ];
    readable._read = function() {
        if (news.length) {
            return readable.push(news.shift() + "\n");
        }
        readable.push(null);
    };
    return readable;
}

var feed = new Feed();
feed.on("readable", function() {
    var data = feed.read();
    data && process.stdout.write(data);
});

feed.on("end", function() {
    console.log('No more news');
});
