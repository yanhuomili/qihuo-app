import React from 'react';
import Container from 'components/Container';
import QUESTION from './questionConstants';
import QuestionItem from './QuestionItem';
import { redirect } from 'lib/utils';
import API,{ RISK_EVALUATE } from 'lib/api';
import './style.less';
export default class Questions extends React.Component {
    constructor(){
        super();
        this.state = {
            index: 1,
            result: [],
            height: '',
        }
    }
    fnClick(i,val){//每回答一个问题记录进result
        let {index,result} = this.state;
        result[i] = val;
        if(index<8){
            index++;
            setTimeout(()=>{
                this.setState({result: result,index:index});
            },500);
        }else{
            setTimeout(()=>{
                this.setState({result: result,index:index},()=>{
                    this.getResult();
                });
            },500);
        }
    }
    getResult(){//计算测评结果
        const data = this.state.result;
        let sum = 0;
        const SCORE_1 = {
            "1": 0, "2": 1, "3": 2, "4": 3
        };
        const SCORE_2 = {
            "1": 1, "2": 2, "3": 3, "4": 4
        };
        const SCORE_3 = {
            "1": -3, "2": 1, "3": 3, "4": 5
        };
        for(let i=0;i<data.length;i++){
            if(i<4){
                sum += SCORE_1[data[i]];
            }else if(i>=4 && i<6){
                sum += SCORE_2[data[i]];
            }else{
                sum += SCORE_3[data[i]];
            }
        }
        let type = "1";
        if(sum<=10){
            type = "1";
        }else if(sum>10 && sum<=20){
            type = "2";
        }else if(sum>20){
            type = "3";
        }
        let level = "1";
        if(sum<=5){
            level = "5";
        }else if(sum>5 && sum<=10){
            level = "4";
        }else if(sum>10 && sum<=20){
            level = "3";
        }else if(sum>20 && sum<=25){
            level = "2";
        }else if(sum>25){
            level = "1";
        }
        API.fetch(RISK_EVALUATE,{
            step: 3,
            riskRet: type,
            riskLevel: level,
        },(data)=>{
            redirect(`/evaluateResult?type=${type}`);
        });
    }
    componentDidMount(){
        this.setState({height:window.innerHeight- 2 * 20 });
    }
    render() {
        return (
            <Container>
                <div className="questions-page" style={ {height:this.state.height} }>
                    {
                        //遍历question生成每条问题
                        QUESTION.map((item,i)=>{
                            if((i+1)==this.state.index){
                                return <QuestionItem data={item} index={i} fnClick={ (index,val)=>this.fnClick(index,val) } key={i} />
                            }
                        })
                    }
                    <div className="index">{`${this.state.index} / ${QUESTION.length}`}</div>
                </div>
            </Container>
        )
    }
}