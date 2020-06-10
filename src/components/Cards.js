import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import IndividualCard from "./IndividualCard";
import CustomDrawer from "./CustomDrawer";
import "../styles/cards.css";

export default function Cards({ location }) {
  console.log(location);
  const { user } = useAuth0();
  const [cards, setCards] = useState([]);
  const addCard = (card) => setCards([...cards, card]);

  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    const loadCards = async () => {
      const res = await fetch(`${api}${location.pathname}/cards`);
      const cards = await res.json();
      setFetched(true);
      setCards(cards);
    };
    loadCards();
  }, [fetched]);
  return (
    <>
      <div className="set-info">
        <h1>{location.state.set.title}</h1>
        <div>{location.state.set.description}</div>
      </div>

      <div>
        <CustomDrawer location={location} addCard={addCard} cards={cards} />
      </div>
      <div className="cards-container">
        {fetched &&
          cards.map((card) => (
            <IndividualCard setFetched={setFetched} card={card} key={card.id} />
          ))}
      </div>
    </>
  );
}
