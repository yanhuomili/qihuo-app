import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import '../rule.less';
export default class Risk extends React.Component {
    render(){
    	let br={
    		borderBottomWidth:1,
    		borderBottomColor:'#eee',
    		borderBottomStyle:'solid',
    		overflow:'hidden',
    		width:'100%',
    		position:'fixed',
    		top:0,
    		left:0
    	}
        return (
            <Container className="rule-container">
                <div style={br}><AppBar title="协议" backward fixed/></div>
                <div className="rule-doc">
                    <div>
                        <h2>《风险告知书》</h2>
                        <p>尊敬的用户！</p>
                        <p className="red text-indent">为保障您的合法权益，请您务必逐字逐句地认真阅读了解本《风险告知书》的所有内容，您需要签署本《风险告知书》</p>
                        <p className="text-indent">1、进行保证金交易是一种隐含高度风险的投资行为，未必适合所有投资者。交易的高杠杆作用可能对您有利，也可能对您不利。在决定进行保证金交易之前，您应该谨慎考虑您的投资目标、经验水平和风险偏好。不适合于利用养老基金、举借债务、银行贷款等方式取得资金进行投资的投资者。</p>
                        <p className="text-indent">2、您的投资可能会大幅亏损，甚至有可能超过您最初的投资。如果您无法承担这种损失，就不应该投入资金。您应该明白与保证金交易相关的风险，为了获得优于真实资金交易的交易基础和基本条款方面的经验，我们鼓励您使用我们免费的积分模拟交易账户。</p>
                        <p className="text-indent">3、当您的交易订单触及（只要价格接触到止损金额将自动触发）止损金额时，系统将自动平仓。</p>
                        <p className="text-indent">4、操盘手受资产托管人委托提供交易策略进行交易，产生的实际盈利金额大于资产托管人交纳的信用金金额的，超过的部分归资产托管人所有，操盘手不得资产托管人索要；实际亏损金额大于操盘手交纳的信用金金额的，超过的部分由资产托管人承担，资产托管人不得向操盘手追偿。</p>
                        <p className="text-indent">5、交易时段持仓时间到期时，您的订单无论盈亏系统将自动清仓，可能导致您的订单亏损，您将承担由此导致的一切损失。</p>
                        <p className="text-indent">6、网络交易有不确定性，存在下单延时、网络通信等问题，包括但不限于软硬件故障和网络断线。本平台对此类损失或故障概不负责。</p>
                        <p className="text-indent">7、此外，对于任何基于推荐、预测或其他提供的信息而进行的投资所产生的损失，本平台概不负责。本平台所载的任何观点、新闻、研究、分析、价格或其他信息，只作为一般的市场评论，并不构成投资建议。本平台将不承担任何损失或损害的责任，包括但不限于任何利润损失。这些利润损失可能是直接或间接地使用这些信息，或信赖这些信息而造成的。</p>
                        <p className="text-indent">8、按照分析的建议而进行的交易，特别是杠杆投资，是投机行为的，可能会带来利润，也可能会带来损失，特别是在当分析中提到的条件没有如预期般发生的情况下。</p>
                        <p className="text-indent">9、如果开仓和平仓过程出现行情中断，或者交易系统被攻击等，本平台将依据交易所真实发生的交易行为和记录对资产托管人的交易账户进行结算。</p>
                        <p className="text-indent">10、如果您不明白投资交易中隐含的风险，请不要进行交易。</p>
                        <p className="red">重要提示：</p>
                        <p className="text-indent">证券、期货、外汇、ETFs交易业务只适合于以下投资者：</p>
                        <p className="text-indent">（1）各国法律规定下的具有完全民事行为能力的公民； </p>
                        <p className="text-indent">（2）具有二年以上投资交易经验的； </p>
                        <p className="text-indent">（3）能够充分理解有关于此交易的一切风险，并且具有风险承受能力的投资者； </p>
                        <p className="text-indent">（4）因投资失误而造成帐户资金部分或者全部损失、仍不会改变其正常生活方式的投资者。</p>
                        <p className="text-indent">请确认，以上风险告知已详细阅读，并知晓交易过程中的所有风险！！</p>
                    </div>
                </div>
            </Container>
        )
    }
}