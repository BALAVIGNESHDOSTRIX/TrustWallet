//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract TrustWallet{

    mapping(address => uint) public BankRegistry;


    function DepositAmount(uint _amount) public{
        BankRegistry[msg.sender] = BankRegistry[msg.sender] + _amount;
        console.log("Amount '%s' Desposited", _amount);
    }

    function WithdrawAmount(uint _amount) public{
        BankRegistry[msg.sender] = BankRegistry[msg.sender] - _amount;
        console.log("Amount '%s' Debited", _amount);
    }

    function ShowAccountBalance(address addr) public view returns (uint){
        return BankRegistry[addr];
    }

}
