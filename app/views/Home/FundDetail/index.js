import React from 'react';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import DetailItem from './DetailItem';
import Api,{ FUND_DETAIL,MONEY_DETAIL } from 'lib/api';
import './style.less';
import $ from 'jquery';
export default class FundDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            data: [],
            page: 1,
            rows: 10,
            moreStatus: false,
            showIndex:0,
            list:[1,2,3,4,5,6],
            goldPage:1,
            goldRows:15,
            goldData:[],
            scorePage:1,
            scoreRows:15,
            scoreData:[]
        };
    }
    componentWillMount(){
        this.getData();
       //获取金币明细
      	this.getGold();
        
        
    }
    getData(){//获取现金流水数据
        const { page,rows } = this.state;
        Api.fetch(FUND_DETAIL,{fundType:1,page:page,rows:rows},(data)=>{
            let arr = this.state.data;
            data.map((item)=>{
                arr.push(item);
            })
            this.setState({data: arr});
            this.setState({moreStatus: data.length>=rows});
        });
    }
    getMore(){//获取更多数据
        const currentPage = this.state.page;
        this.setState({page: currentPage+1},()=>{
            this.getData();
        });
    }
    //更多金币明细
    getMoreGold(){
    	this.setState({
    		goldPage:goldPage+1
    	},()=>{
    		this.getGold();
    	})
    }
    getGold(){
    	const {goldPage,goldRows}=this.state;
        Api.fetch(MONEY_DETAIL,{fundType:1,page:goldPage,rows:goldRows},(data,res)=>{
        	this.setState({
        		goldData:res.data
        	})
        });
    }
    //切换tab
    changeTab(event){
    	var target=event.target;
    	var _this=this
    	if(target.tagName==="LI"){
    		var index=$(target).index();
    		_this.setState({
    			showIndex:index
    		})
    	}
    	
    	
    	
    }
    dateDeal(num){
		var date1=new Date(num);
		var month=date1.getMonth()+1;
		var day=date1.getDate();
		var hours=date1.getHours();
		var minutes=date1.getSeconds();
		return {//返回月份和时间
			mon:month+'/'+day,
			time:hours+':'+minutes
		}
	}
    render(){
        return (
            <Container>
                <AppBar title="明细" backward fixed/>
                <div className="fund-detail">
                {
                    this.state.data.length > 0 ?
                        <div className="datas">
                        	<ul onClick={this.changeTab.bind(this)} className="menu-ul">
                        		<li className={this.state.showIndex===0?"active":""}>资金明细</li>
                        		<li className={this.state.showIndex===1?"active":""}>金币明细</li>
                        	</ul>
                        	<div className="lists-wrap">
                        		{this.state.showIndex===0?
                        		<div className="lists-item">
                        			<div className="items-top">
                        				<p>
                        					<span>余额(美元)</span>
                        					<i>5000.0</i>
                        				</p>
                        				<p>
                        					<span>冻结(美元)</span>
                        					<i>0</i>
                        				</p>
                        			</div>
                        			<p className="items-tip">收支明细</p>
                        			<ul className="items-ul">
                        				{this.state.goldData.map((item,index)=>{
                        					const {mon,time}=this.dateDeal(item.createDate)
                        					return <li>
		                        					<p className="time">
		                        						<em>{mon}</em>
		                        						<span>{time}</span>
		                        					</p>
		                        					<p className="type">
		                        						<b>保证金</b>
		                        						<span>{item.remark}</span>
		                        					</p>
		                        					<p className="real-money">
		                        						<span>{item.amount}</span>
		                        					</p>
	                        					</li>
                        				})}
                        			
                        				{/*<li>
                        					<p className="time">
                        						<em>1/6</em>
                        						<span>09:16</span>
                        					</p>
                        					<p className="type">
                        						<b>保证金</b>
                        						<span>冻结(英国BP)</span>
                        					</p>
                        					<p className="real-money">
                        						<span>-200.5</span>
                        					</p>
                        				</li>*/}
                        				
                        			</ul>
                        			<div className="getMoreTip"><span onClick={ this.getGold.bind(this) }>点击加载更多</span></div>
                        		</div>:
                        		<div className="lists-item">
                        			<div className="items-top">
                        				<p>
                        					<span>余额(美元积分)</span>
                        					<i>5000.0</i>
                        				</p>
                        				<p>
                        					<span>冻结(美元积分)</span>
                        					<i>0</i>
                        				</p>
                        			</div>
                        			<p className="items-tip">收支明细</p>
                        			<ul className="items-ul">
                        				<li>
                        					<p className="time">
                        						<em>1/6</em>
                        						<span>08:16</span>
                        					</p>
                        					<p className="type">
                        						<b>筹备金</b>
                        						<span>冻结(英国BP)</span>
                        					</p>
                        					<p className="real-money">
                        						<span>-100.5</span>
                        					</p>
                        				</li>
                        				<li>
                        					<p className="time">
                        						<em>1/6</em>
                        						<span>08:16</span>
                        					</p>
                        					<p className="type">
                        						<b>筹备金</b>
                        						<span>冻结(英国BP)</span>
                        					</p>
                        					<p className="real-money">
                        						<span>-100.5</span>
                        					</p>
                        				</li>
                        			</ul>
                        		</div>}
                        		
                        	</div>
                        
                        
                            {
                                /*this.state.data.map((item,i)=>{
                                    return <DetailItem data={item} key={i}/>
                                })*/
                            }
                            {/*<p><span onClick={ this.getMore.bind(this) }>{ this.state.moreStatus ? "点击加载更多" : "没有更多" }</span></p>*/}
                        </div>
                        :
                        <div className="no-data">暂无明细</div>
                }
                </div>
            </Container>
        )
    }
}