import React from 'react';
import PropTypes from 'prop-types';
import { COMPANY_NAME } from 'constants';
import { redirect } from 'lib/utils';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import symbol from './images/symbol.png';
import { backToApp } from 'lib/utils';
import List from './List';
import { parse } from 'query-string';
import './style.less';
export default class About extends React.Component {
    constructor(props){
        super(props);
        this.state={
            inputs:"",
            version:""
        };
    }
    service() {
        //跳转服务条款页面
        redirect('/rule/service');
    }

    risk() {
        //跳转风险披露页面
        redirect('/rule/riskShow');
    }

    company() {
        //跳转公司简介页面
        redirect('/company_intro');
    }
    render() {
        //获取当前版本信息
        let query = parse(this.props.location.search);
        return (
            <Container>
                <AppBar title="关于我们" backward={ backToApp } />
                <div className="about">
                    <div className="about-list">
                        <List label="服务条款" fnClick={ this.service.bind(this) }/>
                        <List label="风险披露" fnClick={ this.risk.bind(this) }/>
                    </div>
                </div>
            </Container>
        )
    }
}