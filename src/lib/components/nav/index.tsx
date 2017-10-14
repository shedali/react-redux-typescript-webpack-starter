import * as React from 'react';
import * as classNames from 'classnames';

export interface NavProps {
  align?: 'left' | 'right';
}

export class Nav extends React.Component<NavProps> {

  render() {
    const {
      align
    } = this.props;

    return (
      <ul className={classNames('nav', 'navbar-nav', { [`navbar-${align}`]: !!align })}>
        {this.props.children}
      </ul>
    );
  }

}
