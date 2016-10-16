declare var module: {hot: any};

if (module.hot) {
    require("react-hot-loader/patch");
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import App from 'app/containers/App';
import rootReducer from 'app/reducers';

const store = createStore(rootReducer, {});
const history = syncHistoryWithStore(hashHistory, store);

/*
 A workaround to fix the warning: "You cannot change <Router routes>; it will be ignored"
 See https://github.com/ReactTraining/react-router/issues/2704#issuecomment-211352123
 */
let routerId: number = 0;

const renderApp = (App) => {
    let result =
        <Provider store={store}>
            <App routerId={routerId++} history={history} />
        </Provider>;
    if (module.hot) {
        result = <AppContainer>{result}</AppContainer>;
    }
    return result;
};

const target: HTMLElement = document.getElementById('container');

ReactDOM.render(renderApp(App), target);

if (module.hot) {
    module.hot.accept('app/containers/App', () => {
        const NextApp = require('app/containers/App').default;
        ReactDOM.render(renderApp(NextApp), target);
    });
}