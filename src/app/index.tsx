import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import App from 'app/containers/App';

declare var module: {hot: any};

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('container'));

if (module.hot) {
    module.hot.accept('app/containers/App', () => {
        const NextApp = require('app/containers/App').default;

        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById('container'));

    });
}