const { ethers } = require("ethers");

// Create a new wallet with a private key
const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/y7HeLMjQeETIcr8PLW1OI2ZsXl8LE8R6")
const wallet = new ethers.Wallet("3349b9eaabf744b2222b494c01c3bf56bfefe0039c8adf5406defb7baaceb40f", provider);
// Sign a message
const message = "Hello, world!";
const signature = wallet.signMessageSync(message);

console.log("Signature:", signature);

const verify = ethers.verifyMessage(message, signature);
console.log("Verified:", verify);