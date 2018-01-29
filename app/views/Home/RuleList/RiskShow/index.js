import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import DocContainer from 'components/DocContainer';
import '../rule.less';
export default class RiskShow extends React.Component {
    render(){
        return (
            <Container className="rule-container">
                <AppBar title="风险披露" backward fixed/>
                <div className="rule-doc">
                    <DocContainer name="RISK_SHOW"/>
                </div>
            </Container>
        )
    }
}