 import React, { Component } from 'react';
import './App.css';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      buffer: null,
      fileHash: 'QmUEeRYpH4uUBQCSi5r7emM3L139mr3DqbhQ6pDz5PHMKB'
    };

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
    for await (const r of ipfs.addAll(this.state.buffer)) {
      console.log(r)
    }
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
