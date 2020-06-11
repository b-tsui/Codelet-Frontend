import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link, Redirect } from "react-router-dom";
import { api } from "../config"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, fade } from '@material-ui/core/styles'
import '../styles/navbar-styles.css'
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

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

const NavBarSearch = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('')
    const [searched, setSearched] = useState(false)
    const [searchData, setSearchData] = useState({})

    const handleSearchTerm = (e) => setSearchTerm(e.target.value)

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            // let searchRes = await fetch(`${api}/sets/search/search?search_term=${searchTerm}`)
            // let searchData = await searchRes.json()
            // setSearchData(searchData)
            // setSearched(true)
            window.location.href = `/sets/search/search?search_term=${searchTerm}`
        }
    }

    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearchTerm}
                    onKeyDown={handleSearch}
                />
            </div>
        </>
    )
}
export default NavBarSearch