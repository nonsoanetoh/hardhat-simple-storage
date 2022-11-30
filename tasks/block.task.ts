import { task } from "hardhat/config";

task("block", "Fetches the current block number").setAction(
  async (taskArgs, { ethers }) => {
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);

// module.exports = {};
