import React, { Component, Button } from "react";
import axios from 'axios';

export default class Login extends Component {

    loadBalancerAddress = 'http://127.0.0.1:3000';
  
    constructor(props) {
      super(props);
  
      this.state = {
        username: ""
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  
    }
  
    handleChange(event) {
      this.setState({ username: event.target.value });
    }
  
    handleSubmit(event) {
      // let that = this ; 
      // axios.post(this.loadBalancerAddress + '/auth', { name: this.state.username })
      //   .then(function (response) {
      //     console.log(response);
      //     that.props.changePage("grouplist") ;
      //   })
      //   .catch(function (err) {
      //     console.error(err);
      //   });
      // alert(this.state.username);
      this.props.changePage("grouplist") ;
      this.props.changeUid(9)
      event.preventDefault();
  
    }
  
    render() {
      return (
        <div >
          <label>
            Username
                      <input type="text" value={this.state.username} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Login" onClick={this.handleSubmit}/>
        </div>
      );
    }
  }