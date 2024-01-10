const ethers = require("ethers")
const fs = require("fs-extra")
require('dotenv').config();

async function main() {
    // these two is what we need to interact with the blockchain
    // provides the connection to the blockchain
    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY)
    // to sign transactions
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
    const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");

    // object used to deploy the contract
    const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
    console.log("Deploying contract...");
    const contract = await contractFactory.deploy();
    const deploymentReceipt = await contract.waitForDeployment();
    console.log(contract);
    const deploymentTransaction = deploymentReceipt.deploymentTransaction();
    console.log("-----------------depolyment receipt-----------------")
    console.log(deploymentReceipt)
    console.log("-----------------depolyment transaction-----------------")
    console.log(deploymentTransaction)


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
