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
import {TextItem} from 'components/TextItem';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import copy from 'copy-to-clipboard'
import {
    BANK_TYPE_QIAN_TONG,
    BANK_TYPE_ETONE_QUICK} from 'constants';
import Api, {
    GET_KUAIQIAN_VERIFY_CODE,
    INCOME_PAY_DATA,
    RECHARGE_BY_KUAIQIAN,
    ALIPAY_QUICK,
    RECHARGE_BY_QIANTONG
} from 'lib/api';
import {redirect, numberFloorFormat} from 'lib/utils';
import IncomeConfirm from '../IncomeConfirm';
import './style.less';
let tHandler = null;
export class Pay extends React.Component {

    state = {
        verify: "",
        code: "",
        timer: 0,
        payOrderId:"",
        channel:""
    };


    componentWillUnmount() {
        clearTimeout(tHandler);
    }

    render() {
        const {channel} = this.props;
        let resp =  channel;
        let bank_acc_name = resp.bank_acc_name;
        let bank_card_num = resp.bank_card_num;
        let note = resp.note;
        let amount = resp.amount;
        let issuing_bank_address = resp.issuing_bank_address;
        let collection_bank_id = resp.collection_bank_id;
        return (
            <Container className="pay-container">
                <AppBar backward title="转账信息" fixed/>

                <div className="content">

                <Row>
                    <div className="text_item" >
                        <div className="label_text">收款银行</div>
                        <div className="content_text">{collection_bank_id}</div>
                    </div>
                </Row>

                <Row>
                    <div className="text_item">
                        <div className="label_text">支行名称</div>
                        <div className="content_text">{issuing_bank_address}</div>
                    </div>
                </Row>
                <Row>
                    <div className="text_item">
                        <div className="label_text">收款账户姓名</div>
                        <div className="content_text">{bank_acc_name}</div>
                        <CopyToClipboard text={bank_acc_name}>
                            <button>复制</button>
                        </CopyToClipboard>
                    </div>
                </Row>
                <Row>
                    <div className="text_item">
                        <div className="label_text">收款账号</div>
                        <div className="content_text">{bank_card_num}</div>
                        <CopyToClipboard text={bank_card_num}>
                            <button>复制</button>
                        </CopyToClipboard>
                    </div>
                </Row>
                <Row>
                    <div className="text_item">
                        <div className="label_text">充值金额</div>
                        <div className="content_text">{amount}</div>
                        <CopyToClipboard text={amount}>
                            <button>复制</button>
                        </CopyToClipboard>
                    </div>
                </Row>
                <Row>
                    <div className="text_item">
                        <div className="label_text">附言</div>
                        <div className="content_text">{note}</div>
                        <CopyToClipboard text={note}>
                            <button>复制</button>
                        </CopyToClipboard>
                    </div>
                </Row>
                </div>
                <div className="notice-container">
                    <h6>
                        温馨提示：
                    </h6>
                    <p>
                        1.转账成功充值秒到<br/>
                        2.转账前请确保附言填写正确不然无法到账<br/>
                        3.入金过程中如遇问题，请联系<span className="service-link"
                                             onClick={this.customerService}>在线客服</span>
                        <br/>
                    </p>
                </div>
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
