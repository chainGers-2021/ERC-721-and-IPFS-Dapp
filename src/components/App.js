import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import File from '../abis/File.json'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //Get the account
  //Get the network
  //Get Smart Contract
  //Get File Hash

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId() //Network ID is 42 for Kovan
    const networkData = File.networks[networkId] //notice that File is actually File.json 
    if(networkData){
      const abi = File.abi
      const address = networkData.address

      //Fetch Contract
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const fileHash = await contract.methods.get().call()
      this.setState({ fileHash })
      //console.log(contract)
    }
    else {
      window.alert('Smart Contract not deployed to detected network')
    }
    //console.log(networkId)

  }

  constructor(props){
    super(props);
    this.state = {
      account: '',
      buffer: null,
      contract: null,
      fileHash: 'QmUEeRYpH4uUBQCSi5r7emM3L139mr3DqbhQ6pDz5PHMKB'
    };

  }

//Connecting to Metamask Wallet
  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)

    } else{
      window.alert('Please use Metamask!')
    }
  }


  captureFile = (event) => {
    event.preventDefault()
    console.log('file captured ...')

    const file = event.target.files[0]
    console.log('File is ',file)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      console.log('buffer', Buffer(reader.result))
      this.setState({'buffer': Buffer(reader.result)})
    }

  }

  onSubmit = async(event) => {
    event.preventDefault()
    console.log('Submitting the file...')
    //const result = await ipfs.add(this.state.buffer)
    //console.log(result)
    //Adding file to IPFS and setting the IPFS hash returned
    var _fileHash
    for await (const r of ipfs.addAll(this.state.buffer)) {
      console.log(r)
      const fileHash = r['path']
      _fileHash = fileHash
    }
      //console.log(fileHash)
      //Calling set method 
    this.state.contract.methods.awardItem('0x6a2654843d31B18F142855242BE3bf2e44FD518a', _fileHash, "Yippee!").send({from : this.state.account}).then((r) => {  
        this.setState({ fileHash: _fileHash })
    })
  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            
          
        </nav>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                  <img src= { `https://ipfs.infura.io/ipfs/${this.state.fileHash}` } />
                  <p> &nbsp; </p>
                <h2> Change Picture </h2>
                <form onSubmit = {this.onSubmit}>
                  <input type = 'file' onChange = {this.captureFile} />
                  <input type = 'submit' />
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
