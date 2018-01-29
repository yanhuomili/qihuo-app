import React from 'react';
import PropTypes from 'prop-types';
import "./style.less";

export default class PaddedContent extends React.Component{
    render(){
        const { className } = this.props;
        return (
            <div className={`padded-content ${className || ""}`}>{ this.props.children }</div>
        )
    }
}

PaddedContent.props = {
    className:PropTypes.string
};