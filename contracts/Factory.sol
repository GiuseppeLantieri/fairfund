// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Registry.sol";
import "./Campaign.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {
    Registry public registry;

    constructor() {
        registry = new Registry(address(this));
    }

    function createCampaign(
        uint _unlockTime,
        uint _budget,
        address _receiver,
        string memory _name,
        string memory _image,
        string memory _company,
        string memory _location,
        string memory _postal,
        string memory _description
    ) public {
        Campaign campaign = new Campaign(
            _unlockTime,
            address(this),
            _receiver,
            _name,
            _description,
            _image,
            _budget,
            _company,
            _location,
            _postal,
            "FFT"
        );

        registry.addCampaign(address(campaign));
    }

    function changeStateCampaign(
        address campaign,
        bool state
    ) public onlyOwner {
        Campaign(campaign).setPause(state);
    }
}
