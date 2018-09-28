const Block = require('./block');
const { DIFICULDADE } = require('../config');

describe('Class: Block', () => {
    let dado, blockAnterior, block;

    beforeEach(() => {
        dado = 'dummy';
        blockAnterior = Block.genesis();
        block = Block.minerarBlock(blockAnterior, dado);
    });
    
    it('Seta o `dado` para coincidir com o dado informado', () => {
        expect(block.dado).toEqual(dado);
    });

    it('Seta o ´hashAnterior´ com o hash do bloco anterior', () => {
        expect(block.hashAnterior).toEqual(blockAnterior.hash);
    });

    it('Gera um hash que coincide com a dificuldade', () => {
        expect(block.hash.substring(0, DIFICULDADE)).toEqual('0'.repeat(DIFICULDADE));
        console.log(block.toString());
    });
});


