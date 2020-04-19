import React from 'react';
import axios from 'axios';
import { Store } from '../Store';

export default function Fetch() {
    const { dispatch } = React.useContext(Store);
    React.useEffect(() =>  {
        axios.get('https://summerclothes.now.sh/data.json')
        .then((res) => {
            return dispatch({
                type: 'FETCH_DATA',
                payload: res.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }, [dispatch])
    return(
        <div />
    )
}
