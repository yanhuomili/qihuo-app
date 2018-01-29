import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { parseDate } from 'lib/utils';
export default class DetailItem extends React.Component {
    render(){
        const { data } = this.props;
        return (
            <div className="fund-detail-item">
                <div>
                    <div>
                        <p>{ parseDate(data.createDate).split(" ")[0] }</p>
                        <p>{ parseDate(data.createDate).split(" ")[1] }</p>
                    </div>
                    <div className="remark">
                        <div>{ data.remark }</div>
                        <span className={data.amount>=0 ? "red":"green"}>{ data.amount>=0 ? ("+"+data.amount.toFixed(2)) : data.amount.toFixed(2) }</span>
                    </div>
                </div>
            </div>
        )
    }
}

DetailItem.props = {
    data: PropTypes.object
}