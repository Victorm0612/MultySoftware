import React from 'react'
import {AppBar, ThemeProvider, makeStyles, Toolbar, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import theme from '../themeConfig'
import logo from '../Image/Logo.png'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        maxWidth: 120,
        marginRight: '10px'
    }
}))

const NavBar = () => {
    const classes = useStyles();

    const buttonStyle = {
        borderRadius:50,
        textTransform: 'none',
        margin: '0 0 0 .5rem'
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" color="primary">
            <Toolbar>
                <Link to="/">
                    <img src={logo} alt="logo" className={classes.logo} />
                </Link>
                <div className={classes.grow}/>
                    <Button component={ Link } to="/login" style={buttonStyle} variant="outlined">Login</Button>
                    <Button component={ Link } to="/register" style={buttonStyle} variant="outlined">Registrarse</Button>
            </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
 
export default NavBar;