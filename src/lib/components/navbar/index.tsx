import * as React from 'react';
import { uniqueId } from 'lodash';

export interface NavbarProps {
  id?: string;
  brand?: string;
}

export interface NavbarState {
    id?: string;
}

export class Navbar extends React.Component<NavbarProps, NavbarState> {

  componentWillMount() {
    const id = this.props.id || uniqueId('navbar-');
    this.setState({
      id
    });
  }

  render() {
    const collapseId: string = this.state.id + '-collapse';

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target={'#' + collapseId}
                    aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">{this.props.brand}</a>
          </div>
          <div className="collapse navbar-collapse" id={collapseId}>
            {this.props.children}
          </div>
        </div>
      </nav>
    );
  }
}
