import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import IndividualCard from "./IndividualCard";
import CustomDrawer from "./CustomDrawer";
import "../styles/cards.css";
import ReactCardFlip from "react-card-flip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    flexGrow: 1,
  },
  setHeader: {
    backgroundColor: "#2b3238",
    display: "flex",
    minWidth: 400,
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    color: "#00897B",
    boxSizing: "border-box",
  },
  setTitle: {
    fontSize: 50,
  },
}));

export default function Cards({ location }) {
  const { user } = useAuth0();
  const [cards, setCards] = useState([]);
  const [set, setSet] = useState({})
  const addCard = (card) => setCards([...cards, card]);
  const [fetched, setFetched] = useState(false);
  const [fetchedSet, setFetchedSet] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const classes = useStyles();
  const updateCard = (updatedCard) => {
    const updatedArray = cards.map(card => card.id === updatedCard.id ? updatedCard : card)
    setCards(updatedArray)
  }
  useEffect(() => {
    const loadCards = async () => {
      const res = await fetch(`${api}${location.pathname}/cards`);
      const cards = await res.json();
      setFetched(true);
      setCards(cards);
    };
    loadCards();
  }, [fetched]);

  useEffect(() => {
    const loadSetInfo = async () => {
      const res = await fetch(`${api}${location.pathname}`)
      const set = await res.json();
      if (res.ok) {
        setSet(set)
        setFetchedSet(true)
      };
    }
    loadSetInfo()
  }, [fetchedSet]);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div className="set-info">
        {fetchedSet &&
          <>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedBackToFront={2.0} flipSpeedFrontToBack={2.0}>
            <Card className={classes.setHeader} onClick={handleClick}>
              <CardContent className={classes.cardText}>
                <Typography component="h2" variant="h2" style={{fontFamily:"inherit"}}>
                  {set.title}
                </Typography>
                <Typography component="h6" variant="h6" style={{ fontFamily: "inherit" }}>
                  Creator: {set.author}
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.setHeader} onClick={handleClick}>
              <CardContent className={classes.cardText} >
                <Typography component="h5" variant="h5" style={{ fontFamily: "inherit" }}>
                  {set.description}
                </Typography>
                <Typography component="h5" variant="h5" style={{ fontFamily: "inherit" }}>
                  Favorites: {set.favorites.length}
                </Typography>
                <Typography component="h5" vvariant="h5" style={{ fontFamily: "inherit" }}>
                  Cards: {set.card_count}
                </Typography>
              </CardContent>
            </Card>
          </ReactCardFlip>
            {/* <h1>{set.title}</h1> */}
            {/* <div>{set.description}</div>
            <div>Creator: {set.author}</div>
            <div>Favorites: {set.favorites.length}</div>
            <div>Cards: {set.card_count}</div> */}
          </>
        }
      </div>

      <div>
        <CustomDrawer set={set} addCard={addCard} cards={cards} />
      </div>
      <div className="cards-container">
        {fetched &&
          cards.map((card) => (
            <IndividualCard setFetched={setFetched} card={card} key={card.id} setsUserId={set.user_id} updateCard={updateCard} />
          ))}
      </div>
    </>
  );
}
