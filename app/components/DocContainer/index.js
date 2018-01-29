import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import Docs from './docs';
import "./style.less";

export default class DocContainer extends Component{
    static props={
      name: PropTypes.string
    };
    handlerContent(){
        const { name } = this.props;
        let content = Docs[name];
        let newContent = content.replace(/\n/g,"<br/>");
        return newContent;
    }
    render(){
        const content = this.handlerContent();
       return (
           <div dangerouslySetInnerHTML={ {__html:content} } className="docs-container" />
       )
    }
}