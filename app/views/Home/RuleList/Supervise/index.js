import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import '../rule.less';
import DocContainer from 'components/DocContainer';
export default class Supervise extends React.Component {
    render(){
        return (
            <Container className="rule-container">
                <AppBar title="监管及牌照" backward fixed/>
                <div className="rule-doc">
                    <DocContainer name="REGULATION_LICENCE" />
                </div>
            </Container>
        )
    }
}