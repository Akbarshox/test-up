import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Badge from '@material-ui/core/Badge';
import {Store} from '../../Store';
import Tshirt from '../../img/t-shirt.svg';
import dribble from '../../img/dribble.png';
import Button from "@material-ui/core/Button";
import DeleteIcon from "../../img/delete.svg";
import {useAuth} from "../../firebase";

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
      color: '#3E9B4C'
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

export default function CustomizedMenus() {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const {state} = React.useContext(Store);
   const auth = useAuth();


   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   function handleDelete(e) {
      auth.delData(e);
   };

   return (
       <div>
          <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClick}>
             <StyledBadge badgeContent={state.likes.length} color="primary">
                <FavoriteBorderIcon/>
             </StyledBadge>
          </IconButton>
          {state.likes.length !== 0 ?
              <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
              >
                 {state.likes.map((e, i) =>
                     <MenuItem disableTouchRipple={true} key={i}>
                        <ListItemIcon>
                           <img src={Tshirt} alt="t-shirt"/>
                        </ListItemIcon>
                        <div>{e.name}</div>
                        <div className="price"> - {e.price}$</div>
                        <div className="btn-delete">
                           <Button onClick={handleDelete.bind(this, e)}><img src={DeleteIcon} style={{width: '35px'}}
                                                                             alt="delete"/></Button>
                        </div>
                     </MenuItem>
                 )}
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