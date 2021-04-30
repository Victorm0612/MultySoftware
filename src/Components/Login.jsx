import { Button, Avatar, Grid, Paper, TextField, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React from 'react'

const Login = () => {

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

    const textFieldStyle = {
        margin: '10px auto'
    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOpenIcon/></Avatar>
                    <h2>Iniciar Sesión</h2>
                </Grid>
                <TextField label='Correo electrónico' placeholder='Ingresar correo electrónico' type='email' style={textFieldStyle} fullWidth required/>
                <TextField label='Contraseña' placeholder='Ingresar contraseña' type='password' style={textFieldStyle} fullWidth required/>
                <Button style={buttonStyle} type='submit' color='primary' variant='contained' fullWidth>Ingresar</Button>
                <Typography style={{margin: '20px 0 0 0'}}>
                    <Link to="/">¿Olviste tu contraseña?</Link>
                </Typography>
                <Typography>
                    ¿No tienes una cuenta creada?
                    <Link to='/register' style={{margin: '0 0 0 5px'}}>Registrate</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Login