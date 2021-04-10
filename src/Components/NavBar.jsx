import React from 'react'
import {AppBar, ThemeProvider, makeStyles, Toolbar, Typography, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
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
    },
}))

const NavBar = () => {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" color="primary">
            <Toolbar>
                <img src={logo} alt="logo" className={classes.logo} />
                <div className={classes.grow}/>
                <IconButton color="primary" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
 
export default NavBar;