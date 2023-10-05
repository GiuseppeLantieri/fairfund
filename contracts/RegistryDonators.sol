// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract RegistryDonators {
    address[] public donatorsList;
    mapping(address => uint) public donators;

    address public campain;

    constructor(address _campain) {
        campain = _campain;
    }

    function getDonators() public view returns (address[] memory) {
        return donatorsList;
    }

    function getDonatorsLength() public view returns (uint) {
        return donatorsList.length;
    }

    function addDonators(address sender, uint amount) external {
        require(msg.sender == campain, "You are not my Campain");

        donators[sender] = amount;
        donatorsList.push(sender);
    }
}
