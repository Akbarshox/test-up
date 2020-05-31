import React from 'react';
import clsx from 'clsx';
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
import {Store} from '../../Store';
import Tshirt from '../../img/t-shirt.svg';
import DeleteIcon from '../../img/delete.svg';
import Button from "@material-ui/core/Button";

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

export default function CartMobile() {
   const store = React.useContext(Store);
   const {dispatch} = React.useContext(Store);
   const cart = sortBy(uniqBy(store.state.addToCart, "id"), 'id', 'asc');
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
                              <Button onClick={handleDelete.bind(this, e)}><img src={DeleteIcon} style={{width: '35px'}}
                                                                                alt="delete"/></Button>
                           </ListItemIcon>
                        </ListItem>
                    ))}
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
