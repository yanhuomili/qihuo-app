import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import Button from 'components/Button';
import {SvgIcon} from 'components/Icon';
import {connect} from 'react-redux';
import {error, confirm, notif, success} from 'components/Notifications';
import * as actionCreators from './actions';
import {bindActionCreators} from 'redux';
import {startLoading, stopLoading} from 'components/App/actions';
import {
    PAY_TYPE_ALIPAY,
    PAY_TYPE_PINGAN,
    INPUT_TYPE_DOLLAR,
    INPUT_TYPE_CNY,
    BANK_TYPE_ZHIFU_MOBILE,
    BANK_TYPE_KUAIQIAN,
    BANK_TYPE_YINSHENGBAO,
    BANK_TYPE_ALIPAY,
    BANK_TYPE_ALIPAY_2,
    BANK_TYPE_ALIPAY_3,
    BANK_TYPE_ALIPAY_4,
    BANK_TYPE_ALIPAY_5,
    BANK_TYPE_ALIPAY_6,
    BANK_TYPE_ALIPAY_7,
    BANK_TYPE_ALIPAY_8,
    BANK_TYPE_ALIPAY_9,
    BANK_TYPE_DADDY_PAY,
    BANK_TYPE_QIAN_TONG,
    BANK_TYPE_WEI_FU_TONG,
    BANK_TYPE_ALIPAY_MANUAL,
    WEI_FU_TONG_TYPE_ALIPAY,
    WEI_FU_TONG_TYPE_WECHAT,
    BANK_TYPE_AI_BEI,
    BANK_TYPE_ETONE,
    BANK_TYPE_DADDY_TRASFER,
    BANK_TYPE_ETONE_QUICK
} from 'constants';
import Bank from './Bank';
import './style.less';
import Api, {
    USER_DEFAULT_BANK,
    YIN_SHENG_BAO,
    INCOME_LIMIT,
    RECHARGE_BY_PINGAN,
    USER_CHARGE_CHANNEL,
    ALIPAY_QUICK,
    GET_INCOME_LIMIT,
    DADDY_PAY
} from 'lib/api';
import {
    replace,
    redirect,
    numberFormat,
    numberFloorFormat,
    onceFactory,
    isAndroid,
    isiOS,
    goAlipay
} from 'lib/utils';
import {formSubmit} from 'components/FormSubmit';
import IncomeInput from 'components/IncomeInput';
import {autobind} from 'core-decorators';
import IncomeConfirm from './IncomeConfirm';
import {parse} from 'query-string';
import Banks from './Banks';

const pingAnIncome = [50000, 100000, 200000];
let runOne = null;

@autobind
export class Income extends React.Component {

    constructor() {
        super();
        this.state = {
            bankData: {},
            alipayAccount: "",
            incomeLimit: 300
        };
    }

    updateIncome(name, value, type) {
        let arrVal = value.split(".");
        if (arrVal.length <= 2) {
            if (value !== "") {
                if ((arrVal.length === 2 && arrVal[1].length > 2) || !/^[\.0-9]+$/.test(value)) {
                    return;
                }
            }
            if (type === INPUT_TYPE_CNY) {
                this.props.setIncome(value);
            } else {
                this.props.setIncomeDollar(value);
            }
        }
    }

    goAlipay(channel) {
        //return redirect("/income/alipay");
        const {income, incomeDollar, bank, alipayInstalled} = this.props;
        let optCode = "1010101F";
        if (channel !== BANK_TYPE_ALIPAY) {
            optCode = channel;
        }
        Api.fetch(ALIPAY_QUICK, {
            amt: incomeDollar,
            rmbAmt: income,
            bankCardId: bank.id,
            thirdOptCode: optCode
        }, (resp) => {
            const {action, reqUrl, code,groupId, msg, ...param} = resp;
            if (reqUrl) {
                window.location.href = reqUrl;
            } else {
                if (alipayInstalled || alipayInstalled !== false) {
                    goAlipay(action, param);
                    //formSubmit({action , method: "POST", data: param});
                    setTimeout(() => {
                        this.refs.incomeConfirm.setShow(true);
                        this.props.stopLoading();
                    }, 3000);
                } else {
                    error("系统未检测到支付宝，请安装支付宝并退出APP重试");
                }
            }
        });
    }
    goAiBei(channel){
        const {income, incomeDollar, bank, alipayInstalled} = this.props;
        Api.fetch(ALIPAY_QUICK, {
            amt: incomeDollar,
            rmbAmt: income,
            bankCardId: bank.id,
            thirdOptCode: channel
        }, (resp) => {
            const { reqUrl } = resp;
            window.location.href = reqUrl;
        });

    }

