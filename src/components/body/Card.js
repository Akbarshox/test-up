import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Store} from '../../Store';
import {useAuth} from "../../firebase";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from "@material-ui/core/IconButton";
// import style from './body.module.css';

const useStyles = makeStyles({
   root: {
      maxWidth: 320,
   },
   button: {
      width: '220px',
      justifyContent: 'center',
      color: '#3E9B4C'
   },
   heart: {
      position: 'absolute',
      marginLeft: '100px',
      marginTop: '5px'
   },
   heartColor: {
      color: '#EF6F6F'
   }
});

export default function ImgMediaCard(e) {
   const classes = useStyles();
   const {dispatch} = useContext(Store);
   const auth = useAuth();
   const store = useContext(Store);
   const [color, setColor] = useState(false);
   
   function handleChange(e) {
      // console.log(e);
      setColor(!color);
   }
   
   function handleClick(e) {
      auth.addData(e);
      return dispatch({type: 'ADD_CART', payload: e}), dispatch({type: 'ID', payload: e.id});
   };
   
   const amount =  store.state.addToCart.reduce((count, book) => count + (book.id === e.id ? 1 : 0), 0);
   return (
       <Card className={classes.root}>
          <IconButton aria-label="show 4 new mails" className={classes.heart} onClick={handleChange.bind(this, e)}>
             <FavoriteBorderIcon className={color === true ? classes.heartColor : null}/>
          </IconButton>
          <CardMedia
              component="img"
              alt={e.size}
              height="400"
              image={e.image}
              title="buy"
          />
          <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
                {e.name}
             </Typography>
             <Typography variant="h5" color="textSecondary" component="h3">
                {e.price} $
             </Typography>
          </CardContent>
          <CardActions style={{justifyContent: 'center'}}>
             <Button
                 color="default"
                 className={classes.button}
                 startIcon={<ShoppingCartIcon/>}
                 onClick={handleClick.bind(this, e)}
             >
                Add to Cart {amount > 0 && `(${amount})`}
             </Button>
          </CardActions>
       </Card>
   );
}