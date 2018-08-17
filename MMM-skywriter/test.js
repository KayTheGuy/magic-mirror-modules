const { spawn } = require('child_process');

  // linix
  // var dir = spawn('python',['test.py'])
  // windows

var py = spawn('cmd', ['/c', 'py', 'test.py'])

py.stdout.on('data', data => {
  console.log(data.toString('utf-8'));
});
