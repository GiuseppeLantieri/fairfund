// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Registry {
    address[] public campaignsList;
    address public factory;

    constructor(address _factory) {
        factory = _factory;
    }

    function getCampaigns() public view returns (address[] memory) {
        return campaignsList;
    }

    function addCampaign(address campaign) public {
        require(msg.sender == factory, "You are not my factory");
        campaignsList.push(campaign);
    }
}
