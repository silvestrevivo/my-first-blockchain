const Block = require('./block');

describe('Block', () => {
  let data, lastBlock, newBlock;

  beforeEach(() => {
    data = 'bar';
    lastBlock = Block.genesis();
    newBlock = Block.mineBlock(lastBlock, data);
  });

  it('sets the `data` to match the input', () => {
    expect(newBlock.data).toEqual(data);
  });

  it('sets the `lastHash` to match the hash of the last block', () => {
    expect(newBlock.lastHash).toEqual(lastBlock.hash);
  });
});
