import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import './style.less';
import { backToApp,redirect } from 'lib/utils';
import Api,{ BEGINNER } from 'lib/api';

export default class Beginner extends React.Component {
    constructor(){
        super();
        this.state = {
            data: [],
        }
    }
    componentWillMount(){
        //调用接口获取数据存入data
        Api.fetch(BEGINNER,{ pageNo:1,pageSize:100 },(res)=>{
            let arr = [];
            for(let i=0;i<res.length;i++){
                let obj = {
                    img: res[i].middleBanner,
                    url: res[i].url,
                    title: res[i].title
                };
                arr.push(obj);
            }
            this.setState({data: arr});
        });
    }
    jump(title,url){//跳转详情
        redirect(`/beginner/detail?title=${title}&url=${url}`);
    }
    substrFirst(str){
        if(str.charAt(0)=="/"){
            return str.substring(1,str.length);
        }else{
            return str;
        }
    }
    render() {
        const data = this.state.data;
        return (
            <Container>
                <div className="beginner">
                    <AppBar title="新手学堂" backward={ backToApp } fixed />
                    <ul>
                        {
                            //遍历data生成列表
                            data.map((item,i)=>{
                                return <li key={ i } onClick={()=>this.jump(item.title,item.url) }>
                                    <img src={ item.img }/>
                                </li>
                        })
                        }
                    </ul>
                </div>
            </Container>
        )
    }
}