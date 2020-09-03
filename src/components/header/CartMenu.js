import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import {Store} from '../../Store';
import Tshirt from '../../img/t-shirt.svg';
import DeleteIcon from '../../img/delete.svg';
import dribble from '../../img/dribble.png';
import approve from '../../img/approve.svg';

const StyledBadge = withStyles((theme) => ({
   badge: {
      right: -2,
      top: 5,
      border: `1.5px solid ${theme.palette.background.paper}`,
      padding: '0 1px',
      background: `#9e9e9e`
   },
}))(Badge);

const useStyles = makeStyles({
   button: {
      justifyContent: 'center',
      width: '220px',
      color: '#3E9B4C',
      marginLeft: '52.5px'
   }
});

const StyledMenu = withStyles({
   paper: {
      border: '1px solid #d3d4d5',
      width: '325px'
   },
   button: {
      width: '220px',
      justifyContent: 'center',
      color: '#3E9B4C',
   }
})((props) => (
   <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'center',
      }}
      transformOrigin={{
         vertical: 'top',
         horizontal: 'center',
      }}
      {...props}
   />
));

export default function CustomizedMenus(props) {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const store = React.useContext(Store);
   const {dispatch} = React.useContext(Store);
   const classes = useStyles();
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const cart = sortBy(uniqBy(store.state.addToCart, "id"), 'id', 'asc');

   function handleDelete(e) {
      return dispatch({type: 'DELETE', payload: e});
   }

   // const amount = store.state.addToCart.reduce((count, book) => count + (book.id === store.state.id ? 1 : 0), 0);
   /* Amount function
   const amount = store.state.addToCart;
   const helper = (amount) => {
      const array = amount.map(({id}) => id);
      return array.filter((element, position) => {
         return array.indexOf(element) === position;
      }).map(id => ({
         quantity: amount.filter((e) => e.id === id).length
      }))
   };
   */
   return (
      <div>
         <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClick}>
            <StyledBadge badgeContent={store.state.addToCart.length} color="primary">
               <ShoppingCartOutlinedIcon/>
            </StyledBadge>
         </IconButton>
         {cart.length !== 0 ?
            <StyledMenu
               id="customized-menu"
               anchorEl={anchorEl}
               keepMounted
               open={Boolean(anchorEl)}
               onClose={handleClose}
            >
               {cart.map((e, i) =>
                  <MenuItem disableTouchRipple={true} key={i}>
                     <ListItemIcon>
                        <img src={Tshirt} alt="t-shirt"/>
                     </ListItemIcon>
                     <div>{e.name}</div>
                     <div className="price"> - {e.price}$</div>
                     <div className="btn-delete">
                        <Button onClick={() => handleDelete(e)}><img src={DeleteIcon} style={{width: '35px'}}
                                                                     alt="delete"/></Button>
                     </div>
                  </MenuItem>
               )}
               {props.location.pathname === "/dashboard" ?
                  <Link to="/cashdesk" style={{textDecoration: 'none'}}>
                     <Button
                        color="default"
                        className={classes.button}
                        startIcon={<img src={approve} alt="approve" width={25}/>}
                     >
                        Approve
                     </Button>
                  </Link>
                  : null}
            </StyledMenu>
            :
            <Menu
               id="customized-menu"
               anchorEl={anchorEl}
               keepMounted
               open={Boolean(anchorEl)}
               onClose={handleClose}
            >
               <MenuItem disableTouchRipple={true}>
                  <div>Your cart is empty</div>
                  <ListItemIcon style={{marginLeft: '25px'}}>
                     <img src={dribble} alt="empty" width={80}/>
                  </ListItemIcon>
               </MenuItem>
            </Menu>
         }
      </div>
   );
}