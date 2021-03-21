pragma solidity 0.5.16;

contract File {
	string fileHash;

	function set(string memory _fileHash) public{
			fileHash = _fileHash;
	}

	function get() public view returns (string memory){
		return fileHash;
	}
}