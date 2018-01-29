import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import '../rule.less';
import DocContainer from 'components/DocContainer';
export default class Customer extends React.Component {
    render() {
        return (
            <Container>
                <AppBar title="客户协议" backward fixed/>
                <div className="rule-doc">
                    <DocContainer name="CUSTOMER_AGGREMENT" />
                </div>
            </Container>
        );
    }
}