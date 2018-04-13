import React, { Component } from 'react';

import Cookies from '/frontend/universal-cookie';
import Login from './pages/login';
import Main from './pages/main';

const cookies = new Cookies();
class App extends Component {
    componentDidMount() {
        if(window.location.pathname !== '/login' && cookies.get('isAuthen') !== 'true') {
            window.location.assign('login');
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100vh' }}>
                {window.location.pathname === '/login' && <Login />}
                {window.location.pathname === '/main' && <Main />}

            </div>
        );
    }
}

export default App;
