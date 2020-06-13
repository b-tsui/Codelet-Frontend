import React, { useEffect, useState } from "react";
import IndividualCard from "./IndividualCard";
import CustomDrawer from "./CustomDrawer";
import { api } from "../config";
import "../styles/cards.css";

export default function Cards({ location }) {
  const [cards, setCards] = useState([]);
  const [set, setSet] = useState({});
  const addCard = (card) => setCards([...cards, card]);

  const [fetched, setFetched] = useState(false);
  const [fetchedSet, setFetchedSet] = useState(false);

  const updateCard = (updatedCard) => {
    const updatedArray = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );
    setCards(updatedArray);
  };
  

  // Grabs information about a single set to display at the top
  useEffect(() => {
    const loadSetInfo = async () => {
      const res = await fetch(`${api}${location.pathname}`);
      const set = await res.json();
      if (res.ok) {
        setSet(set);
        setFetchedSet(true);
      }
    };
    loadSetInfo();
  }, [fetchedSet]);

  // Grabs all the cards for a single set
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
        {fetchedSet && (
          <>
            <h1>{set.title}</h1>
            <div>{set.description}</div>
            <div>Creator: {set.author}</div>
            <div>Favorites: {set.favorites.length}</div>
            <div>Cards: {set.card_count}</div>
          </>
        )}
      </div>

      <div>
        <CustomDrawer set={set} addCard={addCard} cards={cards} />
      </div>
      <div className="cards-container">
        {fetched &&
          cards.map((card) => (
            <IndividualCard
              setFetched={setFetched}
              card={card}
              key={card.id}
              setsUserId={set.user_id}
              updateCard={updateCard}
            />
          ))}
      </div>
    </>
  );
}
