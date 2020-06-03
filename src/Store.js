import React from 'react';
import reducer from './store/reducers/reducer';
import logger from 'use-reducer-logger';
import { auth } from "./firebase";

export const Store = React.createContext();

const initialState = {
   data: [],
   addToCart: [],
   searchQuery: '',
   filterBy: '',
   id: [],
};

export function StoreProvider(props) {
   const [state, dispatch] = React.useReducer(logger(reducer), initialState);
   const [user, setUser] = React.useState(null);
   React.useEffect(() => {
      auth.onAuthStateChanged(userAuth => {
         setUser(userAuth);
      });
   },[]);
   
   const value = {state: state, dispatch: dispatch};
   return <Store.Provider value={value}>{props.children}</Store.Provider>;
}