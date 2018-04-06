import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  loadBalancerAddress = 'http://127.0.0.1:3000';

  state = {
    users: []
  };

  constructor(props) {
    super(props);

    let that = this;

    axios.get(this.loadBalancerAddress)
    .then(function (response) {
      console.log(response);
      that.setState({
        users: response.data
      })
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {JSON.stringify(this.state.users)}
        </p>
      </div>
    );
  }
}

export default App;
