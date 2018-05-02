import './styleMain.css';
import './style.css';

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

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
const querystring = require('querystring');
class Main extends Component {

    socket = io(IpList.socketServer);
    
    state = {
        isJoin : [],
        text: '',
        messages: [],
        lastMessage: {

        },
        nameOfuser: {

        },
        groupList: [],
        isShowingModal: false,
        newGroupName: '',
        selectedGroupID: '',
        selectGroupName: '', 
    };
    componentDidMount() {
        this.socket.on('chat', (result) => {
            let messages = this.state.messages.slice();
            let lastMessage = this.state.lastMessage;
            messages.push(result.message);
            lastMessage[result.message.gid] = result.message.content;
            console.log(lastMessage[result.message.uid], result.message.uid);
            this.setState({ messages, lastMessage });
            console.log(result.message);
        });
        this.getAllGroup();
        console.log("! "+cookies.get('uid'));
        const node = this.refs.trackerRef;
        node && node.scrollIntoView({block: "end"})
        

    }
    getAllUser = () => {
        axios.get(IpList.loadBalancer + '/getAllGroup').then(function (response) {
            this.setState({ groupList: response.data }, this.getMessage)
            console.log('GET GROUP SUCCESS');
        }.bind(this)).catch(function (err) {
            console.error(err);
        });
    }

    selectGroup = (gid, gname) => {
        // console.log("!! " + this.state.isJoin[gid]);
        if( this.state.isJoin[gid] == undefined ){
            var nJ = this.state.isJoin ; 
            axios.post(IpList.loadBalancer + '/joinGroup',{uid :cookies.get('uid'), gid:gid}).then(function (response) {
                console.log('JOIN GROUP SUCCESS');
                nJ[gid] = 1 ; 
                this.setState( {isJoin : nJ})
            }.bind(this)).catch(function (err) {
                console.error(err);
            });
             
        }
        
        this.setState({ selectedGroupID: gid, selectGroupName: gname });
        console.log(gid);
    }

    getMessage = async () => {
        let messages = this.state.messages;
        await this.state.groupList.map((group) => {
            axios.get(IpList.loadBalancer + '/getAllMessage', { params: { gid: group._id } }).then(function (response) {
                console.log(response.data);
                response.data.messages.map((message) => {
                    console.log(message);
                    message = { ...message, user: { uid: message.uid , username:message.user.name} };
                    messages.push(message);
                })
                let lastMessage = this.state.lastMessage;
                lastMessage[group._id] = response.data[response.data.length - 1].content;
                console.log(lastMessage);
                this.setState({ lastMessage });
            }.bind(this)).catch(function (err) {
                console.error(err);
            });
        })
        console.log(messages);
        this.setState({ messages });
    }

    getAllGroup = () => {
        axios.get(IpList.loadBalancer + '/getAllGroup').then(function (response) {
            this.setState({ groupList: response.data }, this.getMessage)
            console.log('GET GROUP SUCCESS');
        }.bind(this)).catch(function (err) {
            console.error(err);

        });
    }

  componentDidUpdate() {
    const node = this.refs.trackerRef;
    node && node.scrollIntoView({block: "end"})
  }

    handleChange = (event) => this.setState({ text: event.target.value });
    
    onLogOutClick = () => {
        cookies.remove('isAuthen');
        cookies.remove('username');
        cookies.remove('uid');
        window.location.assign('');
    };

    createGroup = () => {
        axios.post(IpList.loadBalancer + '/createGroup', {
            uid: cookies.get('uid'),
            gname: this.state.newGroupName,
        }).then(function (response) {
            console.log('CREATE GROUP SUCCESS');
        }).catch(function (err) {
            console.error(err);
        });
    };

    handleCreateGroup = (event) => this.setState({ newGroupName: event.target.value });
    
    handleClick = () => this.setState({ isShowingModal: true });
    
    handleClose = () => this.setState({ isShowingModal: false });

    sendText = () => {
        scroller.scrollTo('Message', {
            duration: 1500,
            delay: 100,
            smooth: true,
            containerId: this.state.messages.length-1,
            offset: 50, // Scrolls to element + 50 pixels down the page
          });
        axios.post(IpList.loadBalancer + '/sendMessage', {
            uid: cookies.get('uid'),
            gid: this.state.selectedGroupID, // CHANGE gid MANUALLY
            content: this.state.text 
        }).then(function (response) {
            console.log('SUCCESS');
        }).catch(function (err) {
            console.log(err);
        });

        this.setState({ text: '' });
        // console.log("FF");
        // axios.get(IpList.loadBalancer + '/getUserInfo', {uid:"5ae89ac759be59648e4ddd11"}).then(function (response) {
        //     console.log("START");
        //     console.log(response.data);
        // }.bind(this)).catch(function (err) {
        //     // console.error(err);
        //     console.log("fail");
        // });
       
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
                                        return <GroupRow 
                                                    name={group.name}
                                                    gid={group._id} 
                                                    groupNumber={2} 
                                                    isSelected={this.state.selectedGroupID == group._id}
                                                    lastMessage={this.state.lastMessage[group._id] || '...'} 
                                                    onClick={this.selectGroup}
                                                />
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
                                        <div className="main-nav-item"><a className="main-nav-item-link" href="#">{this.state.selectGroupName}</a></div>
                                        <div className="options"></div>
                                    </div>
                                </div>
                            </nav>
                            {
                            this.state.selectedGroupID === '' ?
                                <div style={{ width: '100%', height: '530px', paddingTop: '10vh' }}>
                                </div>
                                :
                                <div>
                                    <div className="inner" id="inner">
                                        {
                                            
                                            this.state.messages.map((message, index) => {
                                                if (this.state.selectedGroupID === message.gid) {
                                                return (
                                                    
                                                    <Message name = {message.user.username} id={index} key={message._id} user={message.user} message={message.content} isMe={message.uid === cookies.get('uid')} />
                                                    
                                                );
                                                }   
                                            })
                                            // <MessageList
                                            //     items={this.state.messages}
                                            //     onScrolled={e => console.log('the list was scrolled!')}
                                            //     onScrolledTop={e => alert('scrolled to top!')}
                                            // />
                                        }


        <div style={{height: '30px'}} id='#tracker' ref="trackerRef"></div>
                                    </div>
                                    
                                    <div className="bottom" id="bottom">
                                        <textarea className="input" id="input" value={this.state.text} onChange={this.handleChange} />
                                        <div className="send" id="send" onClick={this.sendText}>
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
                            }
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;