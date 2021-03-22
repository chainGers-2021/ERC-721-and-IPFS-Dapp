pragma solidity ^0.6.5;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract File is ERC721 {

	string fileHash;
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;
 	mapping(string => uint8) hashes;

 	//Declaring an event to iterate over the keys of hashes to get IPFS Hash
 	event records(string , uint8);

	constructor() ERC721("GoodSamaritan", "GS") public { }

	function set(string memory _fileHash) public{
		fileHash = _fileHash; //You may need to change this. As it would be better for the clent to directly read the hash from emitted events 
		require(hashes[_fileHash] != 1);  
		hashes[_fileHash] = 1;
	}

	function get() public view returns (string memory){
		return fileHash; //You may need to change this 
	}

	function awardItem (address recipient, string memory hash, string memory metadata)
 	public returns (uint256){  
 		set(hash);		//hashes[hash] = 1;  
 		_tokenIds.increment();
 		emit records(hash, hashes[hash]);  
 		uint256 newItemId = _tokenIds.current();  
 		_mint(recipient, newItemId);  
 		_setTokenURI(newItemId, metadata);  
 		return newItemId;
	}

}