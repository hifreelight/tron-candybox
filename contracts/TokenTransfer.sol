pragma solidity ^0.4.23;

contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract TokenTransfer{
    ERC20Interface public token;
    
    constructor(address addr) public {
       token = ERC20Interface(addr); //实例化一个token
    }

    function setToken(address t) public {
        token = ERC20Interface(t);
    }

    function transfer(address _to, uint _amt) public returns (bool success){
        return token.transfer(_to,_amt);
    }
    function transferFrom(address _from, address _to, uint _amt) public returns (bool success){
        return token.transferFrom(_from, _to, _amt);
    }

    function allowance(address tokenOwner, address spender) public view returns (uint remaining){
        return token.allowance(tokenOwner, spender);
    }
}