const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    escutar() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.conectaSocket(socket));

        this.conectaPeers();

        console.log(`Escutando por conexões peer-to-peer na porta: ${P2P_PORT}`);
    }

    conectaPeers() {
        peers.forEach(peer => {
            const socket = new Websocket(peer);
            socket.on('open', () => this.conectaSocket(socket));
        });
    }

    conectaSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket conectado');
        this.gerenciadorDeMensagens(socket);
        this.enviaChain(socket); 
    }

    gerenciadorDeMensagens(socket) {
        socket.on('message', message => {
            const dado = JSON.parse(message);
            this.blockchain.substituiChain(dado);
        });
    }

    enviaChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    sincronizaChains() {
        this.sockets.forEach(socket => this.enviaChain(socket));
    }
}

module.exports = P2pServer;