    goPayCommon(channel) {
        const {income, incomeDollar, bank, alipayInstalled} = this.props;
        Api.fetch(ALIPAY_QUICK, {
            amt: incomeDollar,
            rmbAmt: income,
            bankCardId: bank.id,
            thirdOptCode: channel
        }, (resp) => {
            const { reqUrl,code,groupId, msg, ...param} = resp;
            if (alipayInstalled || alipayInstalled !== false) {
                formSubmit({action:reqUrl , method: "POST", data: param});
                setTimeout(() => {
                    this.refs.incomeConfirm.setShow(true);
                    this.props.stopLoading();
                }, 3000);
            } else {
                error("系统未检测到支付宝，请安装支付宝并退出APP重试");
            }
        });
    }
    goAlipayManual(channel,alipayAccount ,alipayAddress) {
        const {income, incomeDollar, bank, alipayInstalled} = this.props;
        if(alipayAccount){
            this.props.setAlipayAccount(alipayAccount);
            this.props.setAlipayAddress(alipayAddress);
        }
        console.log(channel);
        this.props.setThirdOptCode(channel);
        redirect("/income/alipay");
        /*
        if(alipayInstalled === false){
            redirect("/income/alipay");
         }else if(alipayInstalled === null){
            error("未检测到是否安装支付宝");
         }
         */
    }

    goAlipay2() {
        const {income, incomeDollar, bank, alipayInstalled} = this.props;
        Api.fetch(ALIPAY_QUICK, {
            amt: incomeDollar,
            rmbAmt: income,
            bankCardId: bank.id,
            thirdOptCode: "1010107"
        }, (resp) => {
            const {req_url, code,groupId , msg, ...param} = resp;
            if (alipayInstalled || alipayInstalled !== false) {
                setTimeout(() => {
                    this.refs.incomeConfirm.setShow(true);
                    this.props.stopLoading();
                }, 3000);
                formSubmit({action: req_url, method: "POST", data: param});
            } else {
                error("系统未检测到支付宝，请安装支付宝并退出APP重试");
            }
        });
    }

    goYinShengBao() {
        let {income, bank, incomeDollar} = this.props;
        Api.fetch(YIN_SHENG_BAO, {
            responseUrl: `${location.origin}/m/income?showConfirm=true`,
            bankCardId: bank.id,
            amount: incomeDollar,
            rmbAmt: income,
            bankCode: bank.bankCode
        }, (resp) => {
            const {unspayUrl,groupId, ...param} = resp;
            formSubmit({action: unspayUrl, method: "GET", data: param});
        });
    }

    goKuaiQian() {
        redirect("/income/pay");
    }

    rechargeByPingAn() {
        const {income, pingAn} = this.props;
        Api.fetch(RECHARGE_BY_PINGAN, {
            amt: income,
            transferNum: pingAn
        }, (resp) => {
            window.location.href = "https://b.pingan.com/youhui/bank_kk/bzj/zjrcd.shtml";
        });
    }

    goZhiFu() {
        let {income, bank, incomeDollar} = this.props;
        if (isAndroid) {
            window.AppJs && window.AppJs.dinPay(income, incomeDollar, bank.id);
        } else if (isiOS) {
            window.location = `goto://dinPay?usdAmt=${incomeDollar}&cnyAmt=${income}&bankId=${bank.id}`;
        }
    }

    goDaddyPay() {
        const {income, incomeDollar, bank} = this.props;
        Api.fetch(ALIPAY_QUICK, {
            amt: incomeDollar,
            rmbAmt: income,
            bankCardId: bank.id,
            thirdOptCode: BANK_TYPE_DADDY_PAY
        }, (resp) => {
            const {returnUrl,groupId, code, msg, ...param} = resp;
            setTimeout(() => {
                this.refs.incomeConfirm.setShow(true);
                this.props.stopLoading();
            }, 3000);

            if(window.AppJs){
                window.AppJs.openNewWeb(returnUrl,true);
            }else{
                //let jumpUrl =  `goto://newH5?link=${returnUrl}`;
                window.location.href=returnUrl;

            }
        });
    }

