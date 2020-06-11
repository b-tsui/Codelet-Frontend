import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import IndividualCard from "./IndividualCard";
import CustomDrawer from "./CustomDrawer";
import "../styles/cards.css";

export default function Cards({ location }) {
  const { user } = useAuth0();
  const [cards, setCards] = useState([]);
  const [set, setSet] = useState({})
  const addCard = (card) => setCards([...cards, card]);

  const [fetched, setFetched] = useState(false);
  const [fetchedSet, setFetchedSet] = useState(false);
  useEffect(() => {
    const loadCards = async () => {
      const res = await fetch(`${api}${location.pathname}/cards`);
      const cards = await res.json();
      setFetched(true);
      setCards(cards);
    };
    loadCards();
  }, [fetched]);

  useEffect(()=>{
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

  return (
    <>
      <div className="set-info">
        { fetchedSet &&
        <>
        <h1>{set.title}</h1>
        <div>{set.description}</div>
        <div>Creator: {set.author}</div>
        <div>Favorites: {set.favorites.length}</div>
        <div>Cards: {set.card_count}</div>
        </>
        }
      </div>

      <div>
        <CustomDrawer set={set} addCard={addCard} cards={cards} />
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
