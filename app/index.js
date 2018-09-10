const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.adicionaBlock(req.body.dado);
    console.log(`Novo bloco adicionado: ${block.toString()}`);
    p2pServer.sincronizaChains();
    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Escutando na porta ${HTTP_PORT}`));
p2pServer.escutar();