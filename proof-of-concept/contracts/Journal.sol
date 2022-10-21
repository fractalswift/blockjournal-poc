// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Journal {
    string public name = 'Blockchain Journal';
    uint256 public fileCount = 0;

    // TODO - delete, for testing only
    function incrementFileCountForTesting() public {
        fileCount++;
    }

    // TODO - delete, for testing only
    function decrementFileCountForTesting() public {
        fileCount--;
    }

    // this mapping behaves as a "catalog"
    // of files uploaded to the storage, we declare
    // it as public in order to access it directly from the Frontend
    mapping(uint256 => Output) public files;

    struct Output {
        uint256 fileId;
        string filePath;
        uint256 fileSize;
        string fileType;
        string fileName;
        string fileHash;
        address payable uploader;
    }

    event OutputUploaded(
        uint256 fileId,
        string filePath,
        uint256 fileSize,
        string fileType,
        string fileName,
        address payable uploader
    );

    // we upload the file metadata
    // to the smart contract files
    // mapping in order to persist
    // the information.
    function uploadOutput(
        string memory _filePath,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileHash
    ) public {
        require(bytes(_filePath).length > 0);
        require(bytes(_fileType).length > 0);
        require(bytes(_fileName).length > 0);
        require(msg.sender != address(0));
        require(_fileSize > 0);

        // since solidity mappings
        // do not have a lenght attribute
        // the simplest way to control the amount
        // of files is using a counter
        fileCount++;

        files[fileCount] = Output(
            fileCount,
            _filePath,
            _fileSize,
            _fileType,
            _fileName,
            _fileHash,
            payable(msg.sender)
        );

        // From the frontend application
        // we can listen the events emitted from
        // the smart contract in order to update the UI.
        emit OutputUploaded(
            fileCount,
            _filePath,
            _fileSize,
            _fileType,
            _fileName,
            payable(msg.sender)
        );
    }

    // function editOutput

    // function addNewOutputVersion
}
