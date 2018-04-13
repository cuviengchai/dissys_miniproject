import './styleMain.css';

import React, { Component } from 'react';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "xx"
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    onLogOutClick = () => {
        cookies.remove('isAuthen');
        cookies.remove('username');
        window.location.assign('');
    }

    sendText = () => {
      // axios.post(this.loadBalancerAddress + '/sendMessage', { uid:this.props.uid,gid:,this.props.gid,content : this.state.text })
      //   .then(function (response) {
      //     console.log(response);
      //     if( response == “SUCCESS” ){
      //       this.setState({text:""})
      //     }

      //   })
      //   .catch(function (err) {
      //     console.error(err);
      //   });
     
        this.setState({text:""})
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
                                {this.state.text}
                            </div>
                        </div>
                    </div>
                    <div className="bottom" id="bottom">
                        <textarea className="input" id="input" value={this.state.text} onChange={this.handleChange}></textarea>
                        <div className="send" id="send" onClick = {this.sendText}></div>
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