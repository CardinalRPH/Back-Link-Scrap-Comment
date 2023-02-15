process.on('message', (msg) => {
    if (msg.koota) {
        console.log(msg.koota, 'from child!');
    }
});