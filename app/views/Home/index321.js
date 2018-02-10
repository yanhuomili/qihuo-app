import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import { SvgIcon } from 'components/Icon';
import './style.less';
import { parse } from 'query-string';
import DrawImg from './images/acc_2.png';
import SaveImg from './images/acc_1.png';
import './ListItem';
import ListItem from "./ListItem/index";
import ListImg1 from './images/acc_5.png';
import ListImg2 from './images/acc_6.png';
import ListImg3 from './images/acc_7.png';
import ListImg4 from './images/acc_8.png';
import { openWithDraw,backToApp,redirect,sliceNumber } from 'lib/utils';
import Api,{ ACCOUNT_INFO } from 'lib/api';
import * as actionCreators from '../Income/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
export class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {},
        }
    }
    componentWillMount(){
        //路径参数
        const param = parse(this.props.location.search);
        if(param && param.alipayinstall){
            this.props.setAlipayInstalled(param.alipayinstall === 'true');
        }
        //调用接口获取数据
        Api.fetch(ACCOUNT_INFO,{},(data)=>{
            this.setState({data:data});
            this.props.setPingAnAccount(data.tel);
            this.props.setTel(data.tel);
        });
    }
    render() {
        const data = this.state.data;
        return (
            <Container>
                <div className="account-center">
                    <div className="top">
                    	<div className="add-border">
	                        <AppBar title="我的" backward={ backToApp } rightBar={
	                            { icon:"detail", text:"明细",fnClick:()=>redirect('/fund_detail') }
	                        }
	                            backgroundTransparent
	                        />
                        </div>
                        <div className="bot">
                        	<p className="num-text">余额</p>
	                        <p className="num">${ sliceNumber(data.balance) }</p>
	                        <div className="in-out">
	                            <div onClick={ openWithDraw }>
	                                <img src={ DrawImg }/>
	                                <p>出金</p>
	                            </div>
	                            <div onClick={ _ => { redirect("/income") }}>
	                                <img src={ SaveImg }/>
	                                <p>入金</p>
	                            </div>
	                        </div>
                        </div>
                    </div>
                    <div className="items">
                        <ListItem img={ ListImg1 } label="手机认证" value={data.tel==undefined ? "" : `${data.tel.substring(0,3)}****${data.tel.substring(7,11)}`} url={`/tel_detail?tel=${data.tel}`} />
                        <ListItem img={ ListImg2 } label="实名认证" value="已认证" url={`/name_detail?name=${data.name}&idCard=${data.idCard}`} />
                        <ListItem img={ ListImg3 } label="银行卡号" value="已认证" url='/bank_detail' />
                        <ListItem img={ ListImg4 } label="法律条款" value="已签署" url='/rule_list' />
                    </div>
                </div>
            </Container>
        )
    }
}
const mapStateToProps = (state)=>{
   return state.incomeReducers.toJS();
};

const mapActionsToProps = (dispatch)=>{
    return bindActionCreators(actionCreators,dispatch)
};
export default connect(mapStateToProps,mapActionsToProps)(Home);