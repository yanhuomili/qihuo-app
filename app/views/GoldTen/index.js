/**
 * 金十数据页面，调用接口获取数据，处理数据*/
import React from 'react';
import Container from 'components/Container';
import $ from 'jquery';
import './style.less';
window.g = 1;
window.calenderNowId = "";
window.dates = [];
window.setting = false;
//数据模版
const template0 = '<li class="flash {important} newsline-{d}" id="{newstimespan}">{calenderbox}'+
    '<a><div class="timeline">'+
    '   <div class="dotbg">'+
    '       <div class="dot"></div>'+
    '   </div>'+
    '   <div class="time">{time}</div>'+
    '</div>'+
    '<div class="live-c onlytxt">'+
    '<div class="txt">{text}</div>'+
    '</div></a>'+
    '</li>';
//数据模版
const template1 = '<li class="flash newsline-{d}" id="{newstimespan}">' +
    '{calenderbox}'+
    '<a><div class="timeline">' +
    '   <div class="dotbg">' +
    '       <div class="dot"></div>' +
    '   </div> ' +
    '   <div class="time">{time}</div>' +
    '</div> ' +
    '<div class="live-c ">' +
    '<div class="txt">{text}' +
    '<div class="live-ele {important}" >' +
    '   <img class="flag" src="//cdn.jin10.com/images/flag/{country}.png">' +
    '   <table class="pindex">' +
    '       <tbody>' +
    '       <tr>' +
    '           <td>前值:{prefix}</td>' +
    '           <td>预期：{predicted}</td>' +
    '           <td>实际：<span id="actual_{actual_id}" class="fact {effect_text_class}">{actual}</span></td>' +
    '       </tr>' +
    '       <tr>' +
    '           <td colspan="2">' +
    '               <div class="live-ele-l">' +
    '                   <img src="//cdn2.jin10.com/news/wx/img/{star}.png" width="20" height="34"   />' +
    '               </div>' +
    '           </td>' +
    '           <td><div class="live-ele-r {effect_class}">{effect}</div></td>' +
    '       </tr>' +
    '       </tbody>' +
    '   </table>' +
    '</div>' +
    '</div>'+
    '</div></a>' +
    '</li>';
