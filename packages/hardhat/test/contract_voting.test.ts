import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractVoting } from "../typechain-types";

describe("Election Contract", function () {
  let contractVoting: ContractVoting;
  let deployer: string;

  before(async () => {
    const initialCandidates = ["Vladimir", "Sergey", "Pervukhin"];
    const electionFactory = await ethers.getContractFactory("ContractVoting");
    contractVoting = (await electionFactory.deploy(initialCandidates)) as ContractVoting;
    await contractVoting.waitForDeployment();
  });

  describe("Initialization", function () {
    it("Should set up candidates correctly", async function () {
      const candidateOne = await contractVoting.getCandidates();
      expect(candidateOne).to.include("Vladimir");
    });
  });

  describe("Candidate Management", function () {
    it("Should successfully add a new candidate", async function () {
      const newCandidateName = "Me";
      await contractVoting.addNewCandidate(newCandidateName);
      const allCandidates = await contractVoting.getCandidates();
      expect(allCandidates).to.include(newCandidateName);
    });
  });

  describe("Voting Process", function () {
    it("Should allow voting for a registered candidate", async function () {
      await contractVoting.voting("Vladimir");
      const aliceVotes = await contractVoting.getVoteCount("Vladimir");
      expect(aliceVotes).to.equal(1);
    });

    it("Should reject votes for unregistered candidates", async function () {
      await expect(contractVoting.voting("Unknown")).to.be.rejectedWith("Candidate not found");
    });
  });

  describe("Event Emissions", function () {
    it("Should emit an event after casting a vote", async function () {
      const [signer] = await ethers.getSigners();
      deployer = await signer.getAddress();
      await expect(contractVoting.voting("Vladimir")).to.emit(contractVoting, "Voted").withArgs(deployer, "Vladimir");
    });
  });
});
