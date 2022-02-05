var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

var container = docker.getContainer('37e1cee734f9');

// query API for container info
container.inspect(function (err, data) {
    console.log(data);
  });
  
  container.start(function (err, data) {
    console.log(data);
  });