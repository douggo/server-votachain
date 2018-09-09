const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Class: Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('Inicia com o genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('Adiciona um novo block na blockchain', () => {
        const dado = 'novoDado';
        bc.adicionaBlock(dado);
        expect(bc.chain[bc.chain.length - 1].dado).toEqual(dado);
    });

    it('Valida uma chain válida', () => {
        bc2.adicionaBlock('novoDado');
        expect(bc.isChainValida(bc2.chain)).toBe(true);
    });

    it('Invalida uma chain com o genesis block corrompido', () => {
        bc2.chain[0].dado = 'novoDado_corrompido';
        expect(bc.isChainValida(bc2.chain)).toBe(false);
    });

    it('Invalida uma chain, que não seja o genesis block', () => {
        bc2.adicionaBlock('novoDado');
        bc2.chain[1].dado = 'novoDado_corrompido';
        expect(bc.isChainValida(bc2.chain)).toBe(false);
    });
});