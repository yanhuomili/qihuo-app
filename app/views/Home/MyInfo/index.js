import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import { parse } from 'query-string';
import InfoItem from '../InfoItem';
import { splitIdCardNum,redirect } from 'lib/utils';
import Api,{MODIFY_NICK_NAME,MODIFY_PASSWORD,ACCOUNT_INFO,NICK_HEAD} from 'lib/api';
import './style.less';
import Session from 'lib/session';
import $ from 'jquery';
import qr from 'qr-image';//生成二维码
import svgpath from 'svgpath';




export default class MyInfo extends React.Component {
    constructor(){
        super();
        this.state = {
        	nickName:"用户操盘手111",
        	newName:'',
        	oldPassword:'',
        	newPassword:'',
        	sureNewPassword:'',
        	showNicknameMask:false,
        	showPasswordMask:false,
        	showQrCode:false,
        	path: 'http://www.huya.com/g/lol'
        	
//          name:"",
//          idCard:"",
        };
    }
    //上传头像
    uploadPic(){
    	alert('上传头像')
    }
    //显示修改昵称模态框
    nicknameMask(event){
    	event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();
    	this.setState({
    		showNicknameMask:true
    	})
    }
    //显示修改密码模态框
    passwordMask(event){
    	event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();
    	this.setState({
    		showPasswordMask:true
    	})
    }
	//隐藏模态框
	hideMask(event){
		event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();
    	var target=event.target;
    	console.log(event.target)
    	if($(target).hasClass('personal-dialog')){
    		this.setState({
				showNicknameMask:false,
				showPasswordMask:false
			})
    	}
		
	}
	
    //关于我们
    gotoAbout(){
    	redirect('/about');
    }
    //关于推广码
    tuoiguangma(){
    	redirect('/about');
    }
    //修改昵称
    sureMOdifyName(event){
    	event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();
    	var val=this.state.newName;
    	var _this=this;
    	if(val!==""){
	    	Api.fetch(MODIFY_NICK_NAME,{
	    		nick_name:val,
				updateType:3
	    	},(data,res)=>{
	        	console.log(data,res)
	        	_this.setState({name:this.msg})
	        	_this.setState({//不管成功与否都隐藏模态框
	        		showNicknameMask:false
	        	})
	        });
    	}
    }
    //修改秘密
    sureMOdifyPassword(event){
    	event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();
    	var oldPassword=this.state.oldPassword;
    	var newPassword=this.state.newPassword;
    	var sureNewPassword=this.state.sureNewPassword;
    	var _this=this

    	//如果输入框为空，则不发送请求
    	if(oldPassword!==""&&newPassword!==""&&sureNewPassword!==""){
    		console.log(oldPassword,newPassword,sureNewPassword)
    		if(newPassword===sureNewPassword){//两次输入的密码要一致
    			Api.fetch(MODIFY_PASSWORD,{
		    		oldPassword:oldPassword,
					newPassword:newPassword
		    	},(data)=>{
		        	console.log(111111);
		        	console.log(data);
		        	console.log(2);
		        	_this.setState({//不管成功与否都隐藏模态框
		        		showPasswordMask:false
		        	})
		        });
    		}else{
    			alert('两次输入新密码不一致')
    		}
    	}
    	
    }
    //input输入事件
//	handleChange(event) {
//		event.stopPropagation();
//  	event.nativeEvent.stopImmediatePropagation();
//	    this.setState({value: event.target.value});
//	    console.log(event)
//	}
	//输入新昵称
	newNameChange(event){
		event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();
		this.setState({newName: event.target.value});
	}
	//输入旧密码
	oldPassChange(event){
		event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();
		this.setState({oldPassword: event.target.value});
	}
	//输入新密码
	newPassChange(event){
		event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();
		this.setState({newPassword: event.target.value});
	}
	//确认新密码
	sureNewPassChange(event){
		event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();
		this.setState({sureNewPassword: event.target.value});
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
    	//获取用户名
    	Api.fetch(NICK_HEAD,{fundType:0},(data,res)=>{
        	this.setState({
        		nickName:data.nickName,
        	})
        	
        });
    }
    render(){
        const { name, idCard,nickName,showQrCode } = this.state;
        return (
            <Container>
                <AppBar title="个人资料" backward />
                <div className="my-head-img">
                	<p  onClick={this.uploadPic} className="img-box">
                	</p>
                	<span>上传头像</span>
                </div>
                <dl className="dl-list">
                	<dt onClick={this.nicknameMask.bind(this)}>
                		<p>
                			<span>昵称</span>
                		</p>
                		<p><input type="text" value={nickName} />{/*<span>用户操盘手</span>*/}</p>
                	</dt>
                	<dt onClick={this.passwordMask.bind(this)} className="repair-pw">
                		<p>
                			<span>修改密码</span>
                		</p>
                	</dt>
                	<dt onClick={this.gotoAbout}>
                		<p>
                			<span>关于我们</span>
                		</p>
                	</dt>
                	<dt onClick={this.getCode.bind(this)}>
                		<p>
                			<span>我们的推广码</span>
                		</p>
                	</dt>
                </dl>   
                {showQrCode?<div onClick={this.hideQrCode.bind(this)} className="qr-code-wrap">
                	{showQrCode?<div className="qrCode">
				        <svg width="150" height="150" ref={(ref)=>this._qrcodeSVG = ref} transform="scale(1.5)">
				          <path d={this.state.path?this.state.path:null}/>
				        </svg>
			      	</div>:<div>暂无二维码</div>}
		      	</div>:null}
                {this.state.showNicknameMask?
	                <div className="nickname-mask">
	                	<div onClick={this.hideMask.bind(this)} className="personal-dialog">
	                		<div>
	                			<input onChange={this.newNameChange.bind(this)} type="text"  placeholder="请输入新的昵称" />
	                			<button onClick={this.sureMOdifyName.bind(this)} className="sure-btn">确定</button>
	                		</div>
	                		
	                	</div>
	                	
	                </div>
	                :null
                }
                {this.state.showPasswordMask?
	                <div className="modify-password">
	                	<div onClick={this.hideMask.bind(this)} className="personal-dialog">
	                		<div>
	                			<input onChange={this.oldPassChange.bind(this)} type="password"  placeholder="请输入旧密码" />
	                			<input onChange={this.newPassChange.bind(this)} type="password"  placeholder="请输入新密码" />
	                			<input onChange={this.sureNewPassChange.bind(this)} type="password"  placeholder="确认新密码" />
	                			<button onClick={this.sureMOdifyPassword.bind(this)} className="sure-btn">确定</button>
	                		</div>
	                		
	                	</div>
	                </div>
	                :null
	            }
            </Container>
        )
    }
}