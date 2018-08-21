/**
 *	@Description:
 *  	This file handles the child process nessisary to talk between the sensor
 *    (python) and magic mirror (js)
 *	@Author:
 *  	Kai Sackville-Hii
 * 	@Date:
 * 		May, 2018
 */

const { spawn } = require('child_process');

function listen(os, nh){
  var cmd = null;
  // change spawn based on os
  if(os === 'Win32') {
      cmd = spawn('cmd', ['/c', 'py', './modules/MMM-skywriter/test.py']);
  }
  else {
      cmd = spawn('python',['./modules/MMM-skywriter/sensor.py']);
  }
  cmd.stdout.on('data', (data) => {
    var str_data = data.toString();
    str_data = str_data.slice(0,-1);
    // console.log(typeof(str_data));
    // if (str_data === 'sensed') {
    //   console.log('here');
    //   nh.sendSocketNotification("MOVEMENT_IN_RANGE", {})
    // }
    nh.sendSocketNotification("SENSOR_SWIPED", {action: str_data});
  });
  cmd.stderr.on('data', (data) => {
    console.log(data.toString());
  });
  cmd.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
}

module.exports = {
    listen,
};
