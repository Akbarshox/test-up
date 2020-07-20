import React, {useContext} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import {Store} from "../../../Store";
import {useAuth} from "../../../firebase";
import user from '../../../img/user.svg'
import signout from '../../../img/sign-out.svg'

export default function SimpleMenu() {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const {state, dispatch} = useContext(Store);
   const auth = useAuth();
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   
   const handleClose = () => {
      setAnchorEl(null);
   };
   const handleOut = (e) => {
      auth.signout();
      // return dispatch({type: 'USER', payload: []})
   };
   return (
       <div>
          <Avatar aria-haspopup="true" onClick={handleClick} src={user}/>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >
             {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
             <MenuItem>{state.user.displayName}</MenuItem>
             <MenuItem onClick={handleOut}><Avatar src={signout} />Logout</MenuItem>
          </Menu>
       </div>
   );
}