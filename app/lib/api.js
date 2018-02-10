import {
    AJAX_CODE_SUCCESS,
    AJAX_CODE_ERROR,
    AJAX_CODE_WARNING,
    AJAX_CODE_LOGIN_INTERRUPT,
    AJAX_DAY_TIMES_LIMITED
} from 'constants';
import {error,confirm} from 'components/Notifications';
import config from 'config';
import Session from 'lib/session';
import {redirectLogin} from 'lib/utils';
import Store from '../store';
import {startLoading, stopLoading} from 'components/App/actions';
export const API_PREFIX = config.API_PREFIX;
export const USER_BANKS = {
    "func": "getUserBankInfoList",
    "cmd": "user"
};
//获取默认银行卡
export const USER_DEFAULT_DATA = {
    "func": "getUserDefaultBankInfo",
    "cmd": "user"
};
export const USER_CHARGE_BANK_LIST = {
    "func":"qryUserChargeBankList",
    "cmd":"user"
};
export const USER_CHARGE_MAX_AMT = {
    "func": "qryUserChargeMaxAmt",
    "cmd": "user"
};
export const USER_CHARGE_CHANNEL = {
    "func": "qryUserChargeChannel",
    "cmd": "user"
};
export const ACCOUNT_INFO = {//账户信息
    "func": "accountInfo",
    "cmd": "account"
};
export const ACCOUNT_CARDS = {//绑定的银行卡信息
    "func": "bankCardInfo",
    "cmd": "account"
};
export const FUND_DETAIL = {//现金明细
    "func": "followList",
    "cmd": "fund"
};
export const BANK_LIST = {//银行列表
    "func": "getBankInfo",
    "cmd": "user"
};
export const GET_KUAIQIAN_VERIFY_CODE = {
    "func": "kqGetDynamicNum",
    "cmd": "user"
};
export const BANK_ADD = {//添加银行卡
    "func": "addCard",
    "cmd": "account"
};
export const CARD_DELETE = {//删除银行卡
    "func": "deleteBankCard",
    "cmd": "account"
};
export const IS_PROMOTER = {//是否是推广员
    "func": "isPromoter",
    "cmd": "promote"
};
export const ACTIVE_PROMOTER = {//激活称为推广员
    "func": "activatePromoter",
    "cmd": "promote"

};
export const BEGINNER = {//新手学堂
    "func": "getNoticeList",
    "cmd": "news"
};
export const USER_DETAIL = {//用户详情
    "func": "getBrancherInfos",
    "cmd": "promote",
};

export const PROMOTE_DETAIL = {
    "func": "getPromoterInfo",
    "cmd": "promote"
};//获取推广详情

export const PROMOTE_QR_CODE = {
    "cmd": "promote",
    "func": "isPromoter"
};//获取推广链接

export const WITHDRAW_CASH = {
    "cmd": "promote",
    "func": "commisionWidthdrawApply"
};//提现

export const PRODUCT_RATE = {
    "cmd": "product",
    "func": "getRateByCurrency"
};//汇率

export const PRODUCT_RULE = {
    "cmd": "config",
    "func": "rulesOfTransactions"
};//玩法规则说明

export const DEFER_RULE = {
    "cmd": "user",
    "func": "defer"
};//玩法规则说明

export const NEWS_DETAIL = {
    "cmd": "news",
    "func": "detail"
};//新闻分享详情

export const PROMOTION_ADD_TELE = {
    "func": "addIPTele",
    "cmd": "promote",
};//设置推广员下线

export const YIN_SHENG_BAO = {
    "cmd": "fund",
    "func": "rechargeForUnspay"
};//银生宝入金

export const INCOME_LIMIT = {
    "func": "rechargeDailyTopAmtChk",
    "cmd": "fund"
};

export const RECHARGE_BY_PINGAN = {
    "func": "rechargeByPingAn",
    "cmd": "fund"
};

export const RECHARGE_BY_KUAIQIAN = {
    "func": "userKQpayOrder",
    "cmd": "user",
};
export const RECHARGE_BY_QIANTONG= {
    "func": "qianTongApiPay",
    "cmd": "user",
};
//风险测评
export const RISK_EVALUATE = {
    "func": "userActiveAccount",
    "cmd": "user",
    "md5": "test",
};

