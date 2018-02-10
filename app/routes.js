import React from 'react';
import App from 'components/App';
import Session from 'lib/session';
import { parse } from 'query-string';
const load = (moduleName) => {
    const module = require(`views/${moduleName}/index.js`);
    return module.default;
};

export default {
    path: '/m',
    component: App,
    indexRoute: { component: load('Home'), },
    onEnter(nextState,replaceState){
        const query = parse(nextState.location.search);
        if(query && query.token){
            let current = Session.getToken();
            if(current !== query.token){
                Session.setToken(query.token);
            }
        }
    },
    childRoutes: [
        { path: 'home', component: load('Home'), },//账户中心
        { path: 'income', component: load('Income') ,exact:true},//入金
        { path: 'about', component: load('About') },//关于我们
        { path: 'company_intro', component: load('About/CompanyIntro') },//公司简介
        { path: 'redirect', component: load('Redirect') },//公司简介
        { path: 'income/banks', component: load('Income/Banks'),exact:true },//选择银行
        { path: 'income/pay', component: load('Income/Pay') ,exact:true },//支付方式
        { path: 'income/qiantong', component: load('Income/QianTong') ,exact:true },//钱通支付
        { path: 'income/alipay', component: load('Income/Alipay') ,exact:true },//支付宝
        { path: 'income/success', component: load('Income/Success') ,exact:true},//支付成功
        { path: 'income/input_money', component: load('Income') ,exact:true},//入金
        { path: 'income/etomequick', component: load('Income/EToneQuick') ,exact:true},//易通快捷支付
        { path: 'income/daddytransfer', component: load('Income/DaddyTransfer') ,exact:true}, //daddy转帐
        { path: 'tel_detail', component: load('Home/TelDetail') },//手机认证
        { path: 'name_detail', component: load('Home/NameDetail') },//实名认证
        { path: 'bank_detail', component: load('Home/BankDetail') },//银行卡
        { path: 'rule_list', component: load('Home/RuleList') },//法律条款
        { path: 'bankcard_add', component: load('Home/BankDetail/AddBankcard') },//添加银行卡
        { path: 'bank_limit', component: load('Home/BankDetail/AddBankcard/BankLimit') },//银行卡列表
        { path: 'transaction', component: load('Home/RuleList/Transaction') },//资产托管人与操盘手合作协议
        { path: 'rule/risk', component: load('Home/RuleList/Risk') },//风险告知书
        { path: 'rule/service', component: load('Home/RuleList/Service') },//服务条款
        { path: 'rule/statement', component: load('Home/RuleList/Statement') },//免责声明
        { path: 'rule/secret', component: load('Home/RuleList/Secret') },//隐私政策
        { path: 'rule/riskShow', component: load('Home/RuleList/RiskShow') },//风险披露
        { path: 'rule/supervise', component: load('Home/RuleList/Supervise') },//监管及牌照
        { path: 'rule/customer', component: load('Home/RuleList/Customer') },//客户协议
        { path: 'fund_detail', component: load('Home/FundDetail')},//资金明细
        { path: 'center', component: load('Center')},//帮助中心
        { path: 'agreement', component: load('Center/Customer')},//用户服务协议
        { path: 'commission', component: load('Center/Commission')},//资金托管服务协议
        { path: 'standard', component: load('Center/Standard')},//资费标准
        { path: 'task_center', component: load('TaskCenter')},//任务中心
        { path: 'promotion/:code', component: load('Promote/Promotion'),exact:true },//推广
        { path: 'promotion', component: load('Popularize'),exact:true},//合伙人
        { path: 'gain_state', component: load('Popularize/GainState')},//赚钱说明
        { path: 'sub_user', component: load('Popularize/SubUser')},//推广-用户详情
        { path: 'task_center', component: load('TaskCenter')},//任务中心
        { path: 'customer_service', component: load('Service')},//客服中心
        { path: 'trail_loss', component: load('TrailLoss')},//追踪止损
        { path: 'defer_rule', component: load('DeferRule')},//递延规则
        { path: 'beginner', component: load('Beginner'),exact:true},//新手学堂
        { path: 'beginner/detail', component: load('Beginner/Detail'),exact:true},//新手学堂-详情
        { path: 'promote', component: load('Promote'), },//推广
        { path: 'product_rule', component: load('TradeRuleDesc')},//玩法说明
        { path: 'news_detail', component: load('NewsDetail')},//新闻分享详情
        { path:'history_records',component:load('HistoryRecords'),exact:true },//老用户登录
        { path:'history_records/detail',component:load('HistoryRecords/Detail') },//老用户流水详情
        { path:'questions',component:load('Questions') },//风险测评问题
        { path:'evaluateResult',component:load('EvaluateResult') },//风险测评结果
        { path:'risk_evaluate',component:load('RiskEvaluate') },//风险测评
        { path:'open_account_doc',component:load('OpenAccountDoc') },//开户文档
        { path:'gold_ten',component:load('GoldTen') },//金十数据
        { path:'identification',component:load('Identification') },//认证信息
        { path:'my_info',component:load('Home/MyInfo') },//个人资料
        

    ]
}