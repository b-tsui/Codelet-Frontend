import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import "../styles/sets.css"
import { useAuth0 } from "../react-auth0-spa"
import { api } from "../config"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
            maxWidth: 345,
      },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
},
}));

export default function CreateSet() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [setName, setSetName] = React.useState('');
    const [setDesc, setSetDesc] = React.useState('');
    const [categ, setCateg] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSetName = async (e) => {
        console.log(e.target.value)
        setSetName(e.target.value)
    };
    const handleSetDesc = async (e) => {
        console.log(e.target.value);
        setSetDesc(e.target.value)
    };
    const handleCategory = async (e) => {
        setCateg(e.target.value)
    }

    const handleAddSet = async (e) => {
        e.preventDefault();
        
    };

    return (
      <>
        <Card
          className={classes.root, "create-set"}
          variant="outlined"
          onClick={handleClickOpen}
        >
          <CardContent id={"single-set-description"}>
            <Typography variant="h5" component="h2" id={"single-set-subheader"}>
              Create New Set
            </Typography>
          </CardContent>
        </Card>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleAddSet}>
            <DialogTitle id="form-dialog-title">Create Set</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the details of your new set:
                </DialogContentText>
                <TextField
                    autoComplete="off"
                    autoFocus
                    margin="dense"
                    d="set-title-input"
                    label="Set Title..."
                    type="text"
                    fullWidth
                    onChange={handleSetName}
                />
                <TextField
                    autoComplete="off"
                    autoFocus
                    margin="dense"
                    id="set-desc-input"
                    label="Set Description..."
                    type="text"
                    fullWidth
                    onChange={handleSetDesc}
                />
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={categ}
                    onChange={handleCategory}
                    fullWidth
                    >
        
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose} color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
}
