import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Set from "./Set";
import { api } from "../config";
import "../styles/profile.css";

import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import theme from './Theme'


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
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary
  },
}));

const Profile = () => {
  const classes = useStyles();

  const { user, loading, getTokenSilently } = useAuth0();
  const [userSets, setUserSets] = useState([]);
  const [favoriteSets, setFavoriteSets] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadSets = async () => {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/users/sets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFetched(true);
      setUserSets(data.userSets);
      setFavoriteSets(data.favoriteSets);
    };
    loadSets();
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="user-info-container">
        <img
          src={user.picture}
          alt="Profile"
          style={{ "border-radius": "50%" }}
        />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      <Paper square className="profile-tabs-container">
        <Tabs
          value={value}
          // inkBarStyle={{ background: "cadetblue" }}
          indicatorColor={theme.primary}
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab
            inkBarStyle={{ background: "cadetblue" }}
            label="Favorited Sets"
            {...a11yProps(0)}
          />
          <Tab label="My Sets" {...a11yProps(1)} />
          <Tab label="My Info" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <div>
          <h1>Favorited sets:</h1>
          <div className="sets-container">
            {fetched &&
              favoriteSets.map((set) => <Set set={set} key={set.id} />)}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <h1>My sets:</h1>
          <div className="sets-container">
            {fetched && userSets.map((set) => <Set set={set} key={set.id} />)}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <code>{JSON.stringify(user, null, 2)}</code>
      </TabPanel>
    </>
  );
};

export default Profile;
