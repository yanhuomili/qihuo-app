import React from 'react';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import DetailItem from './DetailItem';
import Api,{ FUND_DETAIL } from 'lib/api';
import './style.less';
export default class FundDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            data: [],
            page: 1,
            rows: 10,
            moreStatus: false,
        };
    }
    componentWillMount(){
        this.getData();
    }
    getData(){//获取现金流水数据
        const { page,rows } = this.state;
        Api.fetch(FUND_DETAIL,{page:page,rows:rows},(data)=>{
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
    render(){
        return (
            <Container>
                <AppBar title="明细" backward fixed/>
                <div className="fund-detail">
                {
                    this.state.data.length > 0 ?
                        <div className="datas">
                            {
                                this.state.data.map((item,i)=>{
                                    return <DetailItem data={item} key={i}/>
                                })
                            }
                            <p><span onClick={ this.getMore.bind(this) }>{ this.state.moreStatus ? "点击加载更多" : "没有更多" }</span></p>
                        </div>
                        :
                        <div className="no-data">暂无明细</div>
                }
                </div>
            </Container>
        )
    }
}