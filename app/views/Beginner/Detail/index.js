import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import { parse } from 'query-string';
import './style.less';

export default class BeginnerDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            title: "",//标题
            url:"",//路径
            height:0
        }
    }
    componentWillMount(){
        //获取请求路径参数
        const query = parse(this.props.location.search);
        //设置标题和url
        this.setState({
            title: query.title,
            url: query.url,
        });
    }
    componentDidMount(){
        //设置高度
        this.setState({height:window.innerHeight- 2 * 20 });
    }
    render() {
        const { height,title, url } = this.state;
        return (
            <Container>
                <div className="beginner-detail">
                    <AppBar title={ title } backward fixed />
                    <iframe src={ url } ref="iframe" style={ {height,marginTop:40} }/>
                </div>
            </Container>
        )
    }
}