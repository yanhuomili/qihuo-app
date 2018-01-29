import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
export default class TaskItem extends React.Component {
    render(){
        const { title, msg, newHandTask, remark, imgUrl, fnClick } = this.props;
        return (
            <div className="task-item" onClick={ fnClick }>
                <div>
                    <div>
                        <span className="title">{ title }</span>
                        {
                            msg ?
                                <span className={ newHandTask ? "newHand-task":"not-newHand-task"}>{ msg }</span>
                                :
                                null
                        }
                    </div>
                    <div className="remark">{ remark }</div>
                </div>
                <img src={ imgUrl }/>
            </div>
        )
    }
}

TaskItem.props = {
    title: PropTypes.string.require,
    msg: PropTypes.string,
    newHandTask: PropTypes.bool,
    remark: PropTypes.string.require,
    imgUrl: PropTypes.string.require,
    fnClick: PropTypes.func.require
}