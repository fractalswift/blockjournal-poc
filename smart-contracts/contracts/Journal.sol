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
    mapping(uint256 => Output) public outputs;

    struct Output {
        // We only need path and hash to validate - all other meta data should be contained within the file
        uint256 outputIdNumber;
        string outputPath;
        string outputHash;
        address payable uploader;
    }

    event OutputUploaded(
        uint256 outputIdNumber,
        string outputPath,
        string outputHash,
        address payable uploader
    );

    // we upload the output details
    // to the smart contract outputs
    // mapping in order to persist
    // the information.
    function uploadOutput(string memory _outputPath, string memory _outputHash)
        public
    {
        // TODO probably some requirement for output hash
        require(bytes(_outputPath).length > 0);
        require(bytes(_outputHash).length > 0);
        require(msg.sender != address(0));

        outputCount++;

        outputs[outputCount] = Output(
            outputCount,
            _outputPath,
            _outputHash,
            payable(msg.sender)
        );

        // From the frontend application
        // we can listen the events emitted from
        // the smart contract in order to update the UI.
        emit OutputUploaded(
            outputCount,
            _outputPath,
            _outputHash,
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
            address payable
        )
    {
        Output memory output = outputs[_outputNumber];
        return (
            output.outputIdNumber,
            output.outputPath,
            output.outputHash,
            output.uploader
        );
    }

    // function deleteOutput

    // function editOutput

    // function addNewOutputVersion
}
