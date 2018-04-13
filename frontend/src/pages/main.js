import './styleMain.css';
import './style.css';

import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import GroupRow from '../GroupRow';
import IpList from '../config/ip';
import Message from '../Message';
import PropTypes from 'prop-types';
import axios from 'axios';
import io from 'socket.io-client';

const cookies = new Cookies();
class Main extends Component {

    socket = io(IpList.socketServer);
    
    state = {
        text: '',
        messages: [],
        groupList: [
            'AJ. Chal',
            'AJ. Manus',
        ],
        isShowingModal: false,
        newGroupName: '',
        selectedGroupID: 0, 
    };
    componentDidMount() {
        this.socket.on('chat', (result) => {
            let messages = this.state.messages.slice();
            messages.push(result.message);
            this.setState({ messages });
            console.log(result.message);
        });
    }

    handleChange = (event) => this.setState({ text: event.target.value });
    
    onLogOutClick = () => {
        cookies.remove('isAuthen');
        cookies.remove('username');
        cookies.remove('uid');
        window.location.assign('');
    };

    createGroup = (groupName) => {

    };

    handleCreateGroup = (event) => this.setState({ newGroupName: event.target.value });
    
    handleClick = () => this.setState({ isShowingModal: true });
    
    handleClose = () => this.setState({ isShowingModal: false });

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
                <div className="row" style={{ height: '64px' }}>
                   <button 
                        style={{ 
                            width: '128px', 
                            marginTop: '8px',
                            height: '48px', 
                            backgroundColor: '#28d', 
                            borderColor: '#28d', 
                            color: 'white',
                            fontSize: 18, 
                            float: 'right', 
                            marginRight: '48px',
                            borderRadius: '0px'
                        }}
                        onClick={this.onLogOutClick}
                    >
                        {/*<div className="message-wrapper me">
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
                            </div>*/}
                        Log out
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-3 no-padding-right" style={{ height: '100%' }}>
                        <div className="wrapper">
                            <nav className="nav" id="nav">
                                <div className="default-nav">
                                    <div className="main-nav">
                                        <div className="main-nav-item"><a className="main-nav-item-link" href="#">Group List</a></div>
                                        <div className="options">
                                            <button 
                                                style={{ 
                                                    backgroundColor: 'red', 
                                                    width: '128px', 
                                                    height: '32px', 
                                                    border: '0px solid',
                                                    borderRadius: '16px'
                                                }}
                                                onClick={this.handleClick}
                                            >
                                                Add group
                                                {                                  
                                                    this.state.isShowingModal &&
                                                    <ModalContainer onClose={this.handleClose}>
                                                    <ModalDialog onClose={this.handleClose}>
                                                        <div className="login">
                                                            <h2 className="login-header">Add Group</h2>
                                                            <form className="login-container">
                                                                <p><input type="text" placeholder="Username" value={this.state.newGroupName} onChange={this.handleCreateGroup}/></p>
                                                                <p><input type="submit" value="OK" onClick={this.createGroup} /></p>
                                                            </form>
                                                        </div>
                                                    </ModalDialog>
                                                    </ModalContainer>
                                                }
                                            </button>

                                        
                                        </div>

                                    </div>
                                </div>
                            </nav>
                            <div className="myInner" id="inner">
                                {
                                    this.state.groupList.map((group) => {
                                        return <GroupRow name={group} groupNumber={2} lastMessage={'Hi there, MANUSkjlljkhkjhkljhl;kh;lkhio;hoihopihihiubiubiubibibupiiubiubiubpiubiubpiubpiub'} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 no-padding-left" style={{ height: '100%' }}>
                        <div className="wrapper">
                            <nav className="nav" id="nav">
                                <div className="default-nav">
                                    <div className="main-nav">
                                        <div className="main-nav-item"><a className="main-nav-item-link" href="#">{'Group Name'}</a></div>
                                        <div className="options"></div>
                                    </div>
                                </div>
                            </nav>
                            <div className="inner" id="inner">
                                <Message message={'asdasdsadsadsads'} user={'them'} />
                                <Message message={'kuy'} user={'them'} />
                                <Message message={'chal'} user={'me'} />
                                <Message message={'asdasdsadsadsads'} user={'me'} />
                            </div>
                            <div className="bottom" id="bottom">
                                <textarea className="input" id="input"></textarea>
                                <div className="send" id="send">
                                    <div style={{ width: '100%', height: '100%', paddingTop: '4px' }}>
                                        <div 
                                            style={{ 
                                                width: '32px',
                                                height: '32px', 
                                                top: 0, 
                                                bottom: 0,
                                                right: 0, 
                                                left: 0,
                                                margin: 'auto',  
                                            }}
                                        >
                                            <img 
                                                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/104946/ic_send_white_48dp.png" 
                                                style={{ 
                                                    width: '100%', 
                                                    height: '100%' 
                                                }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;