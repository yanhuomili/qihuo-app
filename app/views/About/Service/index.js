import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import DocContainer from 'components/DocContainer';
import '../artical.less';
export default class Service extends React.Component{
    render(){
        return(
            <Container>
                <AppBar title="服务条款" backward fixed/>
                <div className="artical-doc">
                    <DocContainer name="SERVICE_CLAUSE"/>
                </div>
            </Container>
        )
    }
}