import * as React from 'react';

import Header from './Header';

export default class Root extends React.Component<any, any> {

    render() {
        return (
            <div>
                <Header />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }

}
