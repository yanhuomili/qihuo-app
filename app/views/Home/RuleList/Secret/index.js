import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import '../rule.less';
import DocContainer from 'components/DocContainer';
export default class Secret extends React.Component {
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
                <div style={br}><AppBar title="隐私政策" backward fixed/></div>
                <div className="rule-doc">
                    <DocContainer name="PRIVACY_POLICY" />
                </div>
            </Container>
        )
    }
}