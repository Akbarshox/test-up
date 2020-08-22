import React from 'react';
import {Link} from "react-router-dom";

export default function PageNotFound() {
   return(
      <div style={{padding: 20}}>
         <h2>Page Not Found</h2>
         <Link to="/dashboard" ><h4>Go back Home</h4></Link>
      </div>
   )
}