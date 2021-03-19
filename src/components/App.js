 import React, { Component } from 'react';
import logo from '../logo.jpg';
import './App.css';

class App extends Component {
  captureFile = (event) => {
    event.preventDefault()
    console.log('file captured ...')

    const file = event.target.files[0]

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
                  <img src={logo} className="App-logo" alt="logo" />
                <p> &nbsp; </p>
                <h2> Change Picture </h2>
                <form>
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
