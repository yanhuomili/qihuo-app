import {fromJS} from 'immutable';
import {BANK_TYPE_YINSHENGBAO, BANK_TYPE_KUAIQIAN} from 'constants';
import { numberFloor } from 'lib/utils';

const initialState = fromJS({
    income: "",
    incomeDollar:"",
    bank: null,
    rate: 0,
    tel: "",
    alipay: "",
    alipayAddress:"",
    pingAn: "",
    thirdOptCode:"",
    channel: BANK_TYPE_KUAIQIAN,
    showBanksSelect:false,
    kuaiQianTel:'',
    alipayInstalled:null
});
const reducers = {
    SET_RATE(state, {rate}){
        return state.set("rate", rate);
    },
    SET_SHOW_BANKS_SELECT(state,{show}){
       return state.set('showBanksSelect',show);
    },
    SET_INCOME(state, {income}){
        const rate = state.get('rate');
        const incomeDollar = numberFloor(parseFloat(income)*rate);
        return state.set('income', income).set('incomeDollar',incomeDollar);
    },
    SET_INCOME_DOLLAR(state,{incomeDollar}){
        const rate = state.get('rate');
        const income = numberFloor(parseFloat(incomeDollar)/rate);
      return state.set('incomeDollar',incomeDollar).set('income',income);
    },
    SET_ALIPAY_ACCOUNT(state, {alipay}){
        return state.set('alipay', alipay);
    },
    SET_ALIPAY_ADDRESS(state, {alipay}){
        return state.set('alipayAddress', alipay);
    },
    SET_THIRD_OPT_CODE(state,{ thirdOptCode}){
        return state.set('thirdOptCode', thirdOptCode);
    },
    SET_PING_AN_ACCOUNT(state, {pingAn}){
        return state.set('pingAn', pingAn);
    },
    SET_CHANNEL(state,{channel}){
        return state.set('channel', channel);
    },
    SET_BANK(state, {bank}){
        return state.set('bank', bank);
    },
    SET_DEFAULT_DATA(state , {rate, defaultBank, tel} ){
        return state.set('rate', rate)
            .set('tel', tel)
        .set('bank', defaultBank);
    },
    SET_TEL(state, {tel}){
        return state.set('tel', tel);
    },
    SET_BANK_LIMIT(state,{limit}){
        return state.set('limit',limit);
    },
    SET_KUAIQIAN_TEL(state,{tel}){
       return state.set('kuaiQianTel',tel);
    },
    SET_ALIPAY_INSTALLED(state,{installed}){
       return state.set('alipayInstalled',installed);
    }
};
export const incomeReducers = (state = initialState, {type, param}) => {
    if (reducers[type]) {
        return reducers[type](state, param);
    } else {
        return state;
    }
};