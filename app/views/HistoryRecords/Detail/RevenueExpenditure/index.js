import React,{ Component } from 'react';
import PaddedContent from 'components/PaddedContent';
import RevenueExpenditureItem from './RevenueExpenditureItem';
import LtApi from 'lib/ltapi';
import { autobind } from 'core-decorators';
import Session from 'lib/session';
import './style.less';

@autobind
export default class RevenueExpenditure extends Component {
    state = {
        listData:[],
        pageNo:1,
        done:false
    };
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        const { pageNo } = this.state;
        const token = Session.get('oldToken');
        LtApi.fetch('/financy/financy/apiFinancyFlowList',{
            token,pageNo,pageSize:10
        },(resp)=>{
            let listData = this.state.listData;
            if(resp.length < 10){
                this.setState({done:true});
            }
            resp.forEach((item)=>{
                listData.push(item);
            });
            this.setState({listData});
        });
    }

    loadMore(){
        const { pageNo } = this.state;
       this.setState({pageNo:pageNo+1},this.loadData);
    }

    render(){
        const { listData,done } = this.state;
        return (
            <div>
                <div className="revenue-detail">收支明细(元)</div>
                <PaddedContent className="revenue-expenditure">
                    {
                        listData.length > 0 ?
                        listData.map((item,key)=> {
                            return <RevenueExpenditureItem key={key} data={item}/>;
                        })
                            :
                            <div className="empty-list">没有查询到数据</div>
                    }
                    {
                        listData.length > 0 && !done ?
                            <div onClick={ this.loadMore } className="load-more"> 点击加载更多 </div>
                            : null
                    }
                </PaddedContent>
            </div>
        );
    }
}