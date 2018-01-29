import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QR from 'qr-image';
import API, {PROMOTE_QR_CODE, PROMOTE_DETAIL, WITHDRAW_CASH} from 'lib/api';
import {redirect} from 'lib/utils';
import base64 from 'base64-arraybuffer';
import open1 from './images/qq.png';
import open2 from './images/circlePartner.png';
import open4 from './images/wechat.png';
import {isiOS, isAndroid} from 'lib/utils';
import {success} from 'components/Notifications';
import "./style.less";

export default class Home extends Component {
    state = {
        qrCode: {},
        detail: {}
    };

    componentDidMount() {
        //获取用户信息
        API.fetch(PROMOTE_DETAIL, {}, (resp) => {
            this.setState({detail: resp})
        });
        //用户二维码信息
        API.fetch(PROMOTE_QR_CODE, {}, (resp) => {
            if (resp && resp.code) {
                resp.shareUrl = window.location.origin + "/m/promotion/" + resp.code;
            }
            this.setState({qrCode: resp})
        });
    }

    getQrCode() {
        //生成用户二维码
        if (!this.state.qrCode || !this.state.qrCode.shareUrl) {
            return "";
        }
        return "data:image/png;base64," + base64.encode(QR.imageSync(this.state.qrCode.shareUrl, {
                type: "png",
                margin: 1
            }));
    }

    share() {
        const {qrCode} = this.state;
        if (!qrCode || !qrCode.shareUrl) {
            return;
        }
        const shareUrl = qrCode.shareUrl;
        //跳转url分类
        if (isiOS) {
            let urlAdd = `goto://share?url=${shareUrl}&content=0元加盟，日日返佣。仅需6个好友，即可月入10万。&title=白天赚现金，晚上赚美金！`;
            window.location.href = urlAdd;
        } else if (isAndroid) {
            window.AppJs.shareForH5("白天赚现金，晚上赚美金！", "0元加盟，日日返佣。仅需6个好友，即可月入10万。", shareUrl);
        }
    }

    copy() {
        //复制分享链接
        const {qrCode} = this.state;
        if (!qrCode || !qrCode.shareUrl) {
            return;
        }
        if (isAndroid) {
            window.AppJs.copy(qrCode.shareUrl);
            success("复制成功");
        } else if (isiOS) {
            let text = qrCode.shareUrl;
            if (/https:/.test(qrCode.shareUrl)) {
                text = qrCode.shareUrl.replace("https:", "https/");
            }
            window.location = "paste://" + text;
            success("复制成功");
        }
    }

    withdrawCash() {
        //提现操作
        const {commisionBalance} = this.state.detail;
        API.fetch(WITHDRAW_CASH, {amount: commisionBalance}, (resp) => {
            success("提现成功");
            let detail = this.state.detail;
            detail.commisionBalance = 0;
            this.setState({detail});
        });
    }

    render() {
        const {detail, qrCode} = this.state;
        let cash = parseFloat(detail.commisionBalance);
        if (typeof cash !== "number" || isNaN(cash)) {
            cash = 0;
        }
        const disabled = !( cash >= 10);
        return (
            <div className="promote-container">
                <div className="cash-fund clear-fix">
                    <div className="cash-fund-left">
                        <div className="label">可提现金额</div>
                        <div className="num">{ cash.toFixed(2)}</div>
                    </div>
                    <div className="cash-fund-right">
                        <div
                            className={ "button " + ( disabled ? " disabled" : "")}
                            onClick={_ => {
                                if (!disabled) {
                                    this.withdrawCash();
                                }
                            }
                            }>提现
                        </div>
                    </div>
                </div>
                <div className="description">
                    <div> 系统统计时间 今日00时00分</div>
                    <div> 最小可提现金额10美元，一天允许提现一次</div>
                </div>
                <ul className="list-container" onClick={ _ => {
                    redirect("/sub_user");
                }}>
                    <li>
                        <div>注册用户数</div>
                        <div>{ detail.firstRegisterCount }</div>
                    </li>
                    <li>
                        <div>我的交易用户</div>
                        <div>{ detail.firstTraderCount }</div>
                    </li>
                    <li>
                        <div>累计交易手数</div>
                        <div>{ detail.firstHandCount }</div>
                    </li>
                </ul>
                <div className="share-container">
                    <div><img src={ this.getQrCode() }/></div>
                    <div>推荐朋友扫码，成为你的用户</div>
                    <div> 选择复制链接分享给好友</div>
                    <div className="link"
                         onClick={ this.copy.bind(this) }> { qrCode.shareUrl } </div>
                </div>
            </div>
        )
    }
}
