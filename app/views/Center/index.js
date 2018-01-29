import React from 'react';
import PropTypes from 'prop-types';
import { COMPANY_NAME } from 'constants';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import HelpList from './HelpList';
import { backToApp } from 'lib/utils';
export default class Center extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Container>
                <AppBar title="帮助中心" backward={ backToApp }/>
                <div className="center">
                   <HelpList label={`${COMPANY_NAME}用户服务协议`} url="/agreement"/>
                   <HelpList label="资产托管人与操盘手合作协议" url="/transaction"/>
                   <HelpList label="资金托管服务协议" url="/commission"/>
                </div>
            </Container>
        )
    }
}