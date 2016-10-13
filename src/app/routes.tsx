import * as React from 'react';
import { Route, RouteProps, IndexRoute } from 'react-router';


import Root from 'app/containers/Root';
import Home from 'app/containers/Home';
import About from 'app/containers/About';
import Contact from 'app/containers/Contact';
import NotFound from 'app/containers/NotFound';

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