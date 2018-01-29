import React ,{ Component } from 'react';
import { Route } from 'react-router';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import { replace } from 'lib/utils';
import PropTypes from 'prop-types';
import RevenueExpenditure from './RevenueExpenditure';
import Order from './Order';
import "./style.less";



const ORDER_URL = "/history_records/detail/order";
const REVENUE_EXPENDITURE = "/history_records/detail/revenue_expenditure";
class Switcher extends Component{
    static props = {
      pathname:PropTypes.string
    };
    render(){
        const { pathname } = this.props;
        return (
            <ul className="switcher">
                <li onClick={ _ => {
                    replace(ORDER_URL);
                }} className={ pathname === "/m"+ORDER_URL ? "active" : "" }>历史订单</li>
                <li onClick={ _ => {
                    replace(REVENUE_EXPENDITURE);
                }} className={ pathname === "/m"+REVENUE_EXPENDITURE ? "active" : ""} >收支明细</li>
            </ul>
        )
    }
}
export default class Detail extends Component {
    render(){
        const pathname = this.props.location.pathname;
        return (
            <Container className="history-records-detail">
                <AppBar title={ <Switcher pathname={ pathname }/> } backward={true} fixed={ true }/>
                <Route path={ "/m"+ORDER_URL } component={Order}/>
                <Route path={"/m"+REVENUE_EXPENDITURE} component={RevenueExpenditure}  />
            </Container>
        )
    }
}