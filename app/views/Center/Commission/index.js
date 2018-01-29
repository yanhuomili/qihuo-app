import React from 'react';
import DocContainer from 'components/DocContainer';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import '../artical.less';
export default class Commission extends React.Component {
    render() {
        return (
            <Container>
                <AppBar title="资金托管服务协议" backward fixed/>
                <div className="artical-doc">
                    <DocContainer name="COMMISSION"/>
                </div>
            </Container>
        )
    }
}
