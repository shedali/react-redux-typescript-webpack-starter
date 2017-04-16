import * as React from 'react';
import { RouteProps } from 'react-router-dom';

import Home from './containers/Home';
import About from './containers/About';
import Contact from './containers/Contact';
import NotFound from './containers/NotFound';

export const routes: RouteProps[] = [{
    path: '/',
    exact: true,
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
