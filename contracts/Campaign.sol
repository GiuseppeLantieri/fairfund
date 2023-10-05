// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Nft.sol";
import "./RegistryDonators.sol";

contract Campaign {
    uint public unlockTime;
    address payable public owner;
    address payable public admin;
    address payable public receiver;
    address public nft;
    RegistryDonators public registryDonators;

    uint public budget;
    string public name;
    string public description;
    string public symbol;

    bool public isPaused;

    event Withdrawal(uint amount, uint when);
    event ChangeState(bool state, uint when);

    constructor(
        uint _unlockTime,
        address _admin,
        address _receiver,
        string memory _name,
        string memory _description,
        uint _budget,
        string memory _symbol
    ) {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
        admin = payable(_admin);
        receiver = payable(_receiver);
        name = _name;
        symbol = _symbol;
        description = _description;
        budget = _budget;
        registryDonators = new RegistryDonators(address(this));
    }

    function withdraw(string[] memory uris) public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(!isPaused, "The Admin paused this campaign");
        require(msg.sender == receiver, "You aren't the receiver");

        emit Withdrawal(address(this).balance, block.timestamp);

        _createNftForDonators(uris);
        receiver.transfer(address(this).balance);
    }

    function sendFund() public payable {
        address sender = msg.sender;
        uint amount = msg.value;

        registryDonators.addDonators(sender, amount);
    }

    function _createNftForDonators(string[] memory uris) private {
        Nft token = new Nft(name, symbol);
        nft = address(token);

        for (uint i = 0; i < registryDonators.getDonatorsLength(); i++) {
            token.safeMint(registryDonators.getDonators()[i], uris[i]);
        }
    }

    function setPause(bool state) public {
        require(msg.sender == admin, "Only the admin can pause the campaign");
        isPaused = state;
        emit ChangeState(state, block.timestamp);
    }
}
