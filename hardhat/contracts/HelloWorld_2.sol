//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract HelloWorld {
  string private message = "Hello World!";

  function getMessage() external view returns (string memory) {
    return message;
  }

  function setMessage(string calldata newMessage) external {
    message = newMessage;
  }
}