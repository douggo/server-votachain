const SHA256 = require('crypto-js/sha256');
const { DIFICULDADE, FREQUENCIA_MINEIRACAO } = require('../config');

class Block {
    constructor(timestamp, hashAnterior, hash, id_eleicao, id_candidato, nonce, dificuldade) {
        this.timestamp = timestamp;
        this.hashAnterior = hashAnterior;
        this.hash = hash,
        this.id_eleicao = id_eleicao;
        this.id_candidato = id_candidato;
        this.nonce = nonce;
        this.dificuldade = dificuldade || DIFICULDADE;;
    }

    toString() {
        return `Block - 
            Timestamp    : ${this.timestamp}
            Hash anterior: ${this.hashAnterior.substring(0, 10)}
            Hash         : ${this.hash.substring(0, 10)}
            Nonce        : ${this.nonce}
            Dificuldade  : ${this.dificuldade}
            id_eleicao   : ${this.id_eleicao}
            id_candidato : ${this.id_candidato}`;
    }

    static genesis() {
        return new this('Inicío', '------', 'pr1m31r0-h45h', 0, 0, 0, DIFICULDADE);
    }

    static minerarBlock(blockAnterior, id_eleicao, id_candidato) {
        let hash, timestamp;
        const hashAnterior = blockAnterior.hash;
        let { dificuldade } = blockAnterior;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            dificuldade = Block.ajustarDificuldade(blockAnterior, timestamp);
            hash = Block.hash(timestamp, hashAnterior, id_eleicao, id_candidato, nonce, dificuldade);
        } while (hash.substring(0, dificuldade) !== '0'.repeat(dificuldade));

        return new this(timestamp, hashAnterior, hash, id_eleicao, id_candidato, nonce, dificuldade);
    }

    static hash(timestamp, hashAnterior, id_eleicao, id_candidato, nonce, dificuldade) {
        return SHA256(`${timestamp}${hashAnterior}${id_eleicao}${id_candidato}${nonce}${dificuldade}`).toString();
    }

    static blockHash(block) {
        const { timestamp, hashAnterior, id_eleicao, id_candidato, nonce, dificuldade } = block;
        return Block.hash(timestamp, hashAnterior, id_eleicao, id_candidato, nonce, dificuldade);
    }

    static ajustarDificuldade(blockAnterior, tempoAtual) {
        let { dificuldade } = blockAnterior;
        dificuldade = blockAnterior.timestamp + FREQUENCIA_MINEIRACAO > tempoAtual ? dificuldade + 1 : dificuldade - 1;
        return dificuldade;
    }
}

module.exports = Block;