import * as React from 'react';
import { Router, hashHistory } from 'react-router';

import routes from 'app/routes';

export default class App extends React.Component<any, any> {

    render() {
        return (
            <Router key={this.props.routerId} history={hashHistory} routes={routes}>
            </Router>
        );
    }

}