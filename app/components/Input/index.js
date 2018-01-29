import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from 'components/Icon';
import { autobind } from 'core-decorators';
import './stye.less';

@autobind
export default class Input extends Component {
    static props = {
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        label: PropTypes.string,
        additionalMessage: PropTypes.string,
        value: PropTypes.string,
        type:PropTypes.string
    };
    static defaultProps = {
        value: "",
        type:"text"
    };

    state = {
        width:'auto'
    };

    onChange(e) {
        const {name, onChange}= this.props;
        onChange && onChange(name, e.target.value);
    }
    setValue(value){
        const {name, onChange}= this.props;
       onChange && onChange(name,value);
    }
    componentDidMount(){
        this.setState({width:this.refs.input.offsetWidth-20});
    }
    render() {
        const {label, placeholder, unit, value, additionalMessage,name,type} = this.props;
        const { width } = this.state;
        return (
            <div className="input-container">
                <div className="label">
                    {label}
                </div>
                <div className={"input-wrapper" + (unit ? " has-unit":"")}>
                    <div className="unit">
                        { unit }
                    </div>
                    <div className="input" ref="input">
                        <input type={ type || "text" } placeholder={placeholder}
                               onChange={ this.onChange }
                               value={ value } style={{width}}
                        />
                    </div>
                    {
                        ( value === undefined || value ) === "" ?
                            null
                            :
                            <SvgIcon name="close_circle" onClick={ _ => { this.setValue("") } }/>
                    }
                </div>
                <div className="additional-message">
                    { additionalMessage }
                </div>
            </div>
        )
    }
}