import React from 'react';
import Container from 'components/Container';
import Button from 'components/Button';
import DocContainer from 'components/DocContainer';
import { isAndroid,isiOS} from 'lib/utils';
import './style.less';
const DOC_ARR = ["SERVICE_CLAUSE","DISCLAIMER","PRIVACY_POLICY","RISK_SHOW","REGULATION_LICENCE"];
// let scrollInterval;
export default class OpenAccountDoc extends React.Component {
    state = {
        current: 1,
        height: 0,
    };
    next(){//跳转下一个协议
        let { current } = this.state;
        if(current<4){
            current++;
            this.refs.docContent.scrollTop = 0;
            this.setState({current:current});
        }else{
            if(isAndroid){
                window.AppJs && window.AppJs.openHandWrite();
            }else if(isiOS){
                window.location.href = "goto://agreeAllAgreement";
            }
        }
    }
    resetBottom(){
        const height = window.innerHeight- 100;
        this.setState({height: height });
    }
    componentDidMount(){
        this.resetBottom();
    }
    /*componentWillUnmount(){
        clearInterval(scrollInterval);
    }*/
    render(){
        const { current, height } = this.state;
        let text = "";
        if(current==4){
            text = "我已阅读，下一步  4/4";
        }else{
            text = `我已阅读，下一页  ${current}/4`;
        }
        return (
            <Container>
                <div className="open-account-doc">
                    <div className="doc-content" style={ { height } } ref="docContent">
                        <DocContainer name={ DOC_ARR[current-1] } ref="docContainer"/>
                    </div>
                    <div className="bottom-button">
                        <Button text={ text } onClick={ this.next.bind(this) }/>
                    </div>
                </div>
            </Container>
        )
    }
}