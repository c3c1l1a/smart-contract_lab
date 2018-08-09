
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile.js');

let accounts;
let inbox;

beforeEach (async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of the accounts to deploys the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ["Hi there!"]})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
  it('deploys contract', () => {
    console.log(inbox);
  });
});
/*
NOTES
1) Uppercase Web3 - is the call to the contructor function
   Lowercase web3 - is the web3 instance
2) Provider - This is the communucation layer between web3 and some specific ethereum network
3) Ganache is the local ethereum test network.
4) You need an account to access ganache test net. Fortunately ganache-cli creates a set of accounts on the fly.

*/
