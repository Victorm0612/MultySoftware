import { 
    Avatar, 
    Grid, 
    MenuItem, 
    InputAdornment, 
    IconButton,
    Dialog,
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
import esLocale from "date-fns/locale/es";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';



const Register = ({ handleClose }) => {

    const { handleSubmit, control, getValues, reset } = useForm();

    //attributes
    const [values, setValues] = useState({
        documentType: ["Cédula de Ciudadanía", "Cédula de Extranjería", "Pasaporte"],
        listGender: ["Masculino", "Femenino", "Otro"],
        showPassword: false,
        messageError: ""
    });
    const [open, setOpen] = useState(false);
    //Methods
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    const avatarStyle = {
        backgroundColor: 'green',
        margin: "20px auto"
    }      
    const paperStyle = {
        padding: '20px 20px 50px 20px', // T,R,B,L
        width: 450,
        margin: "50px auto 100px auto" //T,R,B,L
    }
    const IconStyle = {
        padding: '0 0 0 1px'
    } 
    const onSubmit = data => {
        const {first_name, last_name, document_type, document_id, gender, phone, birthday, email, password} = data
        axios.post('/users/register/',{
            document_type,
            document_id,
            first_name,
            last_name,
            gender,
            phone,
            birthday,
            user_type: 1,
            user_status: true,
            email,
            password
        })
        .then(response => {
            reset({
                document_type: 0,
                document_id: '',
                first_name: '',
                last_name: '',
                gender: 'Otro',
                phone: '',
                birthday: new Date(),
                email: '',
                password: '',
                passwordConfirmed: '',
            });
            window.location.href= '/login';
        })
        .catch((error)=>{
            values.messageError = error.response.data.message;
            handleChange('messageError');
            handleClickOpen();
            
        })
        
    };
    return (
        <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
            <Grid>
            <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={open}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {values.messageError} — <strong>¡Revisa tus datos!</strong>
                </Alert>
            </Dialog>            
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                    <Grid container align='center'>
                        <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <h2>Registrarse</h2>
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="first_name"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Nombres"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                            )}
                            rules={
                                {
                                    required: 'Debes tener un nombre.',
                                }
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="last_name"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Apellidos"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                            )}
                            rules={{ required: 'Debes tener apellidos.' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name='document_type'
                            control={control}
                            defaultValue={'0'}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Select
                                    value={value}
                                    displayEmpty
                                    onChange={onChange}
                                    fullWidth
                                    style={{margin: '16px auto'}}
                                >
                                    {
                                        values.documentType.map((document, index) =>
                                        <MenuItem 
                                            key={index}
                                            value={index}>{document}
                                        </MenuItem>)
                                    }
                                </Select>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name='document_id'
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Documento"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                            rules={
                                {
                                    required: 'Digite por favor su documento de identidad.',
                                    pattern: {
                                        value: /^[1-9]\d*(\d+)?$/i,
                                        message: 'Sólo números por favor.',
                                    },                                
                                    minLength: {
                                        value: 7,
                                        message: 'Tu documento de identificación está incompleto.'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Máximo diez dígitos.'
                                    }
                                }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Controller
                            name='gender'
                            control={control}
                            defaultValue='Otro'
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl component="fieldset">
                                    <FormLabel component="legend"></FormLabel>
                                    <RadioGroup 
                                    aria-label="genero"
                                    name="gender" 
                                    value={value} 
                                    onChange={onChange}>
                                    {
                                        values.listGender.map((gender, index)=>
                                        <FormControlLabel
                                            key={index}
                                            value={gender}
                                            control={<Radio/>}
                                            label={gender}
                                        />)
                                    }
                                    </RadioGroup>
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name='phone'
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Teléfono"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    type="text"
                                />
                            )}
                            rules={
                                {
                                    required: 'Debe tener un número de teléfono.',
                                    pattern: {
                                        value: /^[1-9]\d*(\d+)?$/i,
                                        message: 'Sólo números por favor.',
                                    },  
                                }
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="birthday"
                            control={control}
                            defaultValue={new Date()}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <KeyboardDatePicker
                                    style={{margin: '0.3%'}}
                                    disableToolbar
                                    disableFuture={true}
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="dateField"
                                    label="Fecha de nacimiento"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}                                    
                                />
                            )}
                            rules={{
                                required: 'Debe tener una fecha de nacimiento.',
                                validate: value => Math.floor((new Date().getTime() - value.getTime())/(1000*60*60*24)) >= 6570 || 'Fecha incorrecta.' 
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                label="Email"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="email"
                            />
                            )}
                            rules={{
                                required: 'Se debe digitar email.',  
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'El email debe ser válido.',
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Contraseña"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type={values.showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="boton visibilidad contrasenia"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                            )}
                            rules={{
                                required: 'Debes tener una contraseña.',
                                minLength: {
                                    value: 8,
                                    message: 'Debe tener al menos 8 carácteres.'
                                }                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name='passwordConfirmed'
                            control={control}
                            defaultValue=""
                            render={({ field: {onChange, value}, fieldState: {error}}) =>(
                                <TextField
                                    label="Confirmar Contraseña"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    type={values.showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="boton visibilidad contrasenia"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                style={IconStyle}
                                                >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                />
                            )}
                            rules={{
                                required: 'Debes tener una contraseña.',
                                minLength: {
                                    value: 8,
                                    message: 'Debe tener al menos 8 carácteres.'
                                },
                                validate: value => value === getValues("password") || 'Las contraseñas deben coincidir'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Button 
                            type='submit' 
                            color='primary' 
                            variant='contained'
                            onClick={handleClose} 
                            style={{textTransform: 'none', margin: '50px'}}
                        >
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
                </form> 
            </Paper>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
 
export default Register;