const express = require('express');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
//protocol to open several instances of the same app
//at the same time in differents browsers

const app = express();
const bc = new Blockchain;

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}.`);
});
