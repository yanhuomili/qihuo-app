import React, {Component} from 'react';
import { SvgIcon } from 'components/Icon';
import PropTypes from 'prop-types';
import "./style.less";
const STATUS_UP = 1;
const STATUS_DOWN = 2;
class Status extends Component {
    static props = {
        status:PropTypes.number,
    };
    static defaultProps = {
      status: STATUS_UP
    };
    render(){
        const { status } = this.props;
        return (
            <div className={ "status " + ( status === STATUS_UP ? "status-up" : "status-down" ) }>
                { status === STATUS_UP ? "多" : "空" }
            </div>
        )
    }
}
const SALE_TYPE_MAP = {
    "1":"系统平仓",
    "2":"人工结算",
    "3":"强制平仓",
    "4":"用户结算",
    "5":"止盈平仓",
    "6":"止损平仓"
};
export default class OrderItem extends Component {
    static props = {
      data:PropTypes.object
    };
    render() {
        const { data } = this.props;
        let arrDate = [];
        if(data.saleDate){
            arrDate = data.saleDate.split(" ");
        }
        const lossProfit = data.lossProfit * data.rate;

        return (
            <div className="order-item">
                <div className="top-wrapper clear-fix">
                    <div className="pull-left">
                        <div>{ arrDate[0] }</div>
                        <div>{ arrDate[1] }</div>
                        <div className="count-wrapper">
                            <span>{ data.futuresName }</span>
                            <span className="count">{ data.count }手</span>
                        </div>
                    </div>
                    <div className={"pull-right "+(lossProfit > 0 ? "up":"down")}>
                        <div className="dollar">{lossProfit > 0 ? "+":""}{lossProfit.toFixed(2)}<span className="unit">元</span></div>
                        <div className="percent">{lossProfit > 0 ? "+":""}{ (data.lossProfit*100 / data.cashFund).toFixed(2) }%</div>
                    </div>
                </div>
                <div className="bottom-wrapper clear-fix">
                    {/*<SvgIcon name="circle_info"/>*/}
                    <div className="pull-right">
                        <Status status={data.tradeType === 1 ? STATUS_DOWN : STATUS_UP} />
                        <span>
                             {
                                 data.saleOpSource === 2 ?
                                     "市价卖出"
                                     :
                                     data.saleOpSource === 1 || data.saleOpSource === 3 ?
                                         "到时中止"
                                         :
                                         data.saleOpSource === 4 ?
                                             (lossProfit > 0 ? "止盈卖出":"止损卖出")
                                             :
                                             "-"

                             }
                            </span>
                    </div>
                </div>
            </div>
        )
    }
}