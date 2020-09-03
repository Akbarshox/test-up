import React from 'react';
import {Switch, Route, Redirect, useLocation} from 'react-router-dom';
import {ProvideAuth} from "./firebase";
import Dashboard from './components/Dashboard';
import PageNotFound from "./PageNotFound";
import CashDesk from "./components/body/Approve/CashDesk";
import Header from './components/header/Header';

export default function Routes() {
   const location = useLocation();
   return (
         <ProvideAuth>
            <Header location={location} />
            <Switch>
               <Route exact path="/" render={() => <Redirect to="/dashboard"/>}/>
               <Route exact path='/dashboard' component={Dashboard}/>
               <Route exact path='/cashdesk' component={CashDesk}/>
               <Route exact path='*' component={PageNotFound}/>
            </Switch>
         </ProvideAuth>
   )
}