    goQianTong() {
        redirect("/income/qiantong");
    }

    goWeiFuTong() {
        const {income, incomeDollar, bank} = this.props;

        const fn = (type) => {
            return (fnClose) => {
                fnClose();
                const app = type === WEI_FU_TONG_TYPE_ALIPAY ? "支付宝" : "微信";
                const WechatQrCode = (props) => {
                    const {url} = props;
                    return (
                        <div className="wechat-qr-code">
                            <div className="title">{app}"扫一扫"支付</div>
                            <img src={url} width="150"/>
                            <div className="description">
                                <div>1.截图保存到相册 </div>
                                <div>2.打开{app}"扫一扫"功能 完成支付</div>
                            </div>
                        </div>
                    )
                };
                Api.fetch(ALIPAY_QUICK, {
                    amt: incomeDollar,
                    rmbAmt: income,
                    bankCardId: bank.id,
                    thirdOptCode: BANK_TYPE_WEI_FU_TONG,
                    type
                }, (resp) => {
                    const {codeUrl, codeImgUrl} = resp;
                    if (type === WEI_FU_TONG_TYPE_ALIPAY) {
                        if(isiOS){
                            success(<WechatQrCode url={codeImgUrl}/>);
                        }else{
                            window.open(codeUrl);
                        }
                    } else {
                        success(<WechatQrCode url={codeImgUrl}/>);
                    }
                });
            };
        };
        notif("请选择支付方式", 'confirm', [
            {
                text: "支付宝",
                action: fn(WEI_FU_TONG_TYPE_ALIPAY)
            },
            {
                text: "微信",
                action: fn(WEI_FU_TONG_TYPE_WECHAT)
            }
        ]);
    }

    getETonePay(channel) {
        const {income, incomeDollar, bank} = this.props;
        Api.fetch(ALIPAY_QUICK, {
            amt: incomeDollar,
            rmbAmt: income,
            bankCardId: bank.id,
            thirdOptCode: channel
        }, (resp) => {
            const {returnUrl,groupId, code, msg, ...param} = resp;
            setTimeout(() => {
                this.refs.incomeConfirm.setShow(true);
                this.props.stopLoading();
            }, 3000);
            if(window.AppJs){
                window.AppJs.openNewWeb(returnUrl,true);
            }else{
                let jumpUrl =  `goto://newH5?link=${returnUrl}`;
                window.location.href=jumpUrl;
            }
        });
    }

    getEoneQuickPay(channel){
        this.props.setChannel(channel);
        redirect("/income/etomequick");
    }

    getDaddyPayTransfer(channel){
        const {income, incomeDollar, bank} = this.props;
        Api.fetch(ALIPAY_QUICK, {
            amt: incomeDollar,
            rmbAmt: income,
            bankCardId: bank.id,
            thirdOptCode: channel
        }, (resp) => {
           // const {bank_acc_name,bank_card_num, note, amount, issuing_bank_address} = resp;
            console.log(resp);
            this.props.setChannel(resp);
            redirect("/income/daddytransfer");
        });
    }

    getRongZhifuPay(channel){
        const {income, incomeDollar, bank, alipayInstalled} = this.props;
        Api.fetch(ALIPAY_QUICK, {
            amt: incomeDollar,
            rmbAmt: income,
            bankCardId: bank.id,
            thirdOptCode: channel
        }, (resp) => {
            const { reqUrl } = resp;
            window.location.href = reqUrl;
        });
    }



