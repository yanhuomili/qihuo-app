import {browserHistory as history} from '../app';
import {parse} from 'query-string';
import {hideModal} from 'components/Notifications';
export {history};
let historyLength = 1;
export const historyListener = ()=>{
    hideModal();
};
//加载模块
export const load = (moduleName) => {
    const module = require(`views/${moduleName}/index.js`);
    return module.default;
};
//跳转
export const redirect = (url) => {
    hideModal();
    let newUrl = "/m" + url;
    history.push(newUrl);
    historyLength = historyLength + 1;
};
//替换当前history的state
export const replace = (url, param) => {
    hideModal();
    let newUrl = "/m" + url;
    history.replace(newUrl, param);
};
//后退
export const back = () => {
    if (historyLength === 1) {
        backToApp()
    } else {
        hideModal();
        history.goBack();
    }
    historyLength = historyLength - 1;
};
export const backToStart = () => {
    hideModal();
    history.go(-4);
};

export const backReplace = (url, to = -1) => {
    hideModal();
    history.go(to);
    //history.replace("/m"+url);
};
//保留两位有效数
export const numberFormat = (num) => {
    if (typeof num !== "number" || isNaN(num)) {
        return num;
    }
    let str = (Math.round(num * 100) / 100).toFixed(2);
    let [H, L] = str.split(".");
    let newStr = "";
    let len = H.length;
    for (let i = len; i > 0; i--) {
        newStr = H[i - 1] + newStr;
        let idx = len - i;
        if ((idx + 1) % 3 === 0 && idx !== 0 && i !== 1) {
            newStr = "," + newStr;
        }
    }
    return newStr + "." + L;
};
//修正约数精度
export const numberFloor = (num,fixed=true) => {
    if (typeof num !== "number" || isNaN(num)) {
        return num;
    }
    if(fixed){
        num = num + 0.00000001;
    }
    let str = (Math.floor(num * 100) / 100) + "";
    let [H, L] = str.split(".");
    if (!L) {
        return H + ".00";
    }
    if (L.length === 1) {
        L = L + '0';
    }
    return H + "." + L;
};
//修正约数精度
export const numberFloorFormat = (num) => {

    if (typeof num !== "number" || isNaN(num)) {
        num = parseFloat(num);
    }

    if (isNaN(num)) {
        return num;
    }
    num = num + 0.00000001;
    let str = (Math.floor(num * 100) / 100) + "";
    let [H, L] = str.split(".");
    if (!L) {
        return H + ".00";
    }
    if (L.length === 1) {
        L = L + '0';
    }
    let newStr = "";
    let len = H.length;
    for (let i = len; i > 0; i--) {
        newStr = H[i - 1] + newStr;
        let idx = len - i;
        if ((idx + 1) % 3 === 0 && idx !== 0 && i !== 1) {
            newStr = "," + newStr;
        }
    }
    return newStr + "." + L;
};
//根据时间戳获取日期字符串
export const parseDate = (str) => {
    let date = new Date(str);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
};

//分隔银行卡号
export const splitCardNum = (num) => {
    let str = '';
    for (let i = 0; i < num.length; i++) {
        if (i % 4 == 0 && i != 0) {
            str += ' ';
        }
        str += num.charAt(i);
    }
    return str;
};

//分隔手机号
export const splitTel = (num) => {
    return num.substring(0, 3) + " " + num.substring(3, 7) + " " + num.substring(7, 11);
};

//分隔身份证号
export const splitIdCardNum = (num) => {
    return num.substring(0, 6) + " " + num.substring(6, 14) + " " + num.substring(14, 20);
};

let u = navigator.userAgent;
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;  //android终端或者uc浏览器
export const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

//获取参数
const getQueryString = (name) => {
    let query = parse(history.location.search);
    if (query && query[name]) {
        return query[name];
    }
    return "";
};
//跳转到原生APP
export const backToApp = (checkOrigin) => {
    let type = getQueryString("type");//获取到original
    if (isiOS && ( !checkOrigin || type == "original")) {
        window.location.href = 'goBack://last';
    } else if (isAndroid && (!checkOrigin || type == "original")) {
        window.AppJs && window.AppJs.finishActivity();
    } else {
        history.goBack();
    }
};
//出金
export const openWithDraw = () => {
    if (isiOS) {
        window.location.href = "goto://drawMoney";
    } else {
        window.AppJs && window.AppJs.openWithDrawActivity()
    }
};

//跳到实名认证
export const Certification  = () => {
    if (isiOS) {
        window.location.href = "goto://hall";
    } else {
        window.AppJs && window.AppJs.gotoHall()
    }
};


//跳转到服务大厅
export const openHall = () => {
    if (isiOS) {
        window.location.href = "goto://hall";
    } else {
        window.AppJs && window.AppJs.gotoHall()
    }
};
//http转为https解决 mixed content问题
export const protocolTransfer = (url) => {
    if (/^http:\/\//.test(url)) {
        return url.replace(/^http/, "https");
    }
    return url;
};
//拔打服务电话
export const callService = (num) => {
    if (isiOS) {
        window.location.href = "tel://" + num;
    } else if (isAndroid) {
        window.AppJs.call(num);//调android 打电话服务
    }
};

export const openServiceQQ = () => {
    window.open("mqqwpa://im/chat?chat_type=crm&uin=800020815&version=1&src_type=web&web_src=http:://wpa.b.qq.com");
};

export const onceFactory = () => {
    let used = false;
    return (fn) => {
        if (used) {
            return;
        }
        used = true;
        fn();
    }
};

//时间格式化
export const dateFormat = (date) => {
    if (!date) {
        return "";
    }
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    let dateTime = year + "-" + month + "-" + day;
    return dateTime;
};

//千 万字符转化
export const numberParse = (num) => {
    if (num == undefined || num == null) {
        return 0;
    } else if (num >= 0 && num < 100) {
        return num;
    } else if (num >= 100 && num <= 9999) {
        num = Math.round((num / 1000) * 100) / 100;
        return `${num}千`;
    } else if (num > 9999) {
        num = Math.round((num / 10000) * 100) / 100;
        return `${num}万`;
    }
};

//截取保留二位小数
export const sliceNumber = (num)=>{
    if(num==undefined || num==null){
        return "--";
    }
    if (typeof num !== "number" || isNaN(num)) {
        return num;
    }
    num = "" + num;
    if(num.indexOf('.')>-1){
        let arr = num.split('.');
        let newNum = arr[1];
        if(newNum.length==1){
            return "" + num + "0";
        }else if(newNum.length==2){
            return num;
        }else{
            return "" + arr[0] + "." + arr[1].substring(0,2);
        }
    }else{
        return "" + num + ".00";
    }
};
//跳转到登陆页
export const redirectLogin = ()=>{
    if(isAndroid){
        window.AppJs.login();
    }else{
        window.location.href = "goto://login";
    }
};

//跳转到支付宝
export const goAlipay = (action,param ) => {
    let arrParam = [];
    for(let key in param){
        if(param.hasOwnProperty(key)){
            arrParam.push(`${key}=${param[key]}`);
        }
    }
    let strParam = arrParam.join("&");
    let goUrl = `${action}?${strParam}`;
    let urlScheme = 'alipays';
    if(isiOS){
        urlScheme = 'alipay';
    }
    let p = 'platformapi';
    let sm = '11';
    let s = '100000' + sm;
    console.log(goUrl);
    let gopage = urlScheme + "://" + p + '/startApp?appId='+s+'&url='+encodeURIComponent(goUrl);
    document.location.href = gopage;
};