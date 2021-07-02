const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock = Block.mineBlock(lastBlock, data);
    this.chain.push(newBlock);

    return newBlock;
  }

  // These two next functions are valid to work with more peers/nodes
  isValidChain(chain) {
    // we check if the first element of the incomingChain match
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    // next check is for the rest of the elements of the incomingChain
    for (let i = 1; i < chain.length; i++) {
      const newBlock = chain[i];
      const lastBlock = chain[i - 1];

      if (newBlock.lastHash !== lastBlock.hash || newBlock.hash !== Block.blockHash(newBlock)) {
        return false;
      }
    }

    return true;
  }

  replaceChain(incomingChain) { // this will be the method used to sync different peers
    if (incomingChain.length <= this.chain.length) {
      console.log('Received chain is no longer than the current chain');
      return;
    } else if (!this.isValidChain(incomingChain)) {
      console.log('The recieved chain is not valid');
      return;
    }

    console.log(`Replacing incoming blockchain with the new one`, incomingChain);
    this.chain = incomingChain;
  }
}

module.exports = Blockchain;

