import Api, {
    USER_DEFAULT_DATA,
    USER_CHARGE_MAX_AMT,
    USER_CHARGE_BANK_LIST
} from 'lib/api';
import { error,info } from 'components/Notifications';
import {alipay} from "./Banks";
import { redirect } from 'lib/utils';
import { AJAX_DAY_LIMITED ,AJAX_CODE_SUCCESS } from 'constants';
export const setIncome = (income) => {
    let i = income;
    if (isNaN(income)) {
        i = 0;
    }
    return {type: "SET_INCOME", param: {income: i}};
};

export const setIncomeDollar = (incomeDollar) => {
    let i = incomeDollar;
    if (isNaN(incomeDollar)) {
        i = 0;
    }
    return {type: "SET_INCOME_DOLLAR", param: {incomeDollar: i}};
};

export const setAlipayAccount = (alipay) => {
    return {type: "SET_ALIPAY_ACCOUNT", param: {alipay}};
};

export const setAlipayAddress = (alipayAddress) => {
    return {type: "SET_ALIPAY_ADDRESS", param: {alipayAddress}};
};

export const setThirdOptCode= (thirdOptCode) => {
    return {type: "SET_THIRD_OPT_CODE", param: {thirdOptCode}};
};
export const setPingAnAccount = (pingAn) => {
    return {type: "SET_PING_AN_ACCOUNT", param: {pingAn}};
};
export const setBank = (bank) => {
    return {type: "SET_BANK", param: {bank}};
};

export const setChannel = (channel) => {
    return {type: "SET_CHANNEL", param: {channel}};
};

export const setTel = (tel) => {
    return {type: "SET_TEL", param: {tel}};
};
export const setAlipayInstalled = (installed)=>{
    return { type:"SET_ALIPAY_INSTALLED",param:{installed}};
};
export const showBanksList = () => {
    return {type: "SET_SHOW_BANKS_SELECT", param: {show: true}};
};

export const hideBanksList = () => {
    return {type: "SET_SHOW_BANKS_SELECT", param: {show: false}};
};
export const setKuaiQianTel = (tel)=>{
    return { type:"SET_KUAIQIAN_TEL",param:{tel}};
};

export const setDefaultData = () => {
    return (dispatch) => {
        dispatch({
            type: "SET_BANK",
            param: {bank:null}
        });
        dispatch({
            type:"SET_INCOME",
            param:{income:""}
        });
        Api.fetch(USER_DEFAULT_DATA, {}, (data) => {
            const {tele, rate, ...defaultBank} = data || {};
            let bank = defaultBank;
            const {bankCode, bankCardNum} = defaultBank;
            if(!defaultBank.bankCode){
               return info("请先绑定您的银行卡",(fnClose)=>{
                   redirect("/bankcard_add");
                    fnClose && fnClose();
                });
            }
            if (!defaultBank.bankCode) {
                bank = alipay;
            }
            Api.fetch(USER_CHARGE_MAX_AMT, {
                bankCode,
                bankCard: bankCardNum
            }, (resp) => {
                const {amt} = resp;
                bank.chargeAmt = amt;
                dispatch({
                    type: "SET_DEFAULT_DATA",
                    param: {tel: tele, rate, defaultBank: bank}
                });
                dispatch({type: "SET_BANK_LIMIT", param: {limit: amt}});
            });
        });

    };
};
export const setLimit = (limit)=>{
    return {type: "SET_BANK_LIMIT", param: {limit}};
};

export const setRate = (rate) => {
    return {type: "SET_RATE", param: {rate}}
};

export const setBank_acc_name = (bank_acc_name) => {
    return {type:"BANK_ACC_NAME",param:{bank_acc_name}}
}
