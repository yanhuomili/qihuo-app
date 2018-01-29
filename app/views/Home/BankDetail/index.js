import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import BankCard from './BankCard';
import { redirect } from 'lib/utils';
import Api,{ ACCOUNT_CARDS } from 'lib/api';
import './style.less';
export default class BankDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            cards: []
        };
    }
    componentWillMount(){
        this.getData();
    }
    getData(){//获取用户银行卡列表数据
        Api.fetch(ACCOUNT_CARDS,{},(data)=>{
            this.setState({cards:data});
        });
    }
    render(){
        return (
            <Container>
                <div className="bank-detail">
                    <AppBar title="银行卡" backward rightBar={
                        {
                            icon: 'add',
                            fnClick: ()=>redirect('/bankcard_add')
                        }
                    }/>
                    <div className="cards">
                        {
                            //遍历生成每个银行卡
                            this.state.cards.map((item,index)=>{
                                return <BankCard data={ item } key={ index } getData={ this.getData.bind(this) }/>
                            })
                        }
                    </div>
                    <div className="tip">您最多可以绑定三张银行卡，如需更换其他银行卡请先删除或解绑！</div>
                </div>
            </Container>
        )
    }
}