pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import '@openzeppelin/contracts/access/Ownable.sol';

contract Event is ERC721 {
    address factory;
    address owner;

    constructor(string memory name, address creator) public ERC721(name, "TCK") {
        factory = msg.sender;
        owner = creator;
    }
}
