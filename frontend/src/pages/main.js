import './styleMain.css';

import React, { Component } from 'react';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
class Main extends Component {
    onLogOutClick = () => {
        cookies.remove('isAuthen');
        cookies.remove('username');
        window.location.assign('');
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100vh' }}>
                <div className="wrapper">
                    <nav className="nav" id="nav">
                        <div className="default-nav">
                            <div className="main-nav">
                                <div className="main-nav-item"><a className="main-nav-item-link" href="#">Hi {cookies.get('username')}</a></div>
                                <div className="options"></div>
                            </div>
                        </div>
                    </nav>
                    <div className="inner" id="inner">
                        <div className="content" id="content">

                            <div className="message-wrapper me">
                                asdasdsadsad
                            </div>
                        </div>
                    </div>
                    <div className="bottom" id="bottom">
                        <textarea className="input" id="input"></textarea>
                        <div className="send" id="send"></div>
                    </div>
                </div>
                <div style={{ top: 0, right: 0, margin: 'auto' }}>
                    <button style={{ width: '120px', height: '60px', backgroundColor: '#28d', borderColor: '#28d', fontSize: 32 }}onClick={this.onLogOutClick}>log out</button>
                </div>
            </div>
        );
    }
}

export default Main;