export const ALIPAY_QUICK= {
    cmd:"user",
    func:"userCharge"
};


//获取入金最低限额
export const GET_INCOME_LIMIT = {
    "func":"getUserFundInOutLimitInfo",
    "cmd":"user"
};

//我的
export const MY= {
    "func":"getUserHomePage",
    "cmd":"user"
};
//获取昵称和头像
export const NICK_HEAD= {
    "func":"getUserInfo",
    "cmd":"user"
};
//修改昵称
export const MODIFY_NICK_NAME= {
    "func":"updateUserInfo",
    "cmd":"user"
};
//修改密码
export const MODIFY_PASSWORD= {
    "func":"updUserLoginPassword",
    "cmd":"user"
};
//资金明细
export const MONEY_DETAIL= {
    "func":"followList",
    "cmd":"fund"
};

/*export const token = "44f69756aa3acc956626b6f57e8a60f45592028bb4cf10a30dc44" +
 "dd6db79759fa20ff297d8a7c31f037f4d3731" +
 "31020a08a1421740afdb3a7f3c7a60862e2aa0";*/
//export const token = "e91e7fd0d554bdc251e083da3517ac6bacec5c81dbf7fef9ea0d970dd698a66d27effba923a03449da7f99e74b8d7ce9bbec88633b9a8c4a4bc491efd95839ba";
export const API_DISPATCHER = "/lt-interface/h5api";
let xhrPool = [];
export default {
    get(url, params, cb){
        let token = Session.getToken();
        this.send(API_DISPATCHER, 'GET', {...params, token}, cb);
    },
    post(url, params, cb) {
        let token = Session.getToken();
        this.send(API_DISPATCHER, 'POST', {...params, token}, cb);
    },
    //flag:是否处理请求结果
    fetch(config, param, cb, flag = false){
        let token = Session.getToken();
        if (typeof config === "string") {
            this.send(config, 'POST', {token, ...param}, cb)
        } else {
            const {func, cmd,md5, method} = config;
            this.send(API_DISPATCHER, method || "POST", {
                msg: JSON.stringify({
                    func, cmd, md5, data: param, token
                })
            }, cb, flag);
        }
    },
    send(url, method, params, cb, flag) {
        Store.dispatch(startLoading());
        const xhr = new XMLHttpRequest();
        xhrPool.push(xhr);
        xhr.open(method, API_PREFIX + url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                xhrPool.splice(xhrPool.indexOf(xhr), 1);
                if (xhrPool.length == 0) {
                    Store.dispatch(stopLoading());
                }
                let data = xhr.responseText;
                try {
                    data = JSON.parse(data);
                } catch (exc) {
                }
                if (flag && cb) {
                    return cb(data);
                }
                if (cb) {
                    if (typeof data === "object") {
                        if(data.code === AJAX_CODE_LOGIN_INTERRUPT){
                            // error('您已在其他设备登录，请确认');
                            return confirm("您已在其他设备登录，请重新登录",(fnClose)=>{
                                redirectLogin();
                                fnClose();
                            })
                        }else if (data.code === AJAX_CODE_SUCCESS || data.code === 200) {
                            return cb(data.data, data);
                        } else if (data.code === AJAX_DAY_TIMES_LIMITED ){
                            return error("您今日充值次数已到达上限，请明天再来");
                        } else {
                        	console.log(data)
//                      	cb(data);
                            return error(`${data.msg}`);
                        }
                    }
                    error("网络异常");
                }
            }
        };
        let body;
        if (params) {
            let bodies = [];
            for (let name in params) {
                if (params.hasOwnProperty(name)) {
                    bodies.push(name + '=' + encodeURIComponent(params[name]));
                }
            }
            body = bodies.join('&');
            xhr.setRequestHeader("Accept", "application/json;charset=utf-8");
            if (body.length) {
                let header = "application/x-www-form-urlencoded";
                xhr.setRequestHeader("Content-type", header);
            }
        }
        xhr.send(body);
    }
};


