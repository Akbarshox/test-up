import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
   textarea: {
      '& .MuiInput-underline:after': {
         borderBottomColor: 'green',
      },
      '& label.Mui-focused': {
         color: 'green',
      },
   }
}));

function TextMaskCustom(props) {
   const {inputRef, ...other} = props;

   return (
      <MaskedInput
         {...other}
         ref={(ref) => {
            inputRef(ref ? ref.inputElement : null);
         }}
         mask={['(', /[9]/, /[9]/, /[8]/, ')', ' ', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
         placeholderChar={'\u2000'}
         showMask
      />
   );
}

TextMaskCustom.propTypes = {
   inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
   const {inputRef, onChange, ...other} = props;

   return (
      <NumberFormat
         {...other}
         getInputRef={inputRef}
         onValueChange={(values) => {
            onChange({
               target: {
                  name: props.name,
                  value: values.value,
               },
            });
         }}
         thousandSeparator
         isNumericString
         prefix="$"
      />
   );
}

NumberFormatCustom.propTypes = {
   inputRef: PropTypes.func.isRequired,
   name: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
};

export default function InputMask(props) {
   const classes = useStyles();
   return (
      <FormControl>
         <InputLabel htmlFor="formatted-text-mask-input">Please enter your number</InputLabel>
         <Input
            className={classes.textarea}
            value={props.value}
            onChange={props.onchange}
            name={props.name}
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
            required={true}
         />
      </FormControl>
   );
}