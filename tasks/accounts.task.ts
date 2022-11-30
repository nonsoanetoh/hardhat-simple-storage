import { task } from "hardhat/config";

export default task(
  "accounts",
  "Prints a list of accounts",
  async (taskArgs, { ethers }) => {
    const accounts = await ethers.getSigners();

    for (let i = 0; i < accounts.length; i++) {
      console.log(accounts[i].address);
    }
  }
);
