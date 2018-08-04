pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string initialMesssage) public{
        message = initialMesssage;
    }

    function setMessage(string newMessage) public {
        message =newMessage;
    }
}
