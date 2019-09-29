import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MDBInput } from "mdbreact";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Dropdown } from 'semantic-ui-react'
import './Input.css'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },

  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: '100%'
  },
}));

function OutlinedTextFields(props) {
  const classes = useStyles();



  return (
    <form className={classes.container} noValidate autoComplete="off">

      <TextField
        id="outlined-email-input"
        label={props.label}
        className={classes.textField}
        type={props.type}
        name={props.name}
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
      />

    </form>
  );
}

const InputPage = (props) => {
  return (
    <MDBInput className='input' style={{ width: '100%' }} onChange={props.onChange} disabled={props.disabled} value={props.value} label={props.label} hint={props.hint} type={props.type} />
  );
}







const DropdownPage = (props) => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);


  function handleChange(event) {
    setAge(event.target.value);
    props.onChange(event)
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }
  return (
    <form>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">{props.label}</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.value}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'demo-controlled-open-select',
          }}
          disabled={props.disabled}
        >
          {
            props.list.map((val, ind) => {
              return <MenuItem key={ind} value={val} >{val}</MenuItem>

            })
          }
        </Select>
      </FormControl>
    </form>
  );
}




const options = [
  { key: 'Janurary', text: 'Janurary', value: 'Janurary' },
  { key: 'Feburary', text: 'Feburary', value: 'Feburary' },
  { key: 'March', text: 'March', value: 'March' },
  { key: 'April', text: 'April', value: 'April' },
  { key: 'May', text: 'May', value: 'May' },
  { key: 'June', text: 'June', value: 'June' },
  { key: 'July', text: 'July', value: 'July' },
  { key: 'August', text: 'August', value: 'August' },
  { key: 'Septemeber', text: 'Septemeber', value: 'Septemeber' },
  { key: 'Octember', text: 'Octember', value: 'Octember' },
  { key: 'December', text: 'December', value: 'December' },

]

const DropdownExampleMultipleSelection = (props) => (
  <Dropdown onChange={props.onChange} placeholder='Select Month' fluid multiple selection options={options} />
)




export {
  OutlinedTextFields,
  InputPage,
  DropdownPage,
  DropdownExampleMultipleSelection


}