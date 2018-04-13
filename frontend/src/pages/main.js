import './styleMain.css';

import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import IpList from '../config/ip';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
class Main extends Component {

    socket = io(IpList.socketServer);

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            messages: [],
        };

        this.socket.on('chat', (result) => {
            let messages = this.state.messages.slice();
            messages.push(result.message);
            this.setState({ messages });
            console.log(result.message);
        });

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    onLogOutClick = () => {
        cookies.remove('isAuthen');
        cookies.remove('username');
        cookies.remove('uid');
        window.location.assign('');
    }

    sendText = () => {
        axios.post(IpList.loadBalancer + '/sendMessage', {
            uid: cookies.get('uid'),
            gid: '', // CHANGE gid MANUALLY
            content: this.state.text 
        }).then(function (response) {
            console.log('SUCCESS');
        }).catch(function (err) {
            console.error(err);
        });

        this.setState({ text: '' });
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
                                {this.state.messages.map(message => (
                                    <div key={message._id} >{message.user.name}: {message.content}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bottom" id="bottom">
                        <textarea className="input" id="input" value={this.state.text} onChange={this.handleChange}></textarea>
                        <div className="send" id="send" onClick={this.sendText}></div>
                    </div>
                </div>
                <div style={{ top: 0, right: 0, margin: 'auto' }}>
                    <button style={{ width: '120px', height: '60px', backgroundColor: '#28d', borderColor: '#28d', fontSize: 32 }} onClick={this.onLogOutClick}>log out</button>
                </div>
            </div>
        );
    }
}

export default Main;