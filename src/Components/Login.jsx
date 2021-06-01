import { Button, Avatar, Grid, Paper, TextField, InputAdornment, IconButton, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useForm, Controller } from 'react-hook-form';
import React, { useState } from 'react';

const Login = ({ handleClose }) => {

    //attributes
    const [values, setValues] = useState({
        showPassword: false,
    });
    const { handleSubmit, control } = useForm();

    //Methods
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };    

    const paperStyle = {
        padding: 20, // T,R,B,L
        height: '70vh',
        width: 400,
        margin: "50px auto" //T,R,B,L
    }

    const avatarStyle = {
        backgroundColor: 'green',
        margin: "20px auto"
    }

    const buttonStyle = {
        margin: "20px 0 0 0",
        textTransform: 'none'
    }

    const onSubmit = data => {
        console.log(data)
    };

    return (
        <Grid align="center">
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOpenIcon/></Avatar>
                    <h2>Iniciar Sesión</h2>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item xs={12}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Correo electrónico"
                                placeholder='Ingresar correo electrónico'
                                type='email'
                                fullWidth
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                            )}
                            rules={
                                {
                                    required: 'Se debe digitar email.',  
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'El email debe ser válido.',
                                    }       
                                }
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                                fullWidth
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
                                    message: 'Tu contraseña debería tener 8 carácteres ¡Haz memoria!'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button style={buttonStyle} onClick={handleClose} fullWidth type='submit' color='primary' variant='contained'>Ingresar</Button>
                    </Grid>
                    <Typography style={{margin: '20px 0 0 0'}}>
                        <Link to="/">¿Olviste tu contraseña?</Link>
                    </Typography>
                    <Typography>
                        ¿No tienes una cuenta creada?
                        <Link to='/register' style={{margin: '0 0 0 5px'}}>Registrate</Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );
}

export default Login