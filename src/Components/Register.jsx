import { Avatar, Grid, MenuItem, Paper, Select, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import React, { useState } from 'react';

const Register = () => {

    //attributes
    const documentType = ["Cédula de Ciudadanía", "Cédula de Extranjería", "Pasaporte"];
    const [type_id, setType_id] = useState(0);
    
    const listGender = ["Masculino", "Femenino", "Otro"];
    const [gender, setGender]= useState("Otro");

    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-04-26T21:11:54'));

    //Methods
    const updateSelect=(e)=>{
        setType_id(e.target.value);
    }

    const updateGender=(e)=>{
        setGender(e.target.value);
    }

    const updateDate = (date) => {
        setSelectedDate(date);
      };    

    const paperStyle = {
        padding: 20, // T,R,B,L
        height: '80vh',
        width: 450,
        margin: "50px auto" //T,R,B,L
    }

    const textStyle ={
        margin: '20px 0 0 0'
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid container align='center'>
                    <Grid item xs={12} align='center'>
                        <Avatar><AccountCircleIcon/></Avatar>
                        <h2>Registrarse</h2>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label='Nombres' placeholder='Nombres' type='text' style={textStyle}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label='Apellidos' placeholder='Apellidos' type='text' style={textStyle}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Select value={type_id} displayEmpty onChange={updateSelect} fullWidth required style={{margin: '36px auto'}}>
                            {
                                documentType.map((document, index) =>
                                <MenuItem key={index} value={index}>{document}</MenuItem>)
                            }
                        </Select>                        
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Documento" placeholder="Documento"  required style={textStyle}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Género</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={gender} onChange={updateGender}>
                            {
                                listGender.map((gender, index)=>
                                <FormControlLabel key={index} value={gender} control={<Radio/>} label={gender}/>)
                            }
                        </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Teléfono" placeholder="Teléfono" required style={textStyle}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate}
                        onChange={updateDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        </MuiPickersUtilsProvider>
    );
}
 
export default Register;