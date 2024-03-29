const express = require('express');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
//protocol to open several instances of the same app
//at the same time in different browsers

const app = express();
const bc = new Blockchain;
const p2pServer = new P2pServer(bc);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}.`);

  p2pServer.syncChains();

  res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}.`);
  console.log(`BC`, bc);
});

p2pServer.listen();
