import React from 'react';
import PropTypes from 'prop-types';
import "./style.less";

export default class Row extends React.Component{
    render(){
        const { className } = this.props;
        return (
            <div className={`row ${className || ""}`}>{ this.props.children }</div>
        )
    }
}

Row.props = {
    className:PropTypes.string
};