import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {blue} from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import emailImg from '../../../img/email.svg';
import passwordImg from '../../../img/password.svg';
import googleImg from '../../../img/google.svg';
import facebookImg from '../../../img/facebook.svg';
import nameImg from '../../../img/name.svg';
import history from '../../../history';
import {useAuth} from "../../../firebase";

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
   const auth = useAuth();
   
   const [inputs, setInputs] = useState({});
   const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
   };
   const handleSubmit = (event) => {
      event.preventDefault();
      auth.signup(inputs.name, inputs.email, inputs.password);
   };
   
   return (
       <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">Sign Up</DialogTitle>
          <List>
             <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <ListItem autoFocus>
                   <ListItemAvatar>
                      <img src={nameImg} alt="name" style={{width: '35px'}}/>
                   </ListItemAvatar>
                   <FormControl className={clsx(classes.margin, classes.textField)}>
                      <InputLabel htmlFor="standard-adornment-password" style={{zIndex: '1000'}}>name</InputLabel>
                      <Input
                          error={auth.error !== null}
                          type="text"
                          name="name"
                          value={inputs.name}
                          onChange={handleInputChange}
                          id="displayName"
                          inputProps={{style: inputStyle}}
                      />
                   </FormControl>
                </ListItem>
                <ListItem autoFocus>
                   <ListItemAvatar>
                      <img src={emailImg} alt="email"/>
                   </ListItemAvatar>
                   <FormControl className={clsx(classes.margin, classes.textField)}>
                      <InputLabel htmlFor="standard-adornment-password" style={{zIndex: '1000'}}>email</InputLabel>
                      <Input
                          error={auth.error !== null}
                          inputProps={{style: inputStyle}}
                          type="email"
                          value={inputs.email}
                          onChange={handleInputChange}
                          name="email"
                          id="userEmail"
                      />
                   </FormControl>
                </ListItem>
                <ListItem autoFocus>
                   <ListItemAvatar>
                      <img src={passwordImg} alt="password" style={{width: '35px'}}/>
                   </ListItemAvatar>
                   <FormControl className={clsx(classes.margin, classes.textField)}>
                      <InputLabel htmlFor="standard-adornment-password" style={{zIndex: '1000'}}>Password</InputLabel>
                      <Input
                          error={auth.error !== null}
                          type={values.showPassword ? 'text' : 'password'}
                          className="mt-1 mb-3 p-1 w-full"
                          name="password"
                          value={inputs.password}
                          placeholder="Your Password"
                          id="userPassword"
                          onChange={handleInputChange}
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
                <Button
                    type="submit"
                    color="default"
                    className={classes.button}
                >
                   Sign up
                </Button>
             </form>
             
             <div className={classes.root}>{"or with"}</div>
             <div className="sign-in-list">
                <ul>
                   <li>
                      <Button
                          color="default"
                          className={classes.with}
                          startIcon={<img src={googleImg} alt="google" width={25}/>}
                      >
                         Google
                      </Button>
                   </li>
                   <li>
                      <Button
                          color="default"
                          className={classes.with}
                          startIcon={<img src={facebookImg} alt="facebook" width={25}/>}
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
   const auth = useAuth();
   
   const handleClickOpen = () => {
      setOpen(true);
   };
   
   const handleClose = () => {
      setOpen(false);
      auth.setError(null);
   };
   
   return (
       <div>
          <MenuItem className="btn-auth" onClick={handleClickOpen}>Sign up</MenuItem>
          <SimpleDialog open={open} onClose={handleClose}/>
       </div>
   );
}