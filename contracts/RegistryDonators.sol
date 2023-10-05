// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract RegistryDonators {
    address[] public donatorsList;
    mapping(address => uint) public donators;

    address public campaign;

    constructor(address _campaign) {
        campaign = _campaign;
    }

    function getDonators() public view returns (address[] memory) {
        return donatorsList;
    }

    function getDonatorsLength() public view returns (uint) {
        return donatorsList.length;
    }

    function addDonators(address sender, uint amount) external {
        require(msg.sender == campaign, "You are not my Campaign");

        donators[sender] = amount;
        donatorsList.push(sender);
    }
}
