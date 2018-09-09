const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    adicionaBlock(dado) {
        const blockAnterior = this.chain[this.chain.length - 1];
        const block = Block.minerarBlock(blockAnterior, dado);
        this.chain.push(block);

        return block;
    }
}

module.exports = Blockchain;