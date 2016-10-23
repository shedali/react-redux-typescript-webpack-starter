import * as React from 'react';
import * as classNames from 'classnames';

export interface NavProps {
    align?: 'left' | 'right';
}

export default class Nav extends React.Component<NavProps, void> {

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
