pragma solidity ^0.4.23;

contract token { 
    function transfer(address receiver, uint amount) public { 
        receiver; 
        amount; 
    } 
} //transfer方法的接口说明
contract TokenTransfer{
    token public wowToken;
    
    constructor(address addr) public {
       wowToken = token(addr); //实例化一个token
    }

    function setToken(address t) public {
        wowToken = token(t);
    }

    function tokenTransfer(address _to, uint _amt) public {
        wowToken.transfer(_to,_amt); //调用token的transfer方法
    }
}