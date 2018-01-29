import React from 'react';
import Container from 'components/Container';
import {connect} from 'react-redux';
import PaddedContent from 'components/PaddedContent';
import IncomeConfirm from '../IncomeConfirm';
import Row from 'components/Row';
import Button from 'components/Button';
import AppBar from 'components/AppBar';
import Input from 'components/Input';
import {SvgIcon} from 'components/Icon';
import {error} from 'components/Notifications';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import Api, {
    GET_KUAIQIAN_VERIFY_CODE,
    INCOME_PAY_DATA,
    RECHARGE_BY_KUAIQIAN
} from 'lib/api';
import {redirect, numberFloorFormat} from 'lib/utils';
import './style.less';
export class Pay extends React.Component {
    state = {
        alipay: ""
    };

    doPay() {
        const {alipay} = this.props;
        const { income, incomeDollar,bank,alipayAddress,thirdOptCode } = this.props;
        Api.fetch({
            "cmd": "fund",
            "func": "alipayTransfer"
        }, {
            "transferNum": bank.bankCardNum,//银行账号(袁欣说)
            "bankCode":bank.bankCode,//银行编号(袁欣说)
            "alipay_num":alipay,//支付宝账号(袁欣说不改)
            "amt": incomeDollar,
            "rmbAmt": income,
            thirdOptCode
        }, (resp) => {
            setTimeout(_ => {
                this.refs.incomeConfirm.setShow(true);
            }, 500);
            const { reqUrl } = resp;
            //console.log(resp);
            ////let url = "https://qr.alipay.com/FKX06707PFNMDWFMYTB4B0";
            window.location.href = reqUrl;
            //alipayAddress;
        });
    }


    render() {
        const {income, incomeDollar} = this.props;
        const {alipay} = this.props;
        return (
            <Container className="alipay-container">
                <AppBar backward title="入金" fixed/>
                <Row>
                    <PaddedContent className="dark">
                        <div className="label">入金金额</div>
                        <div className="money">
                            <span className="unit">￥</span>
                            <span className="num">{numberFloorFormat(income)}</span>
                        </div>
                        <div className="desc">折合美元约：${numberFloorFormat(incomeDollar)}</div>
                    </PaddedContent>
                </Row>
                <Row>
                    <Input label="支付宝账号"
                           onChange={ (name,value)=>{
                               if(/^[0-9\.a-z@]+$/i.test(value) || value === ""){
                                   this.props.setAlipayAccount(value);
                               }
                           }}
                           value={ alipay }
                           placeholder="输入支付宝账号"
                           additionalMessage="为确保资金及时到账，请正确填写支付宝账号。"/>
                </Row>
                <Row>
                    <PaddedContent>
                        <Button text="立即支付" onClick={ this.doPay.bind(this) }
                                disabled={ !alipay }/>
                    </PaddedContent>
                </Row>
                <IncomeConfirm ref="incomeConfirm"/>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return state.incomeReducers.toJS();
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Pay);
