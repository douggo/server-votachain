const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const PORT = process.env.PORT || 8000;
const HOST_PORT = process.env.HOST_PORT || '0.0.0.0';

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    const block = bc.adicionaBlock(req.body.dado);
    console.log(`Novo bloco adicionado: ${block.toString()}`);
    p2pServer.sincronizaChains();
    res.redirect('/blocks');
});

app.listen(PORT, HOST_PORT, () => console.log(`Escutando na porta ${PORT}`));
p2pServer.escutar();