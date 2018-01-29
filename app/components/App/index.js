import React from 'react';
import "./style.less";
import {redirect} from 'lib/utils';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './actions';
import Loading from 'components/Loading';
import {Route} from 'react-router';
import {load} from 'lib/utils';

export class App extends React.Component {
    render() {
        const {loading, match} = this.props;
        return (
            <div className="app-container">
                <div className="view-container">
                    {
                        this.props.children
                    }
                </div>
                <Loading show={ loading }/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state.appReducers.toJS();
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
