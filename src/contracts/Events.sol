pragma solidity >=0.5.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Events is ERC721 {
    struct Event {
        string name;
        address creator;
        uint numTickets;
        mapping (uint => uint) Tickets;
    }

    uint numEvent;
    mapping (uint => Event) private events;

    address private owner;

    mapping (address => bool) private creators;

    constructor() public ERC721("Event Ticket", "ETCK") {
        owner = msg.sender;
        creators[msg.sender] = true;
        numEvent = 0;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }

    function addEvent(string memory _eventName) public {
        require(creators[msg.sender]);
        Event storage e = events[numEvent];
        e.name = _eventName;
        e.creator = msg.sender;
        e.numTickets = 0;
        numEvent++;
    }

    function addCreator(address creator) public {
        require(msg.sender == owner);
        creators[creator] = true;
    }

    function deleteCreator(address creator) public {
        require(msg.sender == owner);
        require(creators[creator]);
        creators[creator] = false;
    }

    function getEventsData() public view returns (uint eventsCount) {
        return numEvent;
    }

    function getEventAtId(uint id) public view returns (string memory eventName, address eventCreator, uint ticketsCount) {
        return (
            events[id].name,
            events[id].creator,
            events[id].numTickets
        );
    }
}
