import React from 'react';
import AppBar from 'components/AppBar';
import Container from 'components/Container';
import '../rule.less';
import DocContainer from 'components/DocContainer';
export default class Customer extends React.Component {
    render() {
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
            <Container>
                <div style={br}><AppBar title="客户协议" backward fixed/></div>
                <div className="rule-doc">
                    <DocContainer name="CUSTOMER_AGGREMENT" />
                </div>
            </Container>
        );
    }
}