import {AJAX_CODE_SUCCESS, AJAX_CODE_ERROR, AJAX_CODE_WARNING} from 'constants';
import { error,notif } from 'components/Notifications';
import Session from 'lib/session';
import Store from '../store';
import { startLoading,stopLoading } from 'components/App/actions';
import { redirect,isAndroid,isiOS} from 'lib/utils';
export const API_PREFIX = "/ltapi";

let xhrPool = [];
export default {
    get(url, params, cb){
        let token = Session.getToken();
        this.send(url, 'GET', {...params,token}, cb);
    },
    post(url, params, cb) {
        let token = Session.getToken();
        this.send(url, 'POST', {...params,token}, cb);
    },
    fetch(url, param, cb){
        let token = Session.getToken();
        this.send(url,'POST',{token,...param}, cb)
    },
    send(url, method, params, cb) {
        Store.dispatch(startLoading());
        const xhr = new XMLHttpRequest();
        xhrPool.push(xhr);
        xhr.open(method, API_PREFIX + url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                xhrPool.splice(xhrPool.indexOf(xhr),1);
                if(xhrPool.length == 0){
                    Store.dispatch(stopLoading());
                }
                let data = xhr.responseText;
                try {
                    data = JSON.parse(data);
                } catch (exc) {
                }
                if (cb) {
                    if (typeof data === "object") {
                        if (data.code === AJAX_CODE_SUCCESS || data.code === 200) {
                            return cb(data.data,data);
                        } else if(data.code === 406 || data.code=== 408){
                            let msg = data.msg;
                            if(data.code === 408){
                                msg = "仅支持老用户查询";
                            }
                            notif(data.msg, 'confirm', [
                                {
                                    text: "重新输入",
                                    action(fnClose){
                                        fnClose();
                                    }
                                },
                                {
                                    text: "联系客服",
                                    action(fnClose){
                                        // redirect("/customer_service");
                                        if(isAndroid){
                                            window.AppJs.openCustomService();
                                        }else{
                                            window.location.href = "goto://openCustomService";
                                        }
                                        fnClose();
                                    }
                                }
                            ])
                        }else if(data.code === 41022){
                            error("您已在其他设备登录，请确认");
                        } else {
                            return error(`${data.msg}`);
                        }
                    }else{
                        error("Connect: Network is unreachable");
                    }
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


