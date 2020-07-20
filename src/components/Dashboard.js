import React from 'react';
import Container from "@material-ui/core/Container";
import Header from './header/Header';
import Fetch from './Fetch';
import Body from './body/Body';
import {ProvideAuth} from "../firebase";

export default function Dashboard() {
   
   return (
       <div>
          <ProvideAuth>
             <Fetch/>
             <Header/>
             <Container>
                <Body/>
             </Container>
          </ProvideAuth>
       </div>
   )
}