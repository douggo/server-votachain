const Block = require('./block');

describe('Class: Block', () => {
    let id_eleicao, id_candidato, blockAnterior, block;

    beforeEach(() => {
        id_eleicao = 'id_eleicao_dummy';
        id_candidato = 'id_candidato_dummy';
        blockAnterior = Block.genesis();
        block = Block.minerarBlock(blockAnterior, id_eleicao, id_candidato);
    });
    
    it('Seta o `id_eleicao` para coincidir com o dado informado', () => {
        expect(block.id_eleicao).toEqual(id_eleicao);
    });

    it('Seta o `id_candidato` para coincidir com o dado informado', () => {
        expect(block.id_candidato).toEqual(id_candidato);
    });

    it('Seta o ´hashAnterior´ com o hash do bloco anterior', () => {
        expect(block.hashAnterior).toEqual(blockAnterior.hash);
    });

    it('Gera um hash que coincide com a dificuldade', () => {
        expect(block.hash.substring(0, block.dificuldade)).toEqual('0'.repeat(block.dificuldade));
    });
});


