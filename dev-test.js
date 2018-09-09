const Block = require('./block');

const dummyBlock = Block.minerarBlock(Block.genesis(), 'dummy');
console.log(dummyBlock.toString());