import React from 'react';
import logger from 'use-reducer-logger';
import reducer from './store/reducers/reducer';

export const Store = React.createContext();

const initialState = {
   data: [],
   addToCart: [],
   // amount: '',
   searchQuery: '',
   filterBy: '',
   id: [],
   user: [],
   likes: []
};

export function StoreProvider(props) {
   const [state, dispatch] = React.useReducer(reducer, initialState);
   if(state.addToCart.length !== 0){
      localStorage.setItem('zakazi', JSON.stringify(state.addToCart))
   }
   const value = {state: state, dispatch: dispatch};
   return <Store.Provider value={value}>{props.children}</Store.Provider>;
}