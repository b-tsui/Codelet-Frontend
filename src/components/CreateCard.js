import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import "../styles/sets.css";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



export default function CreateCard({set}) {
    const { user, getTokenSilently } = useAuth0();
    const [open, setOpen] = React.useState(false);
    const [cardTerm, setCardTerm] = React.useState("");
    const [cardDef, setCardDef] = React.useState("");
    const [setId, setSetId] = React.useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        print(' ')
    }, []);
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
        // if (user) {
        //     const token = await getTokenSilently();
        //     const res = await fetch(`${api}/sets`, {
        //         method: "POST",
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             title: setName,
        //             description: setDesc,
        //             category_id: catId,
        //             created_at: new Date(),
        //         }),
        //     });
        //     try {
        //         if (!res.ok) throw res;
        //         const set = await res.json();
        //         console.log(`New Set: ${set}`);
        //         window.location.href = `sets/${set.id}`;
        //     } catch (e) {
        //         console.error(e);
        //     }
        // }
    };

    return (
        <>
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
        </>
    );
}
