import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from 'components/Icon';
import "./style.less";

export default class Button extends React.Component {
    render() {
        const {type, round,text,disabled,onClick,icon } = this.props;
        return (
            <div className={
                "btn btn-" + type + ( round ? " round" : "")
                + ( disabled ? " disabled":"" )
            } onClick={ _ => {
                if(!disabled){
                    onClick && onClick();
                }
            }}>
                { icon ?
                <SvgIcon name={icon}/>
                    : null
                }
                <span>
                { text }
                </span>
            </div>
        )
    }
}

Button.props = {
    round: PropTypes.bool,
    type: PropTypes.string.isRequired,
    text:PropTypes.string.isRequired,
    disabled:PropTypes.bool,
    onClick:PropTypes.func,
    icon:PropTypes.string
};

Button.defaultProps = {
    type:'default',
    text:'SUBMIT',
    round:false
};

