import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const btnStyles = {
    fontSize:'28px'
}

class Button extends PureComponent {
    constructor(props) {
        super(props);
        //console.log(this.props.alt);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            color: '#E3F2FD'
        };
        this.positions = [20, 70, 120];
    }

    handleFocus() {
        this.setState({
            color: 'white'
        });
    }

    handleBlur() {
        this.setState({
            color: '#E3F2FD' 
        });
    }

    render() {
        let btnStyle = {
            color:this.state.color
        };
        if(this.props.id === 5) {
            btnStyle.bottom = '15px';
        } else {
            btnStyle.top = `${this.positions[this.props.id]}px`;
        }
        
        return (
            <div className="btn-save" 
                style={btnStyle}
                onClick={this.props.click} 
                onMouseEnter={this.handleFocus}
                onMouseLeave={this.handleBlur}>
                    <i className={`fa ${this.props.icon}`} style={btnStyles}></i>
            </div>
        )
    }
}

export default Button;