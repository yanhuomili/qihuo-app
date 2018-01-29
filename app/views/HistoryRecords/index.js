import React, {Component} from 'react';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import PaddedContent from 'components/PaddedContent';
import { replace,redirect } from 'lib/utils';
import { autobind } from 'core-decorators';
import { notif } from 'components/Notifications';
import md5 from 'md5';
import LtApi from 'lib/ltapi';
import Session from 'lib/session';
import "./style.less";

@autobind
export default class HistoryRecords extends Component {
    state = {
        username:"",
        password:""
    };
    controlChange(name,value){
        this.setState({[name]:value});
    }

    submitForm(){
        const { username,password } = this.state;
        LtApi.fetch("/user/login",{
            loginName:username,
            password:md5(password)
        },(resp)=>{
            if(resp && resp.tokenInfo){
                Session.set("oldToken",resp.tokenInfo.token);
                replace("/history_records/detail/order");
            }
        });

    }

    customerService(){
        if(isAndroid){
            window.AppJs.openCustomService();
        }else{
            window.location.href = "goto://openCustomService";
        }
    }

    render() {
        const { username,password } = this.state;
        const disabled =  !(username && password);
        return (
            <Container className="history-records-sign-in">
                <AppBar title="登录" backward={true}/>
                <div className="input-row">
                    <TextInput placeholder="请输入手机号码" icon="phone"
                               name="username"
                               value={ username }
                               onChange={ this.controlChange }
                    />
                </div>
                <div className="input-row">
                    <TextInput placeholder="请输入登录密码" icon="locker"
                               name="password"
                               value={ password }
                               onChange={ this.controlChange }
                               type="password"/>
                </div>
                <div className="input-row btn-wrapper">
                    <Button text="查询" disabled={ disabled } onClick={ this.submitForm }/>
                </div>
                <div className="description">
                    <PaddedContent>
                        <div className="title">温馨提示：</div>
                        <div>1.仅支持5月20号以前注册的用户使用查询。</div>
                        <div>2.用户忘记密码，可<span className="cs-link"
                                             onClick={ this.customerService }
                        >联系客服</span>进行人工处理。
                        </div>
                    </PaddedContent>
                </div>
            </Container>
        )
    }
}