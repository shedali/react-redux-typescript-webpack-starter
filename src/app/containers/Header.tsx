import * as React from 'react';

import { Navbar } from '../../lib/components/navbar';
import { Nav } from '../../lib/components/nav';
import { NavItem } from '../../lib/components/nav-item';

export default class Header extends React.Component<any, any> {

    render() {
        return (
            <Navbar brand="react-redux-typescript-webpack-starter">
                <Nav align="right">
                    <NavItem to="/">Home</NavItem>
                    <NavItem to="/about">About</NavItem>
                    <NavItem to="/contact">Contact</NavItem>
                </Nav>
            </Navbar>
        );
    }

}
