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

    isChainValida(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const blockAnterior = chain[i-1];
            if (block.hashAnterior !==  blockAnterior.hash || block.hash !== Block.blockHash(block)) {
                return false;
            }
        }

        return true;
    }

    substituiChain(novaChain) {
        if (novaChain.length <= this.chain.length) {
            console.log('Chain recebida é menor ou igual a chain atual, portanto não será substituída.');
            return;
        } else if (!this.isChainValida(novaChain)) {
            console.log('Chain recebida não é válida.');
            return;
        }
        console.log('Chain aceita! Substuíndo a chain anterior com a nova...');
        this.chain = novaChain; 
    }
}

module.exports = Blockchain;