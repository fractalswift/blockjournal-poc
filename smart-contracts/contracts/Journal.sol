// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import 'hardhat/console.sol';

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
        address[] reviewers;
    }

    event OutputUploaded(
        uint256 outputIdNumber,
        string outputPath,
        string outputHash,
        bool isPublished,
        address payable uploader
    );

    // WRITE

    function uploadOutput(
        string memory _outputPath,
        string memory _outputHash,
        bool _isPublished,
        address[] memory _reviewers
    ) public {
        // TODO probably some requirement or default for isPublished
        require(bytes(_outputPath).length > 0);
        require(bytes(_outputHash).length > 0);
        require(msg.sender != address(0));

        outputCount++;

        outputsByIdNumber[outputCount] = Output(
            outputCount,
            _outputPath,
            _outputHash,
            _isPublished,
            payable(msg.sender),
            _reviewers
        );

        outputIdsByUploaderAddress[msg.sender].push(outputCount);

        batchAddToReviewersMapping(_reviewers, outputCount);

        // TODO - listen for this in frontend
        emit OutputUploaded(
            outputCount,
            _outputPath,
            _outputHash,
            _isPublished,
            payable(msg.sender)
        );
    }

    // READ

    function getOutputByFileNumber(uint256 _outputNumber)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            bool,
            address payable,
            address[] memory
        )
    {
        Output memory output = outputsByIdNumber[_outputNumber];
        // TODO find a way to not return unpublished outputs, but without throwing an error

        return (
            output.outputIdNumber,
            output.outputPath,
            output.outputHash,
            output.isPublished,
            output.uploader,
            output.reviewers
        );
    }

    // TODO find a way to not return unpublished outputs, but without throwing an error

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

    // UTILS

    function batchAddToReviewersMapping(
        address[] memory _reviewers,
        uint256 _outputId
    ) internal {
        for (uint256 i = 0; i < _reviewers.length; i++) {
            outputIdsByReviewerAddress[_reviewers[i]].push(_outputId);
        }
    }

    function isReviewer(address _callerAddress, uint256 _outputId)
        public
        view
        returns (bool)
    {
        uint256[] memory outputIds = outputIdsByReviewerAddress[_callerAddress];

        for (uint256 i = 0; i < outputIds.length; i++) {
            if (outputIds[i] == _outputId) {
                return true;
            }
        }

        return false;
    }

    function setIsPublished(uint256 _outputId, bool _isPublished) public {
        require(
            address(outputsByIdNumber[_outputId].uploader) ==
                address(msg.sender),
            'Only the uploader can publish the output'
        );

        outputsByIdNumber[_outputId].isPublished = _isPublished;
    }

    function updateOutput(
        uint256 _outputId,
        string memory _outputPath,
        string memory _outputHash,
        bool _isPublished
    ) public {
        require(
            address(outputsByIdNumber[_outputId].uploader) ==
                address(msg.sender),
            'Only the uploader can update the output'
        );

        outputsByIdNumber[_outputId].outputPath = _outputPath;
        outputsByIdNumber[_outputId].outputHash = _outputHash;
        outputsByIdNumber[_outputId].isPublished = _isPublished;
    }

    function getReviewers(uint256 _outputId)
        public
        view
        returns (address[] memory)
    {
        return outputsByIdNumber[_outputId].reviewers;
    }

    // function deleteOutput

    // function editOutput

    // function addNewOutputVersion
}
