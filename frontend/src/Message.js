import React, { Component } from 'react';

class Message extends Component {
    state = {
        onHover: false,
    }

    onHover = () => {
        this.setState({
            onHover: true
        });
    }

    onOut = () => {
        this.setState({
            onHover: false
        });
    }
    
    render() {
        return (
            <div style={{ width: '100%', height: '80px', padding: '16px', marginBottom: '1px', paddingBottom: 0 }}>
                <div style={{ float: this.props.isMe ? 'right' : 'left', height: '64px', borderRadius: '8px', fontSize: 18, padding: '16px', cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.2)', display: 'inline-block' }} onMouseOver={this.onHover} onMouseOut={this.onOut}>
                    {this.props.message}
                </div>
            </div>
        );
    }
}

export default Message;
