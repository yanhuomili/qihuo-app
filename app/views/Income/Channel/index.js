import './style.less';
import React, {Component} from 'react';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import imgUnionPay from './images/union_pay.png';
import kuaiqianPic from './images/kuaiqian.png';
import imgAlipay from './images/alipay.png';
import * as actionCreators from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { alipay } from '../Banks';
import { replace,redirect,backToApp,onceFactory } from 'lib/utils';
import { BANK_TYPE_KUAIQIAN, BANK_TYPE_YINSHENGBAO } from 'constants';
import IncomeConfirm from '../IncomeConfirm';
import { parse } from 'query-string';
const ListItem = (props) => {
    const { image,description,onClick,title } = props;
    return (
        <div className="clear-fix channel-item" onClick={ onClick }>
            <div className="pull-left">
                <img src={image} className="image"/>
            </div>
            <div className="pull-right">
                <div className="title">{title}</div>
                <div className="description">{ description }</div>
            </div>
        </div>
    )
};
let runOne = null;
class Channel extends Component {
    componentWillMount() {
        const param = parse(this.props.location.search);
        if(param && param.showConfirm){
            replace("/income");
            runOne = onceFactory();
        }
    }

    componentDidMount(){
        runOne && runOne(()=>{
            this.refs.incomeConfirm.setShow(true);
        });
    }

    render() {
        return (
            <Container className="income-channel">
                <AppBar title="入金" backward />
                <div>
                    <ListItem image={ imgUnionPay } title="快捷支付" description="实时到账 免手续费" onClick={_=>{
                        this.props.setChannel(BANK_TYPE_KUAIQIAN);
                        redirect("/income/banks");
                    }}/>
                    <ListItem image={ kuaiqianPic } title="银行卡支付" description="无需开通网银实时到账" onClick={_=>{
                        this.props.setChannel(BANK_TYPE_YINSHENGBAO);
                        redirect("/income/banks");
                    }}/>
                    <ListItem image={imgAlipay} title="支付宝支付" description="手机支付 免手续费" onClick={_=>{
                        this.props.setBank(alipay);
                        redirect("/income/input_money");
                    }}/>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Channel);