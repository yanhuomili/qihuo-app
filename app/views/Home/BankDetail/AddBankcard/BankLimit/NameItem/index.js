import React from 'react';
import PropTypes from 'prop-types';
import { protocolTransfer } from 'lib/utils';
export default class NameItem extends React.Component {

    render(){
        const data = this.props.data;
        return (
            <li>
                <img src={ protocolTransfer(data.pic) } />
                <div>
                    <span>{ data.name }</span>
                    {/*<span className="right">{ data.remark }</span>*/}
                </div>
            </li>
        )
    }
}

NameItem.props = {
    data: PropTypes.object.require
};