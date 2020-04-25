import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {Button, Paper, Grid, withStyles, 
  RadioGroup, TextField,
  Radio,
  FormControlLabel,
  InputAdornment
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Alert, AlertTitle } from '@material-ui/lab';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import * as yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  tel: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  email: yup.string().email(),
  empID: yup.string().required()
});

const formLabelsTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131'
        },
      }
    }
  }
})

const styles = theme => ({
  button: { background: 'black' },
  margin: {
      margin: theme.spacing.unit * 2,
  },
  container: {
      padding: theme.spacing.unit * 2,
      maxWidth: 400,
      marginTop: 50
  }
});

const companies = ["AITS", "AH", "AHP", "AA", "AF", "AHT", "APB", "APR", "APC", "ASP", "AL", "AS", "EA", "AEC", "AERP"];
function Register(props) {
  let user = localStorage.getItem('user');
  const { handleSubmit, errors, control } = useForm({validationSchema: schema,
  defaultValues: user?JSON.parse(user):{
    firstName: '',
    lastName: '',
    tel: '',
    email: '',
    gender: 'male',
    empID: '',
    department: '',
    company: 'AITS'
  }});
  const { classes } = props;
  
  // The first commit of Material-UI
  // const [selectedDate, setSelectedDate] = React.useState(user?user.birthday:new Date());
  const [company, setCompany] = React.useState("AITS");
  const [alert, setAlert] = React.useState(false);

  const onSubmit = data => {
    console.log(data)
    console.log(JSON.stringify(errors))
    if(Object.keys(errors).length === 0){
      localStorage.setItem('user', JSON.stringify(data));
      setAlert(true)
    }
  }
  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };
  const handleChange = company => {
    setCompany(company.target.value);
  };
  
  return (
  <MuiThemeProvider theme={formLabelsTheme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <Snackbar open={alert} anchorOrigin={{ vertical:'top', horizontal:'right' }}
      autoHideDuration={6000} 
      onClose={() => setAlert(false)} >
    <Alert onClose={() => setAlert(false)} >
      Your profile have been save succcesfully — <strong>Congratulation!</strong>
    </Alert></Snackbar>
    <Paper className={classes.container}> 
    <br />
    <Grid container justify="center" >
        <PersonIcon color="primary" style={{ fontSize: 60 }}  />
    </Grid>
    <br />
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container justify="center" spacing={2}>
    <Grid item xs={6}>
        <Controller as={
          <TextField
            label='First Name'
            variant='outlined'
            margin='normal'
            InputLabelProps={{
              shrink: true
            }}
            required
            size="small"
          />
          } 
          type="text" name="firstName" control={control}/>
          
    </Grid>
    <Grid item xs={6}>
        <Controller as={
          <TextField
            label='Last Name'
            variant='outlined'
            margin='normal'
            InputLabelProps={{
              shrink: true
            }}
            required
            size="small"
          />
          } 
          type="text" name="lastName" control={control}/>
    </Grid> 
    <Grid item xs={6}>
        <Controller as={
          <TextField
            label='Mobile Number'
            variant='outlined'
            margin='normal'
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
            size="small"
            error={!!errors.tel}
            helperText={!!errors.tel?errors.tel.message:""}
          />
          } type="tel" name="tel" control={control}  
          />
        </Grid> 
        <Grid item xs={6}>
        <Controller as={
            <TextField
              label='Email'
              variant='outlined'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              size="small"
              error={!!errors.email}
              helperText={!!errors.email?errors.email.message:""}
            />
            } 
            type="text" name="email" control={control} />
        </Grid> 
        <Grid item xs={12}>
        <Controller
            as={
              <RadioGroup aria-label="gender" row defaultValue="male" >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            }
            name="gender"
            control={control}
            defaultValue="male"
          />
        </Grid> 
        <Grid item xs={6}>
        <Controller as={
          <TextField
            label='Employee ID'
            InputLabelProps={{
              shrink: true
            }}
            required
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <FingerprintIcon />
                </InputAdornment>
              ),
            }}
          />
          } 
          type="text" name="empID" control={control}/>
      </Grid> 
      <Grid item xs={6}>
        {/* <Controller as={
          <KeyboardDatePicker
            id="date-picker-dialog"
            label="Birthday"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            size="small"
            fullWidth
          />
          } 
          name="birthday" defaultValue={selectedDate} control={control}/> */}
      </Grid>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item xs={6}>
          <Controller as={
            <TextField
              label='Department'
              variant='outlined'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              required
              size="small"
            />
            } 
            type="text" name="department" control={control}/>
        </Grid> 
        <Grid item xs={6}>
        <Controller as={
            <FormControl variant="outlined" className={classes.formControl} fullWidth size="small" >
              <InputLabel id="demo-simple-select-outlined-label">Company</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={company}
                onChange={handleChange}
                label="Company"
              >
                {companies.map((comp, index) => (
                  <MenuItem value={comp} key={index}>{comp}</MenuItem>
                ))}
              </Select>
            </FormControl>
          } 
          style={{marginTop: 16}}
          name="company" control={control}/>
      </Grid>
      </Grid>
      <hr />
      <Grid container justify="flex-end" spacing={2}>
        <Grid item>
            <Button type="submit" variant="contained" color={user?"primary":"secondary"}
            style={{ textTransform: "none" }}size="small" >{user?'EDIT':'SAVE'}</Button>
        </Grid>
      </Grid>
      {/* <input type="submit" /> */}
      </Grid>
      </form>
    </Paper>
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>
  );
}

export default withStyles( styles )(Register);