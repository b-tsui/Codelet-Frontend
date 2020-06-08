import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function CreateSetForm() {
    const classes = useStyles();

    return (
        <form className={classes.root} id="create-form" noValidate autoComplete="off">
            <TextField id="filled-basic" multiline label="Set Title:" variant="filled"/>
            <TextField id="filled-basic" multiline label="Set Description:" variant="filled" />
            
        </form>
    );
}
