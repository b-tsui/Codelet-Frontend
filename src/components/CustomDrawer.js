import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../styles/customDrawer.css'


import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import NoteIcon from '@material-ui/icons/Note'; //flashcards
import ImportContactsIcon from '@material-ui/icons/ImportContacts'; //learn
import CreateIcon from '@material-ui/icons/Create'; //create/write new card
import SchoolIcon from '@material-ui/icons/School'; //quiz/test
import { IconButton } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,

    },
}));

export default function CustomDrawer({location, addCard}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { user, getTokenSilently } = useAuth0();
    const [open, setOpen] = React.useState(false);
    const [cardTerm, setCardTerm] = React.useState("");
    const [cardDef, setCardDef] = React.useState("");
    // const [setId, setSetId] = React.useState(null);
    const [fetched, setFetched] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCardTerm = async (e) => {
        console.log(e.target.value);
        setCardTerm(e.target.value);
    };
    const handleCardDef = async (e) => {
        console.log(e.target.value);
        setCardDef(e.target.value);
    };


    const handleAddCard = async (e) => {
        e.preventDefault();
        let setId = Number(location.pathname.slice(6))
        // console.log(setId)
        if (user) {
            const token = await getTokenSilently();
            const res = await fetch(`${api}/cards`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    term: cardTerm,
                    definition: cardDef,
                    set_id: setId,
                }),
            });
            try {
                if (!res.ok) throw res;
                const card = await res.json();
                console.log(card)
                addCard(card)
                // console.log(`New Set: ${set}`);
                // window.location.href = `sets/${set.id}`;
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position='static' id='test'>
                <Tabs value={value} onClick={handleClickOpen} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Create Card" icon={<CreateIcon />} {...a11yProps(0)}/>
                    <Tab label="Learn" icon={<ImportContactsIcon />} {...a11yProps(1)} />
                    <Tab label="Quiz" icon={<SchoolIcon />} {...a11yProps(2)} />
                    <Tab label="Flashcards" icon={<NoteIcon />} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                    <form onSubmit={handleAddCard}>
                        <DialogTitle id="form-dialog-title">Create New Card</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter you new card info:
                            </DialogContentText>
                            <TextField
                                autoComplete="off"
                                autoFocus
                                margin="dense"
                                d="set-title-input"
                                label="Card Term..."
                                type="text"
                                fullWidth
                                onChange={handleCardTerm}
                            />
                            <TextField
                                autoComplete="off"
                                autoFocus
                                margin="dense"
                                id="set-desc-input"
                                label="Card Definition..."
                                type="text"
                                fullWidth
                                onChange={handleCardDef}
                            />
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
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
    );
}





