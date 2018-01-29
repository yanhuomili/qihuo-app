import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
export default class InfoItem extends React.Component {
    render(){
        return (
            <div className="info-item">
                <div className={ this.props.border?"border":"" }>
                    <span>{ this.props.label }</span>
                    <span>{ this.props.value }</span>
                </div>
            </div>
        )
    }
}

InfoItem.props = {
    img: PropTypes.string.require,
    value:PropTypes.string.require,
    border: PropTypes.boolean,
};