const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it("should initialize with a favourite number of 0", async function () {
    // EXPECTED VALUE IS A STRING BECAUSE THE CURRENT VALUE WILL BE A BIG NUMBER
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    assert.equal(currentValue.toString(), expectedValue);
  });

  // TO RUN SINGLE TESTS, YOU USE THE '--grep' FLAG.
  // USING '--grep store' WILL ONLY RUN THE TEST THAT CONTAINS STORE IN THE NAME
  // ANOTHER WAY WOULD BE TO USE it.only INSTEAD OF IT

  it("should update when we call store", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);

    assert.equal(currentValue.toString(), expectedValue);
    // USING EXPECT INSTEAD OF ASSERT
    // expect(currentValue.toString).to.equal(expectedValue)
  });

  it("should retrieve favourite number", async function () {
    const expectedValue = await simpleStorage.favouriteNumber();
    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue.toString(), expectedValue.toString());
  });

  // DYNAMIC TEST ARGUMENTS
  const compareStringTests = [
    {
      args: ["Shoe", "Shoe"],
    },
    {
      args: ["Store", "Shore"],
    },
  ];

  compareStringTests.forEach(({ args }) => {
    it(`should compare ${args.length} strings - ${
      args.length <= 2 ? args.join(" & ") : args.join(",")
    }`, async function () {
      const compareTwoStrings = await simpleStorage.compareTwoStrings(...args);
      const expectedValue = args[0] === args[1];

      console.log(compareTwoStrings, expectedValue);
      assert.equal(compareTwoStrings, expectedValue);
    });
  });
});
