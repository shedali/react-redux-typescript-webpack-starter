import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';

export interface NavItemProps {
  to?: string;
}

export class NavItem extends React.Component<NavItemProps> {

  context: any;

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render() {
    // TODO: alternative
    const isActiveRoute: boolean = this.context.router.route.location.pathname === this.props.to;

    return (
      <li className={classNames({active: isActiveRoute})}>
        <Link to={this.props.to}>{this.props.children}</Link>
      </li>
    );
  }

}
