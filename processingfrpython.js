console.log("Starting Python Processing");
const { spawn } = require('child_process');

const python = spawn('python', ['PythonSH/processing.py']);

let output = '';

python.stdout.on('data', (data) => {
  process.stdout.write(data.toString());
});

python.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

python.on('close', (code) => {
  console.log(output);
});
