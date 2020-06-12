import React, { useState, useEffect } from "react";
import MatchCard from "./MatchCard";

export default function ({ cards }) {
  const [randomCards, setRandomCards] = useState([]);
  const [termId, setTermId] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [isTwoSelected, setIsTwoSelected] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [singleCard, setSingleCard] = useState(null);

  useEffect(() => {
    const randomCardGen = () => {
      const random = [];
      let indices = new Set();
      while (random.length < 16 && random.length < cards.length * 2) {
        let randomCardIndex = Math.floor(
          Math.random() * Math.floor(cards.length)
        );
        if (!indices.has(randomCardIndex)) {
          indices.add(randomCardIndex);
          random.push({
            term: cards[randomCardIndex].term,
            cardId: cards[randomCardIndex].id,
          });
          random.push({
            definition: cards[randomCardIndex].definition,
            cardId: cards[randomCardIndex].id,
          });
        }
      }
      let randomized = random.sort(function () {
        return 0.5 - Math.random();
      });
      setRandomCards(randomized);
    };
    randomCardGen();
  }, [isCompleted]);

  const props = {
    setIsTwoSelected,
    isMatched,
    isTwoSelected,
    setIsMatched,
    termId,
    setTermId,
    singleCard,
    setSingleCard,
  };

  return (
    <div className="match-container">
      {randomCards.map((card) => {
        return <MatchCard card={card} props={props} />;
      })}
    </div>
  );
}
