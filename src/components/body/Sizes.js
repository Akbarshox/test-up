import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  circle: {
    backgroundColor: "#BBBBBB",
    margin: theme.spacing(0.5)
  },
  rootMobile:{
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

  if(matches === true){
        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    {sizes.map((e, i) => 
                        <Grid>
                            <Avatar className={classes.circle}>{e}</Avatar>
                        </Grid>
                    )}
                </Grid>
            </div>
        )
    }else{
        return (
            <div className={classes.rootMobile}>
                <Grid container justify="center">
                    {sizes.map((e, i) => 
                        <Grid>
                            <Avatar className={classes.circleMobile}>{e}</Avatar>
                        </Grid>
                    )}
                </Grid>
            </div>
        )
    }
}
