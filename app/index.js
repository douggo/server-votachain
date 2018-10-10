const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const PORT = process.env.PORT || 8000;
const HOST_PORT = process.env.HOST_PORT || '0.0.0.0';

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json(), function(req, res) {
    res.setHeader('Acess-Control-Allow-Origin', 'https://douggo.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
});

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.adicionaBlock(req.body.dado);
    console.log(`Novo bloco adicionado: ${block.toString()}`);
    p2pServer.sincronizaChains();
    res.redirect('/blocks');
});

app.listen(PORT, HOST_PORT, () => console.log(`Escutando na porta ${PORT}`));
p2pServer.escutar();