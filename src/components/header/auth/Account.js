import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

export default function SimpleMenu() {
   const [anchorEl, setAnchorEl] = React.useState(null);
   
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   
   const handleClose = () => {
      setAnchorEl(null);
   };
   
   return (
       <div>
          <Avatar aria-haspopup="true" onClick={handleClick}>N</Avatar>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >
             <MenuItem onClick={handleClose}>Profile</MenuItem>
             <MenuItem onClick={handleClose}>My account</MenuItem>
             <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
       </div>
   );
}