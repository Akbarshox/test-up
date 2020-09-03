import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Divider} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import {Store} from '../../Store';
import Tshirt from '../../img/t-shirt.svg';
import DeleteIcon from '../../img/delete.svg';
import approve from "../../img/approve.svg";
import style from './header.module.css';

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
   list: {
      width: 270,
   },
   fullList: {
      width: 'auto',
   },
   button: {
      marginTop: 5,
      justifyContent: 'center',
      width: '220px',
      color: '#3E9B4C',
      marginLeft: `${(window.innerWidth - 220) / 2}px`
   },
});
const StyledBadge = withStyles((theme) => ({
   badge: {
      right: -2,
      top: 5,
      border: `1.5px solid ${theme.palette.background.paper}`,
      padding: '0 1px',
      background: `#9e9e9e`
   },
}))(Badge);

export default function CartMobile(props) {
   const store = React.useContext(Store);
   const {dispatch} = React.useContext(Store);
   const cart = sortBy(uniqBy(store.state.addToCart, "id"), 'id', 'asc');
   localStorage.setItem('zakazi', JSON.stringify(cart))
   const classes = useStyles();
   const [state, setState] = React.useState({
      bottom: false
   });
   const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }
      setState({...state, [anchor]: open});
   };

   function handleDelete(e) {
      return dispatch({type: 'DELETE', payload: e});
   }

   const list = (anchor) => (
      <div>
         {cart.length !== 0 ?
            <div
               className={clsx(classes.list, {
                  [classes.fullList]: anchor === 'top' || anchor === 'bottom',
               })}
               role="presentation"
            >
               <List>
                  {cart.map((e, i) => (
                     <ListItem button key={i} disableTouchRipple={true}>
                        <ListItemIcon><img src={Tshirt} alt="t-shirt"/></ListItemIcon>
                        <ListItemText primary={e.name}/>
                        <ListItemText className="price-mobile" primary={' - ' + e.price + '$'}/>
                        <ListItemIcon className="btn-delete" disableTouchRipple={false}>
                           <Button onClick={() => handleDelete(e)}><img src={DeleteIcon} alt="delete"
                                                                        className={style.del}/></Button>
                        </ListItemIcon>
                     </ListItem>
                  ))}
                  <Divider light/>
                  {props.location.pathname === '/dashboard' ?
                     <Link to="/cashdesk">
                        <Button
                           color="default"
                           className={classes.button}
                           startIcon={<img src={approve} alt="approve" width={25}/>}
                           // onClick={handleClick.bind(this, e)}
                        >
                           Approve
                        </Button>
                     </Link>
                     : null}
               </List>
            </div>
            : <Snackbar open={true}>
               <Alert severity="warning">
                  Your cart is empty
               </Alert>
            </Snackbar>}
      </div>
   );

   return (
      <div>
         {['bottom'].map((anchor) => (
            <React.Fragment key={anchor}>
               <MenuItem onClick={toggleDrawer(anchor, true)}>
                  <IconButton color="inherit">
                     <StyledBadge badgeContent={store.state.addToCart.length} color="primary">
                        <ShoppingCartOutlinedIcon/>
                     </StyledBadge>
                  </IconButton>
                  <p>My cart</p>
               </MenuItem>
               <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
               </Drawer>
            </React.Fragment>
         ))}
      </div>
   );
}
