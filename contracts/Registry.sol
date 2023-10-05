// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Registry {
    address[] public campainsList;
    address public factory;

    constructor(address _factory) {
        factory = _factory;
    }

    function getCampains() public view returns (address[] memory) {
        return campainsList;
    }

    function addCampain(address campain) public {
        require(msg.sender == factory, "You are not my factory");
        campainsList.push(campain);
    }
}
