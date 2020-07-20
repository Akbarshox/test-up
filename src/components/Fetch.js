import React, {useEffect} from 'react';
import axios from 'axios';
import {Store} from '../Store';
import {db} from "../firebase";

export default function Fetch() {
   const {dispatch, state} = React.useContext(Store);
   
   React.useEffect(() => {
      axios.get('https://summerclothes.now.sh/data.json')
          .then((res) => {
             return dispatch({
                type: 'FETCH_DATA',
                payload: res.data
             })
          }).catch((err) => {
         console.log(err);
      });
   }, [dispatch]);
   
   
   useEffect(() => {
      if (state.user.uid) {
         db.collection("users").doc(state.user.uid)
             .onSnapshot(function (doc) {
                console.log("Current data: ", doc.data());
             })
      }
   }, [state.user.uid]);
   
   
   return (
       <div/>
   )
}
