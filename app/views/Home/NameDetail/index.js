import React from 'react';
import { parse } from 'query-string';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import InfoItem from '../InfoItem';
import { splitIdCardNum } from 'lib/utils';
import './style.less';
export default class NameDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            name:"",
            idCard:"",
        };
    }
    componentWillMount(){
        //获取请求路径参数并设置state
        const query = parse(this.props.location.search);
        this.setState({
            name: query.name,
            idCard: query.idCard
        });
    }
    render(){
        const { name, idCard } = this.state;
        return (
            <Container>
                <div className="name-detail">
                    <AppBar title="实名认证" backward />
                    <InfoItem label="姓名" value={ name } border={ true }/>
                    <InfoItem label="身份证号" value={ splitIdCardNum(idCard) }/>
                    <div className="tip">一张身份证只能绑定一个账号，请填写本人真实信息，核实后将不可更改</div>
                </div>
            </Container>
        )
    }
}