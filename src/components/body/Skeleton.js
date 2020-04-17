import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Skelet() {
    return(
        <div className="skeleton">
            <Skeleton variant="rect" width={320} height={300} style={{ backgroundColor: '#EAEAEA' }} />
            <Skeleton variant="rect" width={320} height={190} style={{marginTop: 5, backgroundColor: '#EAEAEA' }} />
            <ul>
                <li><Skeleton variant="text" width={100} height={25} style={{backgroundColor: '#E3E3E3'}} /></li>
                <li><Skeleton variant="text" width={150} height={25} style={{marginLeft: 150, backgroundColor: '#E3E3E3'}}/></li>
            </ul>
        </div>
    )
}