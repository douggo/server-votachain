const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, hashAnterior, hash, dado) {
        this.timestamp = timestamp;
        this.hashAnterior = hashAnterior;
        this.hash = hash,
        this.dado = dado;
    }

    toString() {
        return `Block - 
            Timestamp    : ${this.timestamp}
            Hash anterior: ${this.hashAnterior.substring(0, 10)}
            Hash         : ${this.hash.substring(0, 10)}
            Dado         : ${this.dado}`;
    }

    static genesis() {
        return new this('Inicío', '------', 'pr1m31r0-h45h', []);
    }

    static minerarBlock(blockAnterior, dado) {
        const timestamp = Date.now();
        const hashAnterior = blockAnterior.hash;
        const hash = Block.hash(timestamp, hashAnterior, dado);

        return new this(timestamp, hashAnterior, hash, dado);
    }

    static hash(timestamp, hashAnterior, dado) {
        return SHA256(`${timestamp}${hashAnterior}${dado}`).toString();
    }
}

module.exports = Block;