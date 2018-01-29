import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from 'components/Icon';
import "./style.less";
export default class BottomSlider extends Component {
    static props = {
        title: PropTypes.string,
        onClose:PropTypes.func
    };

    render() {
        const { title,onClose } = this.props;
        return (
            <div className="bottom-slider-container">
                <div className="masker"></div>
                <div className="bottom-slider">
                    <div className="header">
                        <SvgIcon name="cross" onClick={ _=>{
                            onClose && onClose();
                        } } />
                        <span>{title}</span>
                    </div>
                    <div className="content">
                        <div className="separator"></div>
                        {
                            this.props.children
                        }
                    </div>
                </div>
            </div>
        )
    }
}