const prompt = require('prompt-sync')();
const name = prompt('Keyword:');

const { fork } = require('child_process');
const child = fork('link_scrap.js'); // no need for 'new'
child.send({'qkey': name});