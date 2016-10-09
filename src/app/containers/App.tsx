import * as React from 'react';

import HelloWorld, { Hello } from 'lib/components/HelloWorld';

export default class App extends React.Component<any, any> {

    render() {
        return (
            <div>
                <HelloWorld/>
                <Hello name="Maxim" />
            </div>
        );
    }

}