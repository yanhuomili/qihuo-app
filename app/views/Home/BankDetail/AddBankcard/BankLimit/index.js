import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import NameItem from './NameItem';
import Api,{ BANK_LIST } from 'lib/api';
import { numberParse } from 'lib/utils';
import './style.less';
export default class BankLimit extends React.Component {
    constructor(){
        super();
        this.state = {
            nameArr: [],
        };
    }
    componentWillMount(){
        //银行列表
        Api.fetch(BANK_LIST,{},(data)=>{
            let arr = [];
            console.log(data);
            data.map((item)=>{
                const remark = `单笔限额${numberParse(item.singleAmt)}，单日限额${numberParse(item.dailyAmt)}`;
                arr.push({ pic: item.bankPic, name: item.bankName, remark: remark });
            })
            this.setState({nameArr: arr});
        });
    }
    render(){
        return (
            <Container className="bankLimit-container">
                <AppBar title="银行卡列表" backward fixed/>
                <div className="bank-list">
                    <ul >
                        {
                            this.state.nameArr.map((item,i)=>{
                                return <NameItem data={ item } key={ i }/>
                            })
                        }
                    </ul>
                </div>
            </Container>
        )
    }
}