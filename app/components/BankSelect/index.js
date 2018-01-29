import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { protocolTransfer } from 'lib/utils';
import "./style.less";
export default class Select extends Component {
    static props = {
        value: PropTypes.any,
        onChange: PropTypes.func,
        options: PropTypes.array,
        placeholder: PropTypes.string,
        template: PropTypes.element
    };

    static defaultProps = {
        options: [],
        placeholder: "请选择",
        template: props => <div>{props.value}</div>
    };

    state = {
        showDropdown: false
    };

    constructor(props) {
        super(props);
        this.bodyClickListener = this.bodyClick.bind(this);
    }

    getLabel() {
        const {options, value} = this.props;
        let current = options.find(item => item.value === value);
        if (current && current.text) {
            return current.text;
        } else {
            return false;
        }
    }

    bodyClick() {
       this.setState({showDropdown: false});
    }

    componentDidMount() {
        document.addEventListener('click', this.bodyClickListener);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.bodyClickListener);
    }
    render() {
        const {onChange, options, value, placeholder, name} = this.props;
        const label = this.getLabel();
        const {showDropdown} = this.state;
        const Template = this.props.template;
        return (
            <div className="bank-select">
                <div
                    className={`value-wrapper`}
                    onClick={ ( e ) => {
                         e.nativeEvent.stopImmediatePropagation();
                        this.setState({showDropdown:!showDropdown});
                        return false;
                    }}
                >
                    <Template value={ value } placeholder={ placeholder }/>
                </div>
                {
                    showDropdown &&
                    <ul className="dropdown">
                        {
                            options.map((item) => {
                                return (
                                    <li key={item.value} onClick={ (e)=>{
                                            e.nativeEvent.stopImmediatePropagation();
                                            onChange(name,item);
                                            this.setState({showDropdown:false});
                                    }}>
                                        <img src={ protocolTransfer(item.bankPic) }/>{item.text}
                                    </li>
                                );
                            })
                        }
                    </ul>
                }
            </div>
        )
    }
}
