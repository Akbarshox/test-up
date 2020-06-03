import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from "./components/header/auth/SignIn";
import SignUp from "./components/header/auth/SignUp";

export default function Routes() {
   return (
       <BrowserRouter>
          <Switch>
             <Route path='/' component={Dashboard}/>
             <Route path='/signin' component={SignIn}/>
             <Route path='/signup' component={SignUp}/>
          </Switch>
       </BrowserRouter>
   )
}