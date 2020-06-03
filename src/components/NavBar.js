import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import '../styles/navbar-styles.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const NavBar = () => {
    const classes = useStyles();
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <div>
                            <a href="/" id="navbar-logo">
                                Codelet
                            </a>
                        </div>
                    </Typography>
                    {!isAuthenticated && (
                        <button onClick={() => loginWithRedirect({})}>Log in</button>
                    )}

                    {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                    {isAuthenticated && (
                        <span>
                            <Link to="/">
                                <Button>Home</ Button>
                            </Link>&nbsp;
                            <Link to="/profile">
                                <Button>Profile</Button>
                            </Link>
                        </span>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;