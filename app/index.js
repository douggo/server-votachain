const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const PORT = process.env.PORT || 8000;
const HOST_PORT = process.env.HOST_PORT || '0.0.0.0';

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json(), function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
    //teste
});

app.post('/mine', (req, res) => {
    const block = bc.adicionaBlock(req.body.id_eleicao, req.body.id_candidato);
    console.log(`Novo bloco adicionado: ${block.toString()}`);
    p2pServer.sincronizaChains();
    res.redirect('/blocks');
});

app.listen(PORT, HOST_PORT, () => console.log(`Escutando na porta ${PORT}`));
p2pServer.escutar();