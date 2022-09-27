// const { readFileSync } = require('fs');
const { Client } = require("ssh2");

const conn = new Client();
conn
  .on("ready", () => {
    console.log("Client :: ready");

    conn
      .exec("uptime", (err, stream) => {
        if (err) throw err;

        stream
          .on("close", (code, signal) => {
            console.log(
              "Stream :: close :: code: " + code + ", signal: " + signal
            );
            conn.end();
          })
          .on("data", (data) => {
            console.log("STDOUT: " + data);
          })
          .stderr.on("data", (data) => {
            console.log("STDERR: " + data);
          });
      });

  })
  .connect({
    host: "192.168.0.77",
    port: 22,
    username: "voyager",
    password: "welcome1",
    // privateKey: readFileSync('/path/to/my/key')
  });

// example output:
// $> node .\uptime.js
// Client :: ready
// STDOUT:  14:46:15 up 25 days,  1:53,  0 users,  load average: 0.15, 0.11, 0.09

// Stream :: close :: code: 0, signal: undefined
