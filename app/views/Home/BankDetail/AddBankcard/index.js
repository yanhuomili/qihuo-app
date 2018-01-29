import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import Icon from 'components/Icon/SvgIcon';
import {back, redirect, splitCardNum,protocolTransfer} from 'lib/utils';
import Button from 'components/Button';
import Api, {ACCOUNT_INFO, BANK_LIST, BANK_ADD} from 'lib/api';
import {notif, success, error} from 'components/Notifications';
import Select from 'components/BankSelect';
import {parse} from 'query-string';
import {AJAX_CODE_SUCCESS,AJAX_BANK_VERIFY_FAILED,AJAX_BANK_VERIFY_LIMITED } from 'constants';
import './style.less';
export default class AddBankcard extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            selectedBank: "",
            num: "",
            nameArr: [],
            showSelectDropdown: false,
            showErrorInfo:false,
            errorInfo:""
        };
    }

    numKeyUp() {//银行卡号keyup事件处理
        let val = this.refs.num.value;
        if (val.length > 20) {
            val = val.substring(0, 20);
            this.refs.num.value = val;
        }
        this.setState({num: val});
    }

    clear() {//清空
        this.setState({num: ""});
        this.refs.num.value = "";
    }

    add() {//添加银行卡
        const {selectedBank, num} = this.state;
        if (selectedBank && num) {
            Api.fetch(BANK_ADD, {
                bankCode: selectedBank.value,
                cardNum: num
            }, (data) => {
                if (data.code === AJAX_CODE_SUCCESS || data.code === 200) {
                    const self = this;
                    notif("添加成功！", 'success', [
                        {
                            text: "确定", action(fnClose){
                            fnClose();
                            const {url} = parse(window.location.search);
                            if (url) {
                                redirect(url);
                            } else {
                                back();
                            }
                        }
                        }
                    ]);
                } else if(data.code === AJAX_BANK_VERIFY_FAILED || data.code === AJAX_BANK_VERIFY_LIMITED){
                    let errorInfo = `请正确添加 ${ this.state.userName || "--" } 名下的银行储蓄卡`;
                    if((data.data && data.data.openingCount === 0 ) || data.code === AJAX_BANK_VERIFY_LIMITED){
                        errorInfo= "单日验证次数超过限制，请明天再来";
                    }
                    this.setState({errorInfo,showErrorInfo:true});
                    setTimeout(()=>{
                        this.setState({showErrorInfo:false});
                    },5000);
                } else if (data.code == "US05001") {
                    notif(data.msg, 'error', [
                        {
                            text: "确定", action(fnClose){
                            fnClose();
                            redirect("/bank_detail");
                        }
                        }
                    ]);
                } else {
                    error(data.msg);
                }
            }, true);
        }
    }

    componentWillMount() {
        //获取用户名
        Api.fetch(ACCOUNT_INFO, {}, (data) => {
            this.setState({userName: data.name});
        });
        //银行列表
        Api.fetch(BANK_LIST, {}, (data) => {
            let arr = [];
            data.map((item) => {
                arr.push({
                    text: item.bankName,
                    value: item.bankCode,
                    bankPic: item.bankPic
                })
            });
            this.setState({nameArr: arr});
        });
    }

    render() {
        const {selectedBank}= this.state;
        return (
            <Container>
                <AppBar title="添加银行卡" backward fixed />
                <div className="add-bankcard">
                    <div className="info">
                        <div className="tip">添加您的入金银行卡信息</div>
                        <div className="name">
                            请填写与<span>{ this.state.userName || "--" }</span>信息一致的储蓄卡
                        </div>
                        <div className="infoItem">
                            <div className="label">请选择银行</div>
                            <Select options={ this.state.nameArr }
                                    value={ selectedBank } onChange={
                                (name,value)=>{
                                    this.setState({selectedBank:value});
                                } }
                                    placeholder="请选择开户行"
                                    template={ (props)=>{
                                        const { value,placeholder } = props;
                                       return (
                                           <div>
                                               {
                                               value ?
                                               <div className="value">
                                                   <img src={ protocolTransfer(value.bankPic)} />
                                                   <span>{value.text}</span>
                                               </div>
                                                :
                                                <span className="placeholder">{placeholder}</span>
                                               }
                                           </div>
                                       );
                                    } }
                            />
                        </div>
                        <div className="infoItem num_input">
                            <div className="label">请输入正确的银行卡号</div>
                            <div><input type="number" ref="num"
                                        placeholder="请输入银行卡号码"
                                        onKeyUp={ this.numKeyUp.bind(this) }/>
                            </div>
                            { this.state.num != "" ?
                                <Icon name="delete"
                                      onClick={ this.clear.bind(this) }/> : null }
                        </div>
                    </div>
                    {
                        this.state.showErrorInfo ?
                            <div className="error-info">
                                <Icon name="circle_exclamation" />
                                <span className="text">
                                    { this.state.errorInfo }
                                </span>
                            </div>
                            :
                            (this.state.num ?
                            <div className="num">{ splitCardNum(this.state.num) }</div>
                                :
                                    <div onClick={ _=>{
                                        redirect('/bank_limit');
                                    }} className="view-bankcard">查看银行卡列表</div>
                            )
                    }
                    <Button text="添加"
                            disabled={!(this.state.selectedBank && this.state.num) }
                            onClick={ this.add.bind(this) }/>
                </div>
            </Container>
        )
    }
}