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
   const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
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
                <Grid><Avatar className={classes.circle}>
                   <Button color="primary" className={classes.button} active={filterBy === 1}
                           onClick={handleClick.bind(this, 1)}>XS</Button>
                </Avatar></Grid>
                <Grid><Avatar className={classes.circle}>
                   <Button color="primary" className={classes.button} active={filterBy === 2}
                           onClick={handleClick.bind(this, 2)}>S</Button>
                </Avatar></Grid>
                <Grid><Avatar className={classes.circle}>
                   <Button color="primary" className={classes.button} active={filterBy === 3}
                           onClick={handleClick.bind(this, 3)}>M</Button>
                </Avatar></Grid>
                <Grid><Avatar className={classes.circle}>
                   <Button color="primary" className={classes.button} active={filterBy === 4}
                           onClick={handleClick.bind(this, 4)}>ML</Button>
                </Avatar></Grid>
                <Grid><Avatar className={classes.circle}>
                   <Button color="primary" className={classes.button} active={filterBy === 5}
                           onClick={handleClick.bind(this, 5)}>L</Button>
                </Avatar></Grid>
                <Grid><Avatar className={classes.circle}>
                   <Button color="primary" className={classes.button} active={filterBy === 6}
                           onClick={handleClick.bind(this, 6)}>XL</Button>
                </Avatar></Grid>
                <Grid><Avatar className={classes.circle}>
                   <Button color="primary" className={classes.button} active={filterBy === 7}
                           onClick={handleClick.bind(this, 7)}>XXL</Button>
                </Avatar></Grid>
             </Grid>
          </div>
      )
   } else {
      return (
          <div className={classes.rootMobile}>
             <Grid container justify="center">
                {sizes.map((e, i) =>
                    <Grid>
                       <Avatar className={classes.circle}><Button color="primary"
                                                                  className={classes.button}>{e}</Button></Avatar>
                    </Grid>
                )}
             </Grid>
          </div>
      )
   }
}
