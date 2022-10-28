// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Journal {
    // TODO make constuctor
    string public name = 'Blockchain Journal';
    uint256 public outputCount = 0;

    // this mapping behaves as a "catalog"
    // of outputs uploaded to the storage, we declare
    // it as public in order to access it directly from the Frontend
    mapping(uint256 => Output) public outputsByIdNumber;

    struct Output {
        // We only need path and hash to validate - all other meta data should be contained within the file
        uint256 outputIdNumber;
        string outputPath;
        string outputHash;
        bool isPublished;
        address payable uploader;
    }

    event OutputUploaded(
        uint256 outputIdNumber,
        string outputPath,
        string outputHash,
        bool isPublished,
        address payable uploader
    );

    // we upload the output details
    // to the smart contract outputs
    // mapping in order to persist
    // the information.
    function uploadOutput(
        string memory _outputPath,
        string memory _outputHash,
        bool _isPublished
    ) public {
        // TODO probably some requirement for isPublished
        require(bytes(_outputPath).length > 0);
        require(bytes(_outputHash).length > 0);
        require(msg.sender != address(0));

        outputCount++;

        outputsByIdNumber[outputCount] = Output(
            outputCount,
            _outputPath,
            _outputHash,
            _isPublished,
            payable(msg.sender)
        );

        // From the frontend application
        // we can listen the events emitted from
        // the smart contract in order to update the UI.
        emit OutputUploaded(
            outputCount,
            _outputPath,
            _outputHash,
            _isPublished,
            payable(msg.sender)
        );
    }

    function getOutputByFileNumber(uint256 _outputNumber)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            bool,
            address payable
        )
    {
        Output memory output = outputsByIdNumber[_outputNumber];
        return (
            output.outputIdNumber,
            output.outputPath,
            output.outputHash,
            output.isPublished,
            output.uploader
        );
    }

    // function deleteOutput

    // function editOutput

    // function addNewOutputVersion
}
