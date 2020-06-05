import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import {useAuth} from "../../../firebase";
import user from '../../../img/user.svg'
import signout from '../../../img/sign-out.svg'

export default function SimpleMenu() {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const auth = useAuth();
   console.log(auth.user);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   
   const handleClose = () => {
      setAnchorEl(null);
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
             <MenuItem>{auth.user.displayName}</MenuItem>
             <MenuItem onClick={e => auth.signout()}><Avatar src={signout} />Logout</MenuItem>
          </Menu>
       </div>
   );
}