// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ContractVoting {
    string[] public candidates;
    mapping(string => uint256) public voteCounts;

    event CandidateAdded(string name);
    event Voted(address voter, string candidate);

    constructor(string[] memory initialCandidates) {
        for (uint256 i = 0; i < initialCandidates.length; i++) {
            addCandidate(initialCandidates[i]);
        }
    }

    function voting(string memory candidateName) external {
        require(isCandidate(candidateName), "Candidate not found");
        voteCounts[candidateName]++;
        emit Voted(msg.sender, candidateName);
    }

    function getCandidates() external view returns (string[] memory) {
        return candidates;
    }

    function getVoteCount(string memory candidateName) external view returns (uint256) {
        require(isCandidate(candidateName), "Candidate not found");
        return voteCounts[candidateName];
    }

    function addNewCandidate(string memory newCandidate) external {
        addCandidate(newCandidate);
    }

    function addCandidate(string memory candidateName) private {
        require(!isCandidate(candidateName), "Candidate already exists");
        candidates.push(candidateName);
        emit CandidateAdded(candidateName);
    }

    function isCandidate(string memory candidateName) public view returns (bool) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i])) == keccak256(abi.encodePacked(candidateName))) {
                return true;
            }
        }
        return false;
    }
}