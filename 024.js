var readable = new stream.Readable({
    objectMode : true
});
var prices = [
    { price : 1 },
    { price : 2 }
];

readable.push(prices.shift());
