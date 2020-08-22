import React from 'react';
import Header from './header/Header';
import Fetch from './Fetch';
import Body from './body/Body';
import {ProvideAuth} from "../firebase";
import Wrapper from "./Wrapper/Wrapper";

export default function Dashboard() {

   return (
      <div>
         <ProvideAuth>
            <Fetch/>
            <Header/>
            <Wrapper>
               <Body/>
            </Wrapper>
         </ProvideAuth>
      </div>
   )
}