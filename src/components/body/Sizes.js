import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTheme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import {Store} from '../../Store';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      position: 'absolute',
      padding: 10,
      width: 250,
      marginTop: 10,
      '& > *': {
         margin: theme.spacing(1),
      },
   },
   button: {
      padding: 10,
      color: '#fff',
   },
   circle: {
      backgroundColor: "#BBBBBB",
      margin: theme.spacing(0.5)
   },
   rootMobile: {
      display: 'inline',
   },
   circleMobile: {
      backgroundColor: "#BBBBBB",
      margin: theme.spacing(0.3)
   }
}));

export default function LetterAvatars() {
   const classes = useStyles();
   const sizes = [
      {id: 1, sizeName: 'XS'}, {id: 2, sizeName: 'S'}, {id: 3, sizeName: 'M'}, {id: 4, sizeName: 'ML'},
      {id: 5, sizeName: 'X'}, {id: 6, sizeName: 'XL'}, {id: 7, sizeName: 'XXL'}
   ];
   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.up('sm'));
   const {dispatch} = React.useContext(Store);
   const filterBy = React.useContext(Store);
   
   function handleClick(e) {
      return dispatch({type: 'FILTER', payload: e})
   }
   
   if (matches === true) {
      return (
          <div className={classes.root}>
             <Grid container justify="center">
                {sizes.map((e, i) =>
                    <Grid>
                       <Avatar className={classes.circle}>
                          <Button color="primary" active={filterBy === e.id} onClick={handleClick.bind(this, e.id)}
                                  className={classes.button}>{e.sizeName}</Button>
                       </Avatar>
                    </Grid>
                )}
             </Grid>
          </div>
      )
   } else {
      return (
          <div className={classes.rootMobile}>
             <Grid container justify="center">
                {sizes.map((e, i) =>
                    <Grid>
                       <Avatar className={classes.circle}>
                          <Button color="primary" active={filterBy === e.id} onClick={handleClick.bind(this, e.id)}
                                  className={classes.button}>{e.sizeName}</Button>
                       </Avatar>
                    </Grid>
                )}
             </Grid>
          </div>
      )
   }
}
