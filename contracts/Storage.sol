
//SPDX-Licence-Identifier: MIT
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Storage {
 string  ipfsHash;

  function set(string memory x) public {
    ipfsHash = x;
  }

  function get() public view returns (string memory) {
    return ipfsHash;
  }
}