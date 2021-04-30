import { 
    Avatar, 
    Grid, 
    MenuItem, 
    InputAdornment, 
    Input,
    InputLabel, 
    IconButton, 
    Paper, 
    Select, 
    TextField, 
    FormControl, 
    FormHelperText,
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    Button, 
    Typography } from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {Link} from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';

const Register = () => {

    //attributes
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        documentType: ["Cédula de Ciudadanía", "Cédula de Extranjería", "Pasaporte"],
        type_id: 0,
        document: '',
        listGender: ["Masculino", "Femenino", "Otro"],
        gender: '',
        phone: '',
        selectedDate: new Date('2021-04-29T11:01:54'),
        email: '',
        password: '',
        passwordConfirmed: '',
        showPassword: false,
        valid: false


    });
    //Methods
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const changeDate = (prop) => (event) => {
        setValues({ ...values, [prop]: event });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const registrar = () => {
        const {firstName, lastName, type_id, document, gender, phone, selectedDate, email, password} = values
        let newUser = {
            firstName,
            lastName,
            type_id,
            document,
            gender,
            phone,
            selectedDate,
            email,
            password
        }
        console.log(newUser)
    }

    const avatarStyle = {
        backgroundColor: 'green',
        margin: "20px auto"
    }      

    const paperStyle = {
        padding: '20px 20px 50px 20px', // T,R,B,L
        width: 450,
        margin: "50px auto 100px auto" //T,R,B,L
    }

    const textStyle = {
        margin: '20px 0 0 0'
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid container align='center'>
                    <Grid item xs={12} align='center'>
                        <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                        <h2>Registrarse</h2>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={values.firstName}
                            onChange={handleChange('firstName')} 
                            label='Nombres' 
                            placeholder='Nombres' 
                            type='text' 
                            style={textStyle}
                            required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={values.lastName}
                            onChange={handleChange('lastName')} 
                            label='Apellidos' 
                            placeholder='Apellidos' 
                            type='text' 
                            style={textStyle}
                            required/>
                    </Grid>
                    <Grid item xs={6}>
                        <Select 
                            value={values.type_id} 
                            displayEmpty 
                            onChange={handleChange('type_id')} 
                            fullWidth 
                            required 
                            style={{margin: '36px auto'}}>
                            {
                                values.documentType.map((document, index) =>
                                <MenuItem 
                                    key={index} 
                                    value={index}>
                                        {document}
                                </MenuItem>)
                            }
                        </Select>                        
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={values.document}
                            onChange={handleChange('document')} 
                            label="Documento"
                            placeholder="Documento"
                            required style={textStyle}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Género</FormLabel>
                        <RadioGroup 
                            aria-label="gender" 
                            name="gender" 
                            value={values.gender} 
                            onChange={handleChange('gender')}>
                            {
                                values.listGender.map((gender, index)=>
                                <FormControlLabel 
                                    key={index} 
                                    value={gender} 
                                    control={<Radio/>} 
                                    label={gender}/>)
                            }
                        </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid 
                        align="start" 
                        item xs={6} 
                        style={{margin:'16px 0 0 0'}}>
                            <TextField
                            value={values.phone}
                            onChange={handleChange('phone')} 
                            label="Teléfono" 
                            placeholder="Teléfono" 
                            required style={textStyle}>
                            </TextField>
                    </Grid>                 
                    <Grid 
                        item xs={6} 
                        style={textStyle} 
                        required>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="dateField"
                        label="Fecha de nacimiento"
                        value={values.selectedDate}
                        onChange={changeDate('selectedDate')}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </Grid>
                    <Grid align="start" item xs={12} style={textStyle} required>
                        <TextField
                        id="emailField"
                        type='email'
                        label="Correo electrónico"
                        value={values.email}
                        onChange={handleChange('email')}
                        fullWidth
                        required
                        />
                    </Grid>
                    <Grid align="start" item xs={6} style={textStyle} required>
                    <InputLabel align="start" htmlFor="passwordConfirmedField" style={{margin: '20px 0 0 0'}}>Contraseña</InputLabel>                        
                    <Input
                        required
                        id="passwordField"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        style={{margin: '0 20px 0 0'}}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="boton visibilidad contrasenia"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    </Grid>
                    <Grid align="start" item xs={6} style={textStyle} required>
                        <InputLabel align="start" htmlFor="passwordConfirmedField" style={{margin: '20px 0 0 0'}}>Confirmar contraseña</InputLabel>                        
                        <Input
                            required
                            error={values.password === values.passwordConfirmed ? false : true}
                            id="passwordConfirmedField"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.passwordConfirmed}
                            onChange={handleChange('passwordConfirmed')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="boton visibilidad contrasenia"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        <FormHelperText error={values.password === values.passwordConfirmed ? false : true}>{
                        values.password === values.passwordConfirmed ? '' : (values.password === ''? '' : 'Las contraseñas no coinciden')}</FormHelperText>
                    </Grid>   
                    <Grid item xs={12}>
                        <Button 
                            type='submit' 
                            color='primary' 
                            variant='contained'
                            disabled = {!values.valid} 
                            onSubmit={registrar} 
                            style={{textTransform: 'none', margin: '50px'}}>
                          Registrarse
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                        ¿Ya tienes una cuenta creada?
                        <Link to='/login' style={{margin: '0 0 0 5px'}}>Iniciar Sesión</Link>
                        </Typography>   
                    </Grid>                                      
                </Grid>
            </Paper>
        </Grid>
        </MuiPickersUtilsProvider>
    );
}
 
export default Register;