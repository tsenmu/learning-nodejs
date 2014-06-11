setInterval(function(){}, 1e6);
process.on('SIGUSR1', function() {
    console.log('Got a signal');
});

// Finding PID: ps aux | grep 010.js
// Sending a signal: kill -s SIGUSR1 123
