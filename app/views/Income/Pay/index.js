import React from 'react';
import Container from 'components/Container';
import {connect} from 'react-redux';
import PaddedContent from 'components/PaddedContent';
import Row from 'components/Row';
import Button from 'components/Button';
import AppBar from 'components/AppBar';
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
let tHandler = null;
export class Pay extends React.Component {
    state = {
        verify: "",
        code: "",
        timer: 0
    };

    getCode() {
        const {tel, rate, bank, income, incomeDollar} = this.props;
        Api.fetch(GET_KUAIQIAN_VERIFY_CODE, {
            amt: incomeDollar,
            rmbAmt: income,
            telephone: tel,
            bankId: bank.id
        }, (resp) => {
            this.setState({code: resp.msg});
        });
        this.setState({timer: 60}, () => {
            const fn = () => {
                const {timer} = this.state;
                if (timer === 0) {
                    return;
                }
                this.setState({timer: timer - 1});
                tHandler = setTimeout(fn, 1000);
            };
            fn();
        });
    }

    doPay() {
        const {tel, bank, income} = this.props;
        const {verify, code} = this.state;
        if (!code) {
            return error("当前验证码已失效，请重新获取验证码");
        }
        Api.fetch(RECHARGE_BY_KUAIQIAN, {
            validCode: verify,
            code,
            telephone: tel,
            bankCardNum: bank.bankCardNum
        }, (resp) => {
            redirect("/income/success");
        });
    }

    componentWillUnmount() {
        clearTimeout(tHandler);
    }

    render() {
        const {verify, timer} = this.state;
        const {rate, income, tel, incomeDollar, kuaiQianTel} = this.props;
        return (
            <Container className="pay-container">
                <AppBar backward title="入金" fixed/>
                <Row>
                    <PaddedContent className="dark">
                        <div className="label">入金金额</div>
                        <div className="money">
                            <span className="unit">￥</span>
                            <span
                                className="num">{numberFloorFormat(income)}</span>
                        </div>
                        <div className="desc">
                            折合美元约：${numberFloorFormat(incomeDollar)}</div>
                    </PaddedContent>
                </Row>
                <Row>
                    <PaddedContent className="dark input-container">
                        <label>手机号</label>
                        <input
                            type="text"
                            readOnly={ !!kuaiQianTel }
                            value={ kuaiQianTel || tel}
                            ref="tel"
                            onChange={ e => this.props.setTel(e.target.value ) }
                        />
                        {
                            kuaiQianTel ?
                                null
                                :
                                <div className="pull-right">
                                    {tel && <SvgIcon name="delete" onClick={
                            _ => this.props.setTel("")
                        }/> }
                                </div>
                        }
                    </PaddedContent>
                </Row>
                <Row>
                    <PaddedContent className="dark input-container">
                        <label>验证码</label>
                        <input
                            type="text"
                            value={ verify }
                            onChange={ e => this.setState({verify:e.target.value })}
                        />
                        <div className="pull-right">
                            {
                                timer === 0 ?
                                    <div className="btn-verify"
                                         onClick={ this.getCode.bind(this) }>
                                        点击获取</div>
                                    :
                                    <div className="timer">{timer}<span
                                        className="second-unit">s</span></div>
                            }
                        </div>
                    </PaddedContent>
                </Row>
                <Row>
                    <PaddedContent>
                        <Button text="立即支付" onClick={ this.doPay.bind(this) }
                                disabled={ !this.state.verify || !this.props.tel}/>
                    </PaddedContent>
                </Row>
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
