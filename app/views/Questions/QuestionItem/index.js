import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from 'components/Icon';
import checkImg from './images/check.png';
export default class QuestionItem extends React.Component {
    constructor(){
        super();
        this.state = {
            checkIndex: ""
        }
    }
    check(val){
        const {index,fnClick} = this.props;
        this.setState({checkIndex:val});
        fnClick(index,val);
    }
    render() {
        const { data } = this.props;
        const LETTER = {
            "1": "A、",
            "2": "B、",
            "3": "C、",
            "4": "D、",
        };
        return (
            <div className="question-item">
                <div className="title">{ data.title }</div>
                <ul>
                    {
                        data.options.map((item,i)=>{
                            return <li key={i} onClick={ ()=>this.check(i+1) }>
                                <div><span>{ LETTER[i+1] }</span><p>{ item }</p></div>
                                {
                                    this.state.checkIndex==(i+1) ? <img src={ checkImg }/> : null
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

QuestionItem.props = {
    data: PropTypes.object.require,
    index: PropTypes.string.require,
    fnClick: PropTypes.func.require,
};