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


// ----------------------------------------------------------------------------
// Contract function to receive approval and execute function in one call
//
// Borrowed from MiniMeToken
// ----------------------------------------------------------------------------
contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes memory data) public;
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

contract CandyBox is ERC20Interface, Owned{
    ERC20Interface public token;
    uint totalCandy;
    uint maxReceiveNumber;
    mapping(uint => Candy) candays;
    mapping(address => uint) receiveNumbers;
    constructor() public {
        totalCandy = 0;
        maxReceiveNumber = 2;
    }

    struct Candy {
        address addr;
        bytes32 name;
        uint256 total;
        uint once;
        string imageUrl;
        string bgUrl;
        string title;
        string introduction;
        string link;
        bool status;
        uint8 order;
    }
    function setToken(address t) public {
        token = ERC20Interface(t);
    }

    function tokenTransfer(address _to, uint _amt) public onlyOwner {
        token.transfer(_to,_amt);
    }

    function addCandy(
        address addr,
        bytes32 name,
        uint256 total,
        uint once,
        string memory imageUrl,
        string memory bgUrl,
        string memory title,
        string memory introduction,
        string memory link,
        bool status,
        uint8 order
    ) 
    public 
    onlyOwner
    {
        candays[totalCandy] = Candy(addr, name, total, once, imageUrl, bgUrl, title, introduction, link, status, order);
        totalCandy += 1;
    }

    function editCandy(
        uint id,
        address addr,
        bytes32 name,
        uint256 total,
        uint once,
        string memory imageUrl,
        string memory bgUrl,
        string memory title,
        string memory introduction,
        string memory link,
        bool status,
        uint8 order
    ) 
    public 
    onlyOwner
    {
        candays[id] = Candy(addr, name, total, once, imageUrl, bgUrl, title, introduction, link, status, order);
    }

    function delCandy(uint id) public onlyOwner {
        delete candays[id];
    }

    function editCandy(uint id, bytes32 name, string memory introduction, uint once) public onlyOwner() {
        candays[id].name = name;
        candays[id].introduction = introduction;
        candays[id].once = once;
    }
    function editPubCandy(uint id, uint8 order, bool status) public onlyOwner() {
        candays[id].order = order;
        candays[id].status = status;
    }
    function getCandy(uint id) 
        public 
        view 
        returns (
            address,
            bytes32,
            uint256,
            uint,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            bool,
            uint8
        ) {
        return (
            candays[id].addr,
            candays[id].name,
            candays[id].total,
            candays[id].once,
            candays[id].imageUrl,
            candays[id].bgUrl,
            candays[id].title,
            candays[id].introduction,
            candays[id].link,
            candays[id].status,
            candays[id].order
        );
    }
    function receive(uint id) public {
        require(receiveNumbers[msg.sender] < 2, 'Have already received twice');
        receiveNumbers[msg.sender] += 1;
        Candy memory candy = candays[id];
        setToken(candy.addr);
        token.transfer(msg.sender, candy.once);
    }
}