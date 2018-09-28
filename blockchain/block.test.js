const Block = require('./block');

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
        expect(block.hash.substring(0, block.dificuldade)).toEqual('0'.repeat(block.dificuldade));
    });

    it('Diminui a dificuldade para blocks que foram mineirados lentamente', () => {
        expect(Block.ajustarDificuldade(block, block.timestamp + 360000)).toEqual(block.dificuldade - 1);
    });

    it('Aumenta a dificuldade para blocks que foram mineriados rapidamente', () => {
        expect(Block.ajustarDificuldade(block, block.timestamp + 1)).toEqual(block.dificuldade + 1);
    });
});


