import React from 'react';
import PropTypes from 'prop-types';
import { redirect } from 'lib/utils';
import { SvgIcon } from 'components/Icon';
import './style.less';
export default class ListItem extends React.Component {
    fnClick(){
        redirect(this.props.url);
    }
    render(){
        return (
            <div className={"list-item "+(this.props.greyBg?"greyBg":"")}>
                <div onClick={ this.fnClick.bind(this) }>
                    <img src={ this.props.img } />
                    <span className="label">{ this.props.label }</span>
                    <SvgIcon name="arrow_right" className="right arrow" />
                    <span className="right">{ this.props.value }</span>
                </div>
            </div>
        )
    }
}

ListItem.props = {
    img: PropTypes.string.require,
    label:PropTypes.string.require,
    value:PropTypes.string.require,
    url:PropTypes.string.require,
    greyBg: PropTypes.boolean,
};