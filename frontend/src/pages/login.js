import './style.css';

import React, { Button, Component } from "react";

import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
export default class Login extends Component {

    loadBalancerAddress = 'http://127.0.0.1:3000';
    state = {
      username: ""
    };
  
    handleChange = (event) => {
      this.setState({ username: event.target.value });
    }
  
    handleSubmit = (event) => {
      // let that = this ; 
      // axios.post(this.loadBalancerAddress + '/auth', { name: this.state.username })
      //   .then(function (response) {
      //     console.log(response);
      //     this.props.changeUid(respose) ;
      //   })
      //   .catch(function (err) {
      //     console.error(err);
      //   });
      // alert(this.state.username);
      cookies.set('isAuthen', 'true', { path: '/', maxAge: 60*60*24 });
      cookies.set('username', this.state.username, { path: '/', maxAge: 60*60*24 });
      window.location.assign('main');
      // this.props.changeUid(9)
      event.preventDefault();
  
    }
  
    render() {
      return (
        <div style={{ top: 0, bottom: 0, right: 0, left: 0, margin: 'auto', marginTop: '10vh', width: '30%' }}>
          <div className="login">
           <div className="login-triangle" />
          
            <h2 className="login-header">Log in</h2>

            <form className="login-container">
              <p><input type="email" placeholder="Username" value={this.state.username} onChange={this.handleChange}/></p>
              <p><input type="submit" value="Log in" onClick={this.handleSubmit} /></p>
            </form>
          </div>
           {/*<input type="submit" value="Login" onClick={this.handleSubmit}/>*/}
        </div>
         
      );
    }
  }