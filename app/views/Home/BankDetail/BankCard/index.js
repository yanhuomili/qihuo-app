import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import Api,{ CARD_DELETE } from 'lib/api';
import { success,confirm } from 'components/Notifications';
import { protocolTransfer,isAndroid,isiOS,redirect } from 'lib/utils';
export default class BankCard extends React.Component {
    remove(){//解绑，跳转客服
        confirm("是否联系在线客服解绑换卡。",(fnClose)=>{
            // redirect("/customer_service");
            if(isAndroid){
                window.AppJs.openCustomService();
            }else{
                window.location.href = "goto://openCustomService";
            }
            fnClose();
        })
    }
    delete(){//删除银行卡
        confirm("确定删除该银行卡吗？",(fnClose)=>{
            //删除银行卡...
            Api.fetch(CARD_DELETE,{id:this.props.data.id},(data)=>{
                success("删除成功");
                fnClose();
                this.props.getData();
            });
        })
    }
    render(){
        const data = this.props.data;
        return (
            <div className={"bankcard "+(data.cardBackground=="B"?"bg3":(data.cardBackground=="G"?"bg2":"bg1"))}>
                <div>
                    <img src={ protocolTransfer(data.pic) }/>
                    <div className="card-name">
                        <span>{ data.bankName || "--" }</span>
                        <i>储蓄卡</i>
                    </div>
                    {
                        data.isDefault=="1" ?
                        <span className="remove" onClick={ this.remove.bind(this) }>解绑</span>
                        :
                        <span className="delete" onClick={ this.delete.bind(this) }>删除</span>
                    }

                </div>
                <div className="card-num">{ `${data.num.substring(0,4)} **** **** ${data.num.substring(data.num.length-4,data.num.length)}` }</div>
            </div>
        )
    }
}

BankCard.props = {
    data: PropTypes.object.require,
    getData: PropTypes.func,
};
