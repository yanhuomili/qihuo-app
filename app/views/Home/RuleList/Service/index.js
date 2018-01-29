import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import DocContainer from 'components/DocContainer';

import '../rule.less';
export default class Service extends React.Component {
    render(){
        return (
            <Container className="rule-container">
                <AppBar title="服务条款" backward fixed/>
                <div className="rule-doc">
                    <DocContainer name="SERVICE_CLAUSE"/>
                </div>
            </Container>
        )
    }
}