import * as React from 'react';
import { Route, RouteProps, IndexRoute } from 'react-router';

import Root from './containers/Root';
import Home from './containers/Home';
import About from './containers/About';
import Contact from './containers/Contact';
import NotFound from './containers/NotFound';

const routeConfig: RouteProps[] = [{
    path: '/',
    component: Home
}, {
    path: '/about',
    component: About
}, {
    path: '/contact',
    component: Contact
}, {
    path: '*',
    component: NotFound
}];

const routes =
    <Route path="/" component={Root}>
        <IndexRoute component={Home} />
        {routeConfig.map((props: RouteProps) =>
            <Route key={props.path} path={props.path} component={props.component}/>)}
    </Route>;

export default routes;
