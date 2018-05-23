/**
 * 	Module that handles I/O from gesture sensor
 *  By Kai Sackville-Hii
 * 	May 23 2018
 */

var NodeHelper = require("node_helper");
const { spawn } = require('child_process');

module.exports = NodeHelper.create({

    socketNotificationReceived(notification, payload) {
        if (notification === "START_PY") {
          console.log("<~~~~~~~~~~ LISTENING TO SENSOR ~~~~~~~~~~>");
		  // for windows
          const cmd = spawn('cmd', ['/c', 'py', './modules/sensor/test.py']);
          // linix
          // const dir = spawn('python',['test.py'], { stdio: 'inherit' })
          cmd.stdout.on('data', (data) => {
            str_data = data.toString()
            this.sendSocketNotification("SENSOR_SWIPED", {command: str_data});
          });
          cmd.stderr.on('data', (data) => {
            console.log(data.toString());
          });
          cmd.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
          });
        }
        return;
    }

});
