import { ethers, run, network } from "hardhat";

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying simple-storage contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log(`deployed simple-storage to ${simpleStorage.address}`);
  const signerAddress = (await simpleStorage.signer.getAddress()).toString();
  console.log(`deployed simple-storage from ${signerAddress}`);

  // ONLY RUN CONTRACT VERIFICATION WHEN RUNNING ON THE GOERLI NETWORK
  // THIS IS BECAUSE THE HARDHAT NETWORK ONLY RUNS LOCALLY ON THIS DEVICE
  // ITS BEST PRACTICE TO WAIT A FEW BLOCKS BEFORE VERIFYING A CONTRACT ON ETHERSCAN

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  // RUN 'RETRIEVE' TO GET THE CURRENT FAVOURITE NUMBER
  // RUN 'STORE' TO CHANGE THE CURRENT FAVOURITE NUMBER
  // WAIT FOR 1 BLOCK CONFIRMATION AND RETRIEVE THE UPDATED NUMBER

  const currentFavouriteNumber = await simpleStorage.retrieve();
  console.log(`current favourite number: ${currentFavouriteNumber}`);
  const transactionResponse = await simpleStorage.store(12);
  console.log("storing new number...");
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`updated value is: ${updatedValue}`);
};

// AUTO VERIFY ON ETHERSCAN
// ARGS -> CONSTRUCTOR ARGUMENTS
const verify = async (contractAddress: string, args: any[]) => {
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("contract is aleady verified");
    } else {
      console.log(e);
    }
  }
};

main().catch((error) => console.log(error));
