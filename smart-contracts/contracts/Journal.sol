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

    mapping(address => uint256[]) public outputIdsByUploaderAddress;

    mapping(address => uint256[]) public outputIdsByReviewerAddress;

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
        bool _isPublished,
        address[] memory _reviewers
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

        outputIdsByUploaderAddress[msg.sender].push(outputCount);

        batchAddReviewers(_reviewers, outputCount);

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
        require(output.isPublished == true, 'Output is not published');
        return (
            output.outputIdNumber,
            output.outputPath,
            output.outputHash,
            output.isPublished,
            output.uploader
        );
    }

    function getOutputIdsByUploaderAddress(address _uploaderAddress)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory outputIds = outputIdsByUploaderAddress[
            _uploaderAddress
        ];

        return outputIds;
    }

    function getOutputIdsByReviewerAddress(address _reviewerAddress)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory outputIds = outputIdsByReviewerAddress[
            _reviewerAddress
        ];

        return outputIds;
    }

    function batchAddReviewers(address[] memory _reviewers, uint256 _outputId)
        internal
    {
        for (uint256 i = 0; i < _reviewers.length; i++) {
            outputIdsByReviewerAddress[_reviewers[i]].push(_outputId);
        }
    }

    // function deleteOutput

    // function editOutput

    // function addNewOutputVersion
}
