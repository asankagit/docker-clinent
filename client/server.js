

import express from 'express';
import fetch from "node-fetch";

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async (req, res) => {
  const response = await fetch('http://api.plos.org/search?q=title:DNA', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });

  const data = await response.json();
  console.log(data )
  res.send({ data });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);