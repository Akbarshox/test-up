import React, {useContext, useMemo, useRef} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreIcon from '@material-ui/icons/MoreVert';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Account from "./auth/Account";
import {Store} from '../../Store';
import TemporaryDrawer from './Drawer';
import CartMenu from './CartMenu';
import CartMobile from "./CartMobile";
import {useAuth} from "../../firebase";
import Likes from "./Like";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
   grow: {
      flexGrow: 1,
      backgroundColor: '#fff'
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
         display: 'block',
      },
   },
   search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(3),
         width: 'auto',
      },
   },
   searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputRoot: {
      color: 'inherit',
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: 200,
      },
   },
   sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
         display: 'flex',
      },
   },
   sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
   link: {
      textDecoration: 'none',
      color: '#fff'
   }
}));


export default function Header(props) {
   const classes = useStyles();
   const auth = useAuth();
   const [searchItem, setSearchItem] = React.useState("");
   const {dispatch} = React.useContext(Store);

   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
   const handleMobileMenuClose = () => {

      setMobileMoreAnchorEl(null);
   };
   const handleMobileMenuOpen = event => {
      setMobileMoreAnchorEl(event.currentTarget);
   };
   var navbar = (
      'navbar'
   );
   const handleChange = event => {
      setSearchItem(event.target.value);
      return dispatch({type: 'SEARCH', payload: event.target.value})
   };
   
   const mobileMenuId = 'primary-search-account-menu-mobile';
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{vertical: 'top', horizontal: 'right'}}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{vertical: 'top', horizontal: 'right'}}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
               <FavoriteBorderIcon/>
            </IconButton>
            <p>Favourite</p>
         </MenuItem>
         <CartMobile close={handleMobileMenuClose} {...props} />
      </Menu>
   );
   return (
      <div>
         <div className={`${navbar} ${classes.sectionDesktop}`}>
            {auth.user ?
               <ul>
                  <li className="account"><Account/></li>
               </ul>
               :
               <ul>
                  <li><SignUp/></li>
                  <li><SignIn/></li>
               </ul>
            }
         </div>
         <div className={classes.grow}>
            <AppBar position="static" style={{backgroundColor: '#94B739', boxShadow: 'none'}}>
               <Toolbar>
                  <div className={classes.sectionMobile}>
                     <TemporaryDrawer/>
                  </div>
                  <Link to="/dashboard" className={classes.link}>
                     <Typography className={classes.title} variant="h6" noWrap>
                        Summer-clothes
                     </Typography>
                  </Link>
                  {props.location.pathname === '/dashboard' ?
                     <div className={classes.search}>
                        <div className={classes.searchIcon}>
                           <SearchIcon/>
                        </div>
                        <InputBase
                           placeholder="Search…"
                           classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                           }}
                           inputProps={{'aria-label': 'search'}}
                           value={searchItem}
                           onChange={handleChange}
                        />
                     </div>
                     : null}
                  <div className={classes.grow}/>
                  <div className={classes.sectionDesktop}>
                     <Likes/>
                     <CartMenu {...props} />
                  </div>
                  <div className={classes.sectionMobile}>
                     <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                     >
                        <MoreIcon/>
                     </IconButton>
                  </div>
               </Toolbar>
            </AppBar>
            {renderMobileMenu}
         </div>
      </div>
   )
}