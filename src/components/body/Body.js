import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Store} from '../../Store';
import Card from './Card';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,        
    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: 'center',
        alignItems: 'center',
        margin: '40px',
        marginBottom: '-17px'
    },
}))

export default function Body() {
    const classes = useStyles();  
    const data = React.useContext(Store);
    return(
        <div className={classes.root}>
            <Grid container>
                {data.state.data.map(e => 
                    <Grid item md={4}>
                        <div className={classes.paper}><Card {...e}/></div>                        
                    </Grid>
                )}
            </Grid>
        </div>
    )
}