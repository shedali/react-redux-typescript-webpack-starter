import * as React from 'react';
import { Router } from 'react-router';

import routes from '../routes';

export default class App extends React.Component<any, any> {

    render() {
        const {
            routerId,
            history
        } = this.props;

        return (
            <Router key={routerId} history={history} routes={routes}>
            </Router>
        );
    }

}
