

import express from 'express';
import fetch from "node-fetch";

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async (req, res) => {
  const response = await fetch('https://httpbin.org/post', {method: 'POST', body: 'a=1'});
  res.send({ response });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);