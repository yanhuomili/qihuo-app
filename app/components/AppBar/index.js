import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from 'components/Icon';
import { browserHistory as history } from 'react-router';
import { redirect,back } from 'lib/utils';
import './style.less';
export default class AppBar extends React.Component {

    backward() {
        const { backward } = this.props;
        if(typeof backward === "boolean"){
            back();
        }else if(typeof backward === "string"){
            redirect(backward);
        }else if(typeof backward === "function"){
            backward();
        }
    }
    rightBarClick(){
        if(this.props.rightBar.fnClick){
            this.props.rightBar.fnClick();
        }
    }
    render() {
        const {title, backward,  rightBar ,backgroundTransparent, fixed,shrink } = this.props;
        return (
            <div className={ "app-bar-container" +
                    ( fixed ? " fixed":"")
            }>
                <div className={ "app-bar" +
                    ( backgroundTransparent ? " background-transparent": "" )
                }
                >
                {  backward   &&
                <div className="bar-icon pull-left" onClick={ this.backward.bind(this) }>
                    <SvgIcon name="arrow_left"/>
                </div>
                }
                { title && <h3 className={"title"+(shrink?"Change":"")}>{title}</h3> }
                { rightBar &&
                <div className="bar-icon pull-right" onClick={ this.rightBarClick.bind(this) }>
                    { rightBar.icon && <SvgIcon name={rightBar.icon}/> }
                    { rightBar.text && <span>{ rightBar.text }</span> }
                </div>
                }
                </div>
                <div className="substitute"></div>
            </div>
        )
    }
}

AppBar.props = {
    title: PropTypes.string,
    backward: PropTypes.oneOfType([PropTypes.bool, PropTypes.string,PropTypes.func]),
    rightBar: PropTypes.object,
    backgroundTransparent:PropTypes.bool,
    fixed:PropTypes.bool,
    shrink:PropTypes.bool
};
