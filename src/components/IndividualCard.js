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
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

//import for dialogue
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
    fontSize: 14,
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

export default function IndividualCard({
  updateCard,
  card,
  setFetched,
  setsUserId,
}) {
  const classes = useStyles();
  const { user, getTokenSilently } = useAuth0();
  const bull = <span className={classes.bullet}>•</span>;
  const [updateTerm, setUpdateTerm] = React.useState(card.term);
  const [updateDef, setUpdateDef] = React.useState(card.definition);
  const [open, setOpen] = React.useState(false);

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
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateTerm = async (e) => {
    setUpdateTerm(e.target.value);
  };
  const handleUpdateDef = async (e) => {
    setUpdateDef(e.target.value);
  };
  const handleEditCard = async (e) => {
    e.preventDefault();
      if (user) {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/cards/${card.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          term: updateTerm,
          definition: updateDef,
        }),
      });
    
        if (!res.ok) throw res;
        const edit = await res.json();
        updateCard(edit);
        setFetched(false)
        
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
            {user && user.userId === setsUserId && (
              <>
                <div className='testing'>
                  <IconButton id="edit-icon" onClick={handleOpen}>
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton id="delete-icon" onClick={handleDeleteCard}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </>
            )}
          </div>
          <Typography variant="h6" component="h2">
            {card.definition}
          </Typography>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            id="card-form"
            PaperProps={{
              style: { borderRadius: "8px", backgroundColor: "#263238" },
            }}
          >
            <form onSubmit={handleEditCard}>
              <DialogTitle id="form-dialog-title" style={{ color: "beige" }}>
                Edit Card
              </DialogTitle>
              <DialogContent>
                <DialogContentText style={{ color: "lightgray" }}>
                  Edit below:
                </DialogContentText>
                <TextField
                  autoFocus
                  InputLabelProps={{ style: { color: "lightgray" } }}
                  margin="dense"
                  id="set-title-input"
                  label="Card Term..."
                  type="text"
                  value={updateTerm}
                  fullWidth
                  onChange={handleUpdateTerm}
                />
                <TextField
                  autofill={card.description}
                  InputLabelProps={{ style: { color: "lightgray" } }}
                  margin="dense"
                  id="set-desc-input"
                  label="Definition here..."
                  type="text"
                  value={updateDef}
                  fullWidth
                  onChange={handleUpdateDef}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" onClick={handleClose} color="primary">
                  Edit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
