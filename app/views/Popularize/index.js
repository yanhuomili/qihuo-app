import React from 'react';
import {backToApp, redirect, replace} from 'lib/utils';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import joinTop from './images/joinTop.jpg';
import joinMiddle from './images/joinMiddle.png';
import joinTitle from './images/joinTitle.png';
import joinBottom from './images/joinBottom.png';
import './style.less';
import Api, {IS_PROMOTER, ACTIVE_PROMOTER} from 'lib/api';
export default class Popularize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPromoter: false,
            promoterUrl: "",
            loading: true
        }
    }

    componentWillMount() {
        //判断是否为合伙人信息
        Api.fetch(IS_PROMOTER, {}, (data) => {
            if (data.isPromoter === 1) {
                return replace("/promote");
            }
            this.setState({
                loading: false
            });
        });
    }

    activate() {
        Api.fetch(ACTIVE_PROMOTER, {}, (data) => {
            replace("/promote");
        })
    }

    render() {
        const { loading } =this.state;
        return (
            <Container>
                {
                    !loading &&
                    <div>
                        <AppBar title="加入合伙人" backward={ backToApp } fixed/>
                        <div className="popularize">
                            <img src={joinTop}/>
                            <img src={joinMiddle} className="joinMiddle"/>
                            <img src={joinTitle}/>
                            <img src={joinBottom} className="joinBottom"/>
                            <button className="activate"
                                    onClick={ this.activate.bind(this) }>激活合伙人
                            </button>
                        </div>
                    </div>
                }
            </Container>
        )
    }
}