export default class GoldTen extends React.Component {
    state = {
        html:'',
    };
    componentWillMount(){
        //自定义日期方法
        Date.prototype.format = function (format) {
            let o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
                (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
            return format;
        };
        this.getData();
        //每30秒刷新数据
        setInterval(()=>{
            this.getData();
        },1000*30);
    }
    getData(){//获取金十数据
        $.ajax({
            url: 'https://m.jin10.com/flash',
            data: {
                maxId: 0,
                count: 200
            },
            dataType: 'jsonp',
            jsonp: 'jsonpCallback',
            success: (datas)=>{
                if (datas) {
                    $("#content").html("");
                    $(datas).each((i,data)=>{
                        this.checkMsg(data,"append");
                    });
                }
            },
            complete: function(){

            },
            error: function(e){

            }
        })
    }
    checkMsg(msg,insertType){//处理数据
        let arr = msg.split("#");
//        console.log(msg);
        let type = arr[0];
        let im = arr[1];
        let sj = arr[2];
        let nr = arr[3];
        let html = '';
        if(type==1){
            html = this.genHtml1(arr);
            if(insertType=="append"){
                $("#content").append(html);
            }else{
                $("#content").prepend(html);
            }
        }else if(type==0){
            html = this.genHtml0(arr);
            if(insertType=="append"){
                $("#content").append(html);
            }else{
                $("#content").prepend(html);
            }
        }else if (type == "2") {
            $("#content_" + im).html(sj);
        }else if (type == "3") {
            if (sj.length > 0) {
                $("#actual_" + im).html(sj);
            }
            if (nr.length > 0) {
                $("#yingxiang_" + im).html(nr);
            }
            if (a4.length > 0) {
                $("#value_" + im).html(a4);
            }
        }else if (type == "6") {
            window.location.reload();
        }else if (type == "7") {
            $("#" + im).text("修正：" + sj + "（前值）");
        }
    }
    genHtml0(arr){//处理数据
        let t = arr[2].replace(/-/g, '/');
        let calenderbox = this.genDateSpan(t);
        let type = arr[0];
        let important = arr[1];
        let d = new Date(t);
        let time = new Date(t).format("hh:mm:ss");
        let content = arr[3];
        let url = arr[4];
        let pic = arr[6];
        let newstimespan = arr[11];

        if(pic){
            pic = "http://image.jin10.com/"+pic.replace("_lite","");
            content = content+'<div class="text-img"><a><img class="thumb" src="'+pic+'" /></a></div>';
        }

        if (!url) {
            url = '/index/'+newstimespan;
        }
        let im = "";
        if(important==0){
            im = "important";
        }

        return template0.replace("{calenderbox}", calenderbox)
            .replace("{newstimespan}", newstimespan)
            .replace("{important}", im)
            .replace("{url}", url)
            .replace("{time}", time)
            .replace("{d}", new Date(t).format("yyyy-MM-dd"))
            .replace('{text}', content);
    }
    genHtml1(arr){//处理数据
        let t1 = arr[1].replace(/-/g, '/');
        let t2 = arr[8].replace(/-/g, '/');
        let type = arr[0];
        let time = t1;
        let text = arr[2];
        let prefix = arr[3];
        let predicted = arr[4];
        let actual = arr[5];
        let star = arr[6];
        let effect = arr[7];
        let datetime = t2;
        let cuontry = arr[9];
        let nil = arr[10];
        let newsid = arr[11];
        let newstimespan = arr[12];
        let HTML = '';
        let calenderbox = this.genDateSpan(datetime);
        let url = '/index/'+newstimespan;
        let arrays = [];
        if(star<3){
            arrays = this.getChangeClassText(effect+"2");
        }else{
            arrays = this.getChangeClassText(effect);
        }
        let effect_text = arrays[1];
        if(arrays[1]!="影响较小"){
            effect_text += " 金银";
        }
        //
        return template1.replace("{newstimespan}",newstimespan)
            .replace("{time}", new Date(datetime).format("hh:mm:ss"))//MM-dd
            .replace("{calenderbox}", calenderbox)
            .replace("{important}", star>=3?"important":"")
            .replace("{text}", text)
            .replace("{country}", cuontry)
            .replace("{prefix}", prefix)
            .replace("{predicted}", predicted)
            .replace("{actual}", actual)
            .replace("{star}", star)
            .replace("{effect_class}",arrays[0])
            .replace("{effect_text_class}",arrays[0])
            .replace("{effect}",effect_text)
            .replace("{url}",url)
            .replace("{d}", new Date(datetime).format("yyyy-MM-dd"))
            .replace("{actual_id}",newstimespan);
    }
    genDateSpan(time){//处理数据
        time = time.replace(/-/g, '/');
        let d = new Date(time).format("yyyy-MM-dd");
        if ($.inArray(d, dates) == -1) {
            let fixClass = ""
            if (dates.length==0) {
                fixClass = "";//myfix
                calenderNowId = d;
            }
            //'+fixClass+'
            dates.push(d);
//            console.log("dates", dates, d);
//            console.log($.inArray(d, dates));
            let date = new Date(time);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            let html = '<div id="calender_' + d + '"  class="calenderbox">' +
                '<span>' + day + '</span>' +
                '<p>' + month + '月</p></div>';

            if(setting==false){
                setting=true;
//                console.log(html.replace('calender_','clone_calender_'));
                $("#timebox").append(html.replace('calender_','clone_calender_'));
            }
            if($("#timebox").html()==html){
                $(html).addClass("repeat");
            }
            return html;
        }
        return "";
    }
    getChangeClassText(text) {//处理数据
        let classn = "";

        if (text == "利多") {
            classn = "liduo";
            if (g == 2) {
                classn = "likong";
                text = "利空"
            }
        } else if (text == "利空") {
            classn = "likong";
            if (g == 2) {
                classn = "liduo";
                text = "利多"
            }
        } else if (text == "无影响") {
            text = "影响较小";
            classn = "wuyingxiang";
        } else if (text == "利多2") {
            text = "利多";
            classn = "liduo2";
            if (g == 2) {
                classn = "likong2";
                text = "利空"
            }
        } else if (text == "利空2") {
            text = "利空";
            classn = "likong2";
            if (g == 2) {
                classn = "liduo2";
                text = "利多"
            }
        } else if (text == "无影响2") {
            text = "影响较小";
            classn = "wuyingxiang2";
        }
        let rege = new RegExp("影响");
        if (rege.test(text)) {
            text = "影响较小";
        }
        return [classn, text];
    }
    render(){
        return (
            <Container>
                <div className="gold-ten">
                    <div className="timecon">
                        <ul className="livecon" id="content">{ this.state.html }</ul>
                    </div>
                    <div className="timebanner">
                        <div id="timebox"> </div>
                    </div>
                    <div className="no-click"></div>
                </div>
            </Container>
        )
    }
}