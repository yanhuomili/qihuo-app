import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import Button from 'components/Button';
import './style.less';
import {Modal} from 'components/Notifications';
import { SvgIcon } from 'components/Icon';
import { openServiceQQ,callService,isAndroid } from 'lib/utils';
import { info } from 'components/Notifications';
export default class Home extends React.Component {
    state = {
        showModal: false
    };
    componentWillMount(){
        info('当前版本过低，请升级至最新版本!',(fnClose)=>{
            if(isAndroid){
                window.location.href = "http://www.leaguetrade.com/leagueTrade_official.apk";
            }else{
                window.location.href = "https://itunes.apple.com/us/app/lt7/id1147926971?l=zh&ls=1&mt=8";
            }
        });
    }
    render() {
        return (
            <Container>
                {/*<AppBar title="客服中心" backward fixed rightBar={
                    { text:"客服电话",fnClick:()=>{
                        this.setState({showModal:true});
                    } ,icon:"customer_service"}
                }
                />*/}
                <AppBar title="客服中心" backward fixed />
                {/*<div className="customer-service">
                    <p>HI~我是您的专属客服</p>
                    <p>很高兴为您服务</p>
                    <div className="bottom">
                        <Button text="联系我吧" onClick={ _=>{
                            openServiceQQ();
                        } }/>
                        <p className="qqText">企业QQ:800020815</p>
                        <p className="timeText">09:00-22:30（周一至周五）</p>
                    </div>
                </div>
                {
                    this.state.showModal ?
                        <div className="dialog-wrapper">
                            <div className="dialog-content">
                                <div className="inner-wrapper">
                                    <div className="close-wrapper" onClick={ _ => {
                                        this.setState({showModal:false});
                                    } }>
                                        <SvgIcon name="close_circle"/>
                                    </div>
                                <div className="row-1">
                                    <div>中国大陆</div>
                                    <div>Asia/ShangHai</div>
                                </div>
                            <Button text="400-6666-801" icon="customer_service"
                                    onClick={ _=>{
                                        callService("400-6666-801");
                                    }}
                            />
                                <div className="row-2">9:00-22:00(周一至周五)</div>
                                <div className="row-3">
                                    <div>
                                        港澳台及海外地区
                                    </div>
                                    <div>
                                        Asia/Hong Kong
                                    </div>
                                </div>
                            <Button text="00852-30506951" icon="customer_service"
                                    onClick={ _=>{
                                        callService("00852-30506951");
                                    }}
                            />
                                <div className="row-4">
                                    9:00-18:00(周一至周五)
                                </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }*/}
            </Container>
        )
    }
}