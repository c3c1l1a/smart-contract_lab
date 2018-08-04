contract Mortal {
  address owner;

  function Mortal(){owner = msg.sender;}

  function kill(){
    if (msg.sender == owner) {
      selfdestruct(owner);
    }
  }
}

contract Greeter is Mortal {
  string greeting;

  function Greeter(string _greeting) public {
    greeting = _greeting;
  }

  function greet() constant returns (string) {
    return greeting;
  }

}
