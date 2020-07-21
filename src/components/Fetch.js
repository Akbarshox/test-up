import React, {useEffect} from 'react';
import axios from 'axios';
import firebase from "firebase";
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
         firebase.database().ref(`/likes/${state.user.uid}`)
             .on('value', snapshot => {
                console.log(snapshot.val())
                // dispatch({type: TODO_FETCH_SUCCESS, payload: snapshot.val()});
             });
 
      }
   }, [state.user.uid]);
   
   
   return (
       <div/>
   )
}
