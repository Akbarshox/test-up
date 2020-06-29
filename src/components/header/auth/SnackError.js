import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
   close: {
      padding: theme.spacing(0.5),
   },
}));

export default function SnackError() {
   const [open, setOpen] = React.useState(true);
   
   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
   };
   
   const classes = useStyles();
   return (
       <div>
          <Snackbar
              anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'left',
              }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message={"error"}
              action={
                 <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleClose}>
                       UNDO
                    </Button>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                       <CloseIcon />
                    </IconButton>
                 </React.Fragment>
              }
          />
       </div>
   );
}