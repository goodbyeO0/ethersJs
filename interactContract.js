const { ethers } = require("ethers");
const fs = require("fs-extra")

async function main() {
    // The provider
    const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/y7HeLMjQeETIcr8PLW1OI2ZsXl8LE8R6")

    // The signer
    const privateKey = "3349b9eaabf744b2222b494c01c3bf56bfefe0039c8adf5406defb7baaceb40f"; // replace with your private key
    const signer = new ethers.Wallet(privateKey, provider);

    // The contract's ABI and address
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
    const contractAddress = "0x783C5aAbf59a00677B5D6ce1A1d40e8Eb6Cfc455";

    // Create a new instance of the contract
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Call the retrieve function
    const currentFavoriteNumber = await contract.retrieve();
    console.log("Current favorite number:", currentFavoriteNumber.toString());

    // Call the store function
    const transactionResponse = await contract.store(199);
    const transactionReceipt = await transactionResponse.wait();

    // Call the retrieve function again
    const newFavoriteNumber = await contract.retrieve();
    console.log("New favorite number:", newFavoriteNumber.toString());

    // get receipt
    console.log("-----------------depolyment receipt-----------------")
    console.log("Transaction receipt:", transactionReceipt);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });