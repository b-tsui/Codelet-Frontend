import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import NavBarSearch from "./NavBarSearch"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, fade } from '@material-ui/core/styles'
import '../styles/navbar-styles.css'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SideBarBrowse from "./SideBarBrowse";

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}));

const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "#000a12" }} position="static">
        <Toolbar>
          <SideBarBrowse />
          <Typography variant="h6" className={classes.title}>
            <div>
              <Link to="/" id='navbar-logo'>
                <Button style={{ color: "#e8eaf6" }}>Codelet</Button>
              </Link>
            </div>
          </Typography>
          <NavBarSearch />
          {!isAuthenticated && (
            <Button
              style={{ color: "#e8eaf6" }}
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </Button>
          )}

          {isAuthenticated && (
            <span>
              <Link to="/">
                <Button style={{ color: "#e8eaf6" }}>Home</Button>
              </Link>
              <Link to="/profile">
                <Button style={{ color: "#e8eaf6" }}>Profile</Button>
              </Link>
            </span>
          )}
          {isAuthenticated && (
            <Button style={{ color: "#e8eaf6" }} onClick={() => logout()}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );

};

export default NavBar;
