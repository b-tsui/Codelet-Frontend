import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/sets.css";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import StarIcon from "@material-ui/icons/Star";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Set({ set, sets, setSets, setFetched }) {
  const [upvotes, setUpvotes] = useState(
    set.votes.filter((vote) => vote.is_upvote).length
  );
  const [downvotes, setDownvotes] = useState(
    set.votes.filter((vote) => vote.is_upvote === false).length
  );
  // const [fetchedSet, setfetchedSet] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const {
    user,
    getTokenSilently,
    loginWithPopup,
    isAuthenticated,
  } = useAuth0();
  // const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  let date = Date.parse(set.created_at);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [updateTitle, setUpdateTitle] = useState(set.title);
  const [updateDescription, setUpdateDescription] = useState(set.description);
  const [open, setOpen] = useState(false);

  // const updateSet = (updatedSet) => {
  //   const updatedSetsArray = sets.map((set) =>
  //     set.id === updatedSet.id ? updatedSet : set
  //   );
  //   setSets(updatedSetsArray);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //sets clients vote state
  useEffect(() => {
    const getVotes = () => {
      if (user) {
        set.votes.forEach((vote) => {
          if (vote.user_id === user.userId) {
            if (vote.is_upvote) {
              setIsUpvoted(true);
            } else if (vote.is_upvote === false) {
              setIsUpvoted(false);
            }
          }
        });
      }
    };
    getVotes();
  }, [set.votes, user]);

  useEffect(() => {
    const getFavorites = () => {
      if (user) {
        set.favorites.forEach((favorite) => {
          favorite.id === user.userId
            ? setIsFavorited(true)
            : setIsFavorited(false);
        });
      }
    };
    getFavorites();
  }, [user, set.favorites]);

  const voteHandler = async (e, upvoteButton) => {
    if (!user) {
      loginWithPopup({});
    }

    if (user) {
      if (isUpvoted) {
        setIsUpvoted(upvoteButton ? null : false);
        setUpvotes(upvotes - 1);
        !upvoteButton && setDownvotes(downvotes + 1);
      } else if (isUpvoted === false) {
        setIsUpvoted(upvoteButton ? true : null);
        setDownvotes(downvotes - 1);
        upvoteButton && setUpvotes(upvotes + 1);
      } else {
        setIsUpvoted(upvoteButton ? true : false);
        upvoteButton ? setUpvotes(upvotes + 1) : setDownvotes(downvotes + 1);
      }
      const token = await getTokenSilently();

      await fetch(`${api}/sets/${set.id}/votes`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        //if upvote button is clickes sets body isupvote to true else sets to false
        body: JSON.stringify({ isUpvote: upvoteButton ? true : false }),
      });
      //updates upvoted state
    }
  };

  const favoriteHandler = async (e) => {
    if (!user) {
      loginWithPopup({});
    }

    if (user) {
      //updates isFavorite state
      setIsFavorited(isFavorited ? false : true);

      const token = await getTokenSilently();

      await fetch(`${api}/sets/${set.id}/favorites`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
  };

  const handleUpdateTitle = async (e) => {
    setUpdateTitle(e.target.value);
  };

  const handleUpdateDescription = async (e) => {
    setUpdateDescription(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancelClose = () => {
    setOpen(false);
  };

  const handleEditSet = async (e) => {
    e.preventDefault();
    const token = await getTokenSilently();
    const res = await fetch(`${api}/sets/${set.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateTitle,
        description: updateDescription,
      }),
    });

    if (!res.ok) {
      alert("authorization denied");
    } else {
      alert("Set was successfully edited");
      setFetched(false);
    }
  };

  const handleDeleteSet = async () => {
    const token = await getTokenSilently();

    const res = await fetch(`${api}/sets/${set.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      alert("authorization denied");
    } else {
      alert("Set was successfully deleted");
      setFetched(false);
    }
  };

  return (
    <>
      <div className="everything">
        <Card className={classes.root} id="single-set">
          <div id="single-set-options">
            <IconButton
              onClick={handleClick}
              style={{
                padding: "8px",
                justifyContent: "flex-end",
                hover: "none",
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <Link to={{ pathname: `/sets/${set.id}` }}>
            <CardHeader
              title={<div className="single-set-title">{set.title}</div>}
              subheader={
                <div className="single-set-subheader">
                  <div>
                    {`Created by ${set.author} on ${new Date(
                      date
                    ).toLocaleDateString("en-US")}`}
                  </div>
                  <div>{`${set.card_count} cards`}</div>
                </div>
              }
            />
            <CardContent id={"single-set-description"}>
              <Typography variant="body2" color="#eeeeee" component="p">
                {set.description}
              </Typography>
            </CardContent>
          </Link>
          <CardActions className="single-set-actions-container">
            <div>
              <IconButton
                aria-label="add to favorites"
                onClick={favoriteHandler}
                style={{
                  padding: "2px",
                  color: isFavorited ? "#ffd54f" : "#eeeeee",
                }}
              >
                <StarIcon />
              </IconButton>
            </div>
            <div className="set-votes-container">
              <IconButton
                id="upvote-button"
                onClick={(e) => voteHandler(e, true)}
                style={{
                  padding: "2px",
                  color: isUpvoted ? "#9fa8da" : "#eeeeee",
                }}
              >
                <ThumbUpAltIcon style={{ padding: "2px" }} />
                <Typography variant="subtitle1">{upvotes}</Typography>
              </IconButton>
              <IconButton
                id="downvote-button"
                onClick={(e) => voteHandler(e, false)}
                style={{
                  padding: "2px",
                  color: isUpvoted === false ? "#e57373" : "#eeeeee",
                }}
              >
                <ThumbDownAltIcon style={{ padding: "2px" }} />
                <Typography variant="subtitle1">{-1 * downvotes}</Typography>
              </IconButton>
            </div>
          </CardActions>
          <div>
            {user && user.userId === set.user_id && (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="menu"
                width="40vw"
              >
                <>
                  <MenuItem>
                    <IconButton
                      onClick={handleOpen}
                      style={{ color: "#00897b" }}
                    >
                      <EditOutlinedIcon
                        id="edit-icon-sets"
                        // onClick={handleEditSet}
                      />
                    </IconButton>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <IconButton
                      id="delete-icon-sets"
                      onClick={handleDeleteSet}
                      style={{ color: "#00897b" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </MenuItem>
                </>
              </Menu>
            )}
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            PaperProps={{
              style: { borderRadius: "8px" },
            }}
          >
            <form onSubmit={handleEditSet}>
              <DialogTitle id="form-dialog-title" style={{ color: "beige" }}>
                Edit Set
              </DialogTitle>
              <DialogContent>
                <DialogContentText style={{ color: "lightgray" }}>
                  Enter the details you want to edit:
                </DialogContentText>
                <TextField
                  autoComplete="off"
                  autoFocus
                  InputLabelProps={{ style: { color: "lightgray" } }}
                  margin="dense"
                  id="set-title-input"
                  label="Set Title..."
                  type="text"
                  fullWidth
                  value={updateTitle}
                  onChange={handleUpdateTitle}
                />
                <TextField
                  autoComplete="off"
                  InputLabelProps={{ style: { color: "lightgray" } }}
                  margin="dense"
                  id="set-desc-input"
                  label="Set Description..."
                  type="text"
                  fullWidth
                  value={updateDescription}
                  onChange={handleUpdateDescription}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" onClick={handleClose} color="primary">
                  Edit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Card>
      </div>
    </>
  );
}
