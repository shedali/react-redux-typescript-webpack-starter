import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';

import Root from './Root';

export default class App extends React.Component<any, any> {

    render() {
        const {
            routerId,
            history
        } = this.props;

        return (
            <ConnectedRouter key={routerId} history={history}>
                <Root />
            </ConnectedRouter>
        );
    }

}
