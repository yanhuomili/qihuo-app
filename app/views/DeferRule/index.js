import React from 'react';
import { parse } from 'query-string';
import API,{ DEFER_RULE } from 'lib/api';
import './style.less';

export default class DeferRule extends React.Component {
    constructor(){
        super();
        this.state = {
            deferFee:"",//递延费
            deferFund:"",//递延保证金
        };
    }
    componentWillMount(){
        //获取请求路径的参数
        const { productId, plateType } = parse(this.props.location.search);
        //调用接口获取数据
        API.fetch(DEFER_RULE,{ productId:productId, plateType:plateType },(res)=>{
            this.setState({ deferFee:res.deferFee, deferFund:res.deferFund });
        });
    }
    render() {
        return (
            <div className="defer-rule-page">
                <div>
                    <p className="title">1.递延保证金</p>
                    <p className="content">递延保证金用于让用户订单可以跨日盘、夜盘或者跨交易日长期持仓。({ this.state.deferFund || "--" }美元/手)。</p>
                </div>
                <div>
                    <p className="title">2.递延费</p>
                    <p className="content">开启递延功能的订单会在日盘、夜盘或者跨交易日闭市后10分钟扣除递延费，每次扣除{ this.state.deferFee || "--" }美元/手。</p>
                </div>
                <div>
                    <p className="title">3.强制平仓</p>
                    <p className="content">若开启递延功能的订单递延费扣除失败，该订单会在下一个交易时段闭市前被强制平仓。</p>
                </div>
                <div>
                    <p className="title">4.亏损赔付</p>
                    <p className="content">持仓中的递延订单，操盘手需承担不超过（保证金+递延保证金）合计的亏损。</p>
                </div>
            </div>
        )
    }
}