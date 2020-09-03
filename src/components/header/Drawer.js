import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

const useStyles = makeStyles({
   list: {
      width: 250,
   },
   fullList: {
      width: 'auto',
   },
});

export default function TemporaryDrawer() {
   const classes = useStyles();
   const [state, setState] = React.useState({
      left: false,
   });

   const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }

      setState({...state, [side]: open});
   };

   const sideList = side => (
      <div
         className={classes.list}
         role="presentation"
         onClick={toggleDrawer(side, false)}
         onKeyDown={toggleDrawer(side, false)}
      >
         <List>
            {/*<ListItem button>*/}
            <SignIn/>
            <SignUp/>
            {/*</ListItem>*/}
         </List>
      </div>
   );

   return (
      <div>
         <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
         >
            <MenuIcon/>
         </IconButton>
         <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
            {sideList('left')}
         </Drawer>
      </div>
   );
}