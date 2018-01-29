import React, {Component} from 'react';
import './style.less';
import OrderItem from './OrderItem';
import PaddedContent from 'components/PaddedContent';
import LtApi from 'lib/ltapi';
import Session from 'lib/session';
import {autobind} from 'core-decorators';

@autobind
export default class Order extends Component {
    state = {
        listData: [],
        pageNo: 1,
        pageSize: 10,
        loadMore: true
    };

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const token = Session.get('oldToken');
        const {pageNo} = this.state;
        LtApi.fetch("/order/futures/balancedList", {
            fundType: 0,
            token,
            pageNo,
            pageSize:10
        }, (resp) => {
            if (resp.length < 10) {
                this.setState({loadMore: false});
            }
            let listData = this.state.listData;
            resp.forEach((item)=>{
               listData.push(item) ;
            });
            this.setState({listData});
        });
    }
    loadMore(){
        const { pageNo } = this.state;
        this.setState({pageNo:pageNo+1},this.loadData);
    }

    render() {
        const {listData} = this.state;
        return (
            <PaddedContent className="order-list">
                {
                    listData.length > 0 ?
                        listData.map((item, idx) => {
                            return <OrderItem data={ item } key={ idx }/>;
                        })
                        :
                        <div className="empty-list">
                            没有查询到数据
                        </div>
                }
                {
                    <div className="load-more" onClick={ this.loadMore }>
                        加载更多
                    </div>
                }
            </PaddedContent>
        );
    }
}