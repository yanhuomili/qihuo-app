import React from 'react';
import PropTypes from 'prop-types';
export default class Container extends React.Component{
    render(){
        const { className } = this.props;
        return (
            <div className={`container ${className || ""}`}>
                {
                    this.props.children
                }
            </div>
        )
    }
}

Container.props = {
    className:PropTypes.string
};

