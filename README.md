# ERC-721 NFT and IPFS Dapp

#### This is a Dapp that uploads files on IPFS and mints its corresponding NFT of ERC-721 standard on Blockchain. 


## Quickstart
Run the following command to install npm dependencies
```bash
npm install
```  

Now run the Ganache-cli with the following command
```bash
ganache-cli
```
To sign the transactions, you will need to connect your Metamask wallet with Ganache-cli. From the accounts created by Ganache in the terminal, copy the private key of the first account, go to your metamask wallet, click on import new account and paste the private key. Your account will be successfully imported and you will have 100 Eth in your wallet!

Now deploy the project to your local blockchain using the following commands-
```bash
truffle compile
truffle migrate --reset
```

To start the React client run this command-
```bash
npm run start
``` 

## How to Mint your First NFT?
After you have succesfully run the above commands, you will be ready to mint your first NFT. Choose any file and click on Submit Query. If the file is visible in the React frontend then you have successfully minted your first NFT!

## How does it work?
When you upload your image to the application, the file gets uploaded to the IPFS via `ipfsClient` using the `ipfs.addAll()` method in `App.js`. You can read more about this [here](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md). The IPFS then returns an object containing the path to the file which is also referred to as IPFS hash. You can get your file from IPFS using the same hash. We have used Infura API here, so you will find the file at https://ipfs.infura.io/ipfs/$ (just replace the IPFS path with $ here).

In this Dapp, IPFS hash of NFT is set using the `set()` function that is called during the minting of NFT using `awardItem()` function in `File.sol`. After minting the NFT, the Frontend loads the image of the NFT from the Blockchain using the `get()` function in `File.sol`. You can check if its working correctly by refreshing the page after uploading the file. The image should still be there as it is getting loaded from the Blockchain directly.      

## References 
 - [Oppenzeppelin Docs for ERC-721](https://docs.openzeppelin.com/contracts/4.x/erc721) 
 - [Create Dynamic NFTs using Chainlink Oracles Blog](https://blog.chain.link/create-dynamic-nfts-using-chainlink-oracles)
 - [Deploy and Sell your Own NFT Blog](https://blog.chain.link/build-deploy-and-sell-your-own-dynamic-nft/)
 - [Dapp University Tutorial on IPFS](https://www.youtube.com/watch?v=pTZVoqBUjvI)
 
