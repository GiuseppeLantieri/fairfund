// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Registry.sol";
import "./Campain.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {
    Registry public registry;

    constructor() {
        registry = new Registry(address(this));
    }

    function createCampain(
        uint _unlockTime,
        uint _budget,
        address _receiver,
        string memory _name,
        string memory _description
    ) public {
        Campain campain = new Campain(
            _unlockTime,
            address(this),
            _receiver,
            _name,
            _description,
            _budget,
            "FFT"
        );

        registry.addCampain(address(campain));
    }

    function changeStateCampain(address campain, bool state) public onlyOwner {
        Campain(campain).setPause(state);
    }
}
