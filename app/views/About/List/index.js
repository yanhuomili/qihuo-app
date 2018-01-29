import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
export default class List extends React.Component {
    //列表组件
    render() {
        const { label, fnClick } = this.props;
        return (
            <div className="list" onClick={ fnClick }>
                {label}
            </div>
        )
    }
}
List.props = {
    label: PropTypes.string,
    fnClick: PropTypes.func,
};