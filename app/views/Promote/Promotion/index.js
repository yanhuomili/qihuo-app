import React, {Component} from 'react';
import banner from './img/banner.png';
import cellPhone from './img/cellPhone.png';
import logo from './img/logo.png';
import btmImg from './img/btmImg.png';
import Button from 'components/Button';
import API, {PROMOTION_ADD_TELE} from 'lib/api';
import "./style.less";


export default class Promotion extends Component {
    state = {
        disabled: true,
        phone: "",
        isWechat: false
    };

    textChange() {
        let disabled = true;
        let phone = this.refs.txt.value;
        if (/[0-9]{11}/.test(phone)) {
            disabled = false;
        }
        this.setState({phone, disabled});
    }

    download() {
        let agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf('mac') > -1) {
            //ios系统
            window.location.href = "https://itunes.apple.com/cn/app/pro-ltrade-hong-kong-stock-opening-transaction/id1147926971?mt=8";
                //"https://itunes.apple.com/us/app/lt7/id1147926971?l=zh&ls=1&mt=8";
        } else {
            //安卓系统
            window.location.href = "http://www.leaguetrade.com/leagueTrade_official.apk";
        }
    }

    addTele() {
        const {phone} = this.state;
        const {code} = this.props.match.params;
        API.fetch(PROMOTION_ADD_TELE, {tele: phone, c: code}, (resp) => {
            this.download();
        });
    }

    componentWillMount() {
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.setState({isWechat: true});
        }
    }

    render() {
        return (
            <div className="promotion-container">
                {
                    this.state.isWechat ?
                        <div className="wechat">
                            <p>点击右上角菜单</p>
                            <p>在默认浏览器中打开并安装应用</p>
                        </div>
                        :
                        <div>
                            <div className="top">
                                <img src={ banner } className="banner"/>
                            </div>
                            <div className="toBottom">
                                <div className="input-container">
                                    <div className="phone-input">
                                        <img src={ cellPhone }/>
                                        <input type="text"
                                               onChange={ this.textChange.bind(this) }
                                               ref="txt"
                                               value={ this.state.phone }
                                               placeholder="请输入手机号赢取大礼"
                                        />
                                    </div>
                                    <div>
                                        <Button text="领取赠金"
                                                disabled={  this.state.disabled }
                                                onClick={ this.addTele.bind(this) }/>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <img src={ btmImg }/>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}