const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Class: Blockchain', () => {
    let bc;

    beforeEach(() => {
        bc = new Blockchain();
    });

    it('Inicia com o genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('Adiciona um novo block na blockchain', () => {
        const dado = 'novoDado';
        bc.adicionaBlock(dado);
        expect(bc.chain[bc.chain.length - 1].dado).toEqual(dado);
    });
});