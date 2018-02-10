import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import DocContainer from 'components/DocContainer';
import '../rule.less';
export default class RiskShow extends React.Component {
    render(){
    	let br={
    		borderBottomWidth:1,
    		borderBottomColor:'#eee',
    		borderBottomStyle:'solid',
    		overflow:'hidden',
    		width:'100%',
    		position:'fixed',
    		top:0,
    		left:0
    	}
        return (
            <Container className="rule-container">
            
                <div style={br}><AppBar title="风险披露" backward fixed/></div>
                <div className="rule-doc">
                    <DocContainer name="RISK_SHOW"/>
                </div>
            </Container>
        )
    }
}