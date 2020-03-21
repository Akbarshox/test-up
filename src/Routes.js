import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}