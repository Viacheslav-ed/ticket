pragma solidity ^0.7.0;

//import '@openzeppelin/contracts/access/Ownable.sol';
import './Event.sol';

contract EventFactory {
    Event[] events;
    mapping(Event => string) eventsName;
    mapping(Event => uint256) eventsDate;
    address factoryOwner;

    event EventCreated();

    constructor(){
        factoryOwner = msg.sender;
    }

    function createEvent(string memory name, uint256 date) external{
        require(factoryOwner == msg.sender);
        Event newEvent = new Event(name, msg.sender);
        events.push(newEvent);
        eventsName[newEvent] = name;
        eventsDate[newEvent] = date;
        emit EventCreated();
    }

    function getEvents() external view returns(Event[] memory){
        return events;
    }

    function getEventData(Event eventAddr) external view returns(string memory name, uint256 date){
        return (eventsName[eventAddr], eventsDate[eventAddr]);
    }
}
