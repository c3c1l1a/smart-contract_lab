
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile.js');

let accounts;
let inbox;

const DEFAULT_MESSAGE = "Hi there";

beforeEach (async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of the accounts to deploys the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [DEFAULT_MESSAGE]})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
  it('deploys contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, DEFAULT_MESSAGE);
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage("what").send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, "what");
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
