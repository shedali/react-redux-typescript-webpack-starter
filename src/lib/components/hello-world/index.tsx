import * as React from 'react';

const styles: any = require<any>('./styles.scss');

const HelloWorld = () => (
    <div>Hello World! ;-)</div>
);

export interface HelloProps {
    name: string;
}

export class Hello extends React.Component<HelloProps, any> {

    render() {
        return <div className={styles.greeting}>Hello {this.props.name}!</div>;
    }

}

export default HelloWorld;
