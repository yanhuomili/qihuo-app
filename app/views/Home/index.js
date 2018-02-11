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

import picMoney from './images/my-money.png';
import picScore from './images/my-score.png';
import picRenzheng from './images/my-renzheng.png';
import picZijin from './images/my-zijin.png';
import picTuiguang from './images/my-tuiguang.png';
import picRenwu from './images/my-renwu.png';
import picAbout from './images/my-about.png';
import picTuiguangma from './images/my-tuiguangma.png';
import picServer from './images/my-server.png';
import userHeadImg from './images/user-head-img.png';


import { openWithDraw,backToApp,redirect,sliceNumber } from 'lib/utils';
import Api,{MY, ACCOUNT_INFO,NICK_HEAD } from 'lib/api';
import * as actionCreators from '../Income/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

import qr from 'qr-image';//生成二维码
import svgpath from 'svgpath';


export class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {},
            arr:[],
            nickName:'',
            headPic:'',
            showQrCode:false,
            path:''
            
        }
    }
    
    
    //个人资料
    personal(){
    	redirect('/my_info');
    }
    
     //认证信息
    renzheng(){
    	redirect('/identification');
    }
    
    //资金明细
    moneyDetail(){
    	redirect('/fund_detail');
    }
    //推广赚钱
    tuiguang(){
    	redirect('/promote');
    }
    //任务中心
    renwu(){
    	redirect('/task_center');
    }
    //关于我们
    guanyu(){
    	redirect('/about');
    }
    //生成二维码
	getCode(){//点击生成二维码
		this.setState({showQrCode:true})
	   	const originPath = qr.svgObject('http://www.huya.com/g/lol').path;
	   	const scaledPath = svgpath(originPath).scale(5, 5).toString();//将二维码放大
	   	this.setState({path: scaledPath});
	}
	//隐藏二维码
	hideQrCode(){
		this.setState({
			showQrCode:false
		})
	}
    
    componentWillMount(){
        //路径参数
        const param = parse(this.props.location.search);//将地址栏信息转成对象方便获取字段
        if(param && param.alipayinstall){
            this.props.setAlipayInstalled(param.alipayinstall === 'true');
        }
        
        //调用接口获取数据
//		Api.fetch(ACCOUNT_INFO,{},(data)=>{
//      	console.log(data)
//          this.setState({data:data});
//          this.props.setPingAnAccount(data.tel);
//          this.props.setTel(data.tel);
//      });

		//获取头像和昵称
		Api.fetch(NICK_HEAD,{fundType:0},(data,res)=>{
        	console.log(data,res);
        	this.setState({
        		nickName:data.nickName,
        		headPic:data.headPic
        	})
        	
        });
		
		//美元积分和美元
        Api.fetch(MY,{},(data,res)=>{
        	console.log(data)
        	console.log(res)
        	this.setState({
        		arr:data
        	})
        });
        console.log(999)
    }
    render() {
        const data = this.state.data;
        const {showQrCode}=this.state;
        return (
            <Container>
                <div className="account-center">
                    <div className="top">
                        <AppBar title="我的" backward={ backToApp } rightBar={
                            { /*icon:"detail", text:"明细",fnClick:()=>redirect('/fund_detail')*/ }
                        }
                        />
                        <div className="server-wrap">
                        	<img src={picServer}/>
                        	<span>客服</span>
                        </div>
                        <div className="bot">
                        	<dl className="user-head">
                        		<dt onClick={this.personal}>
                        		{<img className="user-head-img" src={userHeadImg} alt="用户头像"/>}
                        			
                        		</dt>
                        		<dd>{this.state.nickName}</dd>
                        	</dl>
	                        {/*<p className="num-text">余额<span>美元积分</span></p>
	                        <p className="num">${ sliceNumber(data.balance) }</p>*/}
	                        {this.state.arr.length>0
	                            ?<div className="in-out">
	                        <div>
	                            	<div className="money">
		                            	<img src={ picScore }/>
		                                <p>余额<span>(美元积分)</span></p>
	                            	</div>
	                            	<div className="leftMoney">${this.state.arr[0].amt}</div>
	                            </div>
	                            <div>
	                                {/*<img src={ SaveImg }/>
	                                <p>入金</p>*/}
	                                {
	                                	this.state.arr.length==1?<div className="unLogin">实名认证</div>
	                                	:<div className="logined">
	                                	<p>
	                                		<img src={ picMoney }/>
	                                		<span>余额  (美元)</span>
	                                	</p>
	                                	<p className="login-num">${this.state.arr[1].amt}</p>
	                                	<dl>
	                                		<dt onClick={ _ => { redirect("/income") }}>充值</dt>
	                                		<dd onClick={ openWithDraw }>提现</dd>
	                                	</dl>
	                                </div>
	                                }
	                            </div>
	                        </div>:null}
                        </div>
                    </div>
                    <dl className="dl-list">
                    	<dt onClick={this.renzheng}>
                    		<p>
                    			<img src={picRenzheng}/>
                    			<span>实名认证</span>
                    		</p>
                    	</dt>
                    	<dt onClick={this.moneyDetail}>
                    		<p>
                    			<img src={picZijin}/>
                    			<span>资金明细</span>
                    		</p>
                    	</dt>
                    	<dt onClick={this.tuiguang}>
                    		<p>
                    			<img src={picTuiguang}/>
                    			<span>推广赚钱</span>
                    		</p>
                    	</dt>
                    	<dt onClick={this.renwu}>
                    		<p>
                    			<img src={picRenwu}/>
                    			<span>任务中心</span>
                    		</p>
                    	</dt>
                    	<dt onClick={this.guanyu}>
                    		<p>
                    			<img src={picTuiguang}/>
                    			<span>关于我们</span>
                    		</p>
                    	</dt>
                    	<dt onClick={this.getCode.bind(this)}>
                    		<p>
                    			<img src={picTuiguangma}/>
                    			<span>我的推广码</span>
                    		</p>
                    	</dt>
                    </dl>
                    
                    
                    
                    {/*<div className="items">
                        <ListItem img={ ListImg1 } label="手机认证" value={data.tel==undefined ? "" : `${data.tel.substring(0,3)}****${data.tel.substring(7,11)}`} url={`/tel_detail?tel=${data.tel}`} />
                        <ListItem img={ ListImg2 } label="实名认证" value="已认证" url={`/name_detail?name=${data.name}&idCard=${data.idCard}`} />
                        <ListItem img={ ListImg3 } label="银行卡号" value="已认证" url='/bank_detail' />
                        <ListItem img={ ListImg4 } label="法律条款" value="已签署" url='/rule_list' />
                    </div>*/}
                </div>
                {showQrCode?<div onClick={this.hideQrCode.bind(this)} className="qr-code-wrap">
                	{showQrCode?<div className="qrCode">
				        <svg width="150" height="150" ref={(ref)=>this._qrcodeSVG = ref} transform="scale(1.5)">
				          <path d={this.state.path?this.state.path:null}/>
				        </svg>
			      	</div>:<div>暂无二维码</div>}
		      	</div>:null}
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