// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Donation {
    address public doner;

    constructor() {
        doner = msg.sender;
    }

    modifier onlyDoner() {
        require(msg.sender == doner, "Only doner can run this function");
        _;
    }

    modifier minimumAmount() {
        require(msg.value >= 0.01 ether, "Can not be less than 0.01 Matic");
        _;
    }

    function deposit(address accepter) onlyDoner minimumAmount public payable {
        payable(accepter).transfer(msg.value);
    }

}