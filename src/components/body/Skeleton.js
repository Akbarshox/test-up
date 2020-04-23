import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Skelet() {
    return(
        <div>
            <Skeleton variant="rect" width={320} height={300} style={{ backgroundColor: '#EAEAEA' }} />
            <Skeleton variant="rect" width={320} height={190} style={{marginTop: 5, backgroundColor: '#EAEAEA' }} />
            <div className='skeleton'>
                <Skeleton variant="text" width={200} height={35} style={{backgroundColor: '#E3E3E3'}} />
            </div>  
        </div>
    )
}