    nextStep() {
        const {bank, income, channel, incomeDollar} = this.props;
        const {bankCode, bankCardNum} = bank;
        Api.fetch(USER_CHARGE_CHANNEL, {
            bankCode,
            bankCard: bankCardNum,
            amount: income
        }, (resp) => {
            const {channel,groupId,alipayAccount,reqUrl } = resp;
            if(channel === '1010108'){
                this.goAlipayManual(channel,alipayAccount);
            } else if(groupId === "Alipay"){
                this.goPayCommon(channel,alipayAccount);
            } else if(groupId ==="Iapppay" ){
                this.goAiBei(channel);
            } else if(groupId ==="QianTongPay" ){
                this.goQianTong();
            } else if(groupId ==="SwiftPass" ){
                this.goWeiFuTong();
            }else if(groupId === "DaddyPay"){
                this.goDaddyPay();
            }else if(groupId === "AlipayTransfer"){
                this.goAlipayManual(channel,alipayAccount,reqUrl);
            }else if(groupId == "ETonepay"){
                this.getETonePay(channel);
            }else if(groupId == "EToneQuickpay"){
                this.getEoneQuickPay(channel);
            }else if(groupId == "DaddyPayTransfer"){
                this.getDaddyPayTransfer(channel);
            }else if(groupId == "RongZhiFuPay"){
                this.getRongZhifuPay(channel);
            }
        });

    }

    componentWillMount() {
        const {bank, rate} = this.props;
        const param = parse(this.props.location.search);
        if (param && param.showConfirm) {
            replace("/income");
            runOne = onceFactory();
        }
        if (param && param.alipayinstall) {
            this.props.setAlipayInstalled(param.alipayinstall === 'true');
        }
        this.props.setDefaultData();
        Api.fetch(GET_INCOME_LIMIT, {}, (resp) => {
            const {minRecharegeAmount} = resp;
            this.setState({incomeLimit: parseFloat(minRecharegeAmount)});
        });
    }

    componentDidMount() {
        runOne && runOne(() => {
            this.refs.incomeConfirm.setShow(true);
        });
    }

    alipayAccountChange(name, value) {
        if (/^[0-9a-z@\-_\.]*$/i.test(value)) {
            this.props.setAlipayAccount(value);
        }
    }

    pingAnAccountChange(name, value) {
        this.props.setPingAnAccount(value);
    }

    getDisabledStatus() {
        const {rate, income, bank, pingAn, alipay, limit} = this.props;
        let disabled = true;
        if (!bank) {
            return disabled;
        }
        if (!income || income < this.state.incomeLimit || income > limit) {
            return disabled;
        }
        if (bank.id === PAY_TYPE_ALIPAY) {
            return !alipay;
        } else if (bank.id === PAY_TYPE_PINGAN) {
            return !pingAn;
        } else {
            return false;
        }
    }

    customerService() {
        if (isAndroid) {
            window.AppJs.openCustomService();
        } else {
            window.location.href = "goto://openCustomService";
        }
    }

    render() {
        const {rate, income, bank, pingAn, alipay, incomeDollar, limit} = this.props;
        const disabled = this.getDisabledStatus();
        return (
            <Container
                className="ns-income"
            >
                <AppBar
                    title="入金"
                    backward
                    fixed
                />
                <div onClick={_ => {
                    this.props.showBanksList();
                }}
                     className="banks-selector">
                    <Bank data={bank || {}} showArrow/>
                </div>
                <IncomeInput
                    onChange={this.updateIncome}
                    label="入金金额"
                    unit="￥"
                    value={income}
                    incomeDollar={incomeDollar}
                    placeholder={`最低${this.state.incomeLimit.toFixed(2)}元`}
                    type="number"
                    rate={rate}
                    defaultValue="8000.00"
                    additionalMessage={income > limit ?
                        `超出银行卡限额：￥${limit}` :
                        `折合美元：$ ${incomeDollar ? numberFloorFormat(incomeDollar) : "0.00"}`}
                    limited={limit}
                />
                <div className="button-container">
                    <Button
                        text="下一步"
                        disabled={disabled}
                        onClick={this.nextStep}
                    />
                </div>
                <div className="notice-container">
                    <h6>
                        温馨提示：
                    </h6>
                    <p>
                        1.不同银行支持限额不同，具体请<span className="support-bank"
                                              onClick={_ => {
                                                  redirect("/bank_limit");
                                              }}
                    >查看支持银行卡</span><br/>
                        2.入金过程中如遇问题，请联系<span className="service-link"
                                             onClick={this.customerService}>在线客服</span>
                        <br/>
                    </p>
                </div>
                <IncomeConfirm ref="incomeConfirm"/>
                <Banks/>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return state.incomeReducers.toJS();
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({...actionCreators, stopLoading}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Income);

