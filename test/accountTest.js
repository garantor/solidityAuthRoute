const { expect } = require("chai");
const { ethers } = require("hardhat");

// console.log(ethers.getSigner())

describe("Login User", function () {
  it("Should revert with an error, User not authorized yet", async function () {
    const contractArtifact = await ethers.getContractFactory("Account");
    const ContractInstance = await contractArtifact.deploy();
    await expect(ContractInstance.logOut()).to.be.revertedWith("User not authorized");
  });
});
describe("Protected Routes", function () {

  it("Should revert with an error, User not authorized yet", async function () {
    const contractArtifact = await ethers.getContractFactory("Account");
    const ContractInstance = await contractArtifact.deploy();
    await expect(ContractInstance.protectEndpoint()).to.be.revertedWith(
      "User not authorized"
    );
  });
});
describe("Get User from the contract", function () {

  it("should return an empty value for username and email", async function () {
    const contractArtifact = await ethers.getContractFactory("Account");
    const ContractInstance = await contractArtifact.deploy();
    await ContractInstance.deployed();
    const cdf = await ContractInstance.getUserAccount(
      "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
    );
    await expect(cdf['username']).to.be.equal("");
    await expect(cdf["email"]).to.be.equal("");
  });
});

  describe("Register User", function () {
    it("Should revert with an error, 'All Arguments are Required' for not passing any arguments", async function () {
      const contractArtifact = await ethers.getContractFactory("Account");
      const ContractInstance = await contractArtifact.deploy();
      await expect(
        ContractInstance.addUserAccount("", "", "")
      ).to.be.revertedWith("All Arguments are Required");
    });

    it("Should revert with an error, 'All Arguments are Required' for passing incomplete arguments", async function () {
      const contractArtifact = await ethers.getContractFactory("Account");
      const ContractInstance = await contractArtifact.deploy();
      await expect(
        ContractInstance.addUserAccount("test@gmail.com", "Testman", "")
      ).to.be.revertedWith("All Arguments are Required");
    });

    it("Should pass without any error", async function () {
      const contractArtifact = await ethers.getContractFactory("Account");
      const ContractInstance = await contractArtifact.deploy();
      const reg = await ContractInstance.addUserAccount("test@gmail.com", "Testman", "Test123")
      // getting signer for the transaction
      const signers = await ethers.getSigners();
      console.log()
      await expect(reg)
        .to.emit(ContractInstance, "UserRegister")
        .withArgs("User has been successfully Register", signers[0].address, "test@gmail.com");
    });
  }
);
