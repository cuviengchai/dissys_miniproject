import React, { Component, Button } from "react";
import Login from './pages/login';

export default class App extends Component {

    state = {
        page: 'login'
    };

    render = () => (
        <div>
        {this.state.page === 'login' && <Login />}
        </div>
    );
}