import React from 'react';
import Container from 'components/Container';
import Button from 'components/Button';
import { redirect} from 'lib/utils';
import TopImg from './images/topImg.png';
import FlowImg from './images/flow.png';
import './style.less';
export default class RiskEvaluate extends React.Component {
    render() {
        return (
            <Container>
                <div className="risk-evaluate">
                    <img className="topImg" src={ TopImg }/>
                    <div className="title">风险测评</div>
                    <p>风险测评问卷是帮助我们了解您的风险承受能力</p>
                    <p>并提供个性化服务的最好方式</p>
                    <p>请您根据实际情况填写</p>
                    <div className="tip">
                        <p className="title">温馨提示</p>
                        <p>风险测评的结果仅为一般性描述，不构成投资建议</p>
                        <p>请您谨慎选择投资产品，注意风险！</p>
                    </div>
                    <img className="flowImg" src={ FlowImg }/>
                    <Button text="开始答题" onClick={ ()=>redirect('/questions') }/>
                </div>
            </Container>
        )
    }
}