import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Store} from '../../Store';
import Card from './Card';
import Sizes from './Sizes';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,        
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: '-17px',
        float: 'right',
    },
    grid: {
        float: 'right',
    },
}))

export default function Body() {
    const classes = useStyles();  
    const data = React.useContext(Store);
    return(
        <div className={classes.root}>
            <Sizes />
            <Grid container justify="center" className='paper'>
                {data.state.data.map((e, i) => 
                    <Grid item md={4} className={classes.grid}>
                        <div className={classes.paper}><Card {...e} key={i} /></div>                        
                    </Grid>
                )}
            </Grid>
        </div>
    )
}