// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Nft.sol";
import "./RegistryDonators.sol";

contract Campain {
    uint public unlockTime;
    address payable public owner;
    address payable public admin;
    address payable public receiver;
    address public nftAddress;
    RegistryDonators public registryDonators;

    string public name;
    string public symbol;

    bool public isPaused;

    event Withdrawal(uint amount, uint when);
    event ChangeState(bool state, uint when);

    constructor(
        uint _unlockTime,
        address _admin,
        address _receiver,
        string memory _name,
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
        registryDonators = new RegistryDonators(address(this));
    }

    function withdraw(string[] memory uris) public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(isPaused, "The Admin paused this campain");
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
        nftAddress = address(token);

        for (uint i = 0; i < registryDonators.getDonatorsLength(); i++) {
            token.safeMint(registryDonators.getDonators()[i], uris[i]);
        }
    }

    function setPause(bool state) public {
        require(msg.sender == admin, "Only the admin can pause the campain");
        isPaused = state;
        emit ChangeState(state, block.timestamp);
    }
}
