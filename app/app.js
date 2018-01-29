//                   _ooOoo_
//                  o8888888o
//                  88" . "88
//                  (| -_- |)
//                  O\  =  /O
//               ____/`---'\____
//             .'  \\|     |//  `.
//            /  \\|||  :  |||//  \
//           /  _||||| -:- |||||-  \
//           |   | \\\  -  /// |   |
//           | \_|  ''\---/''  |   |
//           \  .-\__  `-`  ___/-. /
//         ___`. .'  /--.--\  `. . __
//      ."" '<  `.___\_<|>_/___.'  >'"".
//     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//     \  \ `-.   \_ __\ /__ _/   .-` /  /
// ======`-.____`-.___\_____/___.-`____.-'======
//                   `=---='
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//         佛祖保佑       永无BUG
//  本模块已经经过开光处理，绝无可能再产生bug
// =============================================
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import createBrowserHistory from 'history/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import "./css/style.less";
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {Route} from 'react-router';
import store from './store';
import App from 'components/App';
import { load,historyListener } from 'lib/utils';

injectTapEventPlugin();

export const browserHistory = createBrowserHistory();
export const middleware = routerMiddleware(browserHistory);
browserHistory.listen(historyListener);

class MainApp extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <ConnectedRouter history={ browserHistory }>
                    <Route path="/m" render={ (props) => {
                        routes.onEnter(props);
                        const { match } = props;
                        return (
                            <App>
                                <Route path={match.url} exact component={ load("Home") }/>
                                {
                                    routes.childRoutes.map((route,idx) => {
                                        return <Route
                                            path={`${match.url}/${route.path}`} component={ route.component }
                                            key={idx}
                                            exact={ !!route.exact }
                                        />
                                    })
                                }
                        </App>
                        );
                    } }/>
                </ConnectedRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<MainApp />, document.getElementById("app"));
