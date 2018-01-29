import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from 'components/Icon';
import PaddedContent from 'components/PaddedContent';
import { autobind } from 'core-decorators';
import "./style.less";

@autobind
export default class TextInput extends Component {
    static props = {
        icon: PropTypes.string,
        placeholder: PropTypes.string,
        type:PropTypes.string,
        value:PropTypes.string,
        onChange:PropTypes.func
    };

    onChange(e){
       const { name,onChange }  = this.props;
       onChange && onChange(name,e.target.value);
    }

    render() {
        const { type,placeholder,value,icon } = this.props;
        return (
            <div className="text-input">
                <PaddedContent >
                {
                    icon ? <SvgIcon name={icon} /> : null
                }
                <div className="input-wrapper">
                    <input type={type || "text"} value={ value } placeholder={ placeholder } onChange={this.onChange}/>
                </div>
                </PaddedContent>
            </div>
        )
    }
}