import React from 'react';
import Fetch from './Fetch';
import Body from './body/Body';
import Wrapper from "./Wrapper/Wrapper";

export default function Dashboard(props) {

   return (
      <div>
         <Fetch/>
         <Wrapper>
            <Body />
         </Wrapper>
      </div>
   )
}