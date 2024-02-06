pragma solidity >=0.4.22 <0.9.0;

contract InheritanceContract {

    struct UserInfo {
        bool isAlive;
    }

    mapping(address => UserInfo) public users;
    string sign = "666666";
    uint256 private nextAllocID = 1;
    bool private  isInitial = false;
    uint256 private userNum = 0;
    uint256 private  nextIndex = 1;

    struct ac{
        address account;
        uint256 index;
    }
    ac[] public  acs;

    struct Binding {
        address addr1;
        address addr2;
        string relationship;
        bool isIgnored;
    }
    Binding[] public bindings;

    struct Inheritance {
        address addr1;
        address addr2;
        string data;
        uint256 AllocID;
    }
    Inheritance[] public inheritances;


    constructor() public {
        
    }

    function addAc(address _account, uint256 _index) public {
        acs.push(ac(_account, _index));
    }

    function getacAccount(uint256 i) public view returns (address _accout) {
        return acs[i].account;
    }

   function getacIndex(uint256 i) public view returns (uint256 index) {
        return acs[i].index;
    } 

    function getacCount() public view returns (uint256) {
        return acs.length;
    }

    function setUserInfo(address addr, bool _isAlive) public {
        users[addr].isAlive = _isAlive;
    }
    
    function getUserInfo(address addr) public view returns (bool) {
        return users[addr].isAlive;
    }

    function test() public view returns (string memory) {
        return sign;
    }


    function getBindingAddress_1(uint256 index) public view returns (address) {
        return bindings[index].addr1;
    }

    function getBindingAddress_2(uint256 index) public view returns (address) {
        return bindings[index].addr2;
    }

    function getBindingRelationship(uint256 index) public view returns (string memory) {
        return bindings[index].relationship;
    }

    function getBindingCount() public view returns (uint256) {
        return bindings.length;
    }

    function setBindingIgnored(uint256 index, bool _isIgnored) public {
        bindings[index].isIgnored = _isIgnored;
    }

    function getBindingIgnored(uint256 index) public view returns (bool) {
        return bindings[index].isIgnored;
    }


    function getInheritanceAddress_1(uint256 index) public view returns (address) {
        return inheritances[index].addr1;
    }

    function getInheritanceAddress_2(uint256 index) public view returns (address) {
        return inheritances[index].addr2;
    }

    function getInheritanceData(uint256 index) public view returns (string memory) {
        return inheritances[index].data;
    }

    function getInheritanceCount() public view returns (uint256) {
        return inheritances.length;
    }

    function getInheritanceID(uint256 index) public view returns (uint256) {
        return inheritances[index].AllocID;
    }

    function addBinding(address addr1, address addr2, string memory relationship) public {
        bool _isIgnored = false;
        bindings.push(Binding(addr1, addr2, relationship,_isIgnored));
    }

    function removeBinding(uint256 index) public {
        if (index < bindings.length - 1) {
            bindings[index] = bindings[bindings.length - 1];
        }
        bindings.pop();
    }

    function addInheritance(address addr1, address addr2, string memory data) public {
        inheritances.push(Inheritance(addr1, addr2, data, nextAllocID));
        nextAllocID++;
    }

    function removeInheritance(uint256 index) public {
        if (index < inheritances.length - 1) {
            inheritances[index] = inheritances[inheritances.length - 1];
        }
        inheritances.pop();
    }


    function get_initial() public view returns (bool) {
        return isInitial;
    }

    function set_initial(bool _isInitial) public {
        isInitial = _isInitial;
    }
}
