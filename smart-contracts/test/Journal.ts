import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Journal', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployJournalContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, account3] = await ethers.getSigners();

    const Journal = await ethers.getContractFactory('Journal');
    const journal = await Journal.deploy();

    return { owner, otherAccount, account3, journal };
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

      const countBeforeUpload = await journal.outputCount();

      expect(countBeforeUpload).to.equal(0);
    });

    it('Should increment to 1 file count after sucessful upload', async function () {
      const { owner, otherAccount, journal } = await loadFixture(
        deployJournalContract
      );

      const countBeforeUpload = await journal.outputCount();

      expect(countBeforeUpload).to.equal(0);

      await journal.uploadOutput('path', 'sdjakdfhsdfx102-293', true, []);

      const countAfterUpload = await journal.outputCount();

      expect(countAfterUpload).to.equal(1);
    });
  });

  describe('Reading and writing', function () {
    it('Should allow any address to get a published output by ID', async function () {
      const { owner, otherAccount, journal } = await loadFixture(
        deployJournalContract
      );

      await journal.uploadOutput(
        'fake-path-to-uploaded-output',
        'sdjakdfhsdfx102-293',
        true,
        []
      );

      const article = await journal.getOutputByFileNumber(1);

      expect(article).to.contain('fake-path-to-uploaded-output');
      expect(article).to.contain('sdjakdfhsdfx102-293');
      expect(article).to.contain(true);
    });

    it('Should allow any address to get a list of output IDs by uploader address', async function () {
      const { owner, otherAccount, journal } = await loadFixture(
        deployJournalContract
      );

      await journal
        .connect(otherAccount)
        .uploadOutput('fake-path-to-uploaded-output-1', 'sdsdsd-254', true, []);

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-uploaded-output-2',
          'sdjakfx102-293',
          true,
          []
        );

      const outputIds = await journal.getOutputIdsByUploaderAddress(
        otherAccount.address
      );

      expect(outputIds.length).to.equal(2);

      const [outputId0, outputId1] = outputIds;

      const output0 = await journal.getOutputByFileNumber(outputId0);

      const output1 = await journal.getOutputByFileNumber(outputId1);

      expect(output0).to.contain('fake-path-to-uploaded-output-1');
      expect(output0).to.contain('sdsdsd-254');
      expect(output0).to.contain(true);

      expect(output1).to.contain('fake-path-to-uploaded-output-2');
      expect(output1).to.contain('sdjakfx102-293');
      expect(output1).to.contain(true);
    });

    it('Does not allow public reading of output if isPublished flag is not set to true', async function () {
      const { owner, otherAccount, account3, journal } = await loadFixture(
        deployJournalContract
      );

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output',
          'sdjakfx102-293',
          false,
          []
        );

      await expect(
        journal.connect(account3).getOutputByFileNumber(1)
      ).to.be.revertedWith('Output is not published');
    });

    it('Should allow an uploader to read their own output even if the output is not published', async function () {
      const { owner, otherAccount, account3, journal } = await loadFixture(
        deployJournalContract
      );

      const reviewerAddress = account3.address;

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output',
          'sdjakfx102-293',
          false,
          [reviewerAddress]
        );

      const output = await journal
        .connect(otherAccount)
        .getOutputByFileNumber(1);

      expect(output).to.contain('fake-path-to-not-published-output');
    });
  });

  describe('Reviewers', function () {
    it('Should allow an user to upload an output with specified reviewers', async function () {
      const { owner, otherAccount, account3, journal } = await loadFixture(
        deployJournalContract
      );

      const reviewerAddress = account3.address;

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output',
          'sdjakfx102-293',
          true,
          [reviewerAddress]
        );

      const output = await journal.getOutputByFileNumber(1);

      const outputIds = await journal.getOutputIdsByReviewerAddress(
        reviewerAddress
      );

      expect(outputIds[0].toString()).to.contain('1');
    });

    it('Should allow a reviewer to read an output even if the output is not published', async function () {
      const { owner, otherAccount, account3, journal } = await loadFixture(
        deployJournalContract
      );

      const reviewer = account3;

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output',
          'sdjakfx102-293',
          false,
          [reviewer.address]
        );

      const output = await journal.connect(reviewer).getOutputByFileNumber(1);

      console.log({ output });

      expect(output).to.contain('fake-path-to-not-published-output');
    });

    it('Should allow a reviewer to be added to multiple outputs ', async function () {
      const { owner, otherAccount, account3, journal } = await loadFixture(
        deployJournalContract
      );

      const reviewer = account3;

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output-1',
          'sdjakfx102-293',
          false,
          [reviewer.address]
        );

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output-2',
          'sdjakfx102-293',
          false,
          [reviewer.address]
        );

      const outputIds = await journal
        .connect(reviewer)
        .getOutputIdsByReviewerAddress(reviewer.address);

      expect(outputIds.length).to.equal(2);
    });
  });

  describe('Editing', function () {
    it('Should allow the uploader to change status of isPublished after upload', async function () {
      const { owner, otherAccount, account3, journal } = await loadFixture(
        deployJournalContract
      );

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output',
          'sdjakfx102-293',
          false,
          []
        );

      const outputBeforeChange = await journal
        .connect(otherAccount)
        .getOutputByFileNumber(1);

      expect(outputBeforeChange).to.contain(false);

      await journal.connect(otherAccount).setIsPublished(1, true);

      const outputAfterChange = await journal
        .connect(otherAccount)
        .getOutputByFileNumber(1);

      expect(outputAfterChange).to.contain(true);
    });

    it('Does not allow an account who is not the uploader to change status of isPublished after upload', async function () {
      const { owner, otherAccount, account3, journal } = await loadFixture(
        deployJournalContract
      );

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output',
          'sdjakfx102-293',
          false,
          []
        );

      const outputBeforeChange = await journal
        .connect(otherAccount)
        .getOutputByFileNumber(1);

      expect(outputBeforeChange).to.contain(false);

      await expect(
        journal.connect(account3).setIsPublished(1, true)
      ).to.be.revertedWith('Only the uploader can publish the output');
    });

    it('Should allow the uploader to change the outputPath and outputHash after upload', async function () {
      const { owner, otherAccount, account3, journal } = await loadFixture(
        deployJournalContract
      );

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output',
          'sdjakfx102-293',
          false,
          []
        );

      const outputBeforeChange = await journal
        .connect(otherAccount)
        .getOutputByFileNumber(1);

      await journal
        .connect(otherAccount)
        .updateOutput(1, 'new-path', '0xNewHash0x', true);

      const outputAfterChange = await journal
        .connect(otherAccount)
        .getOutputByFileNumber(1);

      expect(outputAfterChange).to.contain('new-path');
      expect(outputAfterChange).to.contain('0xNewHash0x');
    });

    it('Does not allow an account who is not the uploader to edit any details after upload', async function () {
      const { owner, otherAccount, account3, journal } = await loadFixture(
        deployJournalContract
      );

      await journal
        .connect(otherAccount)
        .uploadOutput(
          'fake-path-to-not-published-output',
          'sdjakfx102-293',
          false,
          []
        );

      const outputBeforeChange = await journal
        .connect(otherAccount)
        .getOutputByFileNumber(1);

      await expect(
        journal
          .connect(account3)
          .updateOutput(1, 'new-path', '0xNewHash0x', true)
      ).to.be.revertedWith('Only the uploader can update the output');
    });
  });
});
