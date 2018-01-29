import React from 'react';
import Api, {NEWS_DETAIL} from 'lib/api';
import './style.less';
import {parse} from 'query-string';
export default class NewsDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            date:''
        }
    }

    componentWillMount() {
        //获取信息
        const query = parse(this.props.location.search);
        let ids = query.id;
        //获取推广链接详情
        Api.fetch(NEWS_DETAIL, {newsArticleId: ids}, (data) => {
            this.setState({data: data});
            this.setState({date: data.createDate.substring(0,16)});
        })
    }

    render() {
        const {data,date} = this.state;
        return (
                <div className="rule-doc news_detail">
                    <h2 className="title">{ data.title }</h2>
                    <div className="inline_box">
                        <span>来源：{ data.outSourceName }</span>
                        <span className="date">{ date }</span>
                        <span>阅读({ data.readCount })</span>
                    </div>
                    <div className="banner">
                        <img src={ data.bannerUrl }/>
                    </div>
                    <div className="news_message" dangerouslySetInnerHTML={{__html:data.content}} />
                </div>
        )
    }
}
