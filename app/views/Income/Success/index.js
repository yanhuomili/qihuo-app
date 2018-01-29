import React from 'react';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import PaddedContent from 'components/PaddedContent';
import Button from 'components/Button';
import { error } from 'components/Notifications';
import svg from './svg_success.svg';
import { redirect,back,dateFormat,openHall } from 'lib/utils';
import { parse } from 'query-string';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import "./style.less";
export class Success extends React.Component{
    render(){
        const { bank,income,incomeDollar } = this.props;
        return (
            <Container >
               <AppBar title="入金" backward={ back } />
                <PaddedContent className="success-container">
                    <div className="result">
                        <img src={ svg } />
                        <div className="income-num">您已经成功入金￥{parseFloat(income).toFixed(2)}（约${ incomeDollar }）</div>
                    </div>
                    <div className="info">
                        <div className="clear-fix">
                            <span className="pull-left"> 交易时间 </span>
                            <span className="pull-right"> { dateFormat(new Date())} </span>
                        </div>
                        <div className="clear-fix">
                            <span className="pull-left">支付方式</span>
                            <span className="pull-right">{bank.bankName}</span>
                        </div>
                    </div>
                    <div className="btn-group">
                        <Button text="查看余额" onClick={ _ => redirect("/") }/>
                        <Button text="立即投资" onClick={ openHall }/>
                    </div>
                </PaddedContent>
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
export default connect(mapStateToProps,mapDispatchToProps)(Success);