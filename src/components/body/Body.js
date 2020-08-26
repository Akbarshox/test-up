import React, {useState, useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import {Store} from '../../Store';
import Card from './Cards/Card';
import Sizes from './Sizes';
import Skelet from './Skeleton';
import filter from 'lodash/filter';
import style from './body.module.css';
import Ads from "./Ads";

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
   const data = useContext(Store);
   const pageLimit = 5;
   const searchItem = data.state.searchQuery;
   const [searchResult, setSearchResult] = useState(data.state.data);
   const [offset, setOffset] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [currentData, setCurrentData] = useState(data.state.data);

   useEffect(() => {
      setSearchResult(data.state.data);
   }, [data.state.data]);
   useEffect(() => {
      const result = (data) =>
         data.filter(
            i =>
               i.name.toLowerCase().indexOf(searchItem.toLowerCase()) >= 0,
         );
      const sortBy = (data, filterBy) => {
         if (filterBy) {
            setOffset(0);
            return filter(data, {'size': filterBy});
         } else {
            return data;
         }
      };
      const searchData = (data, filterBy) => {
         return sortBy(result(data), filterBy);
      };
      setCurrentData(searchData(data.state.data, data.state.filterBy));
      setSearchResult(searchData(data.state.data, data.state.filterBy).slice(offset, offset + pageLimit));

   }, [data.state.data, data.state.filterBy, searchItem, offset, pageLimit]);

   if (searchResult.length !== 0) {
      return (
         <div className={classes.root}>
            <Sizes/>
            <Ads />
            <Grid container className='paper'>
               {searchResult.map((e, i) =>
                  <Grid item lg={4} className={classes.grid} key={i}>
                     <div className={classes.paper}><Card {...e} /></div>
                  </Grid>
               )}
            </Grid>
            <div className={style.pagination}>
               <Pagination
                  count={Math.ceil(currentData.length / pageLimit)}
                  onChange={(e, val) => setOffset((val - 1) * pageLimit)}
                  defaultPage={currentPage}
                  variant="outlined"
                  size="medium"
               />
            </div>
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
