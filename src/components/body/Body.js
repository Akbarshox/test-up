import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Store} from '../../Store';
import Card from './Card';
import Sizes from './Sizes';
import Skelet from './Skeleton';
import filter from 'lodash/filter';

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
}));

export default function Body() {
   const classes = useStyles();
   const data = React.useContext(Store);
   const searchItem = data.state.searchQuery;
   const [searchResult, setSearchResult] = React.useState(data.state.data);
   
   React.useEffect(() => {
      setSearchResult(data.state.data);
   }, [data.state.data]);
   React.useEffect(() => {
      const result = (data) =>
          data.filter(
              i =>
                  i.name.toLowerCase().indexOf(searchItem.toLowerCase()) >= 0,
          );
      const sortBy = (data, filterBy) => {
         if (filterBy) {
            return filter(data, {'size': filterBy});
         } else {
            return data;
         }
      };
      const searchData = (data, filterBy) => {
         return sortBy(result(data), filterBy);
      };
      setSearchResult(searchData(data.state.data, data.state.filterBy));
   }, [data.state.data, data.state.filterBy, searchItem]);
   
   if (searchResult.length !== 0) {
      return (
          <div className={classes.root}>
             <Sizes/>
             <Grid container className='paper'>
                {searchResult.map((e, i) =>
                    <Grid item lg={4} className={classes.grid} key={i}>
                       <div className={classes.paper}><Card {...e} /></div>
                    </Grid>
                )}
             </Grid>
          </div>
      )
   } else {
      return (
          <div className={classes.root}>
             <Sizes/>
             <Grid container className='paper' justify='center'>
                {[1, 2, 3].map((e, i) =>
                    <Grid item md={4} className={classes.grid} key={i}>
                       <div className={classes.paper}><Skelet {...e} /></div>
                    </Grid>
                )}
             </Grid>
          </div>
      )
   }
}
