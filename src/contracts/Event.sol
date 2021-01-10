pragma solidity >=0.5.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Event is ERC721 {
    string name;
    address creator;

    constructor() public ERC721("Event Ticket", "ETCK") {}

    function
}
