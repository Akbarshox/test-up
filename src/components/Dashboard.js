import React from 'react';
import Header from './header/Header';
import Fetch from './Fetch';
import Body from './body/Body';

export default function Dashboard() {
    return (
        <div>
            <Fetch />
            <Header />
            <Body />
        </div>
    )
}