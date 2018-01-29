import React,{ Component } from 'react';
import { backToApp } from 'lib/utils';
import PropTypes from 'prop-types';

export default class CommonJump extends Component{
    componentWillMount(){
        backToApp();
    }
    render(){
        return (
            <div>
                <h1> Redirecting.... </h1>
            </div>
        )
    }

}