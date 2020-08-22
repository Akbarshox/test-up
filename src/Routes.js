import React from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PageNotFound from "./PageNotFound";

export default function Routes() {
   return (
       <BrowserRouter>
          <Switch>
             <Route exact path="/" render={() => <Redirect to="/dashboard"/>}/>
             <Route exact path='/dashboard' component={Dashboard}/>
             <Route exact path='*' component={PageNotFound} />
          </Switch>
       </BrowserRouter>
   )
}