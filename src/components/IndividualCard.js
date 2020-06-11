import React from "react";
import { api } from "../config";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "../react-auth0-spa";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12,
  },
  definitionContainer: {
    display: "flex",
    // flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});

export default function IndividualCard({ card, setFetched, setsUserId }) {
  const classes = useStyles();
  const { user, getTokenSilently } = useAuth0();
  const bull = <span className={classes.bullet}>•</span>;

  const handleDeleteCard = async () => {
    const token = await getTokenSilently();
    try {
      const res = await fetch(`${api}/cards/${card.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        alert("Authorization denied.");
      } else {
        alert("Card deleted successfully!");
        setFetched(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card-pair-container">
      <Card
        className={classes.root}
        id="single-card-container-term"
        variant="outlined"
      >
        <CardContent className="card-pair-container-term">
          <Typography
            className={classes.title}
            style={{ color: "lightgray" }}
            gutterBottom
          >
            Term:
          </Typography>
          <Typography variant="h6" component="h2">
            {card.term}
          </Typography>
        </CardContent>
      </Card>
      <Card
        className={classes.root}
        id="single-card-container-def"
        variant="outlined"
      >
        <CardContent className="card-pair-container-def">
          <div className={classes.definitionContainer}>
            <Typography
              className={classes.title}
              gutterBottom
              style={{ maxWidth: "500px", color: "lightgray" }}
            >
              Definition:
            </Typography>
            {user && user.userId === setsUserId &&
              <IconButton id="delete-icon" onClick={handleDeleteCard}>
                <DeleteIcon />
              </IconButton>
            }
          </div>
          <Typography variant="h6" component="h2">
            {card.definition}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
