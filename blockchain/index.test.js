const Blockchain = require('./index');
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
        const id_eleicao = 'novo_id_eleicao';
        const id_candidato = 'novo_id_candidato';
        bc.adicionaBlock(id_eleicao, id_candidato);
        expect(bc.chain[bc.chain.length - 1].id_eleicao).toEqual(id_eleicao);
        expect(bc.chain[bc.chain.length - 1].id_candidato).toEqual(id_candidato);
    });

    it('Valida uma chain válida', () => {
        bc2.adicionaBlock('id_eleicao', 'id_candidato');
        expect(bc.isChainValida(bc2.chain)).toBe(true);
    });

    it('Invalida uma chain com o genesis block corrompido', () => {
        bc2.chain[0].id_eleicao = 'id_eleicao_corrompido';
        bc2.chain[0].id_candidato = 'id_candidato_corrompido';
        expect(bc.isChainValida(bc2.chain)).toBe(false);
    });

    it('Invalida uma chain, que não seja o genesis block', () => {
        bc2.adicionaBlock('novo_id_eleicao', 'novo_id_candidato');
        bc2.chain[1].id_eleicao = 'novo_id_eleicao_corrompido';
        bc2.chain[1].id_candidato = 'novo_id_candidato_corrompido';
        expect(bc.isChainValida(bc2.chain)).toBe(false);
    });

    it('Substituí a chain atual por uma chain válida', () => {
        bc2.adicionaBlock('novo_id_eleicao', 'novo_id_candidato');
        bc.substituiChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('Não realiza a substituição da chain que seja igual ou menor que o tamanho da chain antiga', () => {
        bc.adicionaBlock('novo_id_eleicao_bc', 'novo_id_candidato_bc');
        bc.substituiChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);

    });
});