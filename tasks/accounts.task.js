const { task } = require("hardhat/config");

task("accounts", "Prints a list of accounts", async (taskArgs, { ethers }) => {
  const accounts = await ethers.getSigners();
  console.log(typeof accounts);
  for (account of accounts) console.log(account.address);
});
