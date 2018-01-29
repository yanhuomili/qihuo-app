import React from 'react';
import PropTypes from 'prop-types';
import Api from 'lib/api';
import { AJAX_CODE_LOGIN_INTERRUPT,AJAX_CODE_SUCCESS } from 'constants';
import { error } from 'components/Notifications';
import "./style.less";
export default class AjaxLoader extends React.Component {
    constructor(){
        super();
        this.state = {
            loading:true,
            data:{}
        };
    }
    componentDidMount(){
        const { config,param,callback,responseHandler } = this.props;
        let _param = param;
        if(typeof param === "function"){
            _param = param();
        }
        this.setState({loading:true});
       Api.fetch(config,_param,(data)=>{
           try {
               if(typeof data === "string"){
                   data = JSON.parse(data);
               }
           }catch(e){
           }
           if(responseHandler){
               let newData =  responseHandler(data);
               this.setState({loading:false,data:newData},()=>{
                   callback && callback(newData);
               });
           }
           if (typeof data === "object") {
               if(data.code === AJAX_CODE_LOGIN_INTERRUPT){
                   return error('您已在其他设备登录，请确认');
               }else if (data.code === AJAX_CODE_SUCCESS || data.code === 200) {
                   let data = data.data;
                   this.setState({loading:false,data:data.data},()=>{
                       callback && callback(data.data);
                   });
               } else {
                   return error(`${data.msg}`);
               }
           }
           error("网络异常");
       },true);
    }
    render() {
        let ContentTag = this.props.content;
        const { loading } = this.state;
        const { contentProps } = this.props;
        return (
            <div className="ajax-loader">
                {
                    loading ?
                        <div className="loading">
                            <span className="text">LOADING...</span>
                        </div>
                        :
                        <div>
                            { this.props.children }
                            { ContentTag && <ContentTag data={ this.state.data } { ...contentProps }/> }
                        </div>
                }

            </div>
        )
    }
}

AjaxLoader.props = {
    callback: PropTypes.func,
    content: PropTypes.element,
    config:PropTypes.oneOf([PropTypes.string,PropTypes.object]).isRequired,
    param:PropTypes.oneOf([PropTypes.func,PropTypes.object]),
    contentProps:PropTypes.object
};