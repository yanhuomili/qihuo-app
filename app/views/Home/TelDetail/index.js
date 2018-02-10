import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import InfoItem from '../InfoItem';
import { splitTel } from 'lib/utils';
import { parse } from 'query-string';
import './style.less';
export default class TelDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            tel:"",
        };
    }
    componentWillMount(){
        //获取请求路径参数并设置state
        const query = parse(this.props.location.search);
        this.setState({
            tel: query.tel,
        });
    }
    render(){
        return (
            <Container>
                <div className="tel-detail">
                	{/*<div className="add-border">
                    </div>*/}
                    <AppBar title="手机认证" backward />
                    <div className="add-border">
                    <InfoItem label="手机号" value={ <span className="tel" onClick={ e => {
                        e && e.preventDefault();
                        e && e.stopPropagation();
                    } }>{splitTel(this.state.tel)}</span> }/>
                    </div>
                    <div className="tip">您已经成功绑定手机号</div>
                </div>
            </Container>
        )
    }
}