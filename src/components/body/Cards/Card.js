import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Store} from '../../../Store';
import {useAuth} from "../../../firebase";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from "@material-ui/core/IconButton";
import Modal from '@material-ui/core/Modal';
import style from "../body.module.css";
import close from "../../../img/close.svg";
import {GlassMagnifier} from "react-image-magnifiers";
import Wrapper from "../../Wrapper/Wrapper";

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
   const {dispatch, state} = useContext(Store);
   const data = useContext(Store);
   const auth = useAuth();
   const [img, setImg] = React.useState()
   const [open, setOpen] = React.useState(false);
   const store = useContext(Store);

   const handleOpen = (e) => {
      setOpen(true);
      setImg(e);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleDeleteItem = (e) =>  {
      return dispatch({type: 'DELETE', payload: e})
   }

   function handleChange(e) {
      auth.addData(e);
      console.log(state.likes)
   }

   function handleClick(e) {
      return dispatch({type: 'ADD_CART', payload: e});
   }
   const amount = store.state.addToCart.reduce((count, book) => count + (book.id === e.id ? 1 : 0), 0);
   return (
      <Card className={classes.root}>
         <IconButton aria-label="show 4 new mails" className={classes.heart} onClick={handleChange.bind(this, e)}>
            <FavoriteBorderIcon/>
            {/*className={state.likes.map(r => r.id === e.id ? classes.heartColor : null)}*/}
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
               // onClick={handleOpen.bind(this, e)}
            >
               Add to Cart {amount > 0 && `(${amount})`}
            </Button>
            {/*<Modal*/}
            {/*   open={open}*/}
            {/*   onClose={handleClose}*/}
            {/*>*/}
            {/*   <Wrapper>*/}
            {/*      <div className={style.modal}>*/}
            {/*         <img src={close} alt="close" onClick={handleClose} className={style.close}/>*/}
            {/*         <div className={style.modalPic}>*/}
            {/*            <GlassMagnifier*/}
            {/*               imageSrc={e.image}*/}
            {/*               imageAlt="Example"*/}
            {/*               largeImageSrc={e.image}*/}
            {/*               magnifierSize="60%"*/}
            {/*            />*/}
            {/*         </div>*/}
            {/*         <div>*/}
            {/*            <ul className={style.modalInfo}>*/}
            {/*               <li>{e.name}</li>*/}
            {/*               <li><span>size:</span> {e.size}</li>*/}
            {/*               <li>Amount</li>*/}
            {/*            </ul>*/}
            {/*            <ul className={style.modalPricing}>*/}
            {/*               <li>f</li>*/}
            {/*               <li>{amount > 0 && `(${amount})`}</li>*/}
            {/*               <li>*/}
            {/*                  <button onClick={() => handleDeleteItem(e)}> - </button>*/}
            {/*                  <button onClick={() => handleClick(e)}> + </button>*/}
            {/*               </li>*/}
            {/*            </ul>*/}
            {/*         </div>*/}
            {/*      </div>*/}
            {/*   </Wrapper>*/}
            {/*</Modal>*/}
         </CardActions>
      </Card>
   );
}