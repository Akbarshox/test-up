import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import Wrapper from "../../Wrapper/Wrapper";
import InputMask from "./InputMask";
import Maps from './Map';
import style from '../body.module.css';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      margin: '5% auto',
   },
   paper: {
      padding: theme.spacing(5),
      color: theme.palette.text.secondary,
   },
   textarea: {
      '& .MuiInput-underline:after': {
         borderBottomColor: 'green',
      },
      '& label.Mui-focused': {
         color: 'green',
      },
   }
}));

export default function FullWidthGrid(props) {
   const classes = useStyles();
   const [adr, setAdr] = useState();

   const [form, setForm] = useState(
      {
         "name": '',
         "phone": '(+998)   -       ',
         "address": '',
         "comment": '',
      }
   );
   const handleInputChange = (e) => {
      e.persist()
      setForm(form => ({...form, [e.target.name]: e.target.value}))
   }
   const handleSubmit = e => {
      e.preventDefault();
      alert(JSON.stringify(form));
      swal("Success", "Your application has been sent", "success");
   }
   console.log(localStorage.getItem('zakazi'))
   return (
      <Wrapper>
         <div className={classes.root}>
            <Grid container spacing={4}>
               <Grid item xs={12} sm={6}>
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                     <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                           <Grid item xs={12} sm={12}>
                              <TextField
                                 className={classes.textarea}
                                 name="name"
                                 value={form.name}
                                 onChange={handleInputChange}
                                 fullWidth={true}
                                 label="Full Name"
                                 required={true}
                              />
                           </Grid>
                           <Grid item xs={12} sm={12}>
                              <InputMask
                                 className={classes.textarea}
                                 name="phone"
                                 value={form.phone}
                                 onchange={handleInputChange}
                              />
                           </Grid>
                           <Grid item xs={12} sm={12}>
                              <TextField
                                 className={classes.textarea}
                                 name="address"
                                 value={adr === undefined ? '' : adr.text}
                                 onChange={handleInputChange}
                                 fullWidth={true}
                                 label="Address"
                              />
                           </Grid>
                           <Grid item xs={12} sm={12}>
                              <TextField
                                 className={classes.textarea}
                                 name="comment"
                                 value={form.comment}
                                 onChange={handleInputChange}
                                 fullWidth={true}
                                 label="Comment"
                              />
                           </Grid>
                        </Grid>
                     </Paper>
                     <button type="sumbit" className={style.submit}>submit</button>
                  </form>
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Paper>
                     <Maps location={setAdr}/>
                  </Paper>
               </Grid>
            </Grid>
         </div>
      </Wrapper>
   );
}