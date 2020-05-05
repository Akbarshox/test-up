import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import {Store} from '../../Store';

const StyledBadge = withStyles((theme) => ({
   badge: {
      right: -2,
      top: 5,
      border: `1.5px solid ${theme.palette.background.paper}`,
      padding: '0 1px',
      background: `#9e9e9e`
   },
}))(Badge);

const StyledMenu = withStyles({
   paper: {
      border: '1px solid #d3d4d5',
   },
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

const StyledMenuItem = withStyles((theme) => ({
   root: {
      '&:focus': {
         backgroundColor: theme.palette.primary.main,
         '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
         },
      },
   },
}))(MenuItem);

export default function CustomizedMenus() {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const store = React.useContext(Store);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   
   const handleClose = () => {
      setAnchorEl(null);
   };
   
   return (
       <div>
          <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClick}>
             <StyledBadge badgeContent={store.state.addToCart.length} color="primary">
                <ShoppingCartOutlinedIcon/>
             </StyledBadge>
          </IconButton>
          <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >
             <StyledMenuItem>
                <ListItemIcon>
                   <SendIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Sent mail"/>
             </StyledMenuItem>
             <StyledMenuItem>
                <ListItemIcon>
                   <DraftsIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Drafts"/>
             </StyledMenuItem>
             <StyledMenuItem>
                <ListItemIcon>
                   <InboxIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Inbox"/>
             </StyledMenuItem>
          </StyledMenu>
       </div>
   );
}