import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import NotFound from './NotFound';

export default class Root extends React.Component<any> {

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/contact" component={Contact}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    );
  }

}
