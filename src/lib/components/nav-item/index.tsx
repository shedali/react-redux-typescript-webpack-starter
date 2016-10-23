import * as React from 'react';
import { Link } from 'react-router';
import * as classNames from 'classnames';

export interface NavItemProps {
    to?: string;
}

export default class NavItem extends React.Component<NavItemProps, void> {

    context: any;

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    render() {

        const isActiveRoute: boolean = this.context.router.isActive(this.props.to, true);

        return (
            <li className={classNames({active: isActiveRoute})}>
                <Link to={this.props.to}>{this.props.children}</Link>
            </li>
        );
    }

}
