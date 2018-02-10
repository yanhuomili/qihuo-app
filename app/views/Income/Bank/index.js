import React from 'react';
import PropTypes from 'prop-types';
import {SvgIcon} from 'components/Icon';
import {connect} from 'react-redux';
import defaultBankImage from './images/bank.png';
import {
    PAY_TYPE_ALIPAY,
    PAY_TYPE_PINGAN,
    BANK_TYPE_KUAIQIAN,
    BANK_TYPE_YINSHENGBAO
} from 'constants';
import {protocolTransfer} from 'lib/utils';
import "./style.less";


export default class Bank extends React.Component {
    static props = {
        data: PropTypes.object.isRequired,
        active: PropTypes.bool,
        showArrow: PropTypes.bool,
        onClick: PropTypes.func,
        selected: PropTypes.bool,
        showChannel: PropTypes.bool
    };
    static defaultProps = {
        showChannel: false
    };

    state = {
        show:false
    };
    render() {
        const {data, selected, showArrow, onClick, showChannel,hasImg} = this.props;
        const { show } = this.state;
        return (
            <div className={"banks otherbank" + ( data.chargeAmt === 0 ? " disabled":"")}>
                <div onClick={
                    /*
                    ( data.id === PAY_TYPE_ALIPAY || data.id === PAY_TYPE_PINGAN ) ?
                    _=>{ onClick(BANK_TYPE_KUAIQIAN) }
                    : _=>{
                    const { show } = this.state;
                    this.setState({show:!show});
                    }*/
                    onClick
                }>
                    <div className="bank-image">
                        {hasImg?null:<img src={ data.bankPic ? protocolTransfer(data.bankPic) : defaultBankImage }/>}
                    </div>
                    <div className="bank-info">
                        <div className="bank-info-top">
                            <span className="bank-name">{ data.bankName }</span>
                            {
                                data.tailNumber ?
                                    <span
                                        className="bank-tail-num">（尾号{data.tailNumber}）</span>
                                    : null
                            }
                        </div>
                        <div className="bank-limited">
                            {
                                data.description ? data.description : ""
                            }
                            {
                                typeof data.chargeAmt === "undefined" ?
                                    ""
                                    : (
                                data.chargeAmt?
                                    `限额￥${data.chargeAmt}`
                                    :
                                    "不支持")

                            }
                        </div>
                        {
                            showArrow && <SvgIcon name="arrow_right"/>
                        }
                        { selected &&
                        <SvgIcon name="checked" className="checked"/>}
                    </div>
                </div>
            </div>
        )
    }
}


