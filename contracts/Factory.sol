// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Registry.sol";
import "./Campain.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {
    IRegistry public registry;

    constructor() {}

    function createCampain(
        uint _unlockTime,
        address _receiver,
        string memory _name,
        string memory _symbol
    ) public {
        Campain campain = new Campain(
            _unlockTime,
            address(this),
            _receiver,
            _name,
            _symbol
        );
        if (address(registry) != address(0))
            registry.addCampain(address(campain));
    }

    function changeStateCampain(address campain, bool state) public onlyOwner {
        Campain(campain).setPause(state);
    }

    function setRegistry(address newRegistry) public onlyOwner {
        registry = IRegistry(newRegistry);
    }
}
