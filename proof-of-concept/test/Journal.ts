import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Journal', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployJournalContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Journal = await ethers.getContractFactory('Journal');
    const journal = await Journal.deploy();

    return { owner, otherAccount, journal };
  }

  describe('Deployment', function () {
    it('Should deploy without error', async function () {
      const { owner, otherAccount } = await loadFixture(deployJournalContract);

      expect(owner.address).not.to.equal(otherAccount.address);
    });

    it('Should have file count of 0 at the start', async function () {
      const { owner, otherAccount, journal } = await loadFixture(
        deployJournalContract
      );

      const countBeforeUpload = await journal.fileCount();

      expect(countBeforeUpload).to.equal(0);
    });

    it('Should increment to 1 file count after sucessful upload', async function () {
      const { owner, otherAccount, journal } = await loadFixture(
        deployJournalContract
      );

      const countBeforeUpload = await journal.fileCount();

      expect(countBeforeUpload).to.equal(0);

      await journal.uploadOutput('path', 1, 'type', 'name', "sdjakdfhsdfx102-293");

      const countAfterUpload = await journal.fileCount();

      expect(countAfterUpload).to.equal(1);
    });
  });
});
