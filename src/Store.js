import React from 'react';
import reducer from './store/reducers/reducer';

export const Store = React.createContext();

const initialState = {
    data: []
};

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state: state, dispatch: dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}