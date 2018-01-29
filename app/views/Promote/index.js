import React, { Component } from 'react';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import { redirect } from 'lib/utils';
import Home from './Home';

export default class Promote extends Component {
    render() {
        return (
            <Container>
                <AppBar title="合伙人" backward={ true }
                        fixed={true}
                        rightBar={
                            {
                                text:"赚钱说明",
                                fnClick(){
                                    redirect("/gain_state");
                                }
                            }
                        }
                />
                <Home />
            </Container>
        )
    }
}