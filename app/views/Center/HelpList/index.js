import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from 'components/Icon';
import { redirect } from 'lib/utils';
import './style.less';
export default class HelpList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    fnClick(){
        redirect(this.props.url);
    }
    render() {
        //分类跳转详情页面
        return (
            <div className="help-list" onClick={ this.fnClick.bind(this) }>
                <span className="text">{ this.props.label }</span>
                <SvgIcon name="arrow_right"/>
            </div>
        )
    }
}
HelpList.props = {
    label: PropTypes.string,
    fnClick: PropTypes.func,
};