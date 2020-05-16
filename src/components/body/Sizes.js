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
      {sizeName: 'All'}, {sizeName: 'S'}, {sizeName: 'M'}, {sizeName: 'ML'},
      {sizeName: 'X'}, {sizeName: 'XL'}, {sizeName: 'XXL'}
   ];
   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.up('sm'));
   const {dispatch} = React.useContext(Store);
   const [color, setColor] = React.useState('All');
   
   function handleClick(e) {
      setColor(e);
      return dispatch({type: 'FILTER', payload: e === 'All' ? '' : e});
   }
   
   if (matches === true) {
      return (
          <div className={classes.root}>
             <Grid container justify="center">
                {sizes.map((e, i) =>
                    <Grid key={i}>
                       <Avatar className={classes.circle}>
                          <Button color="primary"
                                  onClick={handleClick.bind(this, e.sizeName)}
                                  style={e.sizeName === color ? {backgroundColor: '#96C348'} : null}
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
                    <Grid key={i}>
                       <Avatar className={classes.circle}>
                          <Button color="primary"
                                  onClick={handleClick.bind(this, e.sizeName)}
                                  style={e.sizeName === color ? {backgroundColor: '#96C348'} : null}
                                  className={classes.button}>{e.sizeName}</Button>
                       </Avatar>
                    </Grid>
                )}
             </Grid>
          </div>
      )
   }
}
