import React, {Component} from 'react';
import {Modal} from 'components/Notifications';
import { openServiceQQ,redirect,callService,isAndroid,isiOS } from 'lib/utils';
import { autobind } from 'core-decorators';
import { SvgIcon } from 'components/Icon';
import "./style.less";

@autobind
export default class IncomeConfirm extends Component {
    state = {
        show:false
    };
    setShow(show){
       this.setState({show});
    }
    render() {
       const { show }  = this.state;
        return (
            <Modal show={ show } setShow={ this.setShow } type="income-confirm" buttons={[
                {
                    text:"入金完成",
                    action(){
                        redirect("/");
                    }
                },
                {
                    text:"联系客服",
                    action(fnClose){
                        // redirect("/customer_service");
                        if(isAndroid){
                            window.AppJs.openCustomService();
                        }else{
                            window.location.href = "goto://openCustomService";
                        }
                        fnClose();
                    },
                }
            ]}>
                <div className="close-wrapper">
                    <SvgIcon name="cross" onClick={ _=>{
                        this.setShow(false);
                    }} />
                </div>
                <ul className="income-confirm-content">
                    <li className="first-row">
                        <SvgIcon name="exclamation_circle" />
                        <h3>入金是否完成？</h3>
                        <div className="desc"> 入金如果未完成请联系客服进行处理！ </div>
                    </li>
                </ul>
            </Modal>
        )
    }
}