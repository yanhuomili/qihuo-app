import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import '../rule.less';
import DocContainer from 'components/DocContainer';

export default class Transaction extends React.Component {
    render(){
        return (
            <Container>
                <AppBar title="资产托管人与操盘手合作协议" backward fixed/>
                <div className="rule-doc">
                    <DocContainer name="ASSET_CUSTODIAN" />
                </div>
            </Container>
        )
    }
}