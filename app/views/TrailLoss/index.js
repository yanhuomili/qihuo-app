import React from 'react';
import './style.less';
import INFO_IMG from './images/info.png';

export default class TrailLoss extends React.Component {
    render() {
        return (
            <div className="trail-loss-page">
                <div>
                    <p className="title">什么叫追踪止损</p>
                    <p className="content">追踪止损（移动止损）是一种动态止损方法，止损价位会随着盈利增加而变化，起到保护盈利/减少亏损的作用。如做多开仓，设置追踪止损后，行情每上涨创新一个价位，止损位就会被上移一个价位（如图）。做空则反之。</p>
                </div>
                <div>
                    <img src={ INFO_IMG }/>
                </div>
                <div>
                    <p className="content">举个栗子：</p>
                    <p className="content">以<span className="index first">1</span>48.00的价格做多CL1707，设置止损$300（对应止损价47.70），<span className="index second">2</span>中途价格未创新高，则止损价不变，几分钟后<span className="index third">3</span>行情价格上涨0.50到48.50，此时止损价也被上抬0.50到48.20，如果此后<span className="index fourth">4</span>行情回落，到达48.20即触发追踪止损。</p>
                </div>
            </div>
        )
    }
}