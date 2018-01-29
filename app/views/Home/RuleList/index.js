import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import ListItem from '../ListItem';
import Img from '../images/acc_8.png';
import './style.less';
export default class RuleList extends React.Component {
    render(){
        return (
            <Container>
                <div className="rule-list">
                    <AppBar title="法律条款" backward />
                    <div className="lists">
                        <ListItem img={ Img } greyBg={ true } label="服务条款" value="已签署" url='/rule/service' />
                        <ListItem img={ Img } greyBg={ true } label="免责声明" value="已签署" url='/rule/statement' />
                        <ListItem img={ Img } greyBg={ true } label="隐私政策" value="已签署" url='/rule/secret' />
                        <ListItem img={ Img } greyBg={ true } label="风险披露" value="已签署" url='/rule/riskShow' />
                    </div>
                </div>
            </Container>
        )
    }
}