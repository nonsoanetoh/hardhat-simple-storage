import { ethers } from "hardhat";
import { assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
  let SimpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;

  beforeEach(async function () {
    SimpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory;
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
    it(`should compare 2 strings - ${args.join(" & ")}`, async function () {
      const compareTwoStrings = await simpleStorage.compareTwoStrings(
        args[0],
        args[1]
      );
      const expectedValue = args[0] === args[1];

      assert.equal(compareTwoStrings, expectedValue);
    });
  });

  const pureFunctionTests = ["Nonso", "David", "Ben"];

  pureFunctionTests.forEach((arg) => {
    it(`should say Hello + ${arg}`, async function () {
      const pureFunction = await simpleStorage.callPrivatePureFunction(arg);
      const expectedValue = "Hello ".concat(arg);

      assert.equal(pureFunction, expectedValue);
    });
  });

  it(`should return favourite number`, async function () {
    const viewFunction = await simpleStorage.viewFunction();
    const expectedValue = await simpleStorage.favouriteNumber();

    assert.equal(viewFunction.toString(), expectedValue.toString());
  });

  const mappingTests = [
    {
      name: "Nonso",
      age: 21,
    },
    {
      name: "Michael",
      age: 24,
    },
    {
      name: "Trevor",
      age: 19,
    },
  ];

  mappingTests.forEach(({ name, age }) => {
    it("should add person to mapping", async function () {
      await simpleStorage.createPerson(name, age);
      // CHECK IF PERSON EXISTS IN MAPPING
      const mappingValue = await simpleStorage.nameToAge(name);
      assert.equal(mappingValue, age);
    });
  });
});
