import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SvgIcon} from 'components/Icon';
import {autobind} from 'core-decorators';
import {numberFormat} from 'lib/utils';
import {INPUT_TYPE_CNY, INPUT_TYPE_DOLLAR} from 'constants';
import './stye.less';

const TYPE_SELECT = 0;
const TYPE_INPUT = 1;
const MONEY_SELECT = [1000, 3000, 5000, 8000, 10000, 15000, 20000, 30000, 50000];


const MoneyItem = (props) => {
    const {money, rate, onChange, value, limited} = props;
    const moneyDollar= money*rate;
    return (
        <div
            className={"money-item" + ( money+".00" === value ? " active":"") +(money > limited ? " disabled":"")}
            onClick={ _=>{
                 if(money <= limited){
                     onChange && onChange(money+".00");
                 }
             }}>
            <div className="dollar">￥{money}</div>
            <div className="cny">美元:{numberFormat(moneyDollar)}</div>
        </div>
    )
};
@autobind
export default class IncomeInput extends Component {
    static props = {
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        label: PropTypes.string,
        additionalMessage: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string,
        rate: PropTypes.number,
        incomeDollar: PropTypes.string,
        limited: PropTypes.number,
        defaultValue: PropTypes.string
    };
    static defaultProps = {
        value: "",
        type: "text"
    };

    state = {
        width: 'auto',
        inputType: TYPE_INPUT,
        value: 100
    };

    onChange(e) {
        const {name, onChange}= this.props;
        onChange && onChange(name, e.target.value, INPUT_TYPE_CNY);
    }

    setValue(value, type) {
        const {name, onChange}= this.props;
        onChange && onChange(name, value, type);
    }

    componentDidMount() {
        this.setState({width: this.refs.input.offsetWidth - 20});
    }

    setDefaultValue(){
        /*
        const {defaultValue,limited,rate} = this.props;
        let newDefaultValue = defaultValue;
        if(parseFloat(defaultValue)>limited){
            for(let i = MONEY_SELECT.length-1;i>=0;i--){
                if(MONEY_SELECT[i] <= limited){
                    newDefaultValue = MONEY_SELECT[i]+".00";
                    break;
                }
            }
        }
        */
        this.setValue("", INPUT_TYPE_CNY);
    }
    toggleInputType() {
        const {inputType}  = this.state;
        if (inputType === TYPE_INPUT) {
            this.setDefaultValue();
        } else {
            this.setValue("", INPUT_TYPE_CNY);
        }
        const newInputType = inputType === TYPE_INPUT ? TYPE_SELECT : TYPE_INPUT;
        this.setState({inputType: newInputType});
    }

    render() {
        const {label, placeholder, unit, value, additionalMessage, limited, name, type,
            rate, incomeDollar} = this.props;
        const {width, inputType} = this.state;
        return (
            <div className="income-input-container">
                <div className="label">
                    {label}
                    <div className="pull-right input-switcher"
                         onClick={ this.toggleInputType}>
                        {inputType === TYPE_SELECT ? "其他金额" : "快速充值"}
                    </div>
                </div>
                {
                    inputType === TYPE_INPUT ?
                        <div>
                            <div
                                className={"input-wrapper" + (unit ? " has-unit":"")}>
                                <div className="unit">
                                    { unit }
                                </div>
                                <div className="input" ref="input">
                                    <input type="text"
                                           placeholder={placeholder}
                                           onChange={ this.onChange }
                                           value={ value } style={{width}}
                                    />
                                </div>
                                {
                                    ( value === undefined || value ) === "" ?
                                        null
                                        :
                                        <SvgIcon name="close_circle"
                                                 onClick={ _ => { this.setValue("",INPUT_TYPE_CNY) } }/>
                                }
                            </div>
                            <div className="additional-message">
                                { additionalMessage }
                            </div>
                        </div>
                        :
                        <div className="money-selector clear-fix">
                            {
                                MONEY_SELECT.map((money) => {
                                    return <MoneyItem money={money}
                                                      rate={ rate }
                                                      key={ money }
                                                      value={ value }
                                                      onChange={ (di)=>{ this.setValue(di,INPUT_TYPE_CNY) } }
                                                      limited={ limited }
                                    />
                                })
                            }
                        </div>
                }
            </div>
        )
    }
}