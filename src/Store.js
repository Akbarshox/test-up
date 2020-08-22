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
   const [state, dispatch] = React.useReducer(logger(reducer), initialState);

   const value = {state: state, dispatch: dispatch};
   return <Store.Provider value={value}>{props.children}</Store.Provider>;
}