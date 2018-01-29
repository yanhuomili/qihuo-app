import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RevenueExpenditureItem extends Component {
    static props = {
        data: PropTypes.array
    };
    static defaultProps = {
        data: []
    };

    render() {
        const {data} = this.props;
        const arrData = data.createDate.split(" ");
        const curflowAmt = data.type * parseFloat(data.curflowAmt);
        return (
            <div className="clear-fix revenue-expenditure-item">
                <div className="pull-left">
                    <div>{ arrData[0] }</div>
                    <div>{ arrData[1] }</div>
                </div>
                <div className="text-center">{data.intro}</div>
                <div
                    className={"pull-right "+(curflowAmt > 0 ? "up":"down")}>
                    {curflowAmt > 0 ? "+" : "-"}{data.curflowAmt}
                </div>
            </div>
        )
    }
}