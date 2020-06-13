import React from "react";
import { Link } from "react-router-dom";
import "../styles/browse-nav.css";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    background: "#000a12",
    //color: 'white'
  },
  divider: {
    color: "secondary",
  },
}));

export default function SideBarBrowse() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const categories = [
    "Data Structures",
    "Algorithms",
    "Javascript",
    "Python",
    "Databases",
    "Frontend",
    "Backend",
  ];

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav" aria-label="main mailbox folders">
        <Link to="/">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon id="browse-home-icon">
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText id="browse-home" primary="Home" />
          </ListItem>
        </Link>
      </List>
      <Divider id="browse-divider-top" />
      <Typography variant="h5" id="browse-nav-title">
        Categories
      </Typography>
      <Divider id="browse-diverder-bottom" />
      <List component="nav" aria-label="secondary mailbox folder">
        {categories.map((text, i) => (
          <Link to={`/categories/${i + 1}`}>
            <ListItem
              key={text}
              button
              selected={selectedIndex === i + 1}
              onClick={(event) => handleListItemClick(event, i + 2)}
            >
              <ListItemText className="browse-item" primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <>
        <Button
          onClick={toggleDrawer("left", true)}
          style={{ color: "#e8eaf6" }}
        >
          <MenuIcon />
        </Button>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
          classes={{ paper: classes.paper }}
        >
          {list("left")}
        </SwipeableDrawer>
      </>
    </div>
  );
}
