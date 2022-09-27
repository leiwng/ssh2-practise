const { spawn, fork } = require("child_process");

function callChildProcess() {
  const childProcess = fork("child_process_child.js");

  //Set a on-message handler to receive the outcome
  childProcess.on("message", (result) => {
    console.log(`Outcome : ${result}`);
    childProcess.kill("SIGTERM");
  });
  childProcess.on("close", (code) => {
    console.log(`main -> child process exited with code ${code}`);
  });

  //Call the childProcess - for a cpu intensive task taking 5000ms.
  childProcess.send({ command: "SLEEP", responseTime: 5000 });
}

callChildProcess();
setTimeout(() => {
  console.log(
    "main -> \n main -> Test Parent Event-Loop :cpuIntensiveTask in child process does not block this event in parent process!"
  );
}, 1000);
