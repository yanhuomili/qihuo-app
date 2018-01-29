import React from 'react';
import Container from 'components/Container';
import Api, {USER_DETAIL} from 'lib/api';
import AppBar from 'components/AppBar';
import { parse } from 'query-string';
import './style.less';
export default class SubUser extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            time:''
        }
    }

    componentWillMount() {
        const query = parse(this.props.location.search);
        //获取用户信息列表
        Api.fetch(USER_DETAIL, {pageSize: 1000}, (data) => {
            this.setState({data: data});
        });
    }

    transferTime(time){
        //处理时间参数
        let arrDateTime = time.split(" ");
        let arrTime = arrDateTime[1].split(".");
        return arrDateTime[0]+"\n"+arrTime[0];
    }
    render() {
        return (
            <Container>
                <AppBar title="用户详情" backward/>
                <div className="subUser">
                    <table className="table" cellPadding="0" cellSpacing="0">
                        <thead>
                        <tr>
                            <th className="align-left time">注册时间</th>
                            <th className="align-left">昵称</th>
                            <th className="align-center">交易手数</th>
                            <th className="align-center">二级交易手数</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*列表信息处理*/}
                        {
                            this.state.data == "" ?
                                <tr>
                                    <td className="loading" colSpan="4">暂无数据</td>
                                </tr>
                                :
                                this.state.data.map((item,idx) => {
                                    return (<tr key={idx}>
                                        <td className="detail_time">{ this.transferTime(item.createDate) }</td>
                                        <td className="user_name">{ item.nickName }</td>
                                        <td className="hands">{ item.handCount }</td>
                                        <td className="hands">{ item.firstHandCount }</td>
                                    </tr>);
                                })
                        }
                        </tbody>
                    </table>
                </div>
            </Container>
        )
    }
}
