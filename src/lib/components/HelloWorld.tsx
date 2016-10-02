import * as React from 'react';

const HelloWorld = () => (
    <div>Hello World! ;-)</div>
);

export interface HelloProps {
    name: string;
}

export class Hello extends React.Component<HelloProps, any> {

    render() {
        return <div>Hello {this.props.name}!!!</div>
    }

}

export default HelloWorld;
