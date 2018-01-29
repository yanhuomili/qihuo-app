import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import '../rule.less';
import DocContainer from 'components/DocContainer';
export default class Statement extends React.Component {
    render(){
        return (
            <Container className="rule-container">
                <AppBar title="免责声明" backward fixed/>
                <div className="rule-doc">
                    <DocContainer name="DISCLAIMER" />
                </div>
            </Container>
        )
    }
}