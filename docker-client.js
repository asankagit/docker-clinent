'use strict';
const {Docker} = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

// List

const list = () => docker.container.list()
   // Inspect
  .then(containers => { 
    console.log(containers)
    return containers[0].status()
  })
  .then(container => container.stats())
  .then(stats => {
    stats.on('data', stat => console.log('Stats: ', stat.toString()))
    stats.on('error', err => console.log('Error: ', err))
  })
  .catch(error => console.log(error));


  const promisifyStream = stream => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
  })

  const get = () => docker.container.create({
    Image: 'asanka/node-web-app',
    name: ''
  })
    .then(container => container.start())
    .then(container => {
      const _container = container
      return container.exec.create({
        AttachStdout: true,
        AttachStderr: true,
        Cmd: [ "curl", "http://localhost:8080" ]
      })
    })
    .then(exec => {
      return exec.start({ Detach: false })
    })
    .then(stream => promisifyStream(stream))
    .catch(error => console.log(error));




const express  = require('express')


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async (req, res) => {
  const response = await get()
  res.send({ response });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);