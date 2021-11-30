const SHA256 = require('crypto-js/sha256');

class Block {
  /*
          index -> Position in Chain
          timestamp -> Creationtime
          data -> Data in Block (e.g. Details of Transaction)
          previousHash -> String of previous Block Hash
      */
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.timestamp +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log('Block mined: ' + this.hash);
  }

  hasValidTransaction() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }
    
    return true;
  }
}

module.exports.Block = Block;
