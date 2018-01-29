import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import DocContainer from 'components/DocContainer';
import '../artical.less';
export default class Customer extends React.Component{
    render(){
        return(
            <Container>
                <AppBar title="用户服务协议" backward fixed/>
                <div className="artical-doc">
                    <DocContainer name="CUSTOMER_DETAIL"/>
                </div>
            </Container>
        )
    }
}