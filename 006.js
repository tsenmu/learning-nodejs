var size = process.argv[2];
var tot = process.argv[3] || 100;
var buff = [];
for (var i = 0; i < tot; ++i) {
    buff.push(new Buffer(size));
    process.stdout.write(process.memoryUsage().heapTotal + "\n");
}
