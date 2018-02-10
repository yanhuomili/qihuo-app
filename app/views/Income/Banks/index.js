import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import {connect} from 'react-redux';
import {SvgIcon} from 'components/Icon';
import AjaxLoader from 'components/AjaxLoader';
import Bank from '../Bank';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import {USER_BANKS, USER_CHARGE_BANK_LIST} from 'lib/api';
import "./style.less";
import alipayPic from './images/svg_alipay.png';
import kuaiqianPic from './images/kuaiqian.png';
import addBank from './images/svg_add_bank.png';
import BottomSlider from 'components/BottomSlider';
import pingAn from './images/pingan.png';
import { redirect, replace, back} from 'lib/utils';
import { PAY_TYPE_ALIPAY, PAY_TYPE_PINGAN, PAY_TYPE_NEW,AJAX_CODE_SUCCESS } from 'constants';
export const alipay = {
    bankName: "支付宝",
    bankPic: alipayPic,
    id: PAY_TYPE_ALIPAY,
    description: "手机支付，免手续费，20分钟内到账"
};
export const pingAnBank = {
    bankName: "平安银行",
    bankPic: pingAn,
    id: PAY_TYPE_PINGAN,
    description: "大额支付，$7000起步"
};
export const addNewBank = {
    bankName: "添加银行卡付款",
    bankPic: addBank,
    id: PAY_TYPE_NEW,
    description: ""
};
class AjaxContent extends React.Component {
    render() {
        const {data, bank} = this.props;
        let id = null;
        if (bank) {
            id = bank.id;
        }
        let newData = [
            addNewBank
            //,pingAnBank
        ];
        if (data && data instanceof Array) {
            data.forEach(item => newData.unshift(item));
        }
        return (
            <div className="banks-container">
                {
                    newData.map((item, idx) => <Bank data={ item } key={idx}
                                                     onClick={ (channel) =>{
                        /*
                        if(channel !== undefined){
                            this.props.setChannel(channel);
                        }
                        */
                        if(item.id === PAY_TYPE_NEW){
                            redirect("/bankcard_add");
                        }else{
                            const { chargeAmt } = item;
                            this.props.setLimit(chargeAmt);
                            this.props.setBank(item);
                            this.props.setIncome("");
                        }
                        this.props.hideBanksList();
                    }} selected={ id === item.id } showChannel
                                                     showArrow={ item.id === PAY_TYPE_NEW}/>)
                }
            </div>
        );
    }
}
AjaxContent.defaultProps = {
    alipay: {},
    pingAnBank: {}
};

AjaxContent.props = {
    data: PropTypes.array
};

const mapStateToProps = (state) => {
    return state.incomeReducers.toJS();
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);

};
const ConnectedAjaxContent = connect(mapStateToProps, mapDispatchToProps)(AjaxContent);
export class Banks extends React.Component {
    render() {
        const {showBanksSelect} = this.props;
        return (
            showBanksSelect ?
                <BottomSlider title="选择银行卡"
                              onClose={ this.props.hideBanksList }>
                    <AjaxLoader config={ USER_CHARGE_BANK_LIST }
                                content={ ConnectedAjaxContent } responseHandler={ resp => {
                                    if(resp.code === AJAX_CODE_SUCCESS){
                                       return resp.data;
                                    }
                                    if(resp.code === "USY0003"){
                                        return [];
                                    }
                                }}/>
                </BottomSlider>
                :
                null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banks);