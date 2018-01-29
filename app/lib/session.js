const STORAGE_KEY = "LT_SESSION";
/*
session管理
 */
class Session {
    session = {};
    constructor(){
        this.restore();
    }
    //从存储中解析数据到内存
    restore(){
        let strJson = localStorage.getItem(STORAGE_KEY);
        if(strJson){
            this.session = JSON.parse(strJson);
        }
    }
    //保存数据
    save(){
        let strJson = JSON.stringify(this.session);
        localStorage.setItem(STORAGE_KEY,strJson);
    }
    //设置token
    setToken(token){
        this.session.token = token;
        this.save();
    }
    //获取token
    getToken(){
        return this.session.token || "";
    }
    //根据键设置值
    set(key,value){
        this.session[key] = value;
        this.save();
    }
    //获取键对应值
    get(key){
        return this.session[key];
    }
}

export default new Session();