import React from 'react';
import Header from './header/Header';
import Fetch from './Fetch';
import Body from './body/Body';
import {ProvideAuth} from "../firebase";

export default function Dashboard() {
   return (
       <div>
          <Fetch/>
          <ProvideAuth>
            <Header/>
          </ProvideAuth>
          <Body/>
       </div>
   )
}