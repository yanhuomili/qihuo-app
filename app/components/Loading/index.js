import React, { Component} from 'react';
import PropTypes from 'prop-types';
import "./style.less";
import loading from './loading.gif'
export default class Loading extends Component {
    static props = {
        show: PropTypes.bool
    };
    static defaultProps = {
        show: false
    };

    render() {
        const {show} = this.props;
        return (
            show ?
                <div className="loading-container">
                    <div className="mask"></div>
                    <div className="img-wrapper">
                        <img src={loading} alt=""/>
                    </div>
                </div>
                : null
        )
    }
}