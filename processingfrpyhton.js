const options = {
    mode: "text",
  };
let { PythonShell } = require('python-shell');
const pyshell = new PythonShell("PythonSH/processing.py", options);
let Result;
pyshell.on("message", function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    Result = message;
    console.log(Result);
});
