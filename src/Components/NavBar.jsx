import React from 'react'
import {AppBar, ThemeProvider, makeStyles, Toolbar, Typography, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import theme from '../themeConfig'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
}))

const NavBar = () => {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" color="transparent">
            <Toolbar>
                <Typography color="primary" variant="h6" className={classes.menuButton}>
                ChickenStore
                </Typography>
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