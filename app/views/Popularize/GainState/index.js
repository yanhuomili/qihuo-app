import React from 'react';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import {backToApp, redirect} from 'lib/utils';
import remark from '../images/share_new.png';
import './style.less';
export default class GainState extends React.Component{
    render(){
        return(
            <Container>
                <AppBar title="赚钱说明" backward fixed/>
                <img src={remark} className="remark"/>
            </Container>
        )
    }
}