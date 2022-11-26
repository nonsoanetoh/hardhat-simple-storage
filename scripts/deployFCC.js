const { ethers, run, network } = require("hardhat");

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying simple-storage contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed(0);

  console.log(`deployed simple-storage to ${simpleStorage.address}`);
  // ONLY RUN CONTRACT VERIFICATION WHEN RUNNING ON THE GOERLI NETWORK
  // THIS IS BECAUSE THE HARDHAT NETWORK ONLY RUNS LOCALLY ON THIS DEVICE
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
};

// AUTO VERIFY ON ETHERSCAN
// ARGS - CONSTRUCTOR ARGUMENTS
const verify = async (contractAddress, args) => {
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Aleady Verified");
    } else {
      console.log(e);
    }
  }
};

main().catch((error) => console.log(error));
