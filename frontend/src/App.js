import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import Login from './pages/login';
import Main from './pages/main';

const cookies = new Cookies();
class App extends Component {

    constructor(props) {
        super(props);
        this.changeUid = this.changeUid.bind(this);
        this.changeGid = this.changeGid.bind(this);
    }

    state = {
        uid : -1, 
        gid : -1 
    }
    changeUid(uid){
        this.setState(uid);
    }
    changeGid(gid){
        this.setState(gid);
    }

    componentDidMount() {
        if(window.location.pathname !== '/login' && cookies.get('isAuthen') !== 'true') {
            window.location.assign('login');
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100vh' }}>
                {window.location.pathname === '/login' && <Login changeUid = { this.changeUid } />}
                {window.location.pathname === '/main' && <Main uid = {this.state.uid} gid = {this.state.uid} changeGid = {this.changeGid}/>}

            </div>
        );
    }
}

export default App;
