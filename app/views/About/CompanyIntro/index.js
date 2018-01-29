import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import DocContainer from 'components/DocContainer';

export default class CompanyIntro extends React.Component{
    render(){
        return(
            <Container>
                <AppBar title="公司简介" backward fixed/>
                <div className="artical-doc">
                    <DocContainer name="COMPANY_DETAIL"/>
                </div>
            </Container>
        )
    }
}