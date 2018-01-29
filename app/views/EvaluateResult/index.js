import React from 'react';
import Container from 'components/Container';
import { parse } from 'query-string';
import Button from 'components/Button';
import { isAndroid,isiOS} from 'lib/utils';
import './style.less';
import img_type1 from './images/type1.png';
import img_type2 from './images/type2.png';
import img_type3 from './images/type3.png';
export default class EvaluateResult extends React.Component {
    constructor(){
        super();
        this.state = {
            src:img_type1,//测评结果对应的图片路径
            tip:"",//文本内容
        }
    }
    componentWillMount(){
        //获取请求路径参数，值为1，2，3
        const type = parse(this.props.location.search).type;
        let src = "";
        let tip = "";
        if(type=="1"){
            src = img_type1;
            tip = "建议您首先进行模拟交易练习，提高交易能力";
        }else if(type=="2"){
            src = img_type2;
            tip = "建议您首先进行模拟交易，熟悉交易规则";
        }else if(type=="3"){
            src = img_type3;
            tip = "市场有风险，投资需谨慎";
        }
        //设置src、tip到state
        this.setState({
            src: src,
            tip: tip,
        });
    }
    nextStep(){
        //下一步，调用移动端方法跳转页面
        if(isAndroid){
            window.AppJs && window.AppJs.openProtocolForOpenAccount();
        }else if(isiOS){
            window.location.href = "goto://openProtocolForOpenAccount";
        }
    }
    render() {
        let { src,tip } = this.state;
        return (
            <Container>
                <div className="result-page">
                    <div className="text">
                        <p>根据综合测评</p>
                        <p>您的风险承受能力为</p>
                    </div>
                    <img src={ src } />
                    <div className="tip">{ tip }</div>
                    <Button text="下一步" onClick={ this.nextStep.bind(this) }/>
                </div>
            </Container>
        )
    }
}