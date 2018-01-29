import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import './style.less';
import API,{ PRODUCT_RATE,PRODUCT_RULE } from 'lib/api';
import { parse } from 'query-string';
export default class TradeRule extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {
                productName: "",
                shortCode: "",
                basicInfo: "",
                descInfo: "",
            },
            currency: "",
            rate: "",
            unit: "",
            shortCode: "",
            basicData: [],
            descData: [],
        };
    }
    componentWillMount(){
        //获取请求路径参数并设置state
        const query = parse(this.props.location.search);
        this.setState(
            {
                currency: query.currency,
                unit: query.currencyUnit,
                shortCode: query.shortCode,
            },()=>{
            this.getRate();
            this.getDetail();
        });
    }
    getRate(){
        //获取汇率
        API.fetch(PRODUCT_RATE,{currency:this.state.currency},(data)=>{
            this.setState({rate:(1/data).toFixed(2)});
        });
    }
    getDetail(){
        //玩法规则详细数据
        API.fetch(PRODUCT_RULE,{shortCode:this.state.shortCode},(data)=>{
            this.setState({data:data},()=>{
                this.setState({
                    basicData: JSON.parse(this.state.data.basicInfo),
                    descData: JSON.parse(this.state.data.descInfo),
                });
            });
        });
    }
    render() {
        const info = this.state.data;
        const state = this.state;
        return (
            <Container>
                <AppBar title={`${state.data.productName ? state.data.productName : ""}交易规则`} backward fixed />
                <div className="trade-rule">
                    <table>
                        <tbody>
                        <tr>
                            <td>交易品种</td>
                            <td>{ info.productName ? info.productName : "--" }</td>
                        </tr>
                        {
                            state.basicData.map((item,i)=>{
                                return <tr key={i}>
                                    <td>{ item.name }</td>
                                    <td>{ item.content }</td>
                                </tr>
                            })
                        }
                        {
                            (state.currency && state.currency!="USD") ?
                                <tr>
                                    <td>汇率</td>
                                    <td>
                                        <p>1美元={`${state.rate?state.rate:"--"}${state.unit}`}</p>
                                        <p>（汇率波动较大时，将会进行调整）</p>
                                    </td>
                                </tr>
                                :
                                null
                        }
                        </tbody>
                    </table>
                    {
                        state.descData.map((item,i)=>{
                            return <div className="descItem" key={i}>
                                <div className="title">{ item.name }</div>
                                <div className="descContent">
                                    {
                                        item.content.split('\n').map((str,index)=>{
                                            return <p key={index}>{ str }</p>
                                        })
                                    }
                                    </div>
                            </div>
                        })
                    }
                </div>
            </Container>
        )
    }
}