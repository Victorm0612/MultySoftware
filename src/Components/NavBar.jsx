import React from 'react'
import {AppBar, ThemeProvider, makeStyles, Toolbar, Button, Box} from '@material-ui/core'
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

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" color="primary">
            <Toolbar>
                <img src={logo} alt="logo" className={classes.logo} />
                <div className={classes.grow}/>
                <Box m={2}>
                    <Button component={ Link } to="/login" style={{borderRadius:50}} variant="outlined">Login</Button>
                </Box>
                <Button component={ Link } to="/register" style={{borderRadius:50}} variant="outlined">Registrarse</Button>
            </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
 
export default NavBar;