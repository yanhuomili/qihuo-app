import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import '../rule.less';
import DocContainer from 'components/DocContainer';
export default class Secret extends React.Component {
    render(){
        return (
            <Container className="rule-container">
                <AppBar title="隐私政策" backward fixed/>
                <div className="rule-doc">
                    <DocContainer name="PRIVACY_POLICY" />
                </div>
            </Container>
        )
    }
}