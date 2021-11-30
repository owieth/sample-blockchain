const { BlockChain } = require('./blockchain/BlockChain');
const { Transaction } = require('../src/transaction/Transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// FROM https://hackernoon.com/building-your-own-blockchain-in-java-a-how-to-guide-y4313yku

const myKey = ec.keyFromPrivate('12424cd1b965981496165f49a5baa51b2ff26ee4a7a360cc415c0766a2e643e6');
const myWalletAddress = myKey.getPublic('hex');

let mychain = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'public goes other person', 10);
tx1.signTransaction(myKey);
mychain.addTransaction(tx1);

console.log('\n Starting the miner..');
mychain.minePendingTransactions(myWalletAddress);

console.log(
  '\n Olis Balance ist ',
  mychain.getBalanceOfAddress(myWalletAddress)
);


/*
console.log('Mining block 1...');
mychain.addBlock(new Block(1, '07/06/2020', { amount: 4 }));

console.log('Mining block 2...');
mychain.addBlock(new Block(2, '08/06/2020', { amount: 10 }));
*/
//console.log(JSON.stringify(mychain, null, 4));
