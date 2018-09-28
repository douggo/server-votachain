const SHA256 = require('crypto-js/sha256');
const { DIFICULDADE } = require('../config');

class Block {
    constructor(timestamp, hashAnterior, hash, dado, nonce) {
        this.timestamp = timestamp;
        this.hashAnterior = hashAnterior;
        this.hash = hash,
        this.dado = dado;
        this.nonce = nonce;
    }

    toString() {
        return `Block - 
            Timestamp    : ${this.timestamp}
            Hash anterior: ${this.hashAnterior.substring(0, 10)}
            Hash         : ${this.hash.substring(0, 10)}
            Nonce        : ${this.nonce}
            Dado         : ${this.dado}`;
    }

    static genesis() {
        return new this('Inicío', '------', 'pr1m31r0-h45h', [], 0);
    }

    static minerarBlock(blockAnterior, dado) {
        let hash, timestamp;
        const hashAnterior = blockAnterior.hash;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp, hashAnterior, dado, nonce);
        } while (hash.substring(0, DIFICULDADE) !== '0'.repeat(DIFICULDADE));

        return new this(timestamp, hashAnterior, hash, dado, nonce);
    }

    static hash(timestamp, hashAnterior, dado, nonce) {
        return SHA256(`${timestamp}${hashAnterior}${dado}${nonce}`).toString();
    }

    static blockHash(block) {
        const { timestamp, hashAnterior, dado, nonce } = block;
        return Block.hash(timestamp, hashAnterior, dado, nonce);
    }
}

module.exports = Block;