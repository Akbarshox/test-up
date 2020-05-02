import React from 'react';
import reducer from './store/reducers/reducer';
import logger from 'use-reducer-logger';

export const Store = React.createContext();

const initialState = {
   data: [],
   addToCart: [],
   searchQuery: '',
   filterBy: ''
   
};

export function StoreProvider(props) {
   const [state, dispatch] = React.useReducer(logger(reducer), initialState);
   const value = {state: state, dispatch: dispatch};
   return <Store.Provider value={value}>{props.children}</Store.Provider>;
}