import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import App from 'app/containers/App';

declare var module: {hot: any};

/*
 A workaround to fix the warning: "You cannot change <Router routes>; it will be ignored"
 See https://github.com/ReactTraining/react-router/issues/2704#issuecomment-211352123
 */
let routerId: number = 0;

ReactDOM.render(
    <AppContainer>
        <App routerId={routerId} />
    </AppContainer>,
    document.getElementById('container'));

if (module.hot) {
    module.hot.accept('app/containers/App', () => {
        const NextApp = require('app/containers/App').default;
        routerId++;

        ReactDOM.render(
            <AppContainer>
                <NextApp routerId={routerId} />
            </AppContainer>,
            document.getElementById('container'));
    });
}