import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import { warning,success } from 'components/Notifications';
import TaskItem from './TaskItem';
import './style.less';
import TaskImg from './images/task.png';
import Img_score from './images/score.png';
import Img_5 from './images/invite5.png';
import Img_10 from './images/invite10.png';
import Img_20 from './images/invite20.png';
import Img_30 from './images/invite30.png';
import Img_100 from './images/invite100.png';
import Img_200 from './images/invite200.png';
import Img_660 from './images/invite660.png';
import Api,{ IS_PROMOTER } from 'lib/api';
import { redirect,backToApp } from 'lib/utils';
export default class TaskCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            isPromoter: false
        };
    }
    componentWillMount(){
        //是否是推广员
        Api.fetch(IS_PROMOTER,{},(data)=>{
            this.setState({isPromoter:data.isPromoter==1});
        });
    }
    render() {
        return (
            <Container>
                <div className="task-center">
                    <AppBar title="任务中心" backward={ backToApp } fixed/>
                    <img src={ TaskImg }/>
                    <TaskItem title="初入江湖"
                              msg="新手任务"
                              newHandTask={ true }
                              remark="新用户注册送积分"
                              imgUrl={ Img_score }
                              fnClick={
                                  () => {
                                     warning("只能领取一次");
                                  }
                              }
                    />
                    {
                        /*
                    <TaskItem title="小试牛刀"
                              msg="新手任务"
                              newHandTask={ true }
                              remark="积分模拟练习5次送10元现金"
                              imgUrl={ Img_10 }
                              fnClick={
                                  () => {
                                      success("完成任务后请联系在线客服领取奖励");
                                  }
                              }
                    />
                    <TaskItem title="你冲我送"
                              msg="新手任务"
                              newHandTask={ true }
                              remark="单笔充值50美元送5美元现金"
                              imgUrl={ Img_5 }
                              fnClick={
                                  () => {
                                      success("完成任务后请联系在线客服领取奖励");
                                  }
                              }
                    />
                    <TaskItem title="大展身手"
                              msg="新手任务"
                              newHandTask={ true }
                              remark="累计实盘交易满5手"
                              imgUrl={ Img_20 }
                              fnClick={
                                  () => {
                                      success("完成任务后请联系在线客服领取奖励");
                                  }
                              }
                    />
                    {
                        this.state.isPromoter ?
                            <div>
                                <TaskItem title="好友消费送"
                                          msg="/1"
                                          remark="好友消费1手送10元"
                                          imgUrl={ Img_10 }
                                          fnClick={
                                              () => {
                                                  redirect("/promotion");
                                              }
                                          }
                                />
                                <TaskItem title="好友消费送"
                                          msg="/10"
                                          remark="好友消费10手送30元"
                                          imgUrl={ Img_30 }
                                          fnClick={
                                              () => {
                                                  redirect("/promotion");
                                              }
                                          }
                                />
                                <TaskItem title="好友消费送"
                                          msg="/50"
                                          remark="好友消费50手送100元"
                                          imgUrl={ Img_100 }
                                          fnClick={
                                              () => {
                                                  redirect("/promotion");
                                              }
                                          }
                                />
                                <TaskItem title="好友消费送"
                                          msg="/100"
                                          remark="好友消费100手送200元"
                                          imgUrl={ Img_200 }
                                          fnClick={
                                              () => {
                                                  redirect("/promotion");
                                              }
                                          }
                                />
                                <TaskItem title="好友消费送"
                                          msg="/300"
                                          remark="好友消费300手送660元"
                                          imgUrl={ Img_660 }
                                          fnClick={
                                              () => {
                                                  redirect("/promotion");
                                              }
                                          }
                                />
                            </div>
                            :
                            null
                    }
                         <p>活动赠金需实盘交易5次后才能申请提现</p>
                         * */
                    }
                </div>
            </Container>
        )
    }
}