import React, { useState } from "react";
import StudyCard from "./StudyCard";
import MatchGame from "./MatchGame";
import CardQuiz from "./CardQuiz";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import "../styles/customDrawer.css";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import NoteIcon from "@material-ui/icons/Note"; //flashcards
import ImportContactsIcon from "@material-ui/icons/ImportContacts"; //learn
import CreateIcon from "@material-ui/icons/Create"; //create/write new card
import SchoolIcon from "@material-ui/icons/School"; //quiz/test
import DescriptionIcon from "@material-ui/icons/Description";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#18212b",
  },
  indicator: { color: "#00897b" },
}));

export default function CustomDrawer({ set, addCard, cards }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { user, getTokenSilently } = useAuth0();
  const [open, setOpen] = useState(false);
  const [cardTerm, setCardTerm] = useState("");
  const [cardDef, setCardDef] = useState("");

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
    setCardTerm(e.target.value);
  };

  const handleCardDef = async (e) => {
    setCardDef(e.target.value);
  };

  const handleAddCard = async (e) => {
    e.preventDefault();

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
          set_id: set.id,
        }),
      });
      try {
        if (!res.ok) throw res;
        const card = await res.json();
        addCard(card);
        // console.log(`New Set: ${set}`);
        // window.location.href = `sets/${set.id}`;
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" id="test">
        <Tabs
          value={value}
          onClick={handleClickOpen}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Terms" icon={<DescriptionIcon />} {...a11yProps(0)} />
          {/* Create card will only show if user is logged in and created that set */}
          <Tab label="Match" icon={<ImportContactsIcon />} {...a11yProps(1)} />
          <Tab label="Quiz" icon={<SchoolIcon />} {...a11yProps(2)} />
          <Tab label="Cards" icon={<NoteIcon />} {...a11yProps(3)} />
          {user && user.userId === set.user_id && (
            <Tab label="Create" icon={<CreateIcon />} {...a11yProps(4)} />
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Cards:
      </TabPanel>
      {user && user.userId === set.user_id && (
        <TabPanel value={value} index={4}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            id="card-form"
            PaperProps={{
              style: { borderRadius: "8px", backgroundColor: "#263238" },
            }}
          >
            <form onSubmit={handleAddCard}>
              <DialogTitle id="form-dialog-title" style={{ color: "beige" }}>
                Create New Card
              </DialogTitle>
              <DialogContent>
                <DialogContentText style={{ color: "lightgray" }}>
                  Enter you new card info:
                </DialogContentText>
                <TextField
                  autoComplete="off"
                  autoFocus
                  InputLabelProps={{ style: { color: "lightgray" } }}
                  margin="dense"
                  id="set-title-input"
                  label="Card Term..."
                  type="text"
                  fullWidth
                  onChange={handleCardTerm}
                />
                <TextField
                  autoComplete="off"
                  InputLabelProps={{ style: { color: "lightgray" } }}
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
      )}
      <TabPanel
        value={value}
        index={1}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <MatchGame cards={cards} />
      </TabPanel>
      <TabPanel value={value} index={2} style={{ display: "flex", justifyContent: "center" }}>
        <CardQuiz cards={cards} value={value} />
      </TabPanel>
      <TabPanel
        style={{ display: "flex", justifyContent: "center" }}
        value={value}
        index={3}
      >
        {cards.length > 0 ? (
          <StudyCard cards={cards} />
        ) : (
            <h2>There are no cards to study.</h2>
          )}
      </TabPanel>
    </div>
  );
}
