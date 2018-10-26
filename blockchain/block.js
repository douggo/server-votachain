const SHA256 = require('crypto-js/sha256');
const { DIFICULDADE } = require('../config');

class Block {
    constructor(hashAnterior, hash, id_eleicao, id_candidato, nonce, DIFICULDADE) {
        this.hashAnterior = hashAnterior;
        this.hash = hash,
        this.id_eleicao = id_eleicao;
        this.id_candidato = id_candidato;
        this.nonce = nonce;
        this.dificuldade = DIFICULDADE;
    }

    toString() {
        return `Block - 
            Hash anterior: ${this.hashAnterior.substring(0, 10)}
            Hash         : ${this.hash.substring(0, 10)}
            id_eleicao   : ${this.id_eleicao}
            id_candidato : ${this.id_candidato}
            Nonce        : ${this.nonce}
            Dificuldade  : ${this.dificuldade}
            
            `;
    }

    static genesis() {
        return new this('------', 'pr1m31r0-h45h', 0, 0, 0, DIFICULDADE);
    }

    static minerarBlock(blockAnterior, id_eleicao, id_candidato) {
        let hash;
        const hashAnterior = blockAnterior.hash;
        let dificuldade;
        let nonce = 0;
        do {
            nonce++;
            dificuldade = DIFICULDADE;
            hash = Block.hash(hashAnterior, id_eleicao, id_candidato, nonce, dificuldade);
        } while (hash.substring(0, dificuldade) !== '0'.repeat(dificuldade));

        return new this(hashAnterior, hash, id_eleicao, id_candidato, nonce, dificuldade);
    }

    static hash(hashAnterior, id_eleicao, id_candidato, nonce, dificuldade) {
        return SHA256(`${hashAnterior}${id_eleicao}${id_candidato}${nonce}${dificuldade}`).toString();
    }

    static blockHash(block) {
        const { hashAnterior, id_eleicao, id_candidato, nonce, dificuldade } = block;
        return Block.hash(hashAnterior, id_eleicao, id_candidato, nonce, dificuldade);
    }

}

module.exports = Block;