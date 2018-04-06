import React, { Component , Button } from "react";
import axios from 'axios';

export default class Login extends Component {

	loadBalancerAddress = 'http://127.0.0.1:3000';

	constructor(props) {
		super(props);

		this.state = {
			username : ""
		};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleChange(event) {
		this.setState({username: event.target.value});
	}

	handleSubmit(event) {
		axios.post(this.loadBalancerAddress,{name: this.state.username})
    	.then(function (response) {
      		console.log(response);
    	})
    	.catch(function (err) {
      		console.error(err);
    	});
		alert(this.state.username);	
		event.preventDefault();

	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Username
					<input type="text" value={this.state.username} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Login" />
			</form>
		);
	}
}