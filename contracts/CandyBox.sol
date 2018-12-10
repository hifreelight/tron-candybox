pragma solidity ^0.4.23;

// ----------------------------------------------------------------------------
// Safe maths
// ----------------------------------------------------------------------------
library SafeMath {
    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}


// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
// ----------------------------------------------------------------------------
contract TRC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}


// ----------------------------------------------------------------------------
// Owned contract
// ----------------------------------------------------------------------------
contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}

contract CandyBox is Owned{
    TRC20Interface public token;
    bool isPause;
    // Number of candy
    uint totalCandy;
    // Maximum number of users available.
    uint maxReceiveNumber;
    // user has receive numbers
    mapping(address => uint) receiveNumbers;
    // user last receive time
    mapping(address => uint) receiveLastTime;

    // candys
    mapping(uint => Candy) candays;
    // candy has been receive amount
    mapping(uint => uint256) candyHasReceived;
    // The user can receive total token of the candy  
    mapping(uint => uint256) candyTotal;
    // The order of the candy token, the numbers are big on the top
    mapping(uint => uint8) candyOrder;
    // Number of times each time
    mapping(uint => uint256) candyOnce;
    // Has it been deleted? 1 is deleted
    mapping(uint => uint8) candyIsDeleted;

    mapping(uint => string) candyImageUrl;
    mapping(uint => string) candyBgUrl;
    mapping(uint => string) candyTitle;
    mapping(uint => string) candyIntroduction;
    mapping(uint => string) candyLink;

    constructor() public {
        totalCandy = 1;
        maxReceiveNumber = 2;
        isPause = true;
    }

    struct Candy {
        address addr;
        string name;
    }
    function setToken(address t) public {
        token = TRC20Interface(t);
    }

    function setPause(bool pause) public onlyOwner {
        isPause = pause;
    }
    function tokenTransfer(address _to, uint _amt) public onlyOwner {
        token.transfer(_to,_amt);
    }

    function addCandy(
        address addr,
        string memory name,
        uint256 total,
        uint256 once,
        string memory imageUrl,
        string memory bgUrl,
        string memory title,
        string memory introduction,
        string memory link,
        uint8 order
    ) 
    public 
    onlyOwner
    {
        candays[totalCandy] = Candy(addr, name);
        candyTotal[totalCandy] = total;
        candyOnce[totalCandy] = once;
        candyOrder[totalCandy] = order;

        candyImageUrl[totalCandy] = imageUrl;
        candyBgUrl[totalCandy] = bgUrl;
        candyTitle[totalCandy] = title;
        candyIntroduction[totalCandy] = introduction;
        candyLink[totalCandy] = link;

        totalCandy += 1;
    }

    function editCandy(
        uint id,
        address addr,
        string memory name,
        uint256 total,
        uint256 once,
        string memory imageUrl,
        string memory bgUrl,
        string memory title,
        string memory introduction,
        string memory link,
        uint8 order
    ) 
    public 
    onlyOwner
    {
        candays[id] = Candy(addr, name);
        candyTotal[totalCandy] = total;
        candyOnce[totalCandy] = once;
        candyOrder[totalCandy] = order;

        candyImageUrl[totalCandy] = imageUrl;
        candyBgUrl[totalCandy] = bgUrl;
        candyTitle[totalCandy] = title;
        candyIntroduction[totalCandy] = introduction;
        candyLink[totalCandy] = link;

    }

    function delCandy(uint id) public onlyOwner {
        candyIsDeleted[id] = 1;
    }

    function editCandy(uint id, string memory name, string memory introduction, uint256 once) public onlyOwner() {
        candays[id].name = name;
        candyIntroduction[id] = introduction;
        candyOnce[id] = once;
    }
    function editPubCandy(uint id, uint8 order, uint8 isDeleted) public onlyOwner() {
        candyOrder[id] = order;
        candyIsDeleted[id] = isDeleted;
    }
    function getCandy(uint id)
        public 
        view 
        returns (
            address,
            string memory,
            uint256,
            uint,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint8,
            uint8
        ) {
        return (
            candays[id].addr,
            candays[id].name,
            candyTotal[id],
            candyOnce[id],
            candyImageUrl[id],
            candyBgUrl[id],
            candyTitle[id],
            candyIntroduction[id],
            candyLink[id],
            candyIsDeleted[id],
            candyOrder[id]
        );
    }
    function receive(uint id) public {
        require(isPause, 'Have pause');
        require(receiveNumbers[msg.sender] < 2, 'Have already received twice');
        require(candyTotal[id]- candyHasReceived[id] - candyOnce[id] >= 0, 'Candy super hair');
        Candy memory candy = candays[id];
        receiveNumbers[msg.sender] += 1;
        receiveLastTime[msg.sender] = now;
        TRC20Interface t = TRC20Interface(candy.addr);
        t.transfer(msg.sender, candyOnce[id]);
    }
}