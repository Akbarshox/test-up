import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Link, Redirect} from 'react-router-dom';
import clsx from 'clsx';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {blue} from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import email from '../../../img/email.svg';
import password from '../../../img/password.svg';
import google from '../../../img/google.svg';
import facebook from '../../../img/facebook.svg';
import MenuItem from "@material-ui/core/MenuItem";
import history from '../../../history';

const useStyles = makeStyles((theme) => ({
   avatar: {
      backgroundColor: blue[100],
      color: blue[600],
   },
   button: {
      width: '220px',
      justifyContent: 'center',
      color: '#3E9B4C',
      border: '1px solid #3E9B4C',
      marginLeft: '40px',
      marginTop: '15px'
   },
   root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      textTransform: 'lowercase',
      textAlign: 'center',
   },
   with: {
      width: '110px',
      justifyContent: 'center',
      color: '#3E9B4C',
      textTransform: 'lowercase'
   }
}));

function SimpleDialog(props) {
   const classes = useStyles();
   const [values, setValues] = React.useState({
      showPassword: false,
   });
   
   const handleChange = (prop) => (event) => {
      setValues({...values, [prop]: event.target.value});
   };
   
   const handleClickShowPassword = () => {
      setValues({...values, showPassword: !values.showPassword});
   };
   
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };
   const {onClose, selectedValue, open} = props;
   
   const handleClose = () => {
      onClose(selectedValue);
   };
   const inputStyle = {WebkitBoxShadow: "0 0 0 1000px white inset"};
   
   return (
       <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">Sign In</DialogTitle>
          <List>
             <form className={classes.root} noValidate autoComplete="off">
                <ListItem autoFocus>
                   <ListItemAvatar>
                      <img src={email} alt="email"/>
                   </ListItemAvatar>
                   <FormControl className={clsx(classes.margin, classes.textField)}>
                      <InputLabel htmlFor="standard-adornment-password" style={{zIndex: '1000'}}>email</InputLabel>
                      <Input
                          inputProps={{style: inputStyle}}
                      />
                   </FormControl>
                </ListItem>
                <ListItem autoFocus>
                   <ListItemAvatar>
                      <img src={password} alt="password" style={{width: '35px'}}/>
                   </ListItemAvatar>
                   <FormControl className={clsx(classes.margin, classes.textField)}>
                      <InputLabel htmlFor="standard-adornment-password" style={{zIndex: '1000'}}>Password</InputLabel>
                      <Input
                          id="standard-adornment-password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          style={{width: '200px'}}
                          autoComplete='off'
                          inputProps={{style: inputStyle}}
                          endAdornment={
                             <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                   {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                             </InputAdornment>
                          }
                      />
                   </FormControl>
                </ListItem>
             </form>
             <Button
                 color="default"
                 className={classes.button}
             >
                Sign in
             </Button>
             <div className={classes.root}>{"or with"}</div>
             <div className="sign-in-list">
                <ul>
                   <li>
                      <Button
                          color="default"
                          className={classes.with}
                          startIcon={<img src={google} alt="google" width={25}/>}
                      >
                         Google
                      </Button>
                   </li>
                   <li>
                      <Button
                          color="default"
                          className={classes.with}
                          startIcon={<img src={facebook} alt="facebook" width={25}/>}
                      >
                         Facebook
                      </Button>
                   </li>
                </ul>
             </div>
          </List>
       </Dialog>
   );
}

SimpleDialog.propTypes = {
   onClose: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
   selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
   const [open, setOpen] = React.useState(false);
   
   const handleClickOpen = () => {
      setOpen(true);
   };
   
   const handleClose = () => {
      setOpen(false);
      history.push('/');
   };
   
   return (
       <div>
          <Link to="/signin" onClick={handleClickOpen}><MenuItem className="btn-auth">Sign in</MenuItem></Link>
          <SimpleDialog open={open} onClose={handleClose}/>
          {setOpen === false ? <Redirect to="/" /> : null}
       </div>
   );
}