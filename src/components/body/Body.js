import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Store} from '../../Store';
import Card from './Card';
import Sizes from './Sizes';
import Skelet from './Skeleton';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,        
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
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
    const searchItem = data.state.searchQuery;
    const [searchResult, setSearchResult] = React.useState(data.state.data);
    React.useEffect(() => {
        setSearchResult(data.state.data);
    }, [data.state.data]);
    
    React.useEffect(() => {
        const result = data.state.data.filter(
          o =>
          o.name.toLowerCase().indexOf(searchItem.toLowerCase()) >= 0,
      )
          setSearchResult(result);        
          
      }, [searchItem]);
      
    if(searchResult.length != 0){
        return(
            <div className={classes.root}>
                <Sizes />
                    <Grid container className='paper'>
                        {searchResult.map((e, i) => 
                            <Grid item md={4} className={classes.grid}>
                                <div className={classes.paper}><Card {...e} key={i} /></div>                        
                            </Grid>
                        )}
                    </Grid> 
            </div>
        )}else{
            return (
                <div className={classes.root}>
                    <Sizes />
                    <Grid container className='paper'>
                    {[1, 2, 3].map((e, i) => 
                        <Grid item md={4} className={classes.grid}>
                            <div className={classes.paper}><Skelet {...e} key={i} /></div>                        
                        </Grid>
                    )}
                </Grid> 
                </div>
            )
    